const User = require('../models/User')
const jwt = require('jsonwebtoken')

class UserController {
  async store(req, res) {

    const { email, name, instrument, password, city } = req.body

    if (!email || !name || !instrument || !password || !city) {
      return res.json({error: 'Prencher todos os campos'})
    }

    const { filename: avatar_url } = req.file

    const userExists = await User.findOne({ where: { email } })

    if(userExists) {
      return res.json({ error: 'Usúario com esse e-mail já existe.' })
    }

    const { id } = await User.create({
      email,
      name,
      password,
      city,
      instrument,
      avatar_url: `http://localhost:3333/files/${avatar_url}`
    });

    return res.json({
      user: {
        id,
      },
      token: jwt.sign({ id }, "sembanda@key", {
        expiresIn: "1d",
      }),
    });
  }

  async show(req, res) {
    const id = req.userId

    const user = await User.findByPk(id)

    const { name, email, city, instrument, avatar_url } = user

    return res.json({ name, email, city, instrument, avatar_url });
  }

  async update(req, res) {
    const { name, email, instrument } = req.body

    if (!name || !email || !instrument) {
      return res.json({ error: 'Prencher todos os campos'});
    }

    const user = await User.findOne({ where: { email } })
    
    if (!user) {
      return res.json({ error: 'Usúario não existe' })
    }

    if (req.file) {
      const { filename: avatar_url } = req.file;
      await User.update(
        {
          name,
          email,
          instrument,
          avatar_url: `http://localhost:3333/files/${avatar_url}`,
        },
        { where: { email } }
      );
    }

    await User.update(
      {
        name,
        email,
        instrument,
      },
      { where: { email } }
    );

    return res.json({})
  }
}

module.exports = new UserController()