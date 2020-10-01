const Sequelize = require('sequelize')
const { Model } = require('sequelize')

class Music extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      music_url: Sequelize.STRING
    }, 
    {
      sequelize,
      tableName: 'musics'
    })
  }
}

module.exports = Music