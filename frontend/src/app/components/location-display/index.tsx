'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';


import MapDisplay from "../map-display"

interface LocationDisplayProps {
    address1: string;
    address2: string;
};

export interface LocationInformation {
    id: string;
    name: string;
    address: string;
    location: Coordinate;
};

export interface Coordinate {
    lat: number;
    lng: number
}

const LocationDisplay = ({address1, address2}: LocationDisplayProps) => {
    const [parksInformation, setLocationDetails] = useState<Array<LocationInformation> | []>([])
    const [address1Information, setAddress1Information] = useState<LocationInformation | null>(null);
    const [address2Information, setAddress2Information] = useState<LocationInformation | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        function fetchAPI() {
            const url = process.env.REACT_APP_FLASK_API_URL + "/parks"
            setIsLoading(true);
            axios.get(url, {
                params: {
                    address1: address1,
                    address2: address2
                }
            }).then(response => {
                if (response.status == 200) {
                    console.log(response.data.results)
                    let park_results = response.data.results;
                    setAddress1Information(park_results.address1);
                    setAddress2Information(park_results.address2);
                    setLocationDetails(park_results.parks);
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
        return (
            <div className='w-100 h-50'>
                <h3>Loading...</h3>
            </div>
        );
    }

    var locationContainer;
    if (parksInformation && address1Information && address2Information) {
        locationContainer = (
            <>
                <MapDisplay address1Information={address1Information} address2Information={address2Information} parksInformation={parksInformation}/>
            </>
        );
    }

    return(
        <div className='information mb-3 h-100'>
            <>
                {isLoading ? loaderDisplay() : locationContainer}
            </>
        </div>
    );
}

export default LocationDisplay;