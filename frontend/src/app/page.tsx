import AddressForm from "./components/address-form"
import LocationInformation from "./components/location-information"

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <p>Tell us two addresses and we&apos;ll return the closest dog parks in between them.</p>
        <AddressForm/>
        <LocationInformation address1="123 Main St" address2="6 Apple St"/>
        
        <div className="w-full h-screen"></div>
        <p>
          Lorem Ipsum is simply dummy text ...
        </p>
      </div>
    </>
  );
}
