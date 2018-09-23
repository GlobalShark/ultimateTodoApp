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


// Database insertion
try{
db.query('INSERT INTO ultimate_todo (todo, description) VALUES ($1, $2)', ["Todo App Development", "Make a todo app given from axiom"], (err) => {
  if (err) throw err;
  console.log("Insert Query Passed")
})
}catch (err){if(!err){  console.log("Insert Query Failed")
}}


// select all todos from db
try{
  db.query(`SELECT * FROM ultimate_todo`, (err, res) => {
    if (err) throw err;
    console.log("Get Query Passed")
})
}catch (err){if(!err){  console.log("Get Query Failed")
}}

//get one record from db
try{
const query = {
  todo: 'gym',
  text: 'SELECT * FROM ultimate_todo WHERE todo = todo'
}
db.query(query, (err, res) => {
  if (err) throw err;
    console.log("Get one record Query Passed")
})
}catch (err){if(!err){  console.log("Get One record Query Failed")
}}
//delete one record from db
try{
const query = {
  todo: 'gym',
  text: 'DELETE FROM ultimate_todo WHERE todo = todo'
}
db.query(query, (err, res) => {
  if (err) throw err;
    console.log("Delete one record Query Passed")
})
}catch (err){if(!err){  console.log("Delete One record Query Failed")
}}