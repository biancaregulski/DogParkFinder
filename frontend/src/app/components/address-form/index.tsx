'use client'
const AddressForm = () => {

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(`The name you entered was: ${address1}`)
        return true
    }
    
    return(
        <form className='mb-3' onSubmit={handleSubmit}>
            <div className='row'>
                <div className="col-md-5">
                    <label htmlFor="address1">First address</label>
                </div>
                <div className="col-md-offset-1  col-md-5">
                    <label htmlFor="address2">Second address</label>
                </div>
                <div className=" col-md-1">
                    <div></div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-5">
                    <input type="text" className="form-control" id="address1" aria-describedby="address1Input" placeholder="Enter address here"/>
                </div>
                <div className="col-md-offset-1  col-md-5">
                    <input type="text" className="form-control" id="address2" aria-describedby="address2Input" placeholder="Enter address here"/>
                </div>
                <div className=" col-md-1">
                    <input type="submit" className="btn btn-primary mb-2 text-black" value="Submit"/>
                </div>
            </div>
        </form>
    );
};

export default AddressForm;