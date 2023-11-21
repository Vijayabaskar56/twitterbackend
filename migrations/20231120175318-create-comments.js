"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      postId: {
        type: Sequelize.BIGINT,
        foreignKey: true,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      commentedBy: {
        type: Sequelize.BIGINT,
        foreignKey: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      content: {
        type: Sequelize.TEXT,
      },
      commentedAt: {
        type: Sequelize.DATE,
      },
      parentCommentId: {
        type: Sequelize.BIGINT,
        foreignKey: true,
        references: {
          model: "Comments",
          key: "id",
        },
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
    await queryInterface.dropTable("Comments");
  },
};
