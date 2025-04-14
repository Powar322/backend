const db = require('../connection.js')
const {response} = require("express");

exports.getTestCase = (req, res) => {
    const {testCaseId, collectionId, name, excludeCollectionId} = req.query

    let sql = 'SELECT test_cases.id, test_cases.case_id AS testCaseId, test_cases.FK_collection_id AS testCaseCollectionId, collections.name AS testCaseCollectionName, test_cases.description, test_cases.name AS testCaseName, test_cases.test_data AS testData FROM test_cases LEFT JOIN collections on test_cases.FK_collection_id = collections.id'
    const params = []
    const conditions = []

    if(testCaseId){
        conditions.push('test_cases.case_id = ?')
        params.push(testCaseId)
    }
    if(collectionId){
        conditions.push('test_cases.FK_collection_id = ?')
        params.push(collectionId)
    }
    if(excludeCollectionId){
        conditions.push('test_cases.FK_collection_id != ?')
        params.push(excludeCollectionId)
    }
    if(name){
        conditions.push('test_cases.name = ?')
        params.push(name)
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

exports.getTestCaseById = (req, res) => {
    const {id} = req.params
    let sql = 'SELECT test_cases.id, test_cases.case_id AS testCaseId, test_cases.FK_collection_id AS testCaseCollectionId, collections.name AS testCaseCollectionName, test_cases.description, test_cases.name AS testCaseName, test_cases.test_data AS testData FROM test_cases LEFT JOIN collections on test_cases.FK_collection_id = collections.id WHERE test_cases.id = ?\n'
    db.get(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}

exports.createTestCase = (req, res) => {
    const {testCaseId, fkCollectionId, testCaseName, description, testData} = req.body
    let sql = 'INSERT INTO test_cases ( case_id, FK_collection_id, name, description, test_data) VALUES (?,?,?,?,?)'
    const params = [testCaseId, fkCollectionId, testCaseName, description, testData]
    db.run(sql, params, function (err, rows) {
        if (err){
            return res.status(500).json({error: err.message})
        }
        db.get('SELECT test_cases.id, test_cases.case_id AS testCaseId, test_cases.FK_collection_id AS testCaseCollectionId, collections.name AS testCaseCollectionName, test_cases.description, test_cases.name AS testCaseName, test_cases.test_data AS testData FROM test_cases LEFT JOIN collections on test_cases.FK_collection_id = collections.id WHERE test_cases.id = ?',
            [this.lastID], (err, row) => {
            if (err){
                return res.status(500).json({error: err.message})
            }
            res.status(201).json(row);
        })
    })
}

exports.deleteTestCase = (req, res) => {
    const {id} = req.params
    let sql = 'DELETE FROM test_cases WHERE id = ?'
    db.run(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}