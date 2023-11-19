import {APIProvider, Map, Marker, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';

import Coordinate from "../location-information"

type MapDisplayProps = {
  lat: number;
  lng: number;
};

const MapDisplay = ({lat, lng}: MapDisplayProps) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
  const position = {lat: lat, lng: lng};

  console.log(googleMapsApiKey)

  var googleMapDisplay = (
    <div className='w-50 h-100'>
        <APIProvider apiKey={googleMapsApiKey}>
          <Map center={position} zoom={10} disableDefaultUI={false} mapId={'123'}>
            {/* <Marker position={position} /> */}
            <AdvancedMarker position={position}>
              <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
          </Map>
        </APIProvider>
    </div>
  )

  var invalidDisplay = (
    <div className='p-2'>
      <p>Could not connect to Google Maps.</p>
    </div>
  )

  return (
    <div className='highlight w-100 h-50'>
      { googleMapsApiKey ? googleMapDisplay : invalidDisplay }
    </div>
  );
}

export default MapDisplay;