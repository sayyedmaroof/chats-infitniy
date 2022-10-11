import Chat from '../models/Chat'

const accessChat = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    console.log('User id param is not sent in the request body')
    return res.sendStatus(400)
  }
}
