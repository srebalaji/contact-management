/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Contact = require('./contact')

const { Schema } = mongoose

const group = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Group name is mandatory'],
      unique: true,
      uniqueCaseInsensitive: true,
    },
    contacts: [
      { type: String, required: [true, 'Contacts must be present'] },
    ],
  },

)

// Group validations
group.pre('validate', async function (next) {
  // Check if contacts are present
  if (this.contacts.length === 0) {
    next(new Error('Contacts must be present'))
    return
  }

  const validIds = []
  // Check if the valid mongoid is passed
  for (let i = 0; i < this.contacts.length; i += 1) {
    if (!mongoose.Types.ObjectId.isValid(this.contacts[i])) {
      next(new Error('Invalid mongo ids'))
      return
    }
    validIds.push(this.contacts[i])
  }

  const contacts = await Contact.find({ _id: { $in: validIds } }, { _id: 1 })
  // Check if only the valid contact mongo ids are passed.
  if (contacts.length !== validIds.length) {
    next(new Error('Invalid mongo ids are passed'))
    return
  }

  next()
})

group.plugin(uniqueValidator, { message: 'Group name is already taken' })

module.exports = mongoose.model('group', group)
