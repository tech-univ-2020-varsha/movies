
module.exports = (sequelize, DataTypes) => {
  const genres = sequelize.define('genres', {
    name: DataTypes.TEXT,

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  }, {});
  genres.associate = function (models) {
    // associations can be defined here
  };
  return genres;
};
