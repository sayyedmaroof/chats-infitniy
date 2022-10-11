import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import React, { useState } from 'react'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pic, setPic] = useState('')
  const [show, setShow] = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const toast = useToast()

  const postDetails = pics => {
    setLoading(true)
    if (pics === undefined) {
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setLoading(false)
      return
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'real-chat')
      data.append('cloud_name', 'djmkpcbtg')
      fetch(`https://api.cloudinary.com/v1_1/djmkpcbtg/image/upload`, {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setPic(data.url.toString())
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    } else {
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setLoading(false)
    }
  }

  const submintHandler = async pics => {
    setLoading(true)
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please Fill All the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setLoading(false)
      return
    }
    if (password !== confirmPassword) {
      toast({
        title: 'passwords does not match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setLoading(false)
      return
    }

    try {
      const { data } = await axios.post('/api/user/register', {
        name,
        email,
        password,
        pic,
      })
      toast({
        title: 'Registration Sucessful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      localStorage.setItem('chatApp-userInfo', JSON.stringify(data))
      setLoading(false)
      navigate('/chat')
    } catch (err) {
      const errorMessage = err.response.data.error || 'Registration Failed'
      toast({
        title: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setLoading(false)
    }
  }

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
        onClick={submintHandler}
        isLoading={loading}>
        Signup
      </Button>
    </VStack>
  )
}

export default Signup
