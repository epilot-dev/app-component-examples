import { useState } from 'react'
import './App.css'
import { Button, Card, Input } from '@epilot/concorde-elements'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')
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
