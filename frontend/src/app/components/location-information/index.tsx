'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';


import MapDisplay from "../map-display"
import { Interface } from 'readline';

interface LocationInformationProps {
    address1: string;
    address2: string;
};
interface LocationInformationState {
    name: string;
    address: string;
    location: Location;
};

interface Location {
    lat: number;
    lng: number
}

const LocationInformation = ({address1, address2}: LocationInformationProps) => {
    const [locationDetails, setLocationDetails] = useState<LocationInformationState | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        function fetchAPI() {
            const url = process.env.REACT_APP_FLASK_API_URL + "/park"
            setIsLoading(true);
            axios.get(url, {
                params: {
                    address1: address1,
                    address2: address2
                }
            }).then(response => {
                if (response.status == 200) {
                    console.log(response.data.results)
                    setLocationDetails(response.data.results);
                    setIsLoading(false);
                }
                else {
                    console.log(response)
                }
            }).catch((error) => {
                if( error.response ){
                    console.log(error.response.data);
                }
            });
        }

        fetchAPI();
    }, [address1, address2]);
    
    function loaderDisplay() {
        return <h3>Loading...</h3>
    }

    var locationDisplay;
    if (locationDetails) {
        locationDisplay = (
            <>
                <div className="location-details">
                    <h3>{locationDetails.name}</h3>
                    <p>{locationDetails.address}</p>
                </div>
                <MapDisplay lat={locationDetails.location.lat} lng={locationDetails.location.lng}/>
            </>
        );
    }

    return(
        <div className='information mb-3 col-md-12 h-100'>
            <>
                {isLoading ? loaderDisplay() : locationDisplay}
            </>
        </div>
    );
}

export default LocationInformation;