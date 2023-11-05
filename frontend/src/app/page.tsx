import AddressForm from "./components/address-form"

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <h3>Give us two addresses and we'll return the closest parks in between them.</h3>
        <AddressForm/>
        <div className="w-full h-screen"></div>
        <p>
          Lorem Ipsum is simply dummy text ...
        </p>
      </div>
    </>
  );
}
