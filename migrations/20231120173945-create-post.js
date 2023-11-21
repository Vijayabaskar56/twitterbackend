"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      content: {
        type: Sequelize.TEXT,
      },
      postedAt: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.BIGINT,
        foreignKey: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      repostId: {
        type: Sequelize.BIGINT,
        foreignKey: true,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      like: {
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable("Posts");
  },
};
