const db = require('../connection.js')
const {response} = require("express");

exports.getTestCaseCollection = (req, res) => {
    const {name, description, project} = req.query

    let sql = 'SELECT * FROM collections'
    const params = []
    const conditions = []

    if(name){
        conditions.push('name = ?')
        params.push(name)
    }
    if(description){
        conditions.push('description = ?')
        params.push(description)
    }
    if(project){
        conditions.push('project = ?')
        params.push(project)
    }

    if(conditions.length > 0){
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    db.all(sql, params, (err, rows) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(rows)
    })
}

exports.getTestCaseCollectionById = (req, res) => {
    const {id} = req.params
    let sql = 'SELECT * FROM collections WHERE id = ?'
    db.get(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}

exports.createTestCaseCollection = (req, res) => {
    const {name, description, project} = req.body
    let sql = 'INSERT INTO collections ( name, description, project) VALUES (?,?,?)'
    const params = [name, description, project]
    db.run(sql, params, function (err, rows) {
        if (err){
            return res.status(500).json({error: err.message})
        }
        db.get('SELECT * FROM collections WHERE id = ?', [this.lastID], (err, row) => {
            if (err){
                return res.status(500).json({error: err.message})
            }
            res.status(201).json(row);
        })
    })
}

exports.deleteTestCaseCollectionById = (req, res) => {
    const {id} = req.params
    let sql = 'DELETE FROM collections WHERE id = ?'
    db.run(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}