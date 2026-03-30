'use client'

import { useState, useRef, useCallback } from 'react'
import { createLink, previewLink } from '@/lib/actions'
import type { CreateLinkResponse, LinkPreview } from '@/lib/types'
import { getShortUrl } from '@/lib/utils'
import LinkResult from './LinkResult'

// Formulaire de création de liens
export default function LinkForm() {
  const [url, setUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [useCustomAlias, setUseCustomAlias] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CreateLinkResponse | null>(null)
  const [preview, setPreview] = useState<LinkPreview | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Aperçu du lien avec debounce
  const handleUrlChange = useCallback((value: string) => {
    setUrl(value)
    setResult(null)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (value.length > 10) {
      debounceRef.current = setTimeout(async () => {
        setPreviewLoading(true)
        try {
          const previewData = await previewLink(value)
          setPreview(previewData as LinkPreview)
        } catch {
          setPreview(null)
        } finally {
          setPreviewLoading(false)
        }
      }, 500)
    } else {
      setPreview(null)
    }
  }, [])

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await createLink(url, useCustomAlias ? customAlias : undefined)
      setResult(response)
      
      if (response.success) {
        // Ne pas réinitialiser le formulaire pour permettre de voir le résultat
      }
    } catch {
      setResult({
        success: false,
        error: 'Une erreur est survenue. Veuillez réessayer.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Réinitialiser le formulaire
  const handleReset = () => {
    setUrl('')
    setCustomAlias('')
    setUseCustomAlias(false)
    setResult(null)
    setPreview(null)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ URL */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            URL à raccourcir
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://exemple.com/votre-lien-tres-long"
              className="w-full rounded-xl border border-gray-300 px-4 py-4 pr-12 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
              disabled={isLoading}
              aria-describedby="url-description"
            />
            {previewLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="h-5 w-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            )}
          </div>
          <p id="url-description" className="mt-1 text-xs text-gray-500">
            Collez votre URL longue ici
          </p>
        </div>

        {/* Aperçu du lien */}
        {preview && preview.isValid && (
          <div className={`rounded-xl border p-4 transition-all ${
            preview.isSuspicious ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-start gap-3">
              {preview.favicon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview.favicon}
                  alt=""
                  className="h-8 w-8 rounded"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {preview.title || preview.domain}
                </p>
                <p className="text-xs text-gray-500 truncate">{preview.domain}</p>
              </div>
            </div>
            {preview.isSuspicious && (
              <div className="mt-3 flex items-center gap-2 text-yellow-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{preview.suspiciousReason}</span>
              </div>
            )}
          </div>
        )}

        {/* Option alias personnalisé */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useCustomAlias}
              onChange={(e) => setUseCustomAlias(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={isLoading}
            />
            <span className="text-sm text-gray-700">Utiliser un alias personnalisé</span>
          </label>

          {useCustomAlias && (
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                reducelink.arthurp.fr/
              </span>
              <input
                type="text"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                placeholder="mon-alias"
                className="w-full rounded-xl border border-gray-300 py-3 pl-32 pr-4 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                minLength={3}
                maxLength={50}
                disabled={isLoading}
                aria-label="Alias personnalisé"
              />
            </div>
          )}
        </div>

        {/* Bouton soumettre */}
        <button
          type="submit"
          disabled={isLoading || !url}
          className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Création en cours...
            </span>
          ) : (
            'Raccourcir le lien'
          )}
        </button>
      </form>

      {/* Résultat */}
      {result && (
        <div className="mt-8">
          {result.success && result.link ? (
            <LinkResult
              link={result.link}
              shortUrl={getShortUrl(result.link.shortCode)}
              isReused={result.isReused}
              onReset={handleReset}
            />
          ) : (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{result.error}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
