const Sequelize = require('sequelize')
const { Model } = require('sequelize')

class UserSongs extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        song_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' })
    this.belongsTo(models.Song, { foreignKey: 'song_id', as: 'Song' })
  }
}

module.exports = UserSongs