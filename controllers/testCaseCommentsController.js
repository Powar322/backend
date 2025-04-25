const db = require('../connection.js')
const {response} = require("express");

exports.getTestCaseComments = (req, res) => {
    const {testCaseId} = req.query

    let sql = 'SELECT id, test_case_id AS testCase, text, date FROM test_case_comments'
    const params = []
    const conditions = []

    if(testCaseId){
        conditions.push('test_case_id = ?')
        params.push(testCaseId)
    }
    if(conditions.length > 0){
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql+= 'ORDER BY id DESC '

    db.all(sql, params, (err, rows) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(rows)
    })
}

exports.getTestCaseCommentsById = (req, res) => {
    const {id} = req.params
    let sql = 'SELECT id, test_case_id AS testCase, text, date FROM test_case_comments WHERE id = ? '
    db.get(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}

exports.createTestCaseComment = (req, res) => {
    const {testCaseId, text, date} = req.body
    let sql = 'INSERT INTO test_case_comments ( test_case_id, text, date) VALUES (?,?,?)'
    const params = [testCaseId, text, date]
    db.run(sql, params, function (err, rows) {
        if (err){
            return res.status(500).json({error: err.message})
        }
        db.get('SELECT id, test_case_id AS testCase, text, date FROM test_case_comments WHERE id = ? ORDER BY id DESC ', [this.lastID], (err, row) => {
            if (err){
                return res.status(500).json({error: err.message})
            }
            res.status(201).json(row);
        })
    })
}

exports.updateTestCaseCommentById = (req, res) => {
    const {id} = req.params
    const {text} = req.body

    const sql = `UPDATE test_case_comments SET text = ? WHERE id = ?`
    db.run(sql, [text, id], function(err){
        if (err){
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0 ){
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({message: 'Item updated successfully'})
    })
}

exports.deleteTestCaseCommentById = (req, res) => {
    const {id} = req.params
    let sql = 'DELETE FROM test_case_comments WHERE id = ?'
    db.run(sql, [parseInt(id)], (err, row) => {
        if (err){
            return response.status(500).json({error: err.message})
        }
        res.json(row)
    })
}