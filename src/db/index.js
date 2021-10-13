const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pokedex', 'root', 'root', { // db, name, pass
  host: 'localhost',
  port: 3306,
  dialect: 'mariadb', // type de database ex: postgresql, mysql2, mariadb, sqlite
    dialectOptions: {
        timezone: 'Etc/GMT-10',
    },
    logging: false
});

const connect = async () => { // connection à la DB
  try {
    const options = { force: false, logging: false }; // force : true permet de créer la/les tables s'il elle n'existe pas et réénitialise les données
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(options)
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  }
};

const close = async () => {
  try {
    await sequelize.close();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connect, close, sequelize
};