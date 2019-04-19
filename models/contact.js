/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const person = require('./person')

const { Schema } = mongoose


const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact name is mandatory'],
      unique: true,
      uniqueCaseInsensitive: true,
    },
    details: {
      type: [person],
      required: [true, 'Contact details are mandatory'],
    },
  },
  { timestamps: true },
)

// Validate if contact details are present
contact.pre('validate', function (next) {
  if (this.details.length === 0) {
    next(new Error('Contact details are mandatory'))
    return false
  }
  next()
  return true
})
contact.plugin(uniqueValidator, { message: 'Contact name is already taken' })

module.exports = mongoose.model('contact', contact)
