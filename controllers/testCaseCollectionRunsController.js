const db = require('../connection.js')
const {response} = require("express");

exports.getTestCaseCollectionRuns = (req, res) => {
    const {collectionId, resultId} = req.query

    let sql = 'SELECT collections_runs.id, collections_runs.collection_id AS collectionId, collections_runs.result AS resultId, results_of_run_collections.name AS resultName, collections_runs.date_of_run AS dateOfRun\n' +
        ' FROM collections_runs LEFT JOIN results_of_run_collections ON collections_runs.result = results_of_run_collections.id'
    const params = []
    const conditions = []

    if(collectionId){
        conditions.push('collections_runs.collection_id = ?')
        params.push(collectionId)
    }
    if(resultId){
        conditions.push('collections_runs.result = ?')
        params.push(resultId)
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

exports.getTestCaseCollectionRunById = (req, res) => {
    const {id} = req.params
    let sql = 'SELECT collections_runs.id, collections_runs.collection_id AS collectionId, collections_runs.result AS resultId, results_of_run_collections.name AS resultName, collections_runs.date_of_run AS dateOfRun\n' +
        ' FROM collections_runs LEFT JOIN results_of_run_collections ON collections_runs.result = results_of_run_collections.id WHERE collections_runs.id = ?'
    db.get(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}

exports.getTestCaseCollectionRunStatsById = (req, res) => {
    const {id} = req.params
    let sql = `
    SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN result = 1 THEN 1 ELSE 0 END) AS passed,
        SUM(CASE WHEN result = 2 THEN 1 ELSE 0 END) AS failed,
        SUM(CASE WHEN result = 3 THEN 1 ELSE 0 END) AS inProgress
    FROM result_of_each_TC
    WHERE collection_run_id = ?
    `
    db.get(sql,[parseInt(id)], function(err, rows) {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(rows)
    })
}

exports.createTestCaseCollectionRuns = (req, res) => {
    const {collectionId, resultId, dateOfRun} = req.body
    let sql = 'INSERT INTO collections_runs ( collection_id, result, date_of_run) VALUES (?,?,?)'
    const params = [collectionId, resultId, dateOfRun]
    db.run(sql, params, function (err, rows) {
        if (err){
            return res.status(500).json({error: err.message})
        }
        db.get('SELECT collections_runs.id, collections_runs.collection_id AS collectionId, collections_runs.result AS resultId, results_of_run_collections.name AS resultName, collections_runs.date_of_run AS dateOfRun\n' +
            ' FROM collections_runs LEFT JOIN results_of_run_collections ON collections_runs.result = results_of_run_collections.id WHERE collections_runs.id = ?', [this.lastID], (err, row) => {
            if (err){
                return res.status(500).json({error: err.message})
            }
            res.status(201).json(row);
        })
    })
}

exports.deleteTestCaseCollectionRunsById = (req, res) => {
    const {id} = req.params
    let sql = 'DELETE FROM collections_runs WHERE id = ?'
    db.run(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}

exports.updateTestCaseCollectionRunsById = (req, res) => {
    const {id} = req.params
    const { collectionId, resultId, dateOfRun } = req.body

    const sql = `UPDATE collections_runs SET collection_id = ?, result = ?, date_of_run = ? WHERE id = ?`
    db.run(sql, [collectionId, resultId, dateOfRun, id], function(err){
        if (err){
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0 ){
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({message: 'Item updated successfully'})
    })
}