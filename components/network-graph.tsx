"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { Card, CardContent } from "@/components/ui/card"
import { fetchNetworkData } from "@/lib/api"
import { Connection, HCP } from "@/types/hop"
import { SimulationNodeDatum } from "d3"

// Extend HCP to include D3 simulation properties
interface HCPNode extends HCP, SimulationNodeDatum {
  fx?: number
  fy?: number
}

interface NetworkGraphProps {
  centerHCP: string
  searchQuery: string
  onNodeSelect: (hcp: HCP, position: { x: number; y: number }) => void
  selectedHCP: HCP | null
  showConnections: boolean
  showAnyConnections: boolean
}

export default function NetworkGraph({
  centerHCP,
  searchQuery,
  onNodeSelect,
  selectedHCP,
  showConnections,
  showAnyConnections,
}: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredConnection, setHoveredConnection] = useState<Connection | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { data: networkData, isLoading } = useQuery({
    queryKey: ["network", centerHCP],
    queryFn: () => fetchNetworkData(centerHCP),
  })

  useEffect(() => {
    if (!networkData || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    const simulationNodes: HCPNode[] = networkData.nodes.map(node => ({ ...node }))
    
    const simulationLinks = networkData.links.map(link => ({
      ...link,
      source: link.source,
      target: link.target
    }))

    const centerNode = simulationNodes.find((n) => n.id === centerHCP)
    if (centerNode) {
      centerNode.fx = width / 2
      centerNode.fy = height / 2
    }

    const padding = 60
    const forceX = d3.forceX(width / 2).strength(0.1)
    const forceY = d3.forceY(height / 2).strength(0.1)

    const simulation = d3
      .forceSimulation(simulationNodes)
      .force(
        "link",
        d3
          .forceLink(simulationLinks)
          .id((d: d3.SimulationNodeDatum) => (d as HCPNode).id)
          .distance(100) // Use a fixed distance for now
          .strength(0.1)
      )
      .force("charge", d3.forceManyBody().strength(-250))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(45))
      .force("x", forceX)
      .force("y", forceY)

    const link = svg
      .append("g")
      .selectAll("line")
      .data(simulationLinks)
      .enter()
      .append("line")
      .attr("stroke", (d: Connection) => {
        switch (d.type) {
          case "Co-authored":
            return "#10b981"
          case "Research Collaboration":
            return "#3b82f6"
          case "Colleague":
            return "#8b5cf6"
          default:
            return "#6b7280"
        }
      })
      .attr("stroke-width", (d: Connection) => {
        const baseWidth = d.type === "Co-authored" ? Math.max(1, d.strength * 2) : Math.max(1, d.strength * 4)
        return baseWidth
      })
      .attr("opacity", showConnections ? 0.7 : 0)
      .style("cursor", "pointer")
      .on("mouseover", (event: MouseEvent, d: Connection) => {
        if (showConnections) {
          setHoveredConnection(d)
          setMousePosition({ x: event.pageX, y: event.pageY })
        }
      })
      .on("mouseout", () => {
        setHoveredConnection(null)
      })

    const node = svg
      .append("g")
      .selectAll("g")
      .data(simulationNodes)
      .enter()
      .append("g")
      .style("cursor", "pointer")
      .call(d3.drag<SVGGElement, HCPNode>().on("start", dragstarted).on("drag", dragged).on("end", dragended))

    node
      .append("circle")
      .attr("r", (d: HCPNode) => (d.id === centerHCP ? 35 : 25))
      .attr("fill", (d: HCPNode) => (d.id === centerHCP ? "#2563eb" : "#f8fafc"))
      .attr("stroke", (d: HCPNode) => {
        if (d.id === centerHCP) return "#1d4ed8"
        if (selectedHCP && d.id === selectedHCP.id) return "#2563eb"
        return "#d1d5db"
      })
      .attr("stroke-width", (d: HCPNode) => {
        if (d.id === centerHCP || (selectedHCP && d.id === selectedHCP.id)) return 3
        return 2
      })

    svg
      .append("defs")
      .selectAll("clipPath")
      .data(simulationNodes)
      .enter()
      .append("clipPath")
      .attr("id", (d: HCPNode) => `clip-${d.id}`)
      .append("circle")
      .attr("r", (d: HCPNode) => (d.id === centerHCP ? 30 : 20))

    node
      .append("image")
      .attr("href", (d: HCPNode) => d.avatar)
      .attr("x", (d: HCPNode) => (d.id === centerHCP ? -30 : -20))
      .attr("y", (d: HCPNode) => (d.id === centerHCP ? -30 : -20))
      .attr("width", (d: HCPNode) => (d.id === centerHCP ? 60 : 40))
      .attr("height", (d: HCPNode) => (d.id === centerHCP ? 60 : 40))
      .attr("clip-path", (d: HCPNode) => `url(#clip-${d.id})`)
      .style("pointer-events", "none")

    node.on("click", (event: MouseEvent, d: HCPNode) => {
      event.stopPropagation()
      const rect = svgRef.current!.getBoundingClientRect()
      const position = {
        x: rect.left + (d.x || 0),
        y: rect.top + (d.y || 0),
      }
      onNodeSelect(d as HCP, position)
    })

    node
      .on("mouseover", (event: MouseEvent, d: HCPNode) => {
        const tooltip = svg
          .append("g")
          .attr("class", "name-tooltip")
          .attr("transform", `translate(${d.x || 0}, ${(d.y || 0) + (d.id === centerHCP ? 45 : 35)})`)

        const text = tooltip
          .append("text")
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("font-size", d.id === centerHCP ? "14px" : "12px")
          .attr("font-weight", d.id === centerHCP ? "bold" : "normal")
          .attr("fill", "#374151")
          .style("pointer-events", "none")

        const bbox = (text.node() as SVGTextElement)!.getBBox()
        tooltip
          .insert("rect", "text")
          .attr("x", bbox.x - 4)
          .attr("y", bbox.y - 2)
          .attr("width", bbox.width + 8)
          .attr("height", bbox.height + 4)
          .attr("fill", "white")
          .attr("stroke", "#d1d5db")
          .attr("stroke-width", 1)
          .attr("rx", 4)
          .style("pointer-events", "none")
      })
      .on("mouseout", () => {
        svg.selectAll(".name-tooltip").remove()
      })

    if (searchQuery) {
      node
        .select("circle")
        .attr("stroke", (d: HCPNode) => {
          if (d.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return "#f59e0b"
          }
          if (d.id === centerHCP) return "#1d4ed8"
          if (selectedHCP && d.id === selectedHCP.id) return "#2563eb"
          return "#d1d5db"
        })
        .attr("stroke-width", (d: HCPNode) => {
          if (d.name.toLowerCase().includes(searchQuery.toLowerCase())) return 4
          if (d.id === centerHCP || (selectedHCP && d.id === selectedHCP.id)) return 3
          return 2
        })
    }

    simulation.on("tick", () => {
      simulationNodes.forEach((d: HCPNode) => {
        d.x = Math.max(padding, Math.min(width - padding, d.x || 0))
        d.y = Math.max(padding, Math.min(height - padding, d.y || 0))
      })

      link
        .attr("x1", (d: d3.SimulationLinkDatum<HCPNode>) => (d.source as HCPNode).x || 0)
        .attr("y1", (d: d3.SimulationLinkDatum<HCPNode>) => (d.source as HCPNode).y || 0)
        .attr("x2", (d: d3.SimulationLinkDatum<HCPNode>) => (d.target as HCPNode).x || 0)
        .attr("y2", (d: d3.SimulationLinkDatum<HCPNode>) => (d.target as HCPNode).y || 0)

      node.attr("transform", (d: HCPNode) => `translate(${d.x || 0},${d.y || 0})`)
    })

    function dragstarted(event: d3.D3DragEvent<SVGGElement, HCPNode, HCPNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, HCPNode, HCPNode>) {
      event.subject.fx = Math.max(padding, Math.min(width - padding, event.x))
      event.subject.fy = Math.max(padding, Math.min(height - padding, event.y))
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, HCPNode, HCPNode>) {
      if (!event.active) simulation.alphaTarget(0)
      if (event.subject.id === centerHCP) {
        event.subject.fx = width / 2
        event.subject.fy = height / 2
      } else {
        event.subject.fx = undefined
        event.subject.fy = undefined
      }
    }
  }, [networkData, centerHCP, searchQuery, selectedHCP, showConnections, showAnyConnections, onNodeSelect])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" style={{ background: "#e6e7eb" }} />

      {hoveredConnection && showConnections && (
        <Card
          className="absolute z-10 pointer-events-none shadow-lg"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: "translate(-50%, -100%)",
          }}
        >
          <CardContent className="p-3">
            <div className="text-sm font-medium">{hoveredConnection.type}</div>
            <div className="text-xs text-gray-600">{hoveredConnection.description}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
