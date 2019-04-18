const Contact = require('../models/contact')

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

module.exports = {
  create,
}
