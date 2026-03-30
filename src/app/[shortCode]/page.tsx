import { redirect, notFound } from 'next/navigation'
import { getLinkAndIncrementClick } from '@/lib/queries'

interface RedirectPageProps {
  params: Promise<{
    shortCode: string
  }>
}

// Page de redirection dynamique
// Cette route capture tous les chemins /{shortCode}
export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortCode } = await params
  
  console.log('Tentative de redirection pour:', shortCode)

  // Récupérer le lien et incrémenter le compteur
  const link = await getLinkAndIncrementClick(shortCode)
  
  console.log('Lien trouvé:', link)

  // Si le lien n'existe pas, afficher 404
  if (!link) {
    notFound()
  }

  // Rediriger vers l'URL originale
  redirect(link.originalUrl)
}

// Désactiver le cache pour cette page (compteur de clics)
export const dynamic = 'force-dynamic'
