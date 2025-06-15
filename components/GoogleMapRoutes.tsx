'use client'

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader
} from "@react-google-maps/api"
import { useState, useEffect, useRef } from "react"

const containerStyle = {
  width: "100%",
  height: "100%"
}

const centerDefault = {
  lat: -12.090609066418608, // Real Plaza Salaverry
  lng: -77.05577522688435
}

export default function MapComponent({ containers, selectedContainer }: {
  containers: any[],
  selectedContainer: any | null
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places', 'maps'],
  })

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map
  }

  const waypoints = containers
    .map((c: any) => ({
      location: {
        lat: parseFloat(c.location.lat),
        lng: parseFloat(c.location.lng)
      },
      stopover: true
    }))
    .filter((wp) => !isNaN(wp.location.lat) && !isNaN(wp.location.lng))

  const origin = centerDefault
  const destination = waypoints[waypoints.length - 1]?.location || centerDefault

  useEffect(() => {
    if (!isLoaded || containers.length === 0) return

    const service = new google.maps.DirectionsService()
    service.route(
      {
        origin,
        destination,
        waypoints: waypoints.slice(0, -1),
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result)
        } else {
          console.error("Error en DirectionsService:", status)
        }
      }
    )
  }, [isLoaded, containers])

  useEffect(() => {
    if (selectedContainer && mapRef.current) {
      mapRef.current.panTo({
        lat: parseFloat(selectedContainer.location.lat),
        lng: parseFloat(selectedContainer.location.lng)
      })
    }
  }, [selectedContainer])

  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <GoogleMap
      onLoad={onLoad}
      mapContainerStyle={containerStyle}
      center={centerDefault}
      zoom={14}
    >
      {containers.map((c: any) => (
        <Marker
          key={c.id}
          position={{
            lat: parseFloat(c.location.lat),
            lng: parseFloat(c.location.lng)
          }}
        />
      ))}

      {selectedContainer && (
        <Marker
          position={{
            lat: parseFloat(selectedContainer.location.lat),
            lng: parseFloat(selectedContainer.location.lng)
          }}
          icon={{ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }}
        />
      )}

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  )
}
