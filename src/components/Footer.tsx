import Link from 'next/link'

// Composant Footer
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* À propos */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              ReduceLink
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Service gratuit de raccourcissement de liens. Simple, rapide et sans inscription.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Liens rapides</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/liens" className="text-gray-600 transition-colors hover:text-blue-600">
                  Tous les liens
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-gray-600 transition-colors hover:text-blue-600">
                  Statistiques
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-600 transition-colors hover:text-blue-600">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="text-gray-600 transition-colors hover:text-blue-600">
                  Conditions d&apos;utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Information</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>✓ Gratuit et sans inscription</li>
              <li>✓ Liens publics et permanents</li>
              <li>✓ Statistiques transparentes</li>
              <li>✓ Respectueux de la vie privée</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>
            © {currentYear} ReduceLink. Tous droits réservés.
            <span className="mx-2">•</span>
            <Link href="/conditions" className="hover:text-blue-600">
              Conditions
            </Link>
            <span className="mx-2">•</span>
            <Link href="/a-propos" className="hover:text-blue-600">
              À propos
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
