const responseHandle = cb => (req, res) => {
  if (!cb) {
    return res.status(400).send({
      success: false,
      error: 'Something went wrong',
    })
  }
  Promise.resolve(cb(req, res))
    .then((response) => {
      const output = {
        success: true,
        data: response,
      }
      return res.status(200).send(output)
    })
    .catch((err) => {
      const output = {
        success: false,
        error: err.toString(),
      }
      return res.status(400).send(output)
    })
}

module.exports = responseHandle
