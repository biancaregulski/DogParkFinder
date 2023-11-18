"use client"

import { FormEvent, useState } from "react";
import AddressForm from "./components/address-form"
import LocationInformation from "./components/location-information"
import MapDisplay from "./components/map-display"

interface FormElements extends HTMLFormControlsCollection {
  address1: HTMLInputElement
  address2: HTMLInputElement
}

// type FormElements<U extends string> = HTMLFormControlsCollection & Record<U, HTMLInputElement>


export default function Home() {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [parkLocation, setParkLocation] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const elements = event.currentTarget.elements as FormElements<"id" | "name" | "type" | "amount">
    const elements = event.currentTarget.elements as FormElements


    event.preventDefault();
    // const elements = event.currentTarget.elements as FormElements;
    setAddress1(elements.address1.value)
    setAddress2(elements.address2.value)
  }

  return (
    <>
      <div className=" px-20 mx-20 py-10 h-100">
        <div className="pb-4">
          <p>Tell us two addresses and we&apos;ll return the closest dog parks in between them.</p>
        </div>
        <AddressForm handleSubmit={handleSubmit}/>
        { (address1 && address2) && <LocationInformation address1={address1} address2 = {address2} /> }
        <MapDisplay />
        <div className="w-full h-screen"></div>
      </div>
    </>
  );
}
