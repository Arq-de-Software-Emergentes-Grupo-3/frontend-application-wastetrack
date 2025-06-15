"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Truck, User, CalendarCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ScheduleCollectionModalProps {
  containerId: string
  containerName: string
  isOpen: boolean
  onClose: () => void
}

export default function ScheduleCollectionModal({
  containerId,
  containerName,
  isOpen,
  onClose,
}: ScheduleCollectionModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    priority: "normal",
    driver: "",
    vehicle: "",
    notes: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    setLoading(true)
    // Simulación de envío - en producción conectaría con API
    setTimeout(() => {
      setLoading(false)
      alert(`Recolección programada para el contenedor ${containerName} (${containerId})`)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <CalendarCheck className="mr-2 h-5 w-5" />
            Programar Recolección
          </DialogTitle>
          <DialogDescription>
            Programar recolección para el contenedor {containerName} (ID: {containerId})
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="h-4 w-4 inline mr-2" />
                Fecha
              </label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                <Clock className="h-4 w-4 inline mr-2" />
                Hora
              </label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Prioridad
            </label>
            <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="driver" className="block text-sm font-medium text-gray-700 mb-1">
              <User className="h-4 w-4 inline mr-2" />
              Conductor
            </label>
            <Select value={formData.driver} onValueChange={(value) => handleChange("driver", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar conductor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="driver1">Carlos Rodríguez</SelectItem>
                <SelectItem value="driver2">Ana Gómez</SelectItem>
                <SelectItem value="driver3">Luis Torres</SelectItem>
                <SelectItem value="driver4">María Sánchez</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-1">
              <Truck className="h-4 w-4 inline mr-2" />
              Vehículo
            </label>
            <Select value={formData.vehicle} onValueChange={(value) => handleChange("vehicle", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar vehículo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vehicle1">Camión 01 - XYZ-123</SelectItem>
                <SelectItem value="vehicle2">Camión 02 - ABC-456</SelectItem>
                <SelectItem value="vehicle3">Camión 03 - DEF-789</SelectItem>
                <SelectItem value="vehicle4">Camión 04 - GHI-012</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notas adicionales
            </label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="w-full"
              placeholder="Instrucciones especiales o comentarios"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !formData.date || !formData.time || !formData.driver || !formData.vehicle}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? "Procesando..." : "Programar recolección"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
