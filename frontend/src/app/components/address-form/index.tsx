'use client'

import { FormEvent } from "react";

const AddressForm = (props: { handleSubmit: (event: FormEvent<HTMLFormElement>) => void; }) => {
    
    return(
        <form className='mb-3' onSubmit={(event) => props.handleSubmit(event)}>
            <div className='row'>
                <div className="col-md-5">
                    <label htmlFor="address1">First address</label>
                </div>
                <div className="col-md-5">
                    <label htmlFor="address2">Second address</label>
                </div>
                <div className=" col-md-2 w=100">
                    <div></div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-5">
                    <input type="text" className="form-control" id="address1" aria-describedby="address1Input" placeholder="Enter address here"/>
                </div>
                <div className=" col-md-5">
                    <input type="text" className="form-control" id="address2" aria-describedby="address2Input" placeholder="Enter address here"/>
                </div>
                <div className=" col-md-2">
                    <input type="submit" className="btn btn-primary mb-2 text-black" value="Submit"/>
                </div>
            </div>
        </form>
    );
};

export default AddressForm;