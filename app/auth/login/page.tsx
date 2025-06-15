"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulación de login - en producción conectaría con API
    setTimeout(() => {
      // Credenciales de prueba
      if (username === "admin" && password === "admin") {
        localStorage.setItem("isLoggedIn", "true")
        router.push("/")
      } else {
        setError("Usuario o contraseña incorrectos")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wasteTrackLogo-At4isWGBWjroCmtuzvcsTsvQdvAapf.png"
            alt="WasteTrack Logo"
            width={150}
            height={150}
          />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-700">
              Usuario
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-gray-100 border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-100 border-gray-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Ingresar"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Para pruebas, usa: usuario: admin, contraseña: admin</p>
        </div>
      </div>
    </div>
  )
}
