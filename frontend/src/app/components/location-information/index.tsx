'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';


type LocationInformationProps = {
    address1: string;
    address2: string;
};
type LocationInformationState = {
    name: string;
    address: string;
    location: {}
};

const LocationInformation = ({address1, address2}: LocationInformationProps) => {
    const [locationDetails, setLocationDetails] = useState<LocationInformationState | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        function fetchAPI() {
            const url = process.env.REACT_APP_FLASK_API_URL + "/park"
            console.log(url)
            setIsLoading(true);
            axios.get(url, {
                params: {
                    address1: address1,
                    address2: address2
                }
            }).then(response => {
                if (response.status == 200) {
                    setLocationDetails(response.data.results);
                    setIsLoading(false);
                }
                else {
                    console.log(response)
                }
            }).catch((error) => {
                if( error.response ){
                    console.log(error.response.data); // => the response payload 
                }
            });
        }

        fetchAPI();
    }, [address1, address2]);
    
    function loaderDisplay() {
        return <h3>Loading...</h3>
    }

    var locationText;
    if (locationDetails) {
        locationText = (
            <>
                <h3>{locationDetails.name}</h3>
                <p>{locationDetails.address}</p>
            </>
        );
    }
    else {
        locationText = <p>Loading...</p>
    }

    return(
        <div className='information mb-3 col-md-12'>
            <>{isLoading ? loaderDisplay() : locationText}</>
        </div>
    );
}

export default LocationInformation;