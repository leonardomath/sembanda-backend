const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')

const User = require('../app/models/User')
const Album = require('../app/models/Album')
const Music = require('../app/models/Music')
const UserAlbums = require('../app/models/UserAlbums')
const Song = require("../app/models/Song");
const UserSongs = require("../app/models/UserSongs");


const models = [User, Album, Music, UserAlbums, Song, UserSongs];

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models.map(model => model.init(this.connection))
    models.map(model => model.associate && model.associate(this.connection.models))
  }
}

module.exports = new Database()