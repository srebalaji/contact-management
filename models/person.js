/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const mongoose = require('mongoose')

const { Schema } = mongoose

// Helper function to validate email
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Helper function to validate contact number
function validateMobile(mobile) {
  if (String(mobile).length !== 10) return false
  const re = /^-?\d+\.?\d*$/
  return re.test(String(mobile).toLowerCase())
}
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
    return false
  }

  // Check for contact tag.
  if (this.tag !== 'personal' && this.tag !== 'work') {
    next(new Error('Tag is invalid'))
    return false
  }

  // Check if contact number is present for contact tag.
  if (this.type === 'mobile') {
    if (!this.mobile) {
      next(new Error('Contact number is not specified'))
      return false
    }
    if (!validateMobile(this.mobile)) {
      next(new Error('Contact number is not valid'))
    }
  }

  // Check if email is present for email tag. And validate email
  if (this.type === 'email') {
    if (!this.email) {
      next(new Error('Email is not specified'))
      return false
    }
    if (!validateEmail(this.email)) {
      next(new Error('Email is not valid'))
    }
  }
  next()
  return true
})


module.exports = person
