import ActionTypes from '../constant/index.js';
import history from "../../History";
import firebase from 'firebase';
import config from '../../config/firebaseConfig'; 

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export default class AuthActions {

    
    static signupAction(userObj){
        return dispatch => {
            firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
            .then( success => {
                console.log("UserCreated Successfully", success)
                delete userObj.password;
                userObj.uid = success.user.uid;
                userObj.joiningInfo = success.user.metadata.lastSignInTime;
               
                dispatch({ type : ActionTypes.SIGNUP_SUCCESS, payload : userObj})

                //sending data to firestore

                db.collection("users").doc(success.user.uid).set(userObj)
                .then( () =>{
                    console.log("Document successfully written!");
                    dispatch({ type : ActionTypes.WRITTEN_SUCCESS})
                    history.replace('/signin')
                })
                .catch( error => {
                    console.error("Error writing document: ", error);
                    dispatch({ type : ActionTypes.WRITTEN_ERROR, payload : error.message})
                });
            })
            
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Errrrror Code", errorCode);
                console.log("Errrrror Message", errorMessage);

                dispatch({ type : ActionTypes.SIGNUP_FAILURE, payload : error.message})
                
                
            });
            
        }
        
    }

    static signinAction (user) {
        return dispatch => {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then( success =>{
                console.log(success," SignIn Successfuly Done");
                let currentUserObj = {
                    uid : success.user.uid,
                    lastSignInTime : success.user.metadata.lastSignInTime
                }
                dispatch({ type : ActionTypes.SIGNIN_SUCCESS, payload : currentUserObj})
                localStorage.setItem("currentUserUid", success.user.uid)
            })
            .then( ()=>{

                history.replace('/dashboard');

            })
            .catch( error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                dispatch({ type : ActionTypes.SIGNIN_FAILURE, payload : error.message})

                console.log(errorCode, "ErrorCode");
                console.log(errorMessage, " errorMeassege");
                // ...
              });

        }
    }

    static logOut(){
        return dispatch => {
            console.log("userWanttologOut");
            localStorage.removeItem("currentUserUid");
        }
    }
    
}
