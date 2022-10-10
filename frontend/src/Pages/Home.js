import React from 'react'
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import Login from '../components/Login'
import Signup from '../components/Signup'

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p="3"
        bg="white"
        width="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px">
        <Text fontSize="4xl" fontFamily="Work Sans" color="black">
          Real Chat
        </Text>
      </Box>
      <Box bg="white" width="100%" p="4" borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" color="black" colorScheme="gray">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home
