import { CloseIcon } from '@chakra-ui/icons'
import { Tag, TagLabel, TagRightIcon } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Tag
      size="md"
      variant="subtle"
      colorScheme="purple"
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      fontSize={12}
      cursor="pointer"
      onClick={handleFunction}>
      <TagLabel>{user.name}</TagLabel>
      <TagRightIcon boxSize="12px" as={CloseIcon} />
    </Tag>
  )
}

export default UserBadgeItem
