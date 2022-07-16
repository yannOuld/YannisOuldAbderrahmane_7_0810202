'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.Owner = Comment.belongsTo(models.User, {
        as: 'owner',
        foreignKey: 'owner_id'
      })
      this.Post = Comment.belongsTo(models.Post, {
        as: 'post',
        foreignKey: 'post_uuid'
      })
    }
  };
  Comment.init({
    post_uuid: {
      type: DataTypes.UUID,

    },
    owner_id: {
      type: DataTypes.INTEGER,

    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};