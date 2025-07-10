"use client"

import { useQuery } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { X, GraduationCap, Building2, FileText, Users } from "lucide-react"
import { fetchHCPDetails } from "@/lib/api"
import { HCP } from "@/types/hop"

interface HCPModalProps {
  hcp: HCP
  onClose: () => void
  position: { x: number; y: number }
}

export default function HCPModal({ hcp, onClose, position }: HCPModalProps) {
  const { data: hcpDetails } = useQuery({
    queryKey: ["hcp", hcp.id],
    queryFn: () => fetchHCPDetails(hcp.id),
    initialData: hcp,
  })

  if (!hcpDetails) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Card
        className="absolute w-96 max-h-[600px] overflow-y-auto shadow-xl pointer-events-auto"
        style={{
          left: Math.min(position.x, window.innerWidth - 384),
          top: Math.min(position.y, window.innerHeight - 600),
          transform: position.x > window.innerWidth / 2 ? "translateX(-100%)" : "none",
        }}
      >
        <CardContent className="p-6">
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center mb-6">
            <Avatar className="w-20 h-20 mx-auto mb-3">
              <AvatarImage src={hcpDetails.avatar || "/placeholder.svg"} alt={hcpDetails.name} />
              <AvatarFallback className="text-lg">
                {hcpDetails.name
                  .split(" ")
                  .slice(1, 3)
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg text-gray-900">{hcpDetails.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{hcpDetails.title}</p>
            <p className="text-xs text-gray-500">{hcpDetails.institution}</p>
            <p className="text-xs text-gray-500 leading-relaxed mt-3">{hcpDetails.about.substring(0, 120)}...</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">252</div>
              <div className="text-xs text-gray-600">Peers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">154</div>
              <div className="text-xs text-gray-600">Following</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            <Button size="sm" className="text-xs bg-blue-600">
              View profile
            </Button>
            <Button size="sm" variant="outline" className="text-xs bg-transparent">
              Follow
            </Button>
          </div>

          <Separator className="mb-6" />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-gray-200">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{hcpDetails.stats.connections}</span>
              </div>
              <div className="text-xs text-gray-600">Connections</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-200">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{hcpDetails.stats.publications}</span>
              </div>
              <div className="text-xs text-gray-600">Publications</div>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-900 mb-3">About</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{hcpDetails.about}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </h4>
            <div className="space-y-3">
              {hcpDetails.education.map((edu, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{edu.institution}</div>
                    <div className="text-xs text-gray-600">{edu.degree}</div>
                    <div className="text-xs text-gray-500">{edu.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Experience
            </h4>
            <div className="space-y-3">
              {hcpDetails.experience.slice(0, 2).map((exp, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{exp.position}</div>
                    <div className="text-xs text-gray-600">{exp.institution}</div>
                    <div className="text-xs text-gray-500">{exp.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {hcpDetails.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
