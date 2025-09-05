import { useCallback, useEffect, useState } from "react";
import { AddressMap } from "./Map";

type AppProps<T> = {
  container: {
    /**
     * a call back function to set the value of the custom block
     */
    setValue: React.Dispatch<T>
    /**
     * the value of the custom block
     */
    value?: T
    /**
     * Stringified theme json object.
     */
    theme?: string
    /**
     * any errors that the block might have. ex. value is required
     */
    errors?: string
    /**
     * if the block is required or not
     * it is up to the implementer to display it in a good way
     */
    required?: boolean
    /**
     * extra arguments that the implementer might need which the configuring user has added them in the Journey Builder
     */
    args?: string
    /**
     * Allow listening to state changes for the given block.
     * 
     * @returns unsubscribe function
     */
    subscribe: (blockId: string, fn: (blockState: Address) => void) => () => void
  }
}

type Address = {
  _isValid: boolean
  city: string
  countryCode: string
  houseNumber: string
  streetName: string
  zipCode: string
}

const BLOCK_ID = '490511c8-8efc-4173-a2db-b9a16b0c7c00'

export function App(props: AppProps<Address>) {
  const [address, setAddress] = useState<Address | null>(null)

  const callback = useCallback((partialState: Address)  => {
    if(!partialState._isValid) return;
    
    if(partialState.city && partialState.houseNumber && partialState.streetName && partialState.zipCode) {
      setAddress({
        city: partialState.city,
        houseNumber: partialState.houseNumber,
        streetName: partialState.streetName,
        zipCode: partialState.zipCode,
        _isValid: partialState._isValid,
        countryCode: partialState.countryCode
      })
    }
  }, [])

  useEffect(() => {
    const unsubscribe = props.container.subscribe(BLOCK_ID, callback)

    return () => void unsubscribe()
  }, [props.container.subscribe, callback, props.container])

  return (
    <AddressMap street={address?.streetName} number={address?.houseNumber} city={address?.city} />
  );
}
