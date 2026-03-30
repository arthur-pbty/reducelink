'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Link as LinkType } from '@/lib/types'
import { extractDomain, formatNumber, formatRelativeDate, getShortUrl } from '@/lib/utils'

interface LinkCardProps {
  link: LinkType
  showFullUrl?: boolean
}

// Carte d'affichage d'un lien
export default function LinkCard({ link, showFullUrl = false }: LinkCardProps) {
  const [copied, setCopied] = useState(false)
  const shortUrl = getShortUrl(link.shortCode)
  const domain = extractDomain(link.originalUrl)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
    }
  }

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start gap-3">
        {/* Favicon */}
        {link.favicon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.favicon}
            alt=""
            className="h-10 w-10 rounded-lg bg-gray-100 object-contain p-1"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        )}

        <div className="flex-1 min-w-0">
          {/* Titre ou domaine */}
          <h3 className="font-medium text-gray-900 truncate">
            {link.title || domain}
          </h3>

          {/* Lien raccourci */}
          <Link
            href={`/${link.shortCode}`}
            target="_blank"
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            {shortUrl}
          </Link>

          {/* URL originale */}
          {showFullUrl && (
            <p className="mt-1 text-xs text-gray-500 truncate">
              {link.originalUrl}
            </p>
          )}

          {/* Méta infos */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {formatNumber(link.clickCount)} clic{link.clickCount !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatRelativeDate(link.createdAt)}
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {domain}
            </span>
          </div>
        </div>

        {/* Bouton copier */}
        <button
          onClick={copyLink}
          className={`shrink-0 rounded-lg p-2 transition-all ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
          }`}
          aria-label="Copier le lien"
          title="Copier le lien"
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
  )
}
