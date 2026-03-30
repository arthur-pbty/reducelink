'use server'

// Server Actions pour la gestion des liens

import prisma from '@/lib/prisma'
import {
  generateRandomAlias,
  sanitizeAlias,
  isValidUrl,
  isReservedAlias,
  isSuspiciousUrl,
  getFaviconUrl,
  extractDomain,
} from '@/lib/utils'
import type { CreateLinkResponse, GlobalStats, Link, PaginatedLinks, SortOption } from '@/lib/types'
import { revalidatePath } from 'next/cache'

/**
 * Récupère le titre d'une page web
 */
async function fetchPageTitle(url: string): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'ReduceLink Bot/1.0',
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) return null

    const html = await response.text()
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    return titleMatch ? titleMatch[1].trim().slice(0, 200) : null
  } catch {
    return null
  }
}

/**
 * Crée un nouveau lien raccourci
 */
export async function createLink(url: string, customAlias?: string): Promise<CreateLinkResponse> {
  try {
    // Validation de l'URL
    if (!isValidUrl(url)) {
      return { success: false, error: 'URL invalide. Veuillez entrer une URL valide commençant par http:// ou https://' }
    }

    // Vérification des liens suspects
    const suspiciousCheck = isSuspiciousUrl(url)
    if (suspiciousCheck.suspicious) {
      return { success: false, error: `Lien suspect détecté: ${suspiciousCheck.reason}` }
    }

    let shortCode: string
    let isReused = false

    if (customAlias) {
      // Alias personnalisé
      shortCode = sanitizeAlias(customAlias)

      if (shortCode.length < 3) {
        return { success: false, error: "L'alias doit contenir au moins 3 caractères" }
      }

      if (isReservedAlias(shortCode)) {
        return { success: false, error: 'Cet alias est réservé. Veuillez en choisir un autre.' }
      }

      // Vérifier si l'alias existe déjà
      const existingLink = await prisma.link.findUnique({
        where: { shortCode },
      })

      if (existingLink) {
        // Si l'alias existe pour une URL différente
        if (existingLink.originalUrl !== url) {
          return { success: false, error: 'Cet alias est déjà utilisé. Veuillez en choisir un autre.' }
        }
        // Même URL, on réutilise
        isReused = true
        revalidatePath('/')
        revalidatePath('/liens')
        return {
          success: true,
          link: existingLink,
          shortUrl: `/${existingLink.shortCode}`,
          isReused: true,
        }
      }
    } else {
      // Alias aléatoire - vérifier si l'URL existe déjà
      const existingLink = await prisma.link.findFirst({
        where: { originalUrl: url },
      })

      if (existingLink) {
        // URL déjà raccourcie, on réutilise
        revalidatePath('/')
        revalidatePath('/liens')
        return {
          success: true,
          link: existingLink,
          shortUrl: `/${existingLink.shortCode}`,
          isReused: true,
        }
      }

      // Générer un nouvel alias aléatoire unique
      let attempts = 0
      do {
        shortCode = generateRandomAlias()
        const existing = await prisma.link.findUnique({
          where: { shortCode },
        })
        if (!existing) break
        attempts++
      } while (attempts < 10)

      if (attempts >= 10) {
        return { success: false, error: "Impossible de générer un alias unique. Veuillez réessayer." }
      }
    }

    // Récupérer les métadonnées de la page
    const [title, favicon] = await Promise.all([
      fetchPageTitle(url),
      Promise.resolve(getFaviconUrl(url)),
    ])

    // Créer le nouveau lien
    const newLink = await prisma.link.create({
      data: {
        originalUrl: url,
        shortCode: shortCode!,
        title,
        favicon,
      },
    })

    revalidatePath('/')
    revalidatePath('/liens')
    revalidatePath('/stats')

    return {
      success: true,
      link: newLink,
      shortUrl: `/${newLink.shortCode}`,
      isReused,
    }
  } catch (error) {
    console.error('Erreur lors de la création du lien:', error)
    return { success: false, error: 'Une erreur est survenue. Veuillez réessayer.' }
  }
}

/**
 * Récupère un lien par son code court et incrémente le compteur
 */
export async function getLinkAndIncrementClick(shortCode: string): Promise<Link | null> {
  try {
    // D'abord vérifier si le lien existe
    const existingLink = await prisma.link.findUnique({
      where: { shortCode },
    })
    
    if (!existingLink) {
      return null
    }
    
    // Puis incrémenter le compteur
    const link = await prisma.link.update({
      where: { shortCode },
      data: { clickCount: { increment: 1 } },
    })
    
    revalidatePath('/liens')
    revalidatePath('/stats')
    
    return link
  } catch (error) {
    console.error('Erreur lors de la récupération du lien:', error)
    return null
  }
}

/**
 * Récupère un lien par son code court sans incrémenter
 */
export async function getLinkByShortCode(shortCode: string): Promise<Link | null> {
  try {
    return await prisma.link.findUnique({
      where: { shortCode },
    })
  } catch {
    return null
  }
}

/**
 * Récupère les statistiques globales
 */
export async function getGlobalStats(): Promise<GlobalStats> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [totalLinks, totalClicks, linksToday, clicksToday] = await Promise.all([
    prisma.link.count(),
    prisma.link.aggregate({ _sum: { clickCount: true } }),
    prisma.link.count({ where: { createdAt: { gte: today } } }),
    prisma.link.aggregate({
      _sum: { clickCount: true },
      where: { createdAt: { gte: today } },
    }),
  ])

  return {
    totalLinks,
    totalClicks: totalClicks._sum.clickCount || 0,
    linksToday,
    clicksToday: clicksToday._sum.clickCount || 0,
  }
}

/**
 * Récupère les liens paginés
 */
export async function getLinks(
  page: number = 1,
  pageSize: number = 20,
  sort: SortOption = 'recent',
  search?: string
): Promise<PaginatedLinks> {
  const skip = (page - 1) * pageSize

  const orderBy: Record<string, 'asc' | 'desc'> = 
    sort === 'recent' ? { createdAt: 'desc' } :
    sort === 'popular' ? { clickCount: 'desc' } :
    { shortCode: 'asc' }

  const where = search
    ? {
        OR: [
          { shortCode: { contains: search } },
          { originalUrl: { contains: search } },
          { title: { contains: search } },
        ],
      }
    : {}

  const [links, total] = await Promise.all([
    prisma.link.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
    }),
    prisma.link.count({ where }),
  ])

  return {
    links,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

/**
 * Récupère les liens les plus populaires
 */
export async function getPopularLinks(limit: number = 10): Promise<Link[]> {
  return prisma.link.findMany({
    orderBy: { clickCount: 'desc' },
    take: limit,
  })
}

/**
 * Récupère les liens récents
 */
export async function getRecentLinks(limit: number = 10): Promise<Link[]> {
  return prisma.link.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

/**
 * Aperçu d'un lien avant création
 */
export async function previewLink(url: string) {
  if (!isValidUrl(url)) {
    return { isValid: false, url }
  }

  const suspicious = isSuspiciousUrl(url)
  const domain = extractDomain(url)
  const favicon = getFaviconUrl(url)
  
  let title: string | null = null
  try {
    title = await fetchPageTitle(url)
  } catch {
    // Ignore errors
  }

  return {
    isValid: true,
    url,
    domain,
    favicon,
    title,
    isSuspicious: suspicious.suspicious,
    suspiciousReason: suspicious.reason,
  }
}
