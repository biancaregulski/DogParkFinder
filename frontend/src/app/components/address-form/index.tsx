'use client'

import { FormEvent } from "react";

const AddressForm = (props: { handleSubmit: (event: FormEvent<HTMLFormElement>) => void; }) => {
    
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
                <div className="flex-column align-self-end">
                    <input type="submit" className="btn btn-primary mb-0 text-black" value="Submit"/>
                </div>
            </div>
        </form>
    );
};

export default AddressForm;