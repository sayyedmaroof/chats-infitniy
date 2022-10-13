import User from '../models/User.js'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body

    if (!name || !email || !password) {
      throw new Error('please fill all the fields')
    }

    const user = new User({ name, email, password, pic })
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ success: true, user, token })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new Error('please fill all the fields')
    }
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).json({ success: true, user, token })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export const allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
    res.json({ success: true, users })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
