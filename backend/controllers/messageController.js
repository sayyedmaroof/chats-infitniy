import Chat from '../models/Chat.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body

  if (!content || !chatId) {
    throw new Error('please fill all the fields')
  }

  const newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  }

  try {
    let message = await Message.create(newMessage)
    message = await message.populate('sender', 'name pic')
    message = await message.populate('chat')
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    })

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    })

    res.json({ success: true, message })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat')

    res.json({ success: true, messages })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
