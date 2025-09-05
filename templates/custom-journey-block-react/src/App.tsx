import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Button, Card, Input } from '@epilot/concorde-elements'

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
    subscribe: (blockId: string, fn: (blockState: unknown) => void) => () => void
  }
}


 
function App(props: AppProps<unknown>) {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')

  const callback = useCallback((partialState: unknown)  => {
    console.log("🚀 ~ App ~ block state has changed:", partialState)
  }, [])

  useEffect(() => {
    const unsubscribe = props.container.subscribe('fd053889-a340-42f8-89b2-e5c842a7c047', callback)

    return () => void unsubscribe()
  }, [props.container.subscribe, callback, props.container])

  return (
    <div className='container'>
      <Card>
        <h1>Custom Journey Block Product Demo</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Button variant='primary' onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>

          <span>Check the <a target='_blank' href="https://docs.epilot.io/apps/building-apps/components/custom-journey-block">documentation</a> for more information.</span>
        </div>


        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <Input
            helperText=""
            id="test-id"
            label="Default"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter anything..."
            value={value}
            variant="filled"
          />
        </div>
      </Card>
    </div>
  )
}

export default App
