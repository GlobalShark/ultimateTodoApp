import ActionTypes from '../constant/index.js';
import * as firebase from 'firebase';
// import "firebase/firestore" ;


// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});
var currentUserUid ;
export default class FireActions {
    static viewTodo(){
        currentUserUid = localStorage.getItem("currentUserUid");
        return dispatch => {
                let previousTodo = [];
                  db.collection('todo').doc(currentUserUid).collection('panding').get()
                  .then( sanpshot => {
                        sanpshot.docs.forEach( doc => {
                            let data = doc.data();
                            data.id = doc.id;
                            previousTodo.push(data);
                        })
                        dispatch({ type : ActionTypes.GET_TODO_SUCCESS , payload : previousTodo})
                  })
                  .catch( error => {
                    console.log("Error getting document:", error);
                  })
                } 
         
    }
    static submitTodoToDB(todoObj) {
        return dispatch => {
            db.collection("todo").doc(currentUserUid).collection("panding").add(todoObj)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef);
                todoObj.id = docRef.id;
            }).then( ()=>{
                dispatch ({type : ActionTypes.TODO_ADD_SUCCESS, payload : todoObj})
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            }); 
        }

    }
    static editTodo(key){
        return dispatch => {
            dispatch({type:ActionTypes.EDIT_TODO,payload:{id:key}})
        }
    }
    static saveEditTodo(id,data,index){
        return dispatch =>{
            db.collection("todo").doc(currentUserUid).collection("panding").doc(id).update({todo : data.todo})
            dispatch({type:ActionTypes.EDIT_TODO_SUCCESS,payload:{id:index}})
        }
    }
    
    static deleteTodo(key, ind){
        return dispatch => {
            dispatch({ type : ActionTypes.DELETE_SUCCESS, payload : ind })
            db.collection("todo").doc(currentUserUid).collection("panding").doc(key).delete()
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    }

    static closeEdit(id){
        console.log(id)
        return dispatch =>{
            dispatch({type:ActionTypes.CLOSE_EDIT,payload:{id:id}})
        }
    }

}






