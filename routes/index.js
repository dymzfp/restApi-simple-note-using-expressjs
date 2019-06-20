'use strict'

module.exports = (app) => {
  var categoriesCon = require('../controller').categories;
  var notesCon = require('../controller').notes;

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'welcome to note-app with express'
    });
  })

  app.get('/categories', categoriesCon.getAll);
  app.get('/categories/:id', categoriesCon.getOne);
  app.post('/categories', categoriesCon.add);
  app.patch('/categories/:id', categoriesCon.update);
  app.delete('/categories/:id', categoriesCon.delete);

  app.get('/notes', notesCon.getAll);
  app.get('/notes/:id', notesCon.getOne);
  app.get('/notes/category/:categoryId', notesCon.getByCat);
  app.post('/notes', notesCon.add);
  app.patch('/notes/:id', notesCon.update);
  app.delete('/notes/:id', notesCon.delete);

}