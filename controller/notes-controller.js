'use strict'

// import connection database
const db = require('../database/db');
// import lodast isempty
const isEmpty = require('lodash.isempty');
// import response
const re = require('../response/res');

// show notes
exports.showNotes = (req, res) => {

    var sql = `SELECT A.note_id, A.note_title, A.note_notes, A.created_at, A.update_at, B.category_name FROM note A LEFT JOIN category B ON B.category_id = A.note_category`;

    var dataSql = [];

    if(!isEmpty(req.query.search)){
        let q = req.query.search;
        let search = "%"+q+"%";
        dataSql.push(search);
        sql += ` WHERE A.note_title LIKE ?`;
    }

    if(!isEmpty(req.query.sort)){
        let sort = req.query.sort;
        sql += ` ORDER BY A.created_at ${sort}`;
    }

    var numPage, limitPage;

    (isEmpty(req.query.page) || req.query.page == '') ? numPage = 1 : numPage = parseInt(req.query.page);
    (isEmpty(req.query.limit) || req.query.limit == '') ? limitPage = 10 : limitPage = parseInt(req.query.limit);

    var startPage = (numPage - 1) * limitPage; 

    sql += ` LIMIT ? OFFSET ?`;
    dataSql.push(limitPage, startPage);

    db.query(
        sql,
        dataSql,
        (err, result, field) => {
            if(err){
                re.err(400, res, err);
            }
            else{
                if (result.length == 0) {
                    let msg = "get notes success with empty data";
                    re.ok(200, res, msg);
                }
                else {
                    let msg = "get notes success";
                    re.ok(200, res, msg, result);
                }
                
            }
        }
    )
}

// show notes single
exports.showNotesSingle = (req, res) => {
    let id = req.params.id;

    db.query(
        `SELECT A.note_id, A.note_title, A.note_notes, A.note_time, A.update_at, B.category_name FROM note A LEFT JOIN category B ON B.category_id = A.note_category WHERE A.note_id = ?`,
        [id],
        (err, result, field) => {
            if (err) {
                re.err(400, res, err);
            }
            else {
                if(result.length == 0){
                    let msg = "get notes by id success with empty data";
                    re.ok(200, res, msg);
                }
                else{
                    let msg = "get notes by id success";
                    re.ok(200, res, msg, result);
                }
            }
        }
    )
}

// show notes by category id
exports.showNotesByCategory = (req, res) => {
    let cat_id = req.params.category_id;

    db.query(
        `SELECT A.note_id, A.note_title, A.note_notes, A.note_time, A.update_at, B.category_name FROM note A LEFT JOIN category B ON B.category_id = A.note_category WHERE B.category_id = ?`,
        [cat_id],
        (err, result, fields) => {
            if(err){
                re.err(400, res, err);
            }
            else {
                if(result.length == 0){
                    let msg = "get note by category success with empty data";
                    re.err(200, res, msg);
                }
                else{
                    let msg = "get notes success";
                    re.ok(200, res, msg, result);
                }
            }
        }
    )
}

// search notes
exports.searchNotes = (req, res) => {
    let q = req.params.q;

    let search = '%' + q + '%';

    db.query(
        `SELECT A.note_id, A.note_title, A.note_notes, A.note_time, A.update_at, B.category_name FROM note A LEFT JOIN category B ON B.category_id = A.note_category WHERE A.note_title LIKE ?`,
        [search],
        (err, result, fields) => {
            if(err) {
                re.err(400, res, err);
            }
            else{
                if(result.length == 0){
                    let msg = "search note success with empty data";
                    re.ok(200, res, msg);
                }
                else{
                    let msg = "serach note success";
                    re.ok(200, res, msg, result );
                }
            }
        }

    )
}

// add notes
exports.addNotes = (req, res) => {
    let title = req.body.title;
    let notes = req.body.notes;
    let category = req.body.category;

    if (isEmpty(req.body.title) || isEmpty(req.body.notes) || isEmpty(req.body.category) ){
        let msg = "field must filled";
        re.err(400, res, msg);
    }
    else{

        db.query(
            `INSERT INTO note (note_category, note_title, note_notes) VALUES (?, ?, ?)`,
            [category, title, notes],
            (err, result, fields) => {
                if(err){                
                    re.err(400, res, err);
                }
                else{
                    let id = result.insertId;

                    db.query(
                        `SELECT * FROM note WHERE note_id = ?`,
                        [id],
                        (err, dataInr) => {
                            if(err) {
                                re.err(400, res, err);
                            }
                            else {
                                let msg = "add notes success";
                                let data = dataInr;
                                re.ok(200, res, msg, data);
                            }
                        }
                    )
                }
            }
        )
    }
}

// update notes
exports.updateNotes = (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let notes = req.body.notes;
    let category = req.body.category;

    if (isEmpty(req.body.title) || isEmpty(req.body.notes) || isEmpty(req.body.category)) {
        let msg = "field must filled";   
        re.err(400, res, msg);
    }
    else {
        db.query(
            `UPDATE note SET note_category=?, note_title=?, note_notes=? WHERE note_id = ?`,
            [category, title, notes, id],
            (err, result, fields) => {
                if(err){
                    re.err(400, res, err);
                }
                else{
                    if(result.affectedRows == 0){
                        let msg = "data not found";
                        re.ok(200, res, msg);
                    }else{
                        let msg = "update notes success";
                        re.ok(200, res, msg);
                    }
                }
            }
        )
    }
}

// delete notes
exports.deleteNotes = (req, res) => {
    let id = req.params.id;

    db.query(
        `DELETE FROM note WHERE note_id = ?`,
        [id],
        (err, result, fields) => {
            if(err){
                re.err(400, res, err);
            }
            else{
                if(result.affectedRows == 0){
                    let msg = "data not found";
                    re.ok(200, res, msg);
                }
                else{
                    let msg = "delete notes success";
                    re.ok(200, res, msg);
                }
            }
        }
    )
}

// delete notes by category id
exports.deleteNotesByCategory = (req, res) => {
    let cat_id = req.params.category_id;

    db.query(
        `DELETE FROM note WHERE note_category = ?`,
        [cat_id],
        (err, result, fields) => {
            if(err){
                re.err(400, res, err);
            }
            else {
                if(result.affectedRows == 0){
                    let msg = "data not founds";
                    re.ok(200, res, msg);
                }
                else{
                    let msg = "delete notes by category success";
                    re.ok(200, res, msg);
                }
            }
        }
    )
}