
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('movielists', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.TEXT,
    },
    genres: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('movielists'),
};
