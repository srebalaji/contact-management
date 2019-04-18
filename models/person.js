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
  // Check for contact type.
  if (this.type !== 'mobile' && this.type !== 'email') {
    next(new Error('Type is invalid'))
  }

  // Check for contact tag.
  if (this.tag !== 'personal' && this.tag !== 'work') {
    next(new Error('Tag is invalid'))
  }

  // Check if contact number is present for contact tag.
  if (this.type === 'mobile') {
    if (!this.mobile) {
      next(new Error('Contact number is not specified'))
    }
  }

  // Check if email is present for email tag.
  if (this.type === 'email') {
    if (!this.email) {
      next(new Error('Email is not specified'))
    }
  }
  next()
})

module.exports = person
