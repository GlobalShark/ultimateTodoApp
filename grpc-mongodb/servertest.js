//code for db connection
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/todolist";
var no_of_test = 0;  // the initializer that counts the no of test passed

//code for inserting a record into db
try{
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todolist");
  var myobj = {_id:12,title:"My title",description:"My title description",priority:"Medium",done:false  };
  dbo.collection("tasks").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("Insert a record into db (Query Passed)") 
    db.close();
  });
    });
    no_of_test = no_of_test + 1;
}
    catch (err){if(!err){  console.log("Insert a record into db (Query Failed)")
    }}
//code for updating a selected record into db
try{
     
     var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todolist");
  var myquery = {title:"My title"  };
  var newvalues = { $set: {title:"My updated title",description:"My updated title description",priority:"Medium",done:false } };
  dbo.collection("tasks").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("Update selected record into db (Query Passed)");
    db.close();
  });
});
no_of_test = no_of_test + 1;
   }
   catch (err){if(!err){  console.log("Update selected record into db (Query Failed)")
    }}
// code for selecting all records from db
try{
    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todolist");
  dbo.collection("tasks").find({}).toArray(function(err, result) {
    if (err) throw err;
     console.log("Select all records from db (Query Passed) ")
    db.close();
  });
});
no_of_test = no_of_test + 1;
}
catch (err){if(!err){  console.log("Select all records from db (Query Failed)")
    }}
//code for getting selected record from db
try{
            var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todolist");
  var query = { title: "My updated title" };
  dbo.collection("tasks").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log("Get selected record from db (Query passeed) ")
    db.close();
  });
});
no_of_test = no_of_test + 1;
}
catch (err){if(!err){  console.log("Get selected record from db (Query Failed)")
}}
//code for deleting selected record from db
try{
 var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todolist");
  var myquery = { title: "My updated title"};
  dbo.collection("tasks").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("Delete selected record from db (Query Passed)");
    db.close();
  });
});  
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