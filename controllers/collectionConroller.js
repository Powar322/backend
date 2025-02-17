const db = require('../connection.js')

exports.addCollection = function (request, response){
    response.set('content-type', 'application/json');
    let newId
    const sql = "INSERT INTO collections (name, description, project) VALUES (?, ?, ?)"
    db.run(sql, [request.body.name, request.body.description, request.body.project], function(err){
        if (err) throw err
        newId = this.lastID
        response.status(201);
        let data = {status: 201, message: `Collection ${newId} saved.`}
        let content = JSON.stringify(data)
        response.send(content);
    });
};
exports.getCollection = function(request, response){
    response.set('content-type', 'application/json');
    const sql = "SELECT * FROM collections"
    let data = {rows: []}
    db.all(sql, [], (err, rows) =>{
        rows.forEach(row => {
            data.rows.push({id: row.id, name: row.name, description: row.description, project: row.project})
        });
        let content = JSON.stringify(data.rows);
        response.send(content);
    });
};
exports.deleteCollection = function(request, response){
    response.set('content-type', 'application/json');
    const sql = "DELETE FROM collections WHERE id=?"
    db.run(sql, [request.query.id], (err, rows) =>{
        response.status(200);
        response.send(`{"message": "row ${request.query.id} deleted"}`)
    });
};

exports.getByIdCollection = function(request, response){
    response.set('content-type', 'application/json');
    const sql = "SELECT * FROM collections WHERE id=?"
    db.all(sql, [request.query.id], (err, rows) =>{
        let data = JSON.stringify(rows)
        response.status(200);
        response.send(data)
    });
};

exports.getAllNotInCollection = function(request, response){
    response.set('content-type', 'application/json');
    const sql = "SELECT test_cases.id, test_cases.case_id as caseId, test_cases.FK_collection_id as colId, collections.name as colName, test_cases.description FROM test_cases LEFT JOIN collections ON test_cases.FK_collection_id = collections.id where test_cases.FK_collection_id != ?"
    let data = {rows: []}
    db.all(sql, [request.query.id], (err, rows) =>{
        rows.forEach(row => {
            data.rows.push({id: row.id, caseId: row.caseId, FK_collection_id: row.colId, colName: row.colName, description: row.description})
        });
        let content = JSON.stringify(data.rows);
        response.send(content);
    });
}

exports.showCollection = function(request, response){
    response.set('content-type', 'application/json');
    //console.log(request.query.id)
    console.log(request.body)
};

