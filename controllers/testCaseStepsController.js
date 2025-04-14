const db = require('../connection.js')
const {response} = require("express");

exports.getTestCaseSteps = (req, res) => {
    const {testCaseId} = req.query

    let sql = 'SELECT test_case_steps.id, test_case_steps.FK_test_case_id as testCaseId, test_case_steps.number_of_step as numberOfStep, test_case_steps.step from test_case_steps LEFT JOIN test_cases ON test_cases.id = test_case_steps.FK_test_case_id'
    const params = []
    const conditions = []

    if(testCaseId){
        conditions.push('test_case_steps.FK_test_case_id = ?')
        params.push(testCaseId)
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

exports.getTestCaseStepById = (req, res) => {
    const {id} = req.params
    let sql = 'SELECT test_case_steps.id, test_case_steps.FK_test_case_id as testCaseId, test_case_steps.number_of_step as numberOfStep, test_case_steps.step from test_case_steps LEFT JOIN test_cases ON test_cases.id = test_case_steps.FK_test_case_id WHERE test_case_steps.id = ?'
    db.get(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}

exports.createTestCaseStep = (req, res) => {
    const {FKTestCaseId, numberOfStep, step} = req.body
    let sql = 'INSERT INTO test_case_steps (FK_test_case_id, number_of_step, step) VALUES (?,?,?)'
    const params = [FKTestCaseId, numberOfStep, step]
    db.run(sql, params, function (err, rows) {
        if (err){
            return res.status(500).json({error: err.message})
        }
        db.get('SELECT test_case_steps.id, test_case_steps.FK_test_case_id as testCaseId, test_case_steps.number_of_step as numberOfStep, test_case_steps.step from test_case_steps LEFT JOIN test_cases ON test_cases.id = test_case_steps.FK_test_case_id WHERE test_case_steps.id = ?',
            [this.lastID], (err, row) => {
                if (err){
                    return res.status(500).json({error: err.message})
                }
                res.status(201).json(row);
            })
    })
}

exports.deleteTestCaseStep = (req, res) => {
    const {id} = req.params
    let sql = 'DELETE FROM test_case_steps WHERE id = ?'
    db.run(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}