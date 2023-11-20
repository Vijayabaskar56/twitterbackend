'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FollowAction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FollowAction.init({
    followedAt: DataTypes.DATE,
    userId: DataTypes.BIGINT,
    followedId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'FollowAction',
  });
  return FollowAction;
};