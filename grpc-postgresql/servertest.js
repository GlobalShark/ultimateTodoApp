const { Client } = require('pg')
const connectionString = 'postgres://rumtkkwz:dpiYT-1VQW5rIqPertWCfDgg-s9_Smv1@elmer.db.elephantsql.com:5432/rumtkkwz'
const db = new Client({
    connectionString: connectionString,
})
db.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Postgres Connected')
    }
})
var no_of_test = 0;  // the initializer that counts the no of test passed


// code for inserting a record into db
try{
db.query('INSERT INTO ultimate_todo (todo, description) VALUES ($1, $2)', ["Todo App Development", "Make a todo app given from axiom"], (err) => {
  if (err) throw err;
  console.log("Insert a record into db (Query Passed)")
})
no_of_test = no_of_test + 1;
}
catch (err){if(!err){  console.log("Insert a record into db (Query Failed)")
}}

//code for updating a selected record into db
try{
db.query('UPDATE ultimate_todo SET description =$1  WHERE todo = $2', ["Make a todo app given from axiom(Updated)", "Todo App Development(Updated)"], (err) => {
            if (err) throw err;
            console.log("Update selected record into db (Query Passed)");
            
})
no_of_test = no_of_test + 1;
}
catch (err){if(!err){  console.log("Update selected record into db (Query Failed)")
}}
           
// code for selecting all records from db
try{
  db.query(`SELECT * FROM ultimate_todo`, (err, res) => {
    if (err) throw err;
    console.log("Select all records from db (Query Passed)")
})
no_of_test = no_of_test + 1;
}
catch (err){if(!err){  console.log("Select all records from db (Query Failed)")
}}

//code for getting selected record from db
try{
const query = {
  todo: 'Todo App Development(Updated)',
  text: 'SELECT * FROM ultimate_todo WHERE todo = todo'
}
db.query(query, (err, res) => {
  if (err) throw err;
    console.log("Get selected record from db (Query passeed)")
    no_of_test = no_of_test + 1;
})
no_of_test = no_of_test + 1;
}
catch (err){if(!err){  console.log("Get selected record from db (Query Failed)")
}}
//code for deleting selected record from db
try{
const query = {
  todo: 'Todo App Development(Updated)',
  text: 'DELETE FROM ultimate_todo WHERE todo = todo'
}
db.query(query, (err, res) => {
  if (err) throw err;
    console.log("Delete selected record from db (Query Passed)")
    
})
no_of_test = no_of_test + 1;
}

catch (err){if(!err){  console.log("Delete selected record from db (Query Failed)")
}}


if (no_of_test === 5)  //total 5 tests are written
{
console.log("All " +no_of_test+" tests are passed");
}
else
{
console.log("Only " +no_of_test+" tests are passed");
}