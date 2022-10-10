import User from '../models/User'

const registerUser = async () => {
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
