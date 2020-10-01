const User = require('../models/User')
const { Op } = require('sequelize')

class UsersController {
  async index(req, res) {
    const id = req.userId
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: id
        }
      }
    })
    return res.json(users)
  }

  async show(req, res) {
    const { searchUser } = req.body;
    const email = req.userEmail;
    const name = searchUser.toLowerCase()

    const user = await User.findAll({
      where: {
        name: { [Op.startsWith]: name },
        email: { [Op.notLike]: email },
      },
    });

    return res.json(user)
  }
}

module.exports = new UsersController()