'use strict'

module.exports = (app) => {
    // import controller
    const controller = require('../controller/app-controller');
    const cat = require('../controller/cat-controller');
    const not = require('../controller/notes-controller');

    app.get('/', controller.index);
    // ****** category
    // show category
    app.get('/category', cat.showCategory);
    // add category
    app.post('/category', cat.addCategory);
    // delete category
    app.delete('/category/:category_id', cat.deleteCategory);
    // update category
    app.patch('/category/:category_id', cat.updateCategory);

    // ***** notes
    // show notes
    app.get('/notes', not.showNotes);
    // show single
    app.get('/notes/:id', not.showNotesSingle);
    // show notes by category id
    app.get('/notes/category/:category_id', not.showNotesByCategory);
    // add notes
    app.post('/notes', not.addNotes);
    // update notes
    app.patch('/notes/:id', not.updateNotes);
    // delete notes
    app.delete('/notes/:id', not.deleteNotes);
    // delete notes by category
    app.delete('/notes/category/:category_id', not.deleteNotesByCategory);
}