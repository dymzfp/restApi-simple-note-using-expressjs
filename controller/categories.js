'use strict'

var model = require('../models');
var isEmpty = require('lodash.isempty');

exports.getAll = async (req, res) => {
        try {
            await model.categories.findAll({
                attributes: ['id', 'categoryName']
            }).then(rows => {
                if (rows.length > 0) {
                    res.status(200).json({
                        status: 'OK',
                        message: `get ${rows.length} rows`,
                        data: rows,
                        total: rows.length
                    })
                }
                else {
                    res.status(400).json({
                        status: 'ERROR',
                        message: 'get empty data',
                        data: []
                    })
                }
            })
        } catch(err) {
            res.status(400).json({
                status: 'ERROR',
                message: err.message,
                data: []
            })
        }

}

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;
        await model.categories.findByPk(id).then(rows => {
            if (rows) {
                res.status(400).json({
                    status: `OK`,
                    message: `get 1 data with id = ${id}`,
                    data: rows
                });
            }
            else {
                res.status(400).json({
                    status: `ERROR`,
                    message: `get empty data`,
                    data: {}
                });
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'ERROR',
            message: err.message,
            data: {}
        })
    }
}

exports.add = async (req, res) => {
    
    if(!isEmpty(req.body.name)){
        try {
            const name = req.body.name;
            await model.categories.create({
                categoryName: name
            }).then(addCat => {
                if (addCat) {
                    res.status(201).json({
                        status: 'CREATED',
                        message: `add category success`,
                        data: addCat
                    })
                }
                else {
                    res.status(400).json({
                        status: 'ERROR',
                        message: 'add category failed',
                        data: {}
                    })
                }
            })
        } catch(err) {
            res.status(400).json({
                status: 'ERROR',
                message: err.message,
                data: {}
            })
        }
    }
    else {
        res.status(400).json({
            status: 'ERROR',
            message: `category name must filled`,
            data: {}
        })
    }
}

exports.update = async (req, res) => {
    if (!isEmpty(req.body.name)) {
        try {
            const id = req.params.id;
            const name = req.body.name;
            await model.categories.update({
                categoryName: name
            }, {
                where: {
                    id: id
                }
            }).then(async rows => {
                if (rows[0] > 0) {
                    await model.categories.findByPk(id)
                    .then(data => {
                        res.status(200).json({
                            status: 'UPDATED',
                            message: 'update category success',
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
        } catch(err) {
            res.status(400).json({
                'status': 'ERROR',
                message: err.message,
                data: {}
            })
        }
    }
    else {
        res.status(400).json({
            status: 'ERROR',
            message: `category name must filled`,
            data: {}
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await model.categories.destroy({
            where: {
                id: id
            }
        }).then(async rows => {
            if(rows){
                res.status(200).json({
                    status: "DELETED",
                    message: 'delete category success',
                    deletedRows: rows
                })
            }
            else {
                res.status(400).json({
                    status: "ERROR",
                    message: 'delete category failed',
                    deletedRows: rows
                })
            }
        })
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            message: err.message,
            deletedRows: 0 
        })
    }
}