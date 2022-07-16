'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.Post = User.hasMany(models.Post, {
        as: 'posts',
        foreignKey: 'owner_id'
      })
    }
    toJSON() {
      return { ...this.get(), id: undefined, role: undefined, password: undefined, createdAt: undefined, updatedAt: undefined }
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',

    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {

    sequelize,
    modelName: 'User',
  });
  return User;
};