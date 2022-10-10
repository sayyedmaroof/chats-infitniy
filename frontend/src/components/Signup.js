import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import React, { useState } from 'react'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pic, setPic] = useState('')
  const [show, setShow] = useState(false)
  const [showConf, setShowConf] = useState(false)

  const postDetails = pics => {}

  const submintHandler = pics => {}

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={e => setName(e.target.value)}
          focusBorderColor="gray"
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
          focusBorderColor="gray"
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
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

      <FormControl id="password" isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Confirm password"
            type={showConf ? 'text' : 'password'}
            onChange={e => setConfirmPassword(e.target.value)}
            focusBorderColor="gray"
          />
          <InputRightElement>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowConf(!showConf)}>
              {showConf ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          focusBorderColor="gray"
          onChange={e => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="gray"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submintHandler}>
        Signup
      </Button>
    </VStack>
  )
}

export default Signup
