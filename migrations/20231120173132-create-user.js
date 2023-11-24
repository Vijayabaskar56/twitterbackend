"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      displayName: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      bioShort: {
        type: Sequelize.TEXT,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      website: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      profilePicUrl: {
        type: Sequelize.STRING,
      },
      headerPicUrl: {
        type: Sequelize.STRING,
      },
      emailVerifiedAt: {
        type: Sequelize.DATE,
      },
      authToken: {
        type: Sequelize.STRING,
      },
      authSession: {
        type: Sequelize.STRING,
      },
      authSessionExpiry: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
