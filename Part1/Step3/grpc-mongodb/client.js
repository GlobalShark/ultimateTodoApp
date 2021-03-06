
const PROTO_PATH = __dirname + '/todo.proto'; //path of protofile from current file(client.js)
const grpc = require('grpc');  // code for using gRPC
var protoLoader = require('@grpc/proto-loader'); //load a grpc pakage

var packageDefinition = protoLoader.loadSync(  // necessary coding for protofile required for running client
    PROTO_PATH, { keepCase: true, enums: String, defaults: true });
var todoproto = grpc.loadPackageDefinition(packageDefinition).todoproto;
// The protoDescriptor object has the full package hierarchy

var client = new todoproto.TodoService('0.0.0.0:50051', grpc.credentials.createInsecure());
console.log("Type 'list' for exisisting Todo List ,Type get for selecting particular task, Type insert for inserting a task, Type delete for deleting a particular task")
function printResponse(error, response) {
    if (error)
        console.log('Error: ', error);
    else
        console.log('response',response);
}
//function that request to get complete todolist from db
function todosList() {   
  client.list({}, function (error, todos) {
       printResponse(error, todos);
    });
    }
//function that request for inserting a task

function insertTodo(_id, title, description,priority,done) {
    var todo = {
        _id: parseInt(_id),
        title: title,
        description: description,
        priority:priority,
        done:done
    };
    client.insert(todo, function (error, empty) {
        console.log("Task INSERTED SUCCESSFULLY");
        printResponse(error, empty);
    });
}
 //function that request to get a particular task from db
function getTodo(title) {
    client.get({
        title:title
    }, function (error, todo) {
        printResponse(error, todo);
    });
}
 //function that request to delete a particular todo
function deleteTodo(title) {
    client.delete({
        title:title
    }, function (error, empty) {
        console.log("TASK DELETED SUCCESSFULLY");
        
        printResponse(error, empty);
    });
}
//function that request to update a particular task into db
function updateTodo(title, description,priority,done) {
    var todo = {
        title: title,
        description: description,
        priority:priority,
        done:done
    };
    client.update(todo, function (error, empty) {
        console.log("Task UPDATED SUCCESSFULLY");
        printResponse(error, empty);
    });
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();
// all commands for todo list 
if (command == 'list')
    todosList();
else if (command == 'insert')
    insertTodo(process.argv[0], process.argv[1], process.argv[2],process.argv[3],process.argv[4]);
else if (command == 'get')
    getTodo(process.argv[0]);
else if (command == 'delete')
    deleteTodo(process.argv[0]);
else if (command == 'update')
    updateTodo(process.argv[0], process.argv[1], process.argv[2],process.argv[3]);
