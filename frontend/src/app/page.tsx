import AddressForm from "./components/address-form"
import LocationInformation from "./components/location-information"

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <p>Tell us two addresses and we&apos;ll return the closest dog parks in between them.</p>
        <div className='py-10 px-20'>
          <AddressForm/>
          <LocationInformation address1="South Station, Boston MA" address2="Porter Square, Cambridge MA"/>
        </div>
        <div className="w-full h-screen"></div>
        <p>
          Lorem Ipsum is simply dummy text ...
        </p>
      </div>
    </>
  );
}
