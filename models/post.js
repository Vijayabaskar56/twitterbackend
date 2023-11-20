'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    postText: DataTypes.TEXT,
    postedAt: DataTypes.DATE,
    userId: DataTypes.BIGINT,
    repostId: DataTypes.BIGINT,
    like: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};