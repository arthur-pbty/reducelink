'use client'

import { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import type { Link } from '@/lib/types'
import { formatNumber } from '@/lib/utils'

interface LinkResultProps {
  link: Link
  shortUrl: string
  isReused?: boolean
  onReset: () => void
}

// Composant d'affichage du résultat après création de lien
export default function LinkResult({ link, shortUrl, isReused, onReset }: LinkResultProps) {
  const [copied, setCopied] = useState(false)
  const [qrCopied, setQrCopied] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  // Copier le lien dans le presse-papier
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
    }
  }

  // Copier le QR Code dans le presse-papier
  const copyQRCode = async () => {
    try {
      const canvas = qrRef.current?.querySelector('canvas')
      if (!canvas) return

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/png')
      })

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])
      setQrCopied(true)
      setTimeout(() => setQrCopied(false), 2000)
    } catch {
      // Fallback: télécharger si la copie échoue
      downloadQRCode()
    }
  }

  // Télécharger le QR Code
  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return

    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `reducelink-${link.shortCode}-qr.png`
    a.click()
  }

  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Message de réutilisation */}
      {isReused && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Ce lien existait déjà, nous l&apos;avons réutilisé.</span>
        </div>
      )}

      {/* En-tête succès */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-green-800">Lien créé avec succès !</h3>
          <p className="text-sm text-green-600">{formatNumber(link.clickCount)} clic{link.clickCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Lien raccourci */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Votre lien raccourci</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-green-300 bg-white px-4 py-3">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium break-all"
            >
              {shortUrl}
            </a>
          </div>
          <button
            onClick={copyLink}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-all ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-white border border-green-300 text-gray-600 hover:bg-green-100'
            }`}
            aria-label="Copier le lien"
          >
            {copied ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* URL originale */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-1 block">URL originale</label>
        <p className="text-sm text-gray-600 truncate bg-white rounded-lg border border-gray-200 px-4 py-2">
          {link.originalUrl}
        </p>
      </div>

      {/* QR Code */}
      <div className="border-t border-green-200 pt-6">
        <label className="text-sm font-medium text-gray-700 mb-3 block">QR Code</label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div
            ref={qrRef}
            className="rounded-xl bg-white p-4 shadow-sm border border-gray-200"
          >
            <QRCodeCanvas
              value={shortUrl}
              size={150}
              bgColor="#ffffff"
              fgColor="#1e40af"
              level="H"
              includeMargin={false}
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <button
              onClick={copyQRCode}
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                qrCopied
                  ? 'bg-green-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {qrCopied ? (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copié !
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copier le QR Code
                </>
              )}
            </button>
            <button
              onClick={downloadQRCode}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Télécharger
            </button>
          </div>
        </div>
      </div>

      {/* Nouveau lien */}
      <div className="mt-6 pt-6 border-t border-green-200">
        <button
          onClick={onReset}
          className="w-full rounded-lg border border-green-300 bg-white px-4 py-3 text-sm font-medium text-green-700 transition-all hover:bg-green-100"
        >
          Créer un nouveau lien
        </button>
      </div>
    </div>
  )
}
