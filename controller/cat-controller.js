'use strict'

// import connection database
const db = require('../database/db');
// import lodast isempty
const isEmpty = require('lodash.isempty');
// import response
const re = require('../response/res');

// show category
exports.showCategory = (req, res) => {
    db.query(
        `SELECT * FROM category`,
        (err, result, fields) => {
            if (err) {
                re.err(400, res, err);
            }
            else {
                if(result.length == 0){
                    let msg = "select category success no data";

                    re.ok(200, res, msg);
                }
                else{
                    let msg = "select category success";
                    let data = result;

                    re.ok(200, res, msg, data);

                    // let response = {
                    //     status: 200,
                    //     message: "select category success",
                    //     data: result
                    // };

                    // res.json(response);
                    // res.end();
                }
            }
        }
    )
}

// add category
exports.addCategory = (req, res) => {
    let cat_name = req.body.cat_name;

    if (isEmpty(req.body.cat_name)) {
        let msg = "category must filled";

        re.err(400, res, msg);
    }
    else {

        db.query(
            `INSERT INTO category (category_name) VALUES (?)`,
            [cat_name],
            (err, result, fields) => {
                if (err) {
                    re.err(400, res, err);
                }
                else {
                    let insertId = result.insertId;

                    db.query(
                        `SELECT * FROM category WHERE category_id = ?`,
                        [insertId],
                        (err, resultAdd) => {
                            if(err) {
                                re.err(400, res, err);
                            }
                            else{
                                let msg = "add category success";
                                let data = resultAdd;

                                re.ok(200, res, msg, data);
                            }
                        }
                    )
            
                }

            }
        )

    }

}

// update category
exports.updateCategory = (req, res) => {
    let id = req.params.category_id;
    let cat_name = req.body.cat_name;

    if (isEmpty(req.body.cat_name)) {
        let msg = "category name must filled";
        
        re.err(400, res, msg);
    }
    else {
        db.query(
            `UPDATE category SET category_name = ? WHERE category_id = ?`,
            [cat_name, id],
            (err, result, fields) => {
                if (err) {
                    re.err(400, res, err);
                }
                else {
                    if( result.affectedRows == 0 ){
                        let msg = "data not found";

                        re.ok(200, res, msg);
                    }
                    else{
                        let msg = "update category success";

                        re.ok(200, res, msg);
                    }
                }
            }
        )
    }
}

// delete category
exports.deleteCategory = (req, res) => {
    let id = req.params.category_id;

    db.query(
        `DELETE FROM category WHERE category_id = ?`,
        [id],
        (err, result, field) => {
            if (err) {
                re.err(400, res, err);
            }
            else {
                if (result.affectedRows == 0) {
                    let msg = "data not found";

                    re.ok(200, res, msg);
                }
                else {
                    let msg = "delete category success";

                    re.ok(200, res, msg);
                }
            }
        }
    )
}