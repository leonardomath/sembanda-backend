const Album = require('../models/Album')
const { Op } = require('sequelize')

class AlbumController {
  async index(req, res) {
    const albuns = await Album.findAll();
    return res.json(albuns);
  }

  async store(req, res) {
    const { filename: avatar_url } = req.file;

    const { name, band } = req.body;

    const album = await Album.create({
      avatar_url,
      name,
      band,
    });

    return res.json(album);
  }

  async show(req, res) {
    const { band } = req.body;
    const name_lowercase = band.toLowerCase()
    const album = await Album.findAll({
      where: { band: { [Op.startsWith]: name_lowercase } },
    });
    if (!album) {
      return res.json({ error: 'album not found'});
    }
    return res.json(album);
  }
}

module.exports = new AlbumController()