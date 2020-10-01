const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class UserAlbums extends Model {
  static init(sequelize) {
    super.init({
      user_id: Sequelize.INTEGER,
      album_id: Sequelize.INTEGER
    },{
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' })
    this.belongsTo(models.Album, { foreignKey: 'album_id', as: 'Album' })
  }
}

module.exports = UserAlbums