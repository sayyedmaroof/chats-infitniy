import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Chat = () => {
  const [chats, setChats] = useState([])
  const fetchChats = async () => {
    try {
      const { data } = await axios.get('/api/chat')
      setChats(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <div>
      {chats.map(({ chatName, _id }) => (
        <div key={_id}>{chatName}</div>
      ))}
    </div>
  )
}

export default Chat
