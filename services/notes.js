var model = require('../models/index');

exports.servicesGetAllNotes = (query, callback) => {
    var search    = query.search;
    var sort      = query.sort;
    var pageNum   = query.pageNum;
    var pageLimit = query.pageLimit;

    let sql = `SELECT notes.id, notes.title, notes.note, categories.categoryName as category, notes.createdAt as created, notes.updatedAt as updated FROM notes LEFT JOIN categories ON notes.categoryId = categories.id`;

    if (search) sql += ` WHERE notes.title LIKE '%${query.search}%'`;
    if (sort) sql += ` ORDER BY notes.createdAt ${query.sort}`;

    let offset = (pageNum - 1) * pageLimit;

    sql += ` LIMIT ${pageLimit} OFFSET ${offset}`;

    model.sequelize.query(sql).spread( data => {
        callback(data);
    })
}

exports.servicesAllCount = (callback) => {
    model.sequelize.query(`SELECT COUNT(*) as totalPage FROM notes`).spread(
        data => {
            callback(data);
        }
    )
}

exports.servicesGetOneNote = (id, cb) => {
    let sql = `SELECT notes.id, notes.title, notes.note, categories.categoryName as category, notes.createdAt, notes.updatedAt FROM notes LEFT JOIN categories ON notes.categoryId = categories.id WHERE notes.id = ${id}`;
    model.sequelize.query(sql).spread( data => {
        cb(data);
    })
}

exports.servicesGetNoteByCat = (id, cb) => {
    let sql = `SELECT notes.id, notes.title, notes.note, categories.categoryName as category, notes.createdAt, notes.updatedAt FROM notes LEFT JOIN categories ON notes.categoryId = categories.id WHERE notes.categoryId = ${id}`;
    model.sequelize.query(sql).spread(data => {
        cb(data);
    })
}