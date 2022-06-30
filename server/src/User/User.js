const mongoose = require('mongoose')
const {Schema, model} = mongoose

const UserSchema = new Schema({
    name: String,
    key: String,
    socket: String,
})

module.exports = model('User', UserSchema)