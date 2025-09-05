import { useCallback, useEffect, useMemo, useState } from "react";
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
  city: string
  countryCode: string
  houseNumber: string
  streetName: string
  zipCode: string
}

const BLOCK_ID = '490511c8-8efc-4173-a2db-b9a16b0c7c00'

export function App(props: AppProps<unknown>) {
  const [address, setAddress] = useState<Address | null>(null)

  const callback = useCallback((partialState: Address)  => {
    const safe = (partialState as any) ?? {}
    const { city, houseNumber, streetName, zipCode, countryCode } = safe as Partial<Address>

    if (city && houseNumber && streetName && zipCode) {
      setAddress({
        city,
        houseNumber,
        streetName,
        zipCode,
        countryCode: countryCode ?? ""
      })
    } else {
      setAddress(null)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = props.container.subscribe(BLOCK_ID, callback)

    return () => void unsubscribe()
  }, [props.container.subscribe, callback, props.container])

  const args = useMemo(() => {
    return props.container.args ? JSON.parse(props.container.args) : undefined
  }, [props.container.args])

  const center = useMemo(() => {
    const candidate = (args as any)?.default_city

    // String form: "lat,lng"
    if (typeof candidate === "string") {
      const parts = candidate.split(",").map(p => Number(p.trim()))
      if (parts.length === 2 && Number.isFinite(parts[0]) && Number.isFinite(parts[1])) {
        return [parts[0], parts[1]] as [number, number]
      }
    }

    return undefined
  }, [args])

  const addCoordsToMapping = useCallback((coords: [number, number] | null) => {
    props.container.setValue(JSON.stringify({ lat: coords?.[0], lng: coords?.[1] }))
  }, [args, props.container.setValue])

  return (
    <AddressMap center={center} street={address?.streetName} number={address?.houseNumber} city={address?.city} addCoordsToMapping={addCoordsToMapping} />
  );
}
