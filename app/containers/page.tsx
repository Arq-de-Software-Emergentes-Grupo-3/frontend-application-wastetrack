"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Sidebar from "@/components/sidebar"

interface Container {
  id: string
  location: string
  fillLevel: number
  type: string
  status: string
}

export default function ContainersPage() {
  const router = useRouter()

  // Verificar si el usuario está logueado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/auth/login")
    }
  }, [router])

  const [containers, setContainers] = useState<Container[]>([
    {
      id: "C-001",
      location: "Av. Arequipa 123, Lima",
      fillLevel: 82,
      type: "Orgánico",
      status: "Activo",
    },
    {
      id: "C-002",
      location: "Jr. Las Flores 456, Surquillo",
      fillLevel: 45,
      type: "Plástico",
      status: "Activo",
    },
    {
      id: "C-003",
      location: "Av. Angamos Este 789, Miraflores",
      fillLevel: 67,
      type: "Papel",
      status: "Activo",
    },
    {
      id: "C-004",
      location: "Calle Los Cedros 123, San Isidro",
      fillLevel: 93,
      type: "General",
      status: "Activo",
    },
    {
      id: "C-005",
      location: "asd",
      fillLevel: 0,
      type: "Orgánico",
      status: "Activo",
    },
  ])

  // Función para determinar el color de la barra de progreso según el nivel de llenado
  const getFillLevelColor = (level: number) => {
    if (level >= 80) return "bg-red-500"
    if (level >= 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">Listado de Contenedores</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ubicación
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nivel de llenado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tipo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {containers.map((container) => (
                    <tr key={container.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{container.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{container.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${getFillLevelColor(container.fillLevel)}`}
                              style={{ width: `${container.fillLevel}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">{container.fillLevel}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{container.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{container.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/containers/${container.id}`}>
                          <Button className="bg-green-800 hover:bg-green-900 text-white">Ver detalle</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <Link href="/containers/add-container">
            <Button className="h-14 w-14 rounded-full bg-green-700 hover:bg-green-800">
              <Plus className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
