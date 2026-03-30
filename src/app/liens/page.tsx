import { Metadata } from 'next'
import { Suspense } from 'react'
import LinkCard from '@/components/LinkCard'
import LinkFilters from '@/components/LinkFilters'
import Pagination from '@/components/Pagination'
import { getLinks } from '@/lib/actions'
import type { SortOption } from '@/lib/types'
import { formatNumber } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Tous les liens raccourcis - Explorer les URLs courtes',
  description:
    'Explorez tous les liens raccourcis créés sur ReduceLink. Liste publique et transparente avec recherche, tri par popularité et statistiques de clics en temps réel.',
  alternates: {
    canonical: '/liens',
  },
  openGraph: {
    title: 'Tous les liens raccourcis sur ReduceLink',
    description: 'Explorez les liens raccourcis créés sur ReduceLink avec recherche, tri et statistiques.',
    url: '/liens',
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
    title: 'Tous les liens raccourcis sur ReduceLink',
    description: 'Explorez les liens raccourcis sur ReduceLink.',
    images: ['/opengraph-image'],
  },
}

interface LinksPageProps {
  searchParams: Promise<{
    page?: string
    sort?: SortOption
    search?: string
  }>
}

// Page liste des liens
export default async function LinksPage({ searchParams }: LinksPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const sort = (params.sort as SortOption) || 'recent'
  const search = params.search || ''

  const { links, total, totalPages } = await getLinks(page, 20, sort, search)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://reducelink.arthurp.fr" },
            { "@type": "ListItem", position: 2, name: "Tous les liens", item: "https://reducelink.arthurp.fr/liens" },
          ],
        }) }}
      />
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Tous les liens
        </h1>
        <p className="mt-2 text-gray-600">
          {formatNumber(total)} lien{total !== 1 ? 's' : ''} raccourci{total !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Filtres */}
      <Suspense fallback={<div className="h-12 bg-gray-100 animate-pulse rounded-lg" />}>
        <LinkFilters initialSort={sort} initialSearch={search} />
      </Suspense>

      {/* Liste des liens */}
      {links.length > 0 ? (
        <>
          <div className="grid gap-4 mb-8">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} showFullUrl />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/liens"
            searchParams={{
              ...(sort !== 'recent' && { sort }),
              ...(search && { search }),
            }}
          />
        </>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Aucun lien trouvé
          </h3>
          <p className="mt-2 text-gray-600">
            {search
              ? `Aucun résultat pour "${search}". Essayez avec d'autres termes.`
              : "Aucun lien n'a encore été créé. Soyez le premier !"}
          </p>
        </div>
      )}
    </div>
    </>
  )
}
