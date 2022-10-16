import Chat from '../models/Chat.js'
import User from '../models/User.js'

export const accessChat = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    console.log('User id param is not sent in the request body')
    return res.sendStatus(400)
  }

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate('users')
      .populate('latestMessage')

    isChat = await User.populate(isChat, {
      path: 'latestMessage.sender',
      select: 'name pic email',
    })

    if (isChat.length > 0) {
      res.status(200).json({ success: true, fullChat: isChat[0] })
    } else {
      let chatData = {
        chatName: 'sender',
        isGroupChat: false,
        users: [req.user._id, userId],
      }

      const createdChat = await Chat.create(chatData)

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        'users',
        '-password'
      )
      res.status(201).json({ success: true, fullChat })
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export const fetchChats = async (req, res) => {
  try {
    await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users')
      .populate('groupAdmin')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async results => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'name pic email',
        })
        res.json({ success: true, chats: results })
      })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export const createGroupChat = async (req, res) => {
  try {
    if (!req.body.users || !req.body.name) {
      throw new Error('please fill all the fields')
    }

    const users = JSON.parse(req.body.users)
    if (users.length < 2) {
      throw new Error('More than two users are required to form a group chat')
    }

    users.push(req.user)

    const groupChat = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    })

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users')
      .populate('groupAdmin')

    res.json({ success: true, fullGroupChat })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate('users')
      .populate('groupAdmin')

    if (!updatedChat) {
      return res.status(404).json({ success: false, error: 'Chat not found' })
    }
    res.json({ success: true, message: 'chat renamed', updatedChat })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body

    const added = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate('users')
      .populate('groupAdmin')

    if (!added) {
      return res.status(404).json({ success: false, error: 'Chat not found' })
    }
    res.json({ success: true, message: 'User Added', updatedChat: added })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body

    const removed = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate('users')
      .populate('groupAdmin')

    if (!removed) {
      return res.status(404).json({ success: false, error: 'Chat not found' })
    }
    res.json({ success: true, message: 'User removed', updatedChat: removed })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
