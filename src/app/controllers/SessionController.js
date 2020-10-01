const User = require('../models/User')
const jwt = require('jsonwebtoken')

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.json({error: 'Por favor preencher todos os campos'})
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.json({ error: 'E-mail não existe' })
    }

    if (!(await user.checkPassword(password))) {
      return res.json({ error: 'Senha errada'})
    }
   
    const { id } = user

    return res.json({
      user: {
        id,
        email
      },
      token: jwt.sign({ id, email },'sembanda@key', {
        expiresIn: '1d'
      })
    })

  }
}

module.exports = new SessionController()