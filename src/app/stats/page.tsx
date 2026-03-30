import { Metadata } from 'next'
import Link from 'next/link'
import StatsCards from '@/components/StatsCards'
import LinkCard from '@/components/LinkCard'
import { getGlobalStats, getPopularLinks, getRecentLinks } from '@/lib/actions'

export const metadata: Metadata = {
  title: 'Statistiques de ReduceLink - Liens et clics en temps réel',
  description:
    'Découvrez les statistiques de ReduceLink en temps réel : nombre de liens créés, total de redirections, liens les plus populaires et tendances du jour.',
  alternates: {
    canonical: '/stats',
  },
  openGraph: {
    title: 'Statistiques de ReduceLink en temps réel',
    description: 'Nombre de liens créés, total de redirections et liens les plus populaires.',
    url: '/stats',
    locale: 'fr_FR',
    siteName: 'ReduceLink',
    type: 'website',
    images: [{
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'ReduceLink - Raccourcisseur de liens gratuit',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Statistiques de ReduceLink en temps réel',
    description: 'Nombre de liens créés, total de redirections et liens les plus populaires.',
    images: ['/opengraph-image'],
  },
}

// Page statistiques
export default async function StatsPage() {
  const [stats, popularLinks, recentLinks] = await Promise.all([
    getGlobalStats(),
    getPopularLinks(10),
    getRecentLinks(10),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://reducelink.arthurp.fr" },
            { "@type": "ListItem", position: 2, name: "Statistiques", item: "https://reducelink.arthurp.fr/stats" },
          ],
        }) }}
      />
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* En-tête */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Statistiques
        </h1>
        <p className="mt-2 text-gray-600">
          Les chiffres de ReduceLink en temps réel
        </p>
      </div>

      {/* Cartes statistiques */}
      <section className="mb-12">
        <StatsCards stats={stats} />
      </section>

      {/* Grille des classements */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Liens les plus populaires */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              Liens les plus populaires
            </h2>
            <Link
              href="/liens?sort=popular"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {popularLinks.length > 0 ? (
              popularLinks.map((link, index) => (
                <div key={link.id} className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-200 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <LinkCard link={link} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                Aucun lien n&apos;a encore reçu de clics
              </p>
            )}
          </div>
        </section>

        {/* Liens récents */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Derniers liens créés
            </h2>
            <Link
              href="/liens?sort=recent"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {recentLinks.length > 0 ? (
              recentLinks.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                Aucun lien n&apos;a encore été créé
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Informations supplémentaires */}
      <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          À propos de ces statistiques
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium text-gray-900">Données en temps réel</p>
              <p>Les statistiques sont mises à jour instantanément à chaque clic.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium text-gray-900">100% transparent</p>
              <p>Toutes les données sont publiques et accessibles à tous.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium text-gray-900">Aucun tracking</p>
              <p>Nous comptons uniquement les clics, pas les utilisateurs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium text-gray-900">Liens permanents</p>
              <p>Les liens créés ne sont jamais supprimés.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
