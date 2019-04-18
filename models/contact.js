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

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact name is mandatory'],
    },
    contacts: [
      person,
    ],
  },
  { timestamps: true },
)


module.exports = mongoose.model('contact', contact)
