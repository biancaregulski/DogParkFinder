

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useMemo } from "react";

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

const Map = () => {
    // const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    // if (api_key === undefined) {
    //     throw new Error("Could not access Google Maps.");
    // }

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: api_key
    // })

    // const [map, setMap] = React.useState(null)

    // const onLoad = React.useCallback(function callback(map: React.SetStateAction<null>) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     // if (!bounds.isEmpty() && map) {
    //     //     map.fitBounds(bounds);
    //     // }
    
    //     setMap(map)
    // }, [])
    

    // const onUnmount = React.useCallback(function callback(map: any) {
    //     setMap(null)
    // }, [])
    
    // return isLoaded ? (
    //     <GoogleMap
    //     mapContainerStyle={containerStyle}
    //     center={center}
    //     zoom={10}
    //     onLoad={onLoad}
    //     onUnmount={onUnmount}
    //     >
    //     { /* Child components, such as markers, info windows, etc. */ }
    //     <></>
    //         </GoogleMap>
    // ) : <></>
    return(<></>)
}
    
    export default React.memo(Map)