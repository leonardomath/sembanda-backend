const UserAlbums = require('../models/UserAlbums')
const Album = require('../models/Album')
const { Op } = require('sequelize')

class UserAlbumController {
  async index(req, res) {
    const id = req.userId;
    const albums = await UserAlbums.findAll({
      where: { user_id: id },
      include: [{ model: Album, as: "Album" }],
    });
    return res.json(albums);
  }

  async store(req, res) {
    const { album_id } = req.body;
    const user_id = req.userId;

    await UserAlbums.create({ album_id, user_id });

    return res.json({});
  }

  async delete(req, res) {
    const { id: album_id } = req.body;
    const user_id = req.userId

    await UserAlbums.destroy({
      where: {
        [Op.and]: [{ user_id }, { album_id }],
      },
    });

    return res.json({})
  }

}

module.exports = new UserAlbumController()