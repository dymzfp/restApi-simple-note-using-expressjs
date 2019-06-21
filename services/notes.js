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

exports.servicesAllCounts = ( query, callback) => {
    var search = query.search;

    let sql = `SELECT COUNT(*) as totalPage FROM notes`;

    if(search) sql += ` WHERE notes.title LIKE '%${query.search}%'`;
   
    model.sequelize.query(sql).spread(
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

exports.servicesGetNoteByCat = (id, query, cb) => {
    var search    = query.search;
    var sort      = query.sort;
    var pageNum   = query.pageNum;
    var pageLimit = query.pageLimit;

    let sql = `SELECT notes.id, notes.title, notes.note, categories.categoryName as category, notes.createdAt, notes.updatedAt FROM notes LEFT JOIN categories ON notes.categoryId = categories.id WHERE notes.categoryId = ${id}`;
    
    if (search) sql += ` AND notes.title LIKE '%${query.search}%'`;
    if (sort) sql += ` ORDER BY notes.createdAt ${query.sort}`;

    let offset = (pageNum - 1) * pageLimit;

    sql += ` LIMIT ${pageLimit} OFFSET ${offset}`;
    
    model.sequelize.query(sql).spread(data => {
        cb(data);
    })
}

exports.servicesAllCountsByCat = (id, query, callback) => {
    var search = query.search;
    var id = id;

    let sql = `SELECT COUNT(*) as totalPage FROM notes WHERE notes.categoryId = ${id}`;

    if(search) sql += ` AND notes.title LIKE '%${query.search}%'`;
   
    model.sequelize.query(sql).spread(
        data => {
            callback(data);
        }
    )
}