const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = await promisify(jwt.verify)(token, 'sembanda@key')
    req.userId = decodedToken.id
    req.userEmail = decodedToken.email
    return next()
  } catch (error) {
    return res.json({ error: 'Token invalid' })
  }
}