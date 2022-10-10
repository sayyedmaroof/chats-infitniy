import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const submintHandler = pics => {}

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
          focusBorderColor="gray"
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            placeholder="Enter your password"
            type={show ? 'text' : 'password'}
            onChange={e => setPassword(e.target.value)}
            focusBorderColor="gray"
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        width="100%"
        colorScheme="blue"
        style={{ marginTop: 15 }}
        onClick={submintHandler}>
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="gray"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail('guest@example.com')
          setPassword('123456')
        }}>
        Get guest user credentials
      </Button>
    </VStack>
  )
}

export default Login
