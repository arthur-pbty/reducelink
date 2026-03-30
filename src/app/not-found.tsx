import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page non trouvée',
  description: 'La page que vous recherchez n\'existe pas.',
}

// Page 404 personnalisée
export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:py-24">
      {/* Illustration */}
      <div className="mb-8">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-12 w-12 text-red-600"
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
        </div>
      </div>

      {/* Code d'erreur */}
      <p className="text-7xl font-bold text-gray-900 sm:text-9xl">404</p>

      {/* Message */}
      <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
        Lien introuvable
      </h1>
      <p className="mt-4 text-gray-600">
        Le lien que vous recherchez n&apos;existe pas ou a été désactivé.
        Vérifiez l&apos;orthographe de l&apos;URL ou créez un nouveau lien.
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Créer un lien
        </Link>
        <Link
          href="/liens"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Rechercher un lien
        </Link>
      </div>

      {/* Aide */}
      <div className="mt-12 rounded-xl bg-gray-100 p-6 text-left">
        <h2 className="font-semibold text-gray-900 mb-3">Que faire ?</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Vérifiez que l&apos;URL est correctement écrite
          </li>
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Utilisez la barre de recherche pour trouver le lien
          </li>
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Si le lien a été partagé, demandez à la personne de vérifier
          </li>
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Créez un nouveau lien si nécessaire
          </li>
        </ul>
      </div>
    </div>
  )
}
