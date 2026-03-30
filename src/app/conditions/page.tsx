import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Conditions d'utilisation de ReduceLink",
  description:
    "Conditions d'utilisation de ReduceLink. Règles simples et transparentes pour l'utilisation de notre service gratuit de raccourcissement de liens.",
  alternates: {
    canonical: '/conditions',
  },
  openGraph: {
    title: "Conditions d'utilisation de ReduceLink",
    description: "Règles simples et transparentes pour l'utilisation de notre service gratuit de raccourcissement de liens.",
    url: '/conditions',
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
    title: "Conditions d'utilisation de ReduceLink",
    description: "Règles simples et transparentes pour l'utilisation de notre service.",
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Page Conditions d'utilisation
export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://reducelink.arthurp.fr" },
            { "@type": "ListItem", position: 2, name: "Conditions d'utilisation", item: "https://reducelink.arthurp.fr/conditions" },
          ],
        }) }}
      />
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Conditions d&apos;utilisation
        </h1>
        <p className="mt-4 text-gray-600">
          Dernière mise à jour : Février 2026
        </p>
      </div>

      {/* Contenu */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="prose prose-gray max-w-none">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptation des conditions</h2>
            <p className="text-gray-600 leading-relaxed">
              En utilisant ReduceLink, vous acceptez les présentes conditions d&apos;utilisation. 
              Ces conditions sont simples et visent à garantir un usage respectueux du service 
              pour tous les utilisateurs.
            </p>
          </section>

          {/* Description du service */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Description du service</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ReduceLink est un service gratuit de raccourcissement de liens. Il permet de :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Transformer une URL longue en lien court</li>
              <li>Choisir un alias personnalisé ou généré automatiquement</li>
              <li>Obtenir un QR Code pour chaque lien</li>
              <li>Consulter les statistiques de clics</li>
            </ul>
          </section>

          {/* Liens publics */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Caractère public des liens</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 font-medium">
                ⚠️ Tous les liens créés sur ReduceLink sont publics.
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Cela signifie que n&apos;importe qui peut :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
              <li>Voir la liste de tous les liens créés</li>
              <li>Consulter l&apos;URL de destination de chaque lien</li>
              <li>Voir le nombre de clics sur chaque lien</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>Ne créez pas de liens vers des contenus sensibles ou privés.</strong>
            </p>
          </section>

          {/* Pas de suppression */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Permanence des liens</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 font-medium">
                ℹ️ Les liens créés ne peuvent pas être supprimés.
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Une fois un lien créé, il est permanent. Cette règle garantit :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
              <li>La fiabilité des liens partagés</li>
              <li>La cohérence des statistiques</li>
              <li>La simplicité du service (pas de gestion de compte)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Réfléchissez avant de créer un lien. En cas d&apos;abus manifeste, nous nous réservons 
              le droit de désactiver un lien.
            </p>
          </section>

          {/* Contenus interdits */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Contenus interdits</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Il est interdit de créer des liens vers :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Contenus illégaux</li>
              <li>Malwares, virus ou logiciels malveillants</li>
              <li>Phishing ou arnaques</li>
              <li>Contenus haineux ou discriminatoires</li>
              <li>Contenus portant atteinte aux droits d&apos;autrui</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Nous nous réservons le droit de désactiver tout lien violant ces règles.
            </p>
          </section>

          {/* Responsabilité */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Limitation de responsabilité</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>ReduceLink n&apos;est pas responsable du contenu des liens.</strong>
              </p>
              <p className="text-gray-600 mt-2">
                Nous fournissons uniquement un service de redirection. Le contenu vers lequel 
                pointent les liens est sous la responsabilité exclusive des créateurs de ces liens 
                et des propriétaires des sites de destination.
              </p>
            </div>
          </section>

          {/* Disponibilité */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Disponibilité du service</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous faisons de notre mieux pour maintenir le service disponible 24h/24, 7j/7. 
              Cependant, nous ne pouvons garantir une disponibilité absolue. Des interruptions 
              peuvent survenir pour maintenance ou pour des raisons techniques.
            </p>
          </section>

          {/* Gratuité */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Gratuité</h2>
            <p className="text-gray-600 leading-relaxed">
              ReduceLink est et restera <strong>100% gratuit</strong>. Aucun plan payant, 
              aucune fonctionnalité premium, aucune publicité intrusive. Le service est 
              financé de manière indépendante.
            </p>
          </section>

          {/* Modifications */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Modifications des conditions</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous pouvons modifier ces conditions à tout moment. Les modifications entrent 
              en vigueur dès leur publication sur cette page. La date de dernière mise à jour 
              est indiquée en haut de ce document.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question concernant ces conditions d&apos;utilisation ou le service 
              en général, consultez notre page{' '}
              <Link href="/a-propos" className="text-blue-600 hover:text-blue-700 underline">
                À propos
              </Link>.
            </p>
          </section>
        </div>
      </div>

      {/* Résumé */}
      <div className="mt-8 rounded-xl bg-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">En résumé</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Service gratuit et sans inscription
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Tous les liens sont publics
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Pas de suppression possible
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Contenus illégaux interdits
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Nous ne sommes pas responsables du contenu des liens
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}
