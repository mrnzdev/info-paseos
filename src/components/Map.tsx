'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'

const iconRetinaUrl =
	'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png'
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
const shadowUrl =
	'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
L.Icon.Default.mergeOptions({
	iconRetinaUrl,
	iconUrl,
	shadowUrl
})

const Map = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Do something with the window object here
		}
	}, [])

	return (
		<MapContainer
			center={[-34.9011, -56.1645]}
			className={'h-[100%] rounded-3xl'}
			zoom={7.5}
			minZoom={7.5}
			zoomControl={false}
		>
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker position={[-34.9011, -56.1645]}>
				<Popup>A pretty CSS3 popup.</Popup>
			</Marker>
			<Marker position={[-34.9041, -56.1643]}>
				<Popup>A pretty CSS3 popup.</Popup>
			</Marker>
		</MapContainer>
	)
}

export default Map
