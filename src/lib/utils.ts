// Utilitaires pour la validation et génération de liens

import { customAlphabet } from 'nanoid'

// Alphabet pour les alias aléatoires (sans caractères ambigus)
const alphabet = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const nanoid = customAlphabet(alphabet, 6)

/**
 * Génère un alias aléatoire unique
 */
export function generateRandomAlias(): string {
  return nanoid()
}

/**
 * Valide et nettoie un alias personnalisé
 */
export function sanitizeAlias(alias: string): string {
  return alias
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, '')
    .slice(0, 50)
}

/**
 * Valide une URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

/**
 * Extrait le domaine d'une URL
 */
export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.hostname
  } catch {
    return ''
  }
}

/**
 * Génère l'URL du favicon pour un domaine
 */
export function getFaviconUrl(url: string): string {
  const domain = extractDomain(url)
  if (!domain) return ''
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

/**
 * Vérifie si un alias est réservé (routes du site)
 */
export function isReservedAlias(alias: string): boolean {
  const reserved = [
    'liens',
    'stats',
    'a-propos',
    'conditions',
    'api',
    'admin',
    '_next',
    'favicon.ico',
    'robots.txt',
    'sitemap.xml',
  ]
  return reserved.includes(alias.toLowerCase())
}

/**
 * Détecte les liens potentiellement suspects
 */
export function isSuspiciousUrl(url: string): { suspicious: boolean; reason?: string } {
  const suspiciousPatterns = [
    { pattern: /bit\.ly|tinyurl|goo\.gl|t\.co/i, reason: 'Lien déjà raccourci' },
    { pattern: /\.(exe|bat|cmd|msi|dll)$/i, reason: 'Fichier exécutable' },
    { pattern: /javascript:/i, reason: 'Script JavaScript' },
    { pattern: /data:/i, reason: 'URL data' },
  ]

  for (const { pattern, reason } of suspiciousPatterns) {
    if (pattern.test(url)) {
      return { suspicious: true, reason }
    }
  }

  return { suspicious: false }
}

/**
 * Formate un nombre avec des séparateurs de milliers
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num)
}

/**
 * Formate une date en français
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * Formate une date relative
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return "Aujourd'hui"
  if (days === 1) return 'Hier'
  if (days < 7) return `Il y a ${days} jours`
  if (days < 30) return `Il y a ${Math.floor(days / 7)} semaine${Math.floor(days / 7) > 1 ? 's' : ''}`
  if (days < 365) return `Il y a ${Math.floor(days / 30)} mois`
  return `Il y a ${Math.floor(days / 365)} an${Math.floor(days / 365) > 1 ? 's' : ''}`
}

/**
 * Base URL du site
 */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://reducelink.arthurp.fr'

/**
 * Génère l'URL raccourcie complète
 */
export function getShortUrl(shortCode: string): string {
  return `${BASE_URL}/${shortCode}`
}
