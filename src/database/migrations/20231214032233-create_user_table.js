'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      full_name: {
        type: Sequelize.TEXT(),
        allowNull: false
      },
      email: {
        type: Sequelize.TEXT(),
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT(),
        allowNull: false
      },
      phone: {
        type: Sequelize.TEXT(),
        allowNull: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('user');
  }
};
