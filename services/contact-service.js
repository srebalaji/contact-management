const Contact = require('../models/contact')

// List all contacts
const list = async () => {
  const contacts = Contact.find({}).sort({ createdAt: -1 })
  return contacts
}

// Create contact
const create = async (req) => {
  const contact = new Contact(req.body)
  try {
    return await contact.save()
  } catch (e) {
    if (e.name === 'ValidationError' && e.message) {
      throw new Error(e.message)
    }
    throw new Error('Error in creating contact.')
  }
}

// Update contact
const update = async (req) => {
  if (req.params.id) {
    try {
      return Contact.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { runValidators: true, context: 'query', new: true },
      )
    } catch (e) {
      if (e.name === 'ValidationError' && e.message) {
        throw new Error(e.message)
      }
      throw new Error('Error in updating contact.')
    }
  }
  throw new Error('No contact id specified.')
}

// Delete a contact
const deleteContact = async (req) => {
  if (req.params.id) {
    try {
      return Contact.findOneAndRemove({ _id: req.params.id })
    } catch (e) {
      if (e.name === 'ValidationError' && e.message) {
        throw new Error(e.message)
      }
      throw new Error('Error in updating contact.')
    }
  }
  throw new Error('No contact id specified')
}

module.exports = {
  create,
  list,
  update,
  deleteContact,
}
