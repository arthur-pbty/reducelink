// Fonctions de requête pour les pages (non Server Actions)

import prisma from '@/lib/prisma'
import type { Link } from '@/lib/types'

/**
 * Récupère un lien par son code court et incrémente le compteur
 * Cette fonction est utilisée par la page de redirection
 */
export async function getLinkAndIncrementClick(shortCode: string): Promise<Link | null> {
  try {
    // D'abord vérifier si le lien existe
    const existingLink = await prisma.link.findUnique({
      where: { shortCode },
    })
    
    if (!existingLink) {
      console.log(`Lien non trouvé pour shortCode: ${shortCode}`)
      return null
    }
    
    // Puis incrémenter le compteur
    const link = await prisma.link.update({
      where: { shortCode },
      data: { clickCount: { increment: 1 } },
    })
    
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
