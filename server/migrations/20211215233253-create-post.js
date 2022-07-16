'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      likesCounter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};