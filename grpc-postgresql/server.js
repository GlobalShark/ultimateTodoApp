const grpc = require('grpc');
const protoTodos = grpc.load('todo.proto');
const server = new grpc.Server();
const { Client } = require('pg')
var no_of_items = 0;
var todos = [{
   
    
}];
// Postgress connection
// const connectionString = 'postgres://postgres:123@localhost/ultimateTodo'
const connectionString = 'postgres://rumtkkwz:dpiYT-1VQW5rIqPertWCfDgg-s9_Smv1@elmer.db.elephantsql.com:5432/rumtkkwz'
const db = new Client({
    connectionString: connectionString,
})
db.connect((err) => {
    if (err) throw err;
    console.log('postgres connected')

})

server.addService(protoTodos.todoproto.TodoService.service, {

    list: function(_, callback) {
          db.query('SELECT * FROM ultimate_todo', (err, res) => {
             if (err) throw err;
              console.log("Tasks in DB are given below: ")
              console.log(res.rows);
          })
  
     },      


  get: function(call, callback) {

 db.query('SELECT * FROM ultimate_todo WHERE todo = $1',[call.request.todo], (err, res) => {
             if (err) throw err;
              console.log("Requested Task given below: ")
              console.log(res.rows);
 })
  }, 

 insert: function(call, callback) {
       console.log("my dat",call.request)
       db.query('INSERT INTO ultimate_todo (todo, description) VALUES ($1, $2)', [call.request.todo, call.request.description], (err) => {
            if (err) throw err;
            console.log("1 document inserted");
       })
 },

       delete: function(call, callback) {
            db.query('DELETE FROM ultimate_todo WHERE todo = $1', [call.request.todo], (err) => {
            if (err) throw err;
             console.log("1 document deleted");
            })
       },
 });
 // gRPC Server
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('grpc server starting on :', '0.0.0.0:50051');
server.start();
console.log('grpc server running on :', '0.0.0.0:50051');
console.log("Type 'list' for exisisting Todo List ,Type get for selecting particular task, Type insert for inserting a task, Type delete for deleting a particular task");