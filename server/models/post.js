'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      this.Owner = Post.belongsTo(models.User, {
        as: "owner",
        foreignKey: 'owner_id',
        targetKey: 'id'
      });
      this.Comments = Post.hasMany(models.Comment, {
        as: 'comments',
        sourceKey: 'uuid',
        foreignKey: 'post_uuid'
      })

    }
    readableCreatedAt() {
      return moment(this.createdAt)
        .locale('fr')
        .format('LL')
    }

    toJSON() {
      return { ...this.get(), id: undefined, owner_id: undefined }
    }
  };
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    owner_id: {
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
      allowNull: true,
    },
    likesCounter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0

    }

  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};