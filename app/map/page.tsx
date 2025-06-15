"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Trash2, Route, Info } from "lucide-react"
import Sidebar from "@/components/sidebar"
import MapComponent from "@/components/map-component"
import ScheduleCollectionModal from "@/components/schedule-collection-modal"

// Tipos para los contenedores y rutas
interface Container {
  id: string
  name: string
  location: { lat: number; lng: number }
  fillLevel: number
  type: string
  lastCollection: string
}

interface RouteType {
  id: string
  name: string
  containers: string[]
  distance: number
  estimatedTime: number
  status: "active" | "completed" | "planned"
}

export default function MapPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null)
  const [activeView, setActiveView] = useState<"containers" | "routes">("containers")
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  // Verificar si el usuario está logueado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/auth/login")
    }
  }, [router])

  // Datos de ejemplo para contenedores
  const [containers, setContainers] = useState<Container[]>([
    {
      id: "1",
      name: "Contenedor A1",
      location: { lat: -12.046374, lng: -77.042793 },
      fillLevel: 75,
      type: "Plástico",
      lastCollection: "2023-10-15",
    },
    {
      id: "2",
      name: "Contenedor B2",
      location: { lat: -12.048374, lng: -77.045793 },
      fillLevel: 30,
      type: "Papel",
      lastCollection: "2023-10-17",
    },
    {
      id: "3",
      name: "Contenedor C3",
      location: { lat: -12.050374, lng: -77.043793 },
      fillLevel: 90,
      type: "Vidrio",
      lastCollection: "2023-10-10",
    },
    {
      id: "4",
      name: "Contenedor D4",
      location: { lat: -12.047374, lng: -77.047793 },
      fillLevel: 50,
      type: "Orgánico",
      lastCollection: "2023-10-16",
    },
  ])

  // Datos de ejemplo para rutas
  const [routes, setRoutes] = useState<RouteType[]>([
    {
      id: "1",
      name: "Ruta Norte",
      containers: ["1", "2"],
      distance: 5.2,
      estimatedTime: 45,
      status: "active",
    },
    {
      id: "2",
      name: "Ruta Sur",
      containers: ["3", "4"],
      distance: 4.8,
      estimatedTime: 40,
      status: "planned",
    },
  ])

  // Filtrar contenedores y rutas según la búsqueda
  const filteredContainers = containers.filter(
    (container) =>
      container.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      container.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredRoutes = routes.filter((route) => route.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleScheduleCollection = () => {
    setIsScheduleModalOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">Mapa de Contenedores y Rutas</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Buscar..."
                className="pl-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar for containers/routes */}
          <div className="w-80 bg-white border-r overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex space-x-2">
                <Button
                  variant={activeView === "containers" ? "default" : "outline"}
                  className={activeView === "containers" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setActiveView("containers")}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Contenedores
                </Button>
                <Button
                  variant={activeView === "routes" ? "default" : "outline"}
                  className={activeView === "routes" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setActiveView("routes")}
                >
                  <Route className="h-4 w-4 mr-2" />
                  Rutas
                </Button>
              </div>
            </div>

            <div className="p-4">
              {activeView === "containers" ? (
                <div className="space-y-3">
                  {filteredContainers.map((container) => (
                    <div
                      key={container.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedContainer?.id === container.id
                          ? "border-green-500 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedContainer(container)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{container.name}</h3>
                          <p className="text-sm text-gray-500">{container.type}</p>
                          <div className="flex items-center mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  container.fillLevel > 80
                                    ? "bg-red-600"
                                    : container.fillLevel > 50
                                      ? "bg-yellow-500"
                                      : "bg-green-600"
                                }`}
                                style={{ width: `${container.fillLevel}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium ml-2">{container.fillLevel}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRoutes.map((route) => (
                    <div
                      key={route.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedRoute?.id === route.id
                          ? "border-green-500 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedRoute(route)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{route.name}</h3>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              <span>{route.containers.length} contenedores</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Route className="h-3.5 w-3.5 mr-1" />
                              <span>{route.distance} km</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Map area */}
          <div className="flex-1 relative">
            <MapComponent
              apiKey="AIzaSyBcM0ANZjKW_BPDg-I7MaLRvqb2ITd938k"
              containers={containers}
              routes={routes}
              selectedContainer={selectedContainer}
              selectedRoute={selectedRoute}
            />
          </div>

          {/* Details panel (when container or route is selected) */}
          {(selectedContainer || selectedRoute) && (
            <div className="w-80 bg-white border-l overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold flex items-center">
                  <Info className="h-4 w-4 mr-2 text-green-600" />
                  {selectedContainer ? "Detalles del Contenedor" : "Detalles de la Ruta"}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    selectedContainer ? setSelectedContainer(null) : setSelectedRoute(null)
                  }}
                >
                  ×
                </Button>
              </div>

              {selectedContainer && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-500">Nombre</h4>
                    <p className="font-medium">{selectedContainer.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Tipo</h4>
                    <p className="font-medium">{selectedContainer.type}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Nivel de llenado</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className={`h-2.5 rounded-full ${
                          selectedContainer.fillLevel > 80
                            ? "bg-red-600"
                            : selectedContainer.fillLevel > 50
                              ? "bg-yellow-500"
                              : "bg-green-600"
                        }`}
                        style={{ width: `${selectedContainer.fillLevel}%` }}
                      ></div>
                    </div>
                    <p className="text-sm mt-1">{selectedContainer.fillLevel}%</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Última recolección</h4>
                    <p className="font-medium">{selectedContainer.lastCollection}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Ubicación</h4>
                    <p className="font-medium">
                      {selectedContainer.location.lat.toFixed(6)}, {selectedContainer.location.lng.toFixed(6)}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleScheduleCollection}>
                      Programar recolección
                    </Button>
                  </div>
                </div>
              )}

              {selectedRoute && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-500">Nombre</h4>
                    <p className="font-medium">{selectedRoute.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Estado</h4>
                    <p className="font-medium capitalize">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          selectedRoute.status === "active"
                            ? "bg-green-500"
                            : selectedRoute.status === "completed"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                      ></span>
                      {selectedRoute.status}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Distancia</h4>
                    <p className="font-medium">{selectedRoute.distance} km</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Tiempo estimado</h4>
                    <p className="font-medium">{selectedRoute.estimatedTime} minutos</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Contenedores</h4>
                    <p className="font-medium">{selectedRoute.containers.length} contenedores</p>
                    <ul className="mt-2 space-y-1">
                      {selectedRoute.containers.map((containerId) => {
                        const container = containers.find((c) => c.id === containerId)
                        return container ? (
                          <li key={containerId} className="text-sm">
                            • {container.name} ({container.type})
                          </li>
                        ) : null
                      })}
                    </ul>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">Iniciar ruta</Button>
                    <Button variant="outline" className="flex-1">
                      Editar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal para programar recolección */}
        {selectedContainer && (
          <ScheduleCollectionModal
            containerId={selectedContainer.id}
            containerName={selectedContainer.name}
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
