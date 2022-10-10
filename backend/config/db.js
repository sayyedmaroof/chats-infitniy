import mongoose from 'mongoose'

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to database!'.blue.bold))
    .catch(e => console.log("Couldn't connect to database!".red.bold))
}

export default connectDB
