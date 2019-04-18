/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const mongoose = require('mongoose')

const { Schema } = mongoose

const person = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Contact type is mandatory'],
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
    tag: {
      type: String,
      required: [true, 'Contact tag is mandatory'],
    },
  },
)

person.pre('validate', function (next) {
  if (this.type !== 'mobile' && this.type !== 'email') {
    next(new Error('Type is invalid'))
  }
  if (this.type === 'mobile') {

  }
  // next(new Error('Error from person validation'))
  next()
})

module.exports = person
