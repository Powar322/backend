const sql3 = require('sqlite3').verbose()
const db = new sql3.Database('./firstDb.db', sql3.OPEN_READWRITE, connected);

function connected(err){
    if(err){
        console.log(err.message)
    }
    else{
    console.log('Connected')
    }
}
module.exports = db;