"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import NetworkGraph from "@/components/network-graph"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { fetchHCPDetails } from "@/lib/api"
import { HCP } from "@/types/hop"
import HCPModal from "@/components/hop-modal"

const queryClient = new QueryClient()

export default function HomePage() {
  const [selectedHCP, setSelectedHCP] = useState<HCP | null>(null)
  const [centerHCP, setCenterHCP] = useState<string>("emily-carter")
  const [centerHCPData, setCenterHCPData] = useState<HCP | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
  const [showConnections, setShowConnections] = useState(true)
  const [showAnyConnections, setShowAnyConnections] = useState(false)

  // Fetch center HCP data when centerHCP changes
  useEffect(() => {
    const fetchCenterHCP = async () => {
      try {
        const hcpData = await fetchHCPDetails(centerHCP)
        setCenterHCPData(hcpData)
      } catch (error) {
        console.error("Failed to fetch center HCP:", error)
      }
    }

    fetchCenterHCP()
  }, [centerHCP])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header
            centerHCP={selectedHCP || centerHCPData}
            showConnections={showConnections}
            onShowConnectionsChange={setShowConnections}
            showAnyConnections={showAnyConnections}
            onShowAnyConnectionsChange={setShowAnyConnections}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={(hcpId) => setCenterHCP(hcpId)}
          />

           <main className="flex-1 relative">
            <NetworkGraph
              centerHCP={centerHCPData ? centerHCPData.id : ""}
              searchQuery={searchQuery}
              onNodeSelect={(hcp, position) => {
                setSelectedHCP(hcp)
                setModalPosition(position)
              }}
              selectedHCP={selectedHCP}
              showConnections={showConnections}
              showAnyConnections={showAnyConnections}
            />

            {selectedHCP && (
              <HCPModal hcp={selectedHCP} onClose={() => setSelectedHCP(null)} position={modalPosition} />
            )}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  )
}
