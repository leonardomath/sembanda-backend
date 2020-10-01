const Sequelize = require('sequelize')
const { Model } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      city: Sequelize.STRING,
      instrument: Sequelize.STRING,
      avatar_url: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3333/files/${this.avatar_url}`
        }
      }
    }, 
    {
      sequelize,
    })

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })
    return this
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }

}

module.exports = User