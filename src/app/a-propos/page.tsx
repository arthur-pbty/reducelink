import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos de ReduceLink - Service de raccourcissement de liens gratuit',
  description:
    'Découvrez ReduceLink, le raccourcisseur de liens gratuit, sans inscription et respectueux de la vie privée. Notre mission : simplifier le partage de liens avec QR Code et statistiques.',
  alternates: {
    canonical: '/a-propos',
  },
  openGraph: {
    title: 'À propos de ReduceLink',
    description: 'Découvrez notre service gratuit de raccourcissement de liens. Simple, transparent et respectueux de la vie privée.',
    url: '/a-propos',
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
    title: 'À propos de ReduceLink',
    description: 'Découvrez notre service gratuit de raccourcissement de liens.',
    images: ['/opengraph-image'],
  },
}

// Page À propos
export default function AboutPage() {
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
      {
        "@type": "ListItem",
        position: 2,
        name: "À propos",
        item: "https://reducelink.arthurp.fr/a-propos",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          À propos de ReduceLink
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Un service simple et transparent de raccourcissement de liens
        </p>
      </div>

      {/* Contenu principal */}
      <div className="prose prose-gray max-w-none">
        {/* Mission */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Notre mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              ReduceLink est né d&apos;une idée simple : proposer un service de raccourcissement 
              de liens <strong>gratuit</strong>, <strong>sans inscription</strong> et <strong>respectueux 
              de la vie privée</strong>. Dans un monde où les données personnelles sont devenues 
              une monnaie d&apos;échange, nous croyons qu&apos;il est possible de fournir un service 
              utile sans compromettre votre vie privée.
            </p>
          </div>
        </section>

        {/* Pas de comptes */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              Pas de compte utilisateur
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Contrairement à d&apos;autres services, ReduceLink ne requiert <strong>aucune inscription</strong>. 
              Pas d&apos;email à fournir, pas de mot de passe à créer, pas de profil à gérer. 
              Vous collez votre lien, vous obtenez un lien court. C&apos;est tout.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Aucune inscription nécessaire
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Utilisation immédiate
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Aucune donnée personnelle collectée
              </li>
            </ul>
          </div>
        </section>

        {/* Transparence */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
              Transparence totale
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Tous les liens créés sur ReduceLink sont <strong>publics</strong>. N&apos;importe qui peut 
              voir la liste complète des liens, leurs statistiques de clics et les URLs de destination. 
              Cette transparence est un choix délibéré.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-2">Pourquoi la transparence ?</p>
              <p>
                La transparence permet de lutter contre les abus. Si un lien mène vers un contenu 
                malveillant, tout le monde peut le voir. Cela encourage une utilisation responsable 
                du service et protège les utilisateurs finaux.
              </p>
            </div>
          </div>
        </section>

        {/* Vie privée */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              Respect de la vie privée
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous ne collectons <strong>aucune donnée personnelle</strong>. Pas de cookies de tracking, 
              pas d&apos;adresse IP enregistrée, pas d&apos;empreinte digitale du navigateur. 
              Les seules informations stockées sont :
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                L&apos;URL originale
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                L&apos;alias court
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                Le nombre de clics (anonyme)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                La date de création
              </li>
            </ul>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              Comment ça marche
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center p-4">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Collez votre lien</h3>
                <p className="text-sm text-gray-600">
                  Entrez l&apos;URL longue que vous souhaitez raccourcir
                </p>
              </div>
              <div className="text-center p-4">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Choisissez un alias</h3>
                <p className="text-sm text-gray-600">
                  Personnalisé ou généré automatiquement
                </p>
              </div>
              <div className="text-center p-4">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Partagez !</h3>
                <p className="text-sm text-gray-600">
                  Copiez le lien ou téléchargez le QR Code
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="rounded-xl bg-blue-600 p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Prêt à raccourcir vos liens ?</h2>
            <p className="mb-6 text-blue-100">
              C&apos;est gratuit, instantané et sans inscription.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-transform hover:scale-105"
            >
              Commencer maintenant
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}
