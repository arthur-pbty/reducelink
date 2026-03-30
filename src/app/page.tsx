import { Metadata } from 'next'
import LinkForm from '@/components/LinkForm'
import StatsCards from '@/components/StatsCards'
import LinkCard from '@/components/LinkCard'
import { getGlobalStats, getRecentLinks } from '@/lib/actions'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ReduceLink - Raccourcisseur de liens gratuit | URL Shortener français',
  description:
    'Raccourcissez vos liens gratuitement avec ReduceLink. Créez des liens courts personnalisés ou aléatoires, avec QR Code et statistiques de clics. Simple, rapide et sans inscription. Le meilleur raccourcisseur d\'URL en français.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ReduceLink - Raccourcisseur de liens gratuit',
    description: 'Créez des liens courts personnalisés avec QR Code et statistiques. Gratuit et sans inscription.',
    url: '/',
    locale: 'fr_FR',
    siteName: 'ReduceLink',
  },
}

// Page d'accueil
export default async function HomePage() {
  const [stats, recentLinks] = await Promise.all([
    getGlobalStats(),
    getRecentLinks(5),
  ])

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment raccourcir un lien avec ReduceLink ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Collez votre URL longue dans le champ prévu, choisissez éventuellement un alias personnalisé, puis cliquez sur 'Raccourcir le lien'. Votre lien court est prêt instantanément avec un QR Code.",
        },
      },
      {
        "@type": "Question",
        name: "Est-ce que ReduceLink est gratuit ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, ReduceLink est 100% gratuit, sans limitation et sans inscription requise. Aucun plan payant n'existe.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je personnaliser mes liens courts ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, vous pouvez choisir un alias personnalisé pour créer des liens mémorables et professionnels, ou laisser ReduceLink générer un code aléatoire.",
        },
      },
      {
        "@type": "Question",
        name: "Les liens raccourcis expirent-ils ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non, les liens créés sur ReduceLink sont permanents et ne peuvent pas être supprimés. Ils resteront actifs indéfiniment.",
        },
      },
      {
        "@type": "Question",
        name: "ReduceLink propose-t-il des statistiques ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, chaque lien dispose de statistiques de clics publiques et transparentes. Vous pouvez suivre le nombre de redirections en temps réel.",
        },
      },
    ],
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://reducelink.arthurp.fr",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-12" aria-label="Présentation de ReduceLink">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Raccourcissez vos liens
          <span className="block text-blue-600">en un instant</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Transformez vos URLs longues en liens courts et mémorables.
          Gratuit, sans inscription, avec QR Code et statistiques.
        </p>
      </section>

      {/* Formulaire de création */}
      <section className="mb-16">
        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8 border border-gray-200">
          <LinkForm />
        </div>
      </section>

      {/* Statistiques globales */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          ReduceLink en chiffres
        </h2>
        <StatsCards stats={stats} />
      </section>

      {/* Fonctionnalités */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Pourquoi choisir ReduceLink ?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Rapide et simple"
            description="Collez votre lien, cliquez, c'est fait. Pas de compte à créer, pas de configuration."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            }
            title="QR Code inclus"
            description="Chaque lien génère automatiquement un QR Code que vous pouvez copier ou télécharger."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="Statistiques"
            description="Suivez le nombre de clics sur vos liens. Toutes les statistiques sont publiques et transparentes."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
            title="Alias personnalisé"
            description="Choisissez votre propre alias pour des liens mémorables et professionnels."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            title="Respectueux de la vie privée"
            description="Aucune donnée personnelle collectée. Pas de cookies de tracking. Juste des liens."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            }
            title="100% gratuit"
            description="Aucun plan payant, aucune limitation. ReduceLink est et restera gratuit."
          />
        </div>
      </section>

      {/* Liens récents */}
      {recentLinks.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Liens récents</h2>
            <Link
              href="/liens"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Voir tous les liens
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-4">
            {recentLinks.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section - visible pour le SEO */}
      <section className="mt-16" aria-label="Questions fréquentes">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Questions fréquentes
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <details className="rounded-xl border border-gray-200 bg-white p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
              Comment raccourcir un lien avec ReduceLink ?
              <svg className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <p className="mt-3 text-gray-600">
              Collez votre URL longue dans le champ prévu, choisissez éventuellement un alias personnalisé, puis cliquez sur &quot;Raccourcir le lien&quot;. Votre lien court est prêt instantanément avec un QR Code.
            </p>
          </details>
          <details className="rounded-xl border border-gray-200 bg-white p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
              Est-ce que ReduceLink est gratuit ?
              <svg className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <p className="mt-3 text-gray-600">
              Oui, ReduceLink est 100% gratuit, sans limitation et sans inscription requise. Aucun plan payant n&apos;existe.
            </p>
          </details>
          <details className="rounded-xl border border-gray-200 bg-white p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
              Puis-je personnaliser mes liens courts ?
              <svg className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <p className="mt-3 text-gray-600">
              Oui, vous pouvez choisir un alias personnalisé pour créer des liens mémorables et professionnels, ou laisser ReduceLink générer un code aléatoire.
            </p>
          </details>
          <details className="rounded-xl border border-gray-200 bg-white p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
              Les liens raccourcis expirent-ils ?
              <svg className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <p className="mt-3 text-gray-600">
              Non, les liens créés sur ReduceLink sont permanents et ne peuvent pas être supprimés. Ils resteront actifs indéfiniment.
            </p>
          </details>
          <details className="rounded-xl border border-gray-200 bg-white p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
              ReduceLink propose-t-il des statistiques ?
              <svg className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <p className="mt-3 text-gray-600">
              Oui, chaque lien dispose de statistiques de clics publiques et transparentes. Vous pouvez suivre le nombre de redirections en temps réel.
            </p>
          </details>
        </div>
      </section>
    </div>
    </>
  )
}

// Composant carte fonctionnalité
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
