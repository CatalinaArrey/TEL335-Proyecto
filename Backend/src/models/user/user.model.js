import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        phone: String
    }
)

module.exports = mongoose.model('User', userSchema)