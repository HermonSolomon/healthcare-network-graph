"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import SearchBar from "../components/search-bar"
import { Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HCP } from "@/types/hop"

interface HeaderProps {
  centerHCP: HCP | null
  showConnections: boolean
  onShowConnectionsChange: (value: boolean) => void
  showAnyConnections: boolean
  onShowAnyConnectionsChange: (value: boolean) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onSearch: (hcpId: string) => void
}

export default function Header({
  centerHCP,
  showConnections,
  onShowConnectionsChange,
  showAnyConnections,
  onShowAnyConnectionsChange,
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: HeaderProps) {
  return (
    <header className="bg-white ">
      <div className="px-6 py-4 bg-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-4 shadow-sm border w-full lg:flex-1 lg:mr-4 gap-4 sm:gap-0">
            {centerHCP && (
              <>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={centerHCP.avatar || "/placeholder.svg"} alt={centerHCP.name} />
                    <AvatarFallback>
                      {centerHCP.name
                        .split(" ")
                        .slice(1, 3)
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">{centerHCP.name}</h1>
                    <p className="text-sm text-gray-600">{centerHCP.title}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-6 sm:items-stretch sm:justify-center py-0 px-0 gap-4 sm:gap-0">
                  <div className="flex space-x-4 justify-center items-center flex-row order-2 sm:order-1">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-900">223</div>
                      <div className="text-xs text-gray-600">My Peers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-900">234</div>
                      <div className="text-xs text-gray-600">Following</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-7 order-1 sm:order-2 w-full sm:w-auto"
                  >
                    View Profile
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col space-y-3 bg-white rounded-lg p-4 shadow-sm border py-2.5 w-full lg:w-auto">
            <div className="flex items-center space-x-3">
              <Switch
                id="show-connections"
                checked={showConnections}
                onCheckedChange={onShowConnectionsChange}
                className="data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor="show-connections" className="text-sm font-medium opacity-50">
                Show connections
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Switch
                id="show-any-connections"
                checked={showAnyConnections}
                onCheckedChange={onShowAnyConnectionsChange}
                className="data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor="show-any-connections" className="text-sm font-medium opacity-50">
                Show any connections on map
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-4 bg-gray-200">
        <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={onSearchQueryChange} onSearch={onSearch} fullWidth={true} />
          </div>
          <Button variant="outline" size="sm" className="flex items-center space-x-2 px-3 bg-transparent">
            <Filter className="w-4 h-4 opacity-50" />
            <span className="text-sm opacity-50">Filter</span>
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
        </div>
      </div>
    </header>
  )
}
