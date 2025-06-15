"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/sidebar"

interface ContainerDetails {
  id: string
  address: string
  latitude: string
  longitude: string
  wasteType: string
  alertThreshold: string
  priority: string
  frequency: string
  operationalStatus: string
}

export default function ContainerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const containerId = params.id as string

  // Verificar si el usuario está logueado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/auth/login")
    }
  }, [router])

  const [container, setContainer] = useState<ContainerDetails>({
    id: containerId,
    address: "Av. Arequipa 123, Lima",
    latitude: "-12.0453",
    longitude: "-77.0311",
    wasteType: "Orgánico",
    alertThreshold: "71",
    priority: "Alta",
    frequency: "30min",
    operationalStatus: "Activo",
  })

  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    // Simulación de guardado - en producción conectaría con API
    setTimeout(() => {
      setLoading(false)
      router.push("/containers")
    }, 1000)
  }

  const handleDelete = () => {
    if (confirm("¿Está seguro que desea eliminar este contenedor?")) {
      setLoading(true)
      // Simulación de eliminación - en producción conectaría con API
      setTimeout(() => {
        setLoading(false)
        router.push("/containers")
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">Contenedor #{containerId}</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <Input
                  id="address"
                  value={container.address}
                  onChange={(e) => setContainer({ ...container, address: e.target.value })}
                  className="w-full bg-white"
                />
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                    Latitud
                  </label>
                  <Input
                    id="latitude"
                    value={container.latitude}
                    onChange={(e) => setContainer({ ...container, latitude: e.target.value })}
                    className="w-full bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                    Longitud
                  </label>
                  <Input
                    id="longitude"
                    value={container.longitude}
                    onChange={(e) => setContainer({ ...container, longitude: e.target.value })}
                    className="w-full bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de residuo
                </label>
                <Select
                  value={container.wasteType}
                  onValueChange={(value) => setContainer({ ...container, wasteType: value })}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Orgánico">Orgánico</SelectItem>
                    <SelectItem value="Plástico">Plástico</SelectItem>
                    <SelectItem value="Papel">Papel</SelectItem>
                    <SelectItem value="Vidrio">Vidrio</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="alertThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                  Umbral de alerta (%)
                </label>
                <Input
                  id="alertThreshold"
                  type="number"
                  min="0"
                  max="100"
                  value={container.alertThreshold}
                  onChange={(e) => setContainer({ ...container, alertThreshold: e.target.value })}
                  className="w-full bg-white"
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridad
                </label>
                <Select
                  value={container.priority}
                  onValueChange={(value) => setContainer({ ...container, priority: value })}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Frecuencia
                </label>
                <Select
                  value={container.frequency}
                  onValueChange={(value) => setContainer({ ...container, frequency: value })}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Seleccionar frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15min</SelectItem>
                    <SelectItem value="30min">30min</SelectItem>
                    <SelectItem value="1h">1h</SelectItem>
                    <SelectItem value="2h">2h</SelectItem>
                    <SelectItem value="6h">6h</SelectItem>
                    <SelectItem value="12h">12h</SelectItem>
                    <SelectItem value="24h">24h</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="operationalStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado Operativo
                </label>
                <Select
                  value={container.operationalStatus}
                  onValueChange={(value) => setContainer({ ...container, operationalStatus: value })}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                    <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-800 hover:bg-green-900 text-white px-8 py-2"
              >
                Guardar Cambios
              </Button>
              <Button
                onClick={handleDelete}
                disabled={loading}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-2"
              >
                Eliminar contenedor
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
