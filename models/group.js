const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const contact = require('./contact')


const { Schema } = mongoose

const group = new Schema(
  {
    name: {
      String,
      required: [true, 'Group name is mandatory'],
      lowercase: true,
      unique: true,
    },
    contacts: [
      { type: String },
    ],
  },

)

group.plugin(uniqueValidator, { message: 'Group name is already taken' })

module.exports = mongoose.model('group', group)
