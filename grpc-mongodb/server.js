const grpc = require('grpc');
const protoTodos = grpc.load('todo.proto');
const server = new grpc.Server();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/todolist";

var no_of_items = 0;
var todos = [{
   
    
}];

server.addService(protoTodos.todoproto.TodoService.service, {

    list: function(_, callback) {
        var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todolist");
  dbo.collection("tasks").find({}).toArray(function(err, result) {
    if (err) throw err;
     console.log("Tasks in DB are given below: ")
     console.log(result);
    db.close();
  });
});
    },

    get: function(call, callback) {
        var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todolist");
  var query = { title: call.request.title };
  dbo.collection("tasks").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log("Requested Task Here: ")
    console.log(result);
    db.close();
  });
});
},   

    insert: function(call, callback) {
       var todo = call.request;
       var MongoClient = require('mongodb').MongoClient;
       var url = "mongodb://localhost:27017/";

       MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       var dbo = db.db("todolist");
       dbo.collection("tasks").insertOne(todo, function(err, res) {
       if (err) throw err;
       console.log("1 document inserted");
       db.close();
  });
});
       // todos.push(todo);
       // callback(null, {});
    },
       

    delete: function(call, callback) {
    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todolist");
  var myquery = { title: call.request.title};
  dbo.collection("tasks").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});    
    },   
});
// gRPC Server
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('grpc server starting on :', '0.0.0.0:50051');
server.start();
console.log('grpc server running on :', '0.0.0.0:50051');
console.log("Type 'list' for exisisting Todo List ,Type get for selecting particular task, Type insert for inserting a task, Type delete for deleting a particular task");