const mongoose = require('mongoose')
const {Schema, model} = mongoose

const issueSchema = new Schema({
    title: String,
    points: [{user: {type: Schema.Types.ObjectId, ref: 'User'}, point: Number}]
})

module.exports = model('Issue', issueSchema)