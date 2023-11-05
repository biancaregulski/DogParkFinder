'use client'

import React from 'react';
import axios from 'axios';


type LocationInformationProps = {
    address1: string;
    address2: string;
};
type LocationInformationState = {
    parkAddress: string;
};

class LocationInformation extends React.Component<LocationInformationProps, LocationInformationState> {
    tick(newAddress: string) {
        this.setState({
            parkAddress: newAddress
        });
    }

    componentDidMount() {
        this.fetchAPI();
    }
      
    fetchAPI() {
        console.log('fetch api')
        console.log(process.env.REACT_APP_FLASK_API_URL);
        const url = process.env.REACT_APP_FLASK_API_URL + "/health"
        axios.get(url)
            .then(response => console.log(response.data))
    }
    render() {
        return(
            <div className='information'>
                <p>test</p>
            </div>
        );
    }
}

export default LocationInformation;