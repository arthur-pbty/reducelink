'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { SortOption } from '@/lib/types'

interface LinkFiltersProps {
  initialSort: SortOption
  initialSearch: string
}

// Filtres et recherche pour la liste des liens
export default function LinkFilters({ initialSort, initialSearch }: LinkFiltersProps) {
  const router = useRouter()
  const [search, setSearch] = useState(initialSearch)
  const [sort, setSort] = useState<SortOption>(initialSort)

  // Mettre à jour l'URL avec les paramètres
  const updateUrl = useCallback((newSort: SortOption, newSearch: string) => {
    const params = new URLSearchParams()
    if (newSort !== 'recent') params.set('sort', newSort)
    if (newSearch) params.set('search', newSearch)
    params.set('page', '1')
    
    const queryString = params.toString()
    router.push(`/liens${queryString ? `?${queryString}` : ''}`)
  }, [router])

  // Debounce pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== initialSearch) {
        updateUrl(sort, search)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [search, sort, initialSearch, updateUrl])

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort)
    updateUrl(newSort, search)
  }

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'recent', label: 'Plus récents' },
    { value: 'popular', label: 'Plus cliqués' },
    { value: 'alphabetical', label: 'Alphabétique' },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Barre de recherche */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un lien..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Rechercher"
        />
        {search && (
          <button
            onClick={() => {
              setSearch('')
              updateUrl(sort, '')
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Effacer la recherche"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tri */}
      <div className="flex gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              sort === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={sort === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
