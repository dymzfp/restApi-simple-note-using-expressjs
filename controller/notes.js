'use strict'

var model = require('../models');
var isEmpty = require('lodash.isempty');
var servicesNotes = require('../services').notes;

exports.getAll = async (req, res) => {
    try{
        let pageLimit = (isEmpty(req.query.limit)) ? 10 : parseInt(req.query.limit);
        var totalCount, totalPage;

        let query = {
            search: req.query.search
        };

        await servicesNotes.servicesAllCount( query, total => {
            totalCount = parseInt(total[0].totalPage);
            totalPage = Math.ceil(totalCount / pageLimit);
        });
        
        let pageNum;
        if (isEmpty(req.query.page) || req.query.page < 1) {
            pageNum = 1;
        }
        else if (req.query.page > totalPage) {
            pageNum = totalPage;
        }
        else{
            pageNum = parseInt(req.query.page);
        }

        query = {
            search: req.query.search,
            sort: req.query.sort,
            pageNum: pageNum,
            pageLimit: pageLimit
        };

        await servicesNotes.servicesGetAllNotes(query, (rows => {
                if (rows.length > 0) {
                    res.status(200).json({
                        status: 'OK',
                        message: 'get notes success',
                        data: rows,
                        total: totalCount,
                        page: pageNum,
                        totalPage: totalPage,
                        limit: pageLimit
                    });
                }
                else {
                    res.status(400).json({
                        status: 'ERROR',
                        message: 'get empty data',
                        data: {}
                    })
                }
            })
        )
    } catch(err) {
        res.status(400).json({
            status: 'ERROR',
            message: err.message,
            data: {}
        })
    }
}

exports.getOne = async (req, res) => {
    let id = req.params.id;
    try{
        await servicesNotes.servicesGetOneNote(id, (rows) => {
            if(!rows || !rows.length){
                res.status(400).json({
                    status: 'ERROR',
                    message: 'get empty data',
                    data: {}
                })
            }
            else {
                res.status(200).json({
                    status: 'OK',
                    message: 'get by id suuccess',
                    data: rows
                })
            }
        });
    } catch(err) {
        res.status(400).json({
            status: 'ERROR',
            message: err.message,
            data: {}
        })
    }
}

exports.getByCat = async (req, res) => {
    let categoryId = req.params.categoryId;
    try {
        await servicesNotes.servicesGetNoteByCat(categoryId, (rows) => {
            if (!rows || !rows.length) {
                res.status(400).json({
                    status: 'ERROR',
                    message: 'get empty data',
                    data: {}
                })
            }
            else {
                res.status(200).json({
                    status: 'OK',
                    message: 'get by category success',
                    data: rows
                })
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'ERROR',
            message: err.message,
            data: {}
        })
    }
}

exports.add = async (req, res) => {
    if(isEmpty(req.body.title) || isEmpty(req.body.note) || isEmpty(req.body.category)) {
        res.status(400).json({
            status: 'ERROR',
            message: 'input must filled',
            data: {}
        })
    }
    else {
        try {
            const title = req.body.title;
            const note = req.body.note;
            const category = req.body.category;

            await model.notes.create({
                title: title,
                note: note,
                categoryId: category
            }).then(addNote => {
                if (addNote) {
                    res.status(201).json({
                        status: 'CREATED',
                        message: `add note success`,
                        data: addNote
                    })
                }
                else {
                    res.status(400).json({
                        status: 'ERROR',
                        message: 'add note failed',
                        data: {}
                    })
                }
            })
        } catch (err) {
            res.status(400).json({
                status: 'ERROR',
                message: err.message,
                data: {}
            })
        }
    }
}

exports.update = async (req, res) => {
    if (isEmpty(req.body.title) || isEmpty(req.body.note) || isEmpty(req.body.category)) {
        res.status(400).json({
            status: 'ERROR',
            message: `input must filled`,
            data: {}
        })
    }
    else {
        try {
            const id = req.params.id;
            const title = req.body.title;
            const note = req.body.note;
            const category = req.body.category;

            await model.notes.update({
                title: title,
                note: note,
                categoryId: category
            }, {
                    where: {
                        id: id
                    }
                }).then(async rows => {
                    if (rows[0] > 0) {
                        await model.notes.findByPk(id)
                            .then(data => {
                                res.status(201).json({
                                    status: 'UPDATED',
                                    message: 'update note success',
                                    data: data,
                                    updatedRows: rows[0]
                                });
                            });
                    }
                    else {
                        res.status(400).json({
                            'status': 'ERROR',
                            message: 'update empty data',
                            data: {},
                            updatedRows: rows[0]
                        })
                    }
                })
        } catch (err) {
            res.status(400).json({
                'status': 'ERROR',
                message: err.message,
                data: {}
            })
        }
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        await model.notes.destroy({
            where: {
                id: id
            }
        }).then( deleted => {
            if(deleted) {
                res.status(200).json({
                    status: 'DELETED',
                    message: 'deleted note success',
                    deletedRows: deleted
                });
            }
            else {
                res.status(400).json({
                    status: 'ERROR',
                    message: 'empty data',
                    daletedRows: 0
                }); 
            }
        });
    } catch(err) {
        res.status(400).json({
            status: 'ERROR',
            message: err.message,
            deletedRows: 0
        }); 
    }
}