"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Loader2 } from "lucide-react"
import { searchHCPs } from "@/lib/api"
import { useDebounce } from "../hooks/use-debounce"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (hcpId: string) => void
  fullWidth?: boolean
}

export default function SearchBar({ value, onChange, onSearch, fullWidth = false }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // Debounce search query to avoid excessive API calls
  const debouncedQuery = useDebounce(value, 300)

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchHCPs(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000, // Cache results for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  })

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue)
      setIsOpen(newValue.length >= 2)
    },
    [onChange],
  )

  const handleClear = useCallback(() => {
    onChange("")
    setIsOpen(false)
  }, [onChange])

  const handleResultClick = useCallback(
    (hcpId: string) => {
      onSearch(hcpId)
      setIsOpen(false)
      onChange("")
    },
    [onSearch, onChange],
  )

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    if (value.length >= 2) {
      setIsOpen(true)
    }
  }, [value.length])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    setTimeout(() => setIsOpen(false), 200)
  }, [])

  const showResults = isOpen && (searchResults?.length || isLoading || error)

  return (
    <div className={`relative ${fullWidth ? "w-full" : "w-96"}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`pl-10 pr-10 transition-all duration-200 ${
            isFocused ? "ring-2 ring-blue-500 border-blue-500" : ""
          }`}
          autoComplete="off"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          {value && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-gray-100"
              onClick={handleClear}
              type="button"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoading && (
            <div className="px-4 py-3 text-center text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              Searching...
            </div>
          )}

          {error && (
            <div className="px-4 py-3 text-center text-red-500 text-sm">Error searching. Please try again.</div>
          )}

          {searchResults && searchResults.length === 0 && !isLoading && (
            <div className="px-4 py-3 text-center text-gray-500 text-sm">
              No healthcare professionals found 
            </div>
          )}

          {searchResults && searchResults.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-b">
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
              </div>
              {searchResults.map((hcp) => (
                <button
                  key={hcp.id}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                  onClick={() => handleResultClick(hcp.id)}
                  type="button"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {hcp.name
                          .split(" ")
                          .slice(1, 3)
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate">{hcp.name}</div>
                      <div className="text-xs text-gray-600 truncate">{hcp.title}</div>
                      <div className="text-xs text-gray-500 truncate">{hcp.institution}</div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-xs text-gray-400">{hcp.stats.publications} publications</div>
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
