'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false
        },
        instrument: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        avatar_url: {
          type: Sequelize.STRING
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  }
};
