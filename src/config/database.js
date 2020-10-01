module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'sembanda',
  define: {
    timstamps: true,
    underscored: true,
    underscoredAll: true
  }
}