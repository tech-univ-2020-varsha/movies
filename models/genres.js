'use strict';
module.exports = (sequelize, DataTypes) => {
  const genres = sequelize.define('genres', {
    name: DataTypes.TEXT,
    id: DataTypes.INTEGER
  }, {});
  genres.associate = function(models) {
    // associations can be defined here
  };
  return genres;
};