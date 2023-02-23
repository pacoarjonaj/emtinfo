import { Map, GoogleApiWrapper, Marker } from "google-maps-react"

const MapItem = ({
	google,
	containerStyle,
	center,
	zoom,
	markerList
}) => {

	return (
		<div className="relative flex flex-col w-full h-full">
			<Map
				google = {google}
				zoom = {zoom}
				initialCenter = {center}
				containerStyle = {containerStyle}
			>
				{ markerList && markerList.length > 0 ? (
					markerList.map(parada => (
						<Marker
							key={parada._id}
							position={{
								lat: parada.lat,
								lng: parada.lon
							}}
						/>
					))
				) : (
					<></>
				)
				}
			</Map>

			
		</div>
	)
}

export default GoogleApiWrapper({
	apiKey: process.env.GOOGLEMAPS_KEY,
	language: 'ES'
})(MapItem)