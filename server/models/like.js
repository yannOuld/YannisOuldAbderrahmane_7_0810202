'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Like extends Model {

    static associate(models) {
      models.User.belongsToMany(models.Post, {
        through: models.Like,
        foreignKey: 'user_id',
        otherKey: 'post_uuid'
      });
      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'post_uuid',
        otherKey: 'user_id'
      });
      models.Like.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      models.Like.belongsTo(models.Post, {
        foreignKey: 'post_uuid',
        as: 'post',
      });
    }
  };
  Like.init({
    post_uuid: {
      type: DataTypes.UUID,

    },
    user_id: {
      type: DataTypes.INTEGER,

    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};