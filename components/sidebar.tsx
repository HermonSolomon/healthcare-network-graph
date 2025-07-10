"use client"

import { Button } from "@/components/ui/button"
import { Search, Home, Users, BarChart3, FileText, Bell, Heart, Calendar, HelpCircle, Settings } from "lucide-react"

const sidebarItems = [
  { icon: Search, label: "Search", active: true },
  { icon: Home, label: "Home" },
  { icon: Users, label: "Network" },
  { icon: BarChart3, label: "Analytics" },
  { icon: FileText, label: "Publications" },
  { icon: Bell, label: "Notifications" },
  { icon: Heart, label: "Favorites" },
  { icon: Calendar, label: "Events" },
  { icon: HelpCircle, label: "Help" },
  { icon: Settings, label: "Settings" },
]

export default function Sidebar() {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-8">
        <div className="w-4 h-4 bg-white rounded-sm"></div>
      </div>

      <nav className="flex flex-col space-y-2 flex-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              size="sm"
              className={`w-10 h-10 p-0 ${
                item.active
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Button>
          )
        })}
      </nav>

      <div className="mt-auto">
        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">EC</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
