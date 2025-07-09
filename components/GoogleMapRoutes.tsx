'use client'

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api'
import { useState, useEffect, useRef } from 'react'
import { GOOGLE_MAP_LIBRARIES } from '@/lib/googleMapsConfig'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const centerDefault = {
  lat: -12.068572,
  lng: -77.043147,
}

interface LatLng {
  lat: number
  lng: number
}

interface Container {
  id: string
  location: LatLng
}

interface MapComponentProps {
  containers: Container[]
  selectedContainer: Container | null
  route?: LatLng[]
}

export default function MapComponent({
  containers,
  selectedContainer,
  route = [],
}: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: GOOGLE_MAP_LIBRARIES,
  })

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map
  }

  // Centrar mapa en el contenedor seleccionado
  useEffect(() => {
    if (
      selectedContainer &&
      mapRef.current &&
      typeof selectedContainer.location.lat === 'number' &&
      typeof selectedContainer.location.lng === 'number'
    ) {
      mapRef.current.panTo(selectedContainer.location)
    }
  }, [selectedContainer])

  // Dibujar la ruta solo si el array `route` es válido y tiene mínimo 2 puntos
  useEffect(() => {
    const cleanedRoute = route
      .map((point) => ({
        lat: Number(point.lat),
        lng: Number(point.lng),
      }))
      .filter(
        (p) =>
          typeof p.lat === 'number' &&
          typeof p.lng === 'number' &&
          !isNaN(p.lat) &&
          !isNaN(p.lng)
      )

    if (!isLoaded || cleanedRoute.length < 2) {
      setDirections(null)
      return
    }

    const directionsService = new google.maps.DirectionsService()

    directionsService.route(
      {
        origin: centerDefault,
        destination: cleanedRoute[cleanedRoute.length - 1],
        waypoints: cleanedRoute.slice(0, -1).map((point) => ({
          location: point,
          stopover: true,
        })),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result)
        } else {
          console.error('Error al calcular ruta:', status)
        }
      }
    )
  }, [isLoaded, route])

  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerDefault}
      zoom={14}
      onLoad={onLoad}
    >
      {/* Marcador base */}
      <Marker
        position={centerDefault}
        icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/truck.png' }}
        title="Base de camiones"
      />

      {/* Marcadores de contenedores */}
      {containers.map((c) => {
        const lat = Number(c.location.lat)
        const lng = Number(c.location.lng)
        if (isNaN(lat) || isNaN(lng)) return null

        return (
          <Marker
            key={c.id}
            position={{ lat, lng }}
            title={c.id}
          />
        )
      })}

      {/* Contenedor seleccionado (marcador verde) */}
      {selectedContainer && selectedContainer.location && (
        <Marker
          position={{
            lat: Number(selectedContainer.location.lat),
            lng: Number(selectedContainer.location.lng),
          }}
          icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' }}
        />
      )}

      {/* Ruta optimizada */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  )
}
