const grpc = require('grpc');                // code for using gRPC
const protoTodos = grpc.load('todo.proto');  // code for connecting protofile in server code
const server = new grpc.Server();            //code for generating gRPC server
const { Client } = require('pg')             //code for connecting postgreSQL to server

// list for inserting all tasks(initially empty)                                    
var todos = [{                               
   
    
}];
const connectionString = 'postgres://rumtkkwz:dpiYT-1VQW5rIqPertWCfDgg-s9_Smv1@elmer.db.elephantsql.com:5432/rumtkkwz'   //PostgreSQL url for current server db
const db = new Client({
    connectionString: connectionString,
})
db.connect((err) => {
    if (err) throw err;
    console.log('postgres connected')

})
//function for connecting protofile from server
server.addService(protoTodos.todoproto.TodoService.service, {
// function for getting all tasks from db
    list: function(_, callback) {
          db.query('SELECT * FROM ultimate_todo', (err, res) => {
             if (err) throw err;
              console.log("Tasks in DB are given below: ")
              console.log(res.rows);
              callback(null,{todos:res.rows})
          })
     },      

// function for getting selected task from db
  get: function(call, callback) {

 db.query('SELECT * FROM ultimate_todo WHERE todo = $1',[call.request.todo], (err, res) => {
             if (err) throw err;
              console.log("Requested Task given below: ")
              console.log(res.rows);
 })
  }, 
// function for inserting a task into db
 insert: function(call, callback) {
       console.log("my dat",call.request)
       db.query('INSERT INTO ultimate_todo (todo, description) VALUES ($1, $2)', [call.request.todo, call.request.description], (err) => {
            if (err) throw err;
            console.log("1 document inserted");
       })
 },
// function for deleting requested task from db
       delete: function(call, callback) {
            db.query('DELETE FROM ultimate_todo WHERE todo = $1', [call.request.todo], (err) => {
            if (err) throw err;
             console.log("1 document deleted");
            })
       },
// function for updating requested task
       update: function(call, callback) {
           db.query('UPDATE ultimate_todo SET description =$1  WHERE todo = $2', [call.request.description, call.request.todo], (err) => {
            if (err) throw err;
            console.log("1 document updated");
           })
       },
 });
 // gRPC Server
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('grpc server starting on :', '0.0.0.0:50051');
server.start();
console.log('grpc server running on :', '0.0.0.0:50051');
console.log("Type 'list' for exisisting Todo List ,Type get for selecting particular task, Type insert for inserting a task, Type delete for deleting a particular task");