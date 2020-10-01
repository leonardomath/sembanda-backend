const Sequelize = require("sequelize")
const { Model } = require('sequelize') 

class Song extends Model {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      song: Sequelize.STRING,
      song_path: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3333/files/${this.song}`;
        }
      }
    },{ sequelize })
  }
}

module.exports = Song