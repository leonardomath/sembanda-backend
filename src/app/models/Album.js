const Sequelize = require('sequelize')
const { Model } = require('sequelize')

class Album extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      band: Sequelize.STRING,
      avatar_url: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3333/files/${this.avatar_url}`
        }
      }
    }, {
      sequelize
    })
  }
}

module.exports = Album