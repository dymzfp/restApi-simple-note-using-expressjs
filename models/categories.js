'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    categoryName: DataTypes.STRING
  }, {});
  categories.associate = function(models) {
    categories.hasMany(models.notes, {
      foreignKey: 'categoryId',
      as: 'category'
    })
  };
  return categories;
};