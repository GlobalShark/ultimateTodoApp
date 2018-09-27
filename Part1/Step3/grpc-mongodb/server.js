const grpc = require('grpc');    // code for using gRPC
const protoTodos = grpc.load('todo.proto');  // code for connecting protofile in server code
const server = new grpc.Server();  //code for generating gRPC server
var mongo = require('mongodb'); //code for connecting mongodb to server
var MongoClient = require('mongodb').MongoClient;  //code for connecting mongodb to server
var url = "mongodb://localhost:27017/todolist";   //mongodb url for current server db
 // list for inserting all tasks(initially empty)
var todos = [{        
   
    
}];
//function for connecting protofile from server
server.addService(protoTodos.todoproto.TodoService.service, {
// function for getting all tasks from db
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
      // function for getting selected task from db
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
    // function for inserting a task into db
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
       
    },
       
       // function for deleting requested task from db
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

    // function for updating requested task
    update: function(call, callback) {
       var todo = call.request;
       var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todolist");
  var myquery = {title: call.request.title  };
  var newvalues = { $set: {title:call.request.title,description:call.request.description,priority:call.request.priority,done:call.request.done } };
  dbo.collection("tasks").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
   
    },
});
// gRPC Server code(that bind and runs the server)
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('grpc server starting on :', '0.0.0.0:50051');
server.start();
console.log('grpc server running on :', '0.0.0.0:50051');
console.log("Type 'list' for exisisting Todo List ,Type get for selecting particular task, Type insert for inserting a task, Type delete for deleting a particular task");