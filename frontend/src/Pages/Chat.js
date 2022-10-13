import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ChatBox from '../components/misc/ChatBox'
import MyChats from '../components/misc/MyChats'
import SideDrawer from '../components/misc/SideDrawer'
import { ChatState } from '../context/chatProvider'

const Chat = () => {
  const { user } = ChatState()
  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default Chat
