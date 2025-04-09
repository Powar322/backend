const db = require('../connection.js')

exports.getTestCase = function(request, response){
    response.set('content-type', 'application/json');
    const sql = "SELECT * FROM test_cases"
    let data = {rows: []}
    db.all(sql, [], (err, rows) =>{
        rows.forEach(row => {
            data.rows.push({id: row.id, name: row.FK_collection_id, description: row.description, project: row.project})
        });
        let content = JSON.stringify(data.rows);
        response.send(content);
    });
};

exports.addTestCase = function (request, response){
    let newId
    const sql = `INSERT INTO test_cases (case_id, FK_collection_id, name, description, test_data) VALUES (?, ?, ?, ?, ?)`
    db.run(sql, [request.body.caseId, request.body.fkCollectionId, request.body.name, request.body.description, request.body.testData], function(err){
        if (err) throw err
        newId = this.lastID
        response.status(201);
        let data = {status: 201, message: `Test case ${newId} saved.`}
        let content = JSON.stringify(data)
        response.send(content);
    });
};

exports.getByColTestCase = function(request, response){
    response.set('content-type', 'application/json');
    const sql = "SELECT test_cases.id, test_cases.case_id, collections.name as col_name, test_cases.description, test_cases.name, test_cases.test_data FROM test_cases LEFT JOIN collections on test_cases.FK_collection_id = collections.id WHERE collections.id = ?"
    let data = {rows: []}
    db.all(sql, [request.query.colId], (err, rows) =>{
        rows.forEach(row => {
            data.rows.push({id: row.id, caseId: row.case_id, colName: row.col_name, description: row.description, testCaseName: row.name, testData: row.test_data,  })
        });
        let content = JSON.stringify(data.rows);
        response.send(content);
    });
};

exports.getByIdtestCase = function(request, response){
    response.set('content-type', 'application/json');
    const sql = "SELECT test_cases.id, test_cases.case_id as caseId, test_cases.FK_collection_id as colId, collections.name as colName,test_cases.name as testName, test_cases.description, test_cases.test_data as testData FROM test_cases LEFT JOIN collections ON test_cases.FK_collection_id = collections.id where test_cases.id = ?"
    db.all(sql, [request.query.id], (err, rows) =>{
        let data = JSON.stringify(rows[0])
        response.status(200);
        response.send(data)
    });
};

exports.getStepsByIdtestCase = function(request, response){
    response.set('content-type', 'application/json');
    const sql = "SELECT test_case_steps.id, test_case_steps.FK_test_case_id as testCaseId, test_case_steps.number_of_step as numberOfStep, test_case_steps.step from test_case_steps LEFT JOIN test_cases ON test_cases.id = test_case_steps.FK_test_case_id where test_case_steps.FK_test_case_id = ?"
    let data = {rows: []}
    db.all(sql, [request.query.id], (err, rows) =>{
        rows.forEach(row => {
            data.rows.push({id: row.id, testCaseId: row.testCaseId, numberOfStep: row.numberOfStep, step: row.step})
        });
        let content = JSON.stringify(data.rows);
        response.send(content);
    });
};

exports.createTestStep = function(request, response){
    response.set('content-type', 'application/json');
    let newId
    const sql = "INSERT INTO test_case_steps (FK_test_case_id, number_of_step, step) VALUES (?,?,?)"
    db.run(sql, [request.body.FKTestCaseId,request.body.numberOfStep, request.body.step], function(err){
        if (err) throw err
        newId = this.lastID
        response.status(201);
        let data = {status: 201, message: `Test step ${newId} saved.`}
        let content = JSON.stringify(data)
        response.send(content);
    } )

}

exports.showCollection = function(request, response){
    response.set('content-type', 'application/json');
    //console.log(request.query.id)
    console.log(request.body)
};

