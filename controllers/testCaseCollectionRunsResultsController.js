const db = require('../connection.js')
const {response} = require("express");

exports.getTestCaseCollectionRunsResults = (req, res) => {
    const {collectionRunId, testCaseId, } = req.query

    let sql = 'SELECT result_of_each_TC.id, result_of_each_TC.test_case_id AS resTestCaseId, test_cases.case_id AS testCaseId, result_of_each_TC.collection_run_id AS collectionRunId, result_of_each_TC.result AS resultId, results_of_tc.name AS resultName from result_of_each_TC\n' +
        ' LEFT JOIN results_of_tc ON results_of_tc.id = result_of_each_TC.result LEFT JOIN test_cases ON test_cases.id = result_of_each_TC.test_case_id'
    const params = []
    const conditions = []

    if(collectionRunId){
        conditions.push('result_of_each_TC.collection_run_id = ?')
        params.push(collectionRunId)
    }
    if(testCaseId){
        conditions.push('result_of_each_TC.test_case_id = ?')
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

exports.getTestCaseCollectionRunsResultsById = (req, res) => {
    const {id} = req.params
    let sql = 'SELECT result_of_each_TC.id, result_of_each_TC.test_case_id AS resTestCaseId, test_cases.case_id AS testCaseId, result_of_each_TC.collection_run_id AS collectionRunId, result_of_each_TC.result AS resultId, results_of_tc.name AS resultName from result_of_each_TC\n' +
        ' LEFT JOIN results_of_tc ON results_of_tc.id = result_of_each_TC.result LEFT JOIN test_cases ON test_cases.id = result_of_each_TC.test_case_id where result_of_each_TC.id = ?'
    db.get(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}

exports.updateTestCaseCollectionRunsResultsById = (req, res) => {
    const {id} = req.params
    const { testCaseId, collectionRunId, resultId } = req.body

    const sql = `UPDATE result_for_each_TC SET test_case_id = ?, collection_run_id = ?, result = ? WHERE id = ?`
    db.run(sql, [testCaseId, collectionRunId, resultId, id], function(err){
        if (err){
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0 ){
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({message: 'Item updated successfully'})
    })
}