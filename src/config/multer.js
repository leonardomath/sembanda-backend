const multer = require('multer')
const crypto = require('crypto')
const { resolve } = require('path')
const { extname } = require('path')


module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(15, (error, res) => {
        if (error) return cb(error)

        return cb(null, res.toString('hex') + extname(file.originalname))
      })
    }
  })
}