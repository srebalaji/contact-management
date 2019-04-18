
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const person = require('./person')

const { Schema } = mongoose


const contact = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, 'Contact name is mandatory'],
      unique: true,
    },
    details: [
      person,
    ],
  },
  { timestamps: true },
)


contact.plugin(uniqueValidator, { message: 'Contact name is already taken' })

module.exports = mongoose.model('contact', contact)
