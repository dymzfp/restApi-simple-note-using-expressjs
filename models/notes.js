'use strict';
module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define('notes', {
    title: DataTypes.STRING,
    note: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER
  }, {});
  notes.associate = function(models) {
    // associations can be defined here
    notes.belongsTo(models.categories, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    })
  };
  return notes;
};