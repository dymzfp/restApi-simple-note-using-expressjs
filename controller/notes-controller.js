'use strict'

// import connection database
const db = require('../database/db');
// import lodast isempty
const isEmpty = require('lodash.isempty');
// import response
const re = require('../response/res');

// show notes
exports.showNotes = (req, res) => {
    db.query(
        `SELECT A.note_id, A.note_title, A.note_notes, A.note_time, A.update_at, B.category_name FROM note A LEFT JOIN category B ON B.category_id = A.note_category`,
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
                        (err, data) => {
                            if(err) {
                                re.err(400, res, err);
                            }
                            else {
                                let msg = "add notes success";
                                re.ok(200, res, msg);
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