import {APIProvider, Map, Pin, AdvancedMarker, useAdvancedMarkerRef, InfoWindow} from '@vis.gl/react-google-maps';

import { LocationInformation } from "../location-display"
import { useState } from 'react';
import React from 'react';

interface MapDisplayProps {
  address1Information: LocationInformation;
  address2Information: LocationInformation;
  parksInformation: Array<LocationInformation>;
};

const MapDisplay = ({address1Information, address2Information, parksInformation}: MapDisplayProps) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
  const position = {lat: parksInformation[0].location.lat, lng: parksInformation[0].location.lng};

  var markerRefs: (React.Ref<google.maps.marker.AdvancedMarkerElement> | undefined)[] = [];
  var markers: (google.maps.marker.AdvancedMarkerElement | null | undefined)[] = [];
  const [infowindowShown, setInfowindowShown] = useState(-1);


  // create marker references for each park and the two address markers
  for (let i = 0; i < parksInformation.length + 2; i++) {
    [markerRefs[i], markers[i]] = useAdvancedMarkerRef()
  }

  const toggleInfoWindow = (i: number) => {
    setInfowindowShown(i);
  }
  
  function markerWithWindow(locationInfo: LocationInformation, index: number, isPark: boolean) {
    return(
      <>
        <AdvancedMarker zIndex={index + 1} position={locationInfo.location} onClick={() => toggleInfoWindow(index)} ref={markerRefs[index]} >
          {isPark ?
            <Pin background={"var(--highlight)"} glyph={(index + 1).toString()} glyphColor={'#000'} borderColor={'#000'} /> :
            <Pin background={"var(--midlight)"} glyphColor={'#000'} borderColor={'#000'} />
          }
        </AdvancedMarker>
        { infowindowShown == index && (
          <InfoWindow anchor = {markers[index]} onCloseClick={() => toggleInfoWindow(-1)}>
            <b><h5>{locationInfo.name}</h5></b>
            <p>{locationInfo.address}</p>
            <a className ="google-maps-link" target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${locationInfo.name ?? locationInfo.address}&query_place_id=${locationInfo.id}`}>View on Google Maps</a>
          </InfoWindow> 
        )};
      </>
    );
  }

  var parkMarkersWithWindows = (
    parksInformation.map((locationInfo, i) => {
      return markerWithWindow(locationInfo, i, true);
    })
  )

  var addressMarkersWithWindows = (
    [address1Information, address2Information].map((locationInfo, i) => {
      // indexes for address markers should be after indexes for park markers
      return markerWithWindow(locationInfo, i + parksInformation.length, false)
    })
  )

  var listOfParks = (
    parksInformation.map((park, i) => {
      return (
        <div 
          className="park-item inline-flex"
          id={infowindowShown == i ? "park-item-selected" : ""}
          onClick={() => toggleInfoWindow(i)}
        >
          <div className='mr-3'>
            <h3>{(i + 1).toString() + '.'}</h3>
          </div>
          <div>
            <h4>{park.name}</h4>
            <p>{park.address}</p>
          </div>
        </div>
      );
    })
  );

  var googleMapDisplay = (
    <div className='inline-flex w-100 h-100'>
      <div className='w-50 h-100'>
          <APIProvider apiKey={googleMapsApiKey}>
            <Map center={position} zoom={10} disableDefaultUI={false} mapId={'123'}>
              {parkMarkersWithWindows}
              {addressMarkersWithWindows}
            </Map>
          </APIProvider>
      </div>
      <div className='w-50 h-100'>
          <div className="location-details">
            <h3 className='park-item-title'>Parks:</h3>
              {listOfParks}
          </div>
      </div>
    </div>
  );

  var invalidDisplay = (
    <div className='p-2'>
      <p>Could not connect to Google Maps.</p>
    </div>
  );

  return (
    <div className='w-100 maps-wrapper'>
      { googleMapsApiKey ? googleMapDisplay : invalidDisplay }
    </div>
  );
}

export default MapDisplay;