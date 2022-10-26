import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../context/chatProvider'
import { getSender, getSenderDetails } from '../utils/chatLogics'
import ProfileModal from './misc/ProfileModal'
import UpdateGroupChatModal from './misc/UpdateGroupChatModal'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState()

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center">
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user.user, selectedChat.users)}
                <ProfileModal
                  user={getSenderDetails(user.user, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflow="hidden">
            {/* Messages here */}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a chat to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat
