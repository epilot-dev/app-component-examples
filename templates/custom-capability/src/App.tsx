import { useState } from 'react'
import { Grid, Card, Button, Label, Badge, Box, Checkbox, Heading, Text, TextField, Tooltip, Flex } from '@epilot/core-ui'

import './App.css'

function App() {
  const [checked, setChecked] = useState(false)
  const [name, setName] = useState('')
  const [counter, setCounter] = useState(0)

  return (
    <Box p="6">
      <Heading as="h2" mb="4">
        <Flex align="center" gap="2">
          <span>epilot Core UI Demo</span>
          <Badge color="blue">v1.0</Badge>
        </Flex>
      </Heading>
      <Grid columns="2" gap="6">
        {/* Profile Card */}
        <Card>
          <Flex direction="column" gap="3">
            <Heading as="h3">Profile</Heading>
            <Text>Name: <b>{name || 'Anonymous'}</b></Text>
            <Text>Status: <Badge color={checked ? 'green' : 'gray'}>{checked ? 'Active' : 'Inactive'}</Badge></Text>
            <Tooltip content="Toggle your status">
              <Flex align="center" gap="2">
                <Checkbox checked={checked} onCheckedChange={(c) => setChecked(c.valueOf() as boolean)} id="status-check" />
                <Label htmlFor="status-check">Active</Label>
              </Flex>
            </Tooltip>
          </Flex>
        </Card>
        {/* Settings Form */}
        <Card>
          <Flex direction="column" gap="3">
            <Heading as="h3">Settings</Heading>
            <Label htmlFor="name-input">Your Name</Label>
            <TextField
              id="name-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <Button onClick={() => setCounter(c => c + 1)}>
              Increment Counter <Badge color="green">{counter}</Badge>
            </Button>
          </Flex>
        </Card>
      </Grid>
      <Box mt="6">
        <Flex align="center" gap="2">
          <Text>Try toggling your status, changing your name, or incrementing the counter!</Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default App
