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

exports.updateTestCaseById = (req, res) => {
    const { id } = req.params;
    const {
        testCaseId,
        collectionId,
        description,
        testCaseName,
        testData
    } = req.body;

    // Проверяем, что хотя бы одно поле передано для обновления
    if (!testCaseId && !collectionId && !description && !testCaseName && !testData) {
        return res.status(400).json({ error: "At least one field must be provided for update" });
    }

    // Динамически формируем SQL запрос
    let sqlParts = [];
    let params = [];

    if (testCaseId !== undefined) {
        sqlParts.push("case_id = ?");
        params.push(testCaseId);
    }
    if (collectionId !== undefined) {
        sqlParts.push("FK_collection_id = ?");
        params.push(parseInt(collectionId));
    }
    if (description !== undefined) {
        sqlParts.push("description = ?");
        params.push(description);
    }
    if (testCaseName !== undefined) {
        sqlParts.push("name = ?");
        params.push(testCaseName);
    }
    if (testData !== undefined) {
        sqlParts.push("test_data = ?");
        params.push(testData);
    }

    params.push(parseInt(id)); // Добавляем id в конец параметров

    const sql = `UPDATE test_cases SET ${sqlParts.join(", ")} WHERE id = ?`;

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Test case not found" });
        }

        // Возвращаем обновленную запись (опционально)
        const getSql = 'SELECT test_cases.id, test_cases.case_id AS testCaseId, test_cases.FK_collection_id AS collectionId, collections.name AS testCaseCollectionName, test_cases.description, test_cases.name AS testCaseName, test_cases.test_data AS testData FROM test_cases LEFT JOIN collections on test_cases.FK_collection_id = collections.id WHERE test_cases.id = ?';

        db.get(getSql, [parseInt(id)], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(row);
        });
    });
};