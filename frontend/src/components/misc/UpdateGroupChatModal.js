import { ViewIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  useToast,
  Box,
  FormControl,
  Input,
  Spinner,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import UserBadgeItem from '../userAvatar/UserBadgeItem'
import UserListItem from '../userAvatar/UserListItem'

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState()
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)

  const toast = useToast()

  const { selectedChat, setSelectedChat, user } = ChatState()

  const handleRemove = async userToRemove => {
    if (
      selectedChat.groupAdmin._id !== user.user._id &&
      userToRemove._id !== user.user._id
    ) {
      toast({
        title: 'Only admins can remove users',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.put(
        '/api/chat/group/remove',
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      )

      userToRemove._id === user.user._id
        ? setSelectedChat()
        : setSelectedChat(data.updatedChat)
      setFetchAgain(!fetchAgain)
      setLoading(false)
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: err.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
    }
  }

  const handleAddUser = async userToAdd => {
    if (selectedChat.users.find(u => u._id === userToAdd._id)) {
      toast({
        title: 'User already added',
        status: 'warning',
        duration: '5000',
        isClosable: true,
        position: 'top',
      })
      return
    }

    if (selectedChat.groupAdmin._id !== user.user._id) {
      toast({
        title: 'Only admins can add new users',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.put(
        '/api/chat/group/add',
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      )

      setSelectedChat(data.updatedChat)
      setFetchAgain(!fetchAgain)
      setLoading(false)
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: err.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
    }
  }

  const handleRename = async () => {
    if (!groupChatName) return

    try {
      setRenameLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.put(
        '/api/chat/group',
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      )
      setSelectedChat(data.updatedChat)
      setFetchAgain(!fetchAgain)
      setRenameLoading(false)
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: err.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setRenameLoading(false)
    }
    setGroupChatName('')
  }

  const handleSearch = async query => {
    setSearch(query)
    if (!query) {
      return
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.get(`/api/user?search=${search}`, config)
      setLoading(false)
      setSearchResults(data.users)
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to load the search results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      })
      setLoading(false)
    }
  }

  return (
    <>
      <IconButton
        display={{ base: 'flex' }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center">
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100" display="flex" flexWrap="wrap">
              {selectedChat.users.map(u => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>

            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={e => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}>
                Update
              </Button>
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add users..."
                mb={1}
                onChange={e => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResults
                ?.slice(0, 4)
                .map(user => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleRemove(user.user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
