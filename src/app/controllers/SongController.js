const Song = require('../models/Song')
const UserSongs = require('../models/UserSongs')
const User = require('../models/User')
const { Op } = require('sequelize')

class SongController {
  async show(req, res) {
    const user_id = req.userId
    const songs = await UserSongs.findAll({ where: { user_id }, include: [ {model: Song, as: 'Song'} ] })
    return res.json(songs) 
  }

  async store(req, res) {

  if (!req.file) {
    console.log("Você precisa selecionar uma música");
    return res.json({ error: "Você precisa selecionar uma música" });
  }

  const { filename: song } = req.file
  const { title } = req.body
  const userId = req.userId

  if (!title) {
    console.log("Prencher todos os campos");

    return res.json({error: 'Escolha o nome da música'})
  }

  const { id } = await Song.create({
    title,
    song,
  });

  await UserSongs.create({
    user_id: userId,
    song_id: id
  })

   return res.json({})
  }

  async delete(req, res) {
    const { id } = req.params
    const user_id = req.userId

    await UserSongs.destroy({
      where: { [Op.and]: [{ user_id }, { song_id: id }] },
    });

    return res.json({})
  }
}

module.exports = new SongController()