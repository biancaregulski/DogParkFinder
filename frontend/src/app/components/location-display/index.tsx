'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Wrapper } from "@googlemaps/react-wrapper"

import MapDisplay from "../map-display"

interface LocationDisplayProps {
    address1: string;
    address2: string;
    transportation: string;
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

const LocationDisplay = ({address1, address2, transportation}: LocationDisplayProps) => {
    const [parksInformation, setLocationDetails] = useState<Array<LocationInformation> | []>([])
    const [address1Information, setAddress1Information] = useState<LocationInformation | null>(null);
    const [address2Information, setAddress2Information] = useState<LocationInformation | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        function fetchAPI() {
            const url = process.env.REACT_APP_FLASK_API_URL + "/parks"
            setIsLoading(true);
            axios.get(url, {
                params: {
                    address1: address1,
                    address2: address2,
                    transportation: transportation
                }
            }).then(response => {
                if (response.status == 200) {
                    let park_results = response.data.results;
                    if (park_results.parks.length > 0) {
                        setErrorMessage("")
                        setAddress1Information(park_results.address1);
                        setAddress2Information(park_results.address2);
                        setLocationDetails(park_results.parks);
                    }
                    else {
                        setErrorMessage("No parks found.")
                    }
                    setIsLoading(false);
                }
                else {
                    console.log(response.data)
                    setErrorMessage("An error occurred.")
                    setIsLoading(false);
                }
            }).catch((error) => {
                console.log(error.response)
                if (error.response.data.status_code == "address_not_found") {
                    setErrorMessage("Error: One or more addresses could not be found.")
                    setIsLoading(false);
                }
                else if (error.response.data.status_code == "directions_not_found") {
                    setErrorMessage("Error: Could not find path between two addresses.")
                    setIsLoading(false);
                }
                else{
                    setErrorMessage("An error occurred.")
                    setIsLoading(false);
                }
            });
        }

        fetchAPI();
        console.log('fetched');
    }, [address1, address2, transportation]);
    
    function loaderDisplay(text: string) {
        return (
            <div className='w-100 h-50 p-4'>
                <h3>{text}</h3>
            </div>
        );
    }

    var locationContainer;
    if (errorMessage) {
        locationContainer = (loaderDisplay(errorMessage))
    }
    else if (parksInformation && address1Information && address2Information) {
        locationContainer = (
            <>
                <Wrapper apiKey= {process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string }>
                    <MapDisplay address1Information={address1Information} address2Information={address2Information} parksInformation={parksInformation}/>
                </Wrapper>
            </>
        );
    }

    return(
        <div className='information mb-3 h-100'>
            <>
                {isLoading ? loaderDisplay("Loading...") : locationContainer}
            </>
        </div>
    );
}

export default LocationDisplay;