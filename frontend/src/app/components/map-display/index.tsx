import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

const MapDisplay = () => {
  const position = {lat: 53.54992, lng: 10.00678};
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

  return (
    <div className='highlight w-100 h-50'>
      <div className='w-50 h-100'>
          {/* <APIProvider apiKey={googleMapsApiKey}>
            <Map center={position} zoom={10} disableDefaultUI={false}>
              <Marker position={position} />
            </Map>
          </APIProvider> */}
      </div>
      {/* <div className='highlight w-50 h-50 end position-absolute'>

      </div> */}
    </div>
  );
}

export default MapDisplay;