'use client'

import { FormEvent, SetStateAction, useState } from "react";

import { Transportation } from "../../transportation";

const AddressForm = (props: { handleSubmit: (event: FormEvent<HTMLFormElement>) => void; }) => {
    const [transportationOpen, setTransportationOpen] = useState(false);
    const [transportationMode, setTransportationMode] = useState(Transportation.DRIVING)

    const handleTransportationOpen = () => {
        setTransportationOpen(!transportationOpen);
    };

    const handleTransportationChange = (e: { target: { value: Transportation | string; }; }) => {
        setTransportationMode(e.target.value as Transportation);
    };

    return(
        <form className='mb-3' onSubmit={(event) => props.handleSubmit(event)}>
            <div className='d-flex flex-row'>
                <div className="flex-column flex-fill mr-4">
                    <label htmlFor="address1">First address</label>
                    <input type="text" className="form-control" id="address1" aria-describedby="address1Input" placeholder="Enter address here" required/>
                </div>
                <div className="flex-column flex-fill mr-4">
                    <label htmlFor="address2">Second address</label>
                    <input type="text" className="form-control" id="address2" aria-describedby="address2Input" placeholder="Enter address here" required/>
                </div>
                <div className="flex-column flex-fill mr-4">
                    <label htmlFor="mode">Mode</label>
                    <div className="form-control mb-0 w-100" onClick={handleTransportationOpen}>
                        <select
                            id="transportation"
                            name="transportation"
                            value={transportationMode}
                            onChange={handleTransportationChange}
                            className="w-100"
                            >
                            <option value={Transportation.DRIVING}>Driving</option>
                            <option value={Transportation.WALKING}>Walking</option>
                            <option value={Transportation.BIKING}>Biking</option>
                            <option value={Transportation.TRANSIT}>Public Transit</option>
                        </select>
                    </div>
                </div>
                <div className="flex-column align-self-end">
                    <input type="submit" className="btn btn-primary mb-0 submit-button" value="Submit"/>
                </div>
            </div>
        </form>
    );
};

export default AddressForm;