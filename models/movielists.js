
module.exports = (sequelize, DataTypes) => {
  const movielists = sequelize.define('movielists', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: DataTypes.TEXT,
    genres: DataTypes.ARRAY(DataTypes.INTEGER),
  }, {});
  movielists.associate = function (models) {
    // associations can be defined here
  };
  return movielists;
};
