const Group = require('../models/group')

const list = async () => {
  const groups = await Group.find({})
  return groups
}

const create = async (req) => {
  const group = new Group(req.body)
  try {
    return group.save()
  } catch (e) {
    if (e.name === 'ValidationError' && e.message) {
      throw new Error(e.message)
    }
    throw new Error('Error in creating contact group.')
  }
}

const update = async (req) => {
  if (req.params.id) {
    try {
      // Update in Mongoose got a bug. So using findById and save.
      // Refer https://github.com/Automattic/mongoose/issues/5234 and
      // https://github.com/Automattic/mongoose/issues/5269
      const doc = await Group.findById({ _id: req.params.id })
      if (req.body.name) {
        doc.name = req.body.name
      }
      if (req.body.contacts) {
        doc.contacts = req.body.contacts
      }
      return doc.save()
    } catch (e) {
      if (e.name === 'ValidationError' && e.message) {
        throw new Error(e.message)
      }
      throw new Error('Error in updating contact group.')
    }
  }
  throw new Error('No group id specified')
}

const deleteGroup = async (req) => {
  if (req.params.id) {
    try {
      return Group.findOneAndRemove({ _id: req.params.id })
    } catch (e) {
      if (e.name === 'ValidationError' && e.message) {
        throw new Error(e.message)
      }
      throw new Error('Error in deleting group')
    }
  }
  throw new Error('No group id specified')
}

module.exports = {
  list,
  create,
  update,
  deleteGroup,
}
