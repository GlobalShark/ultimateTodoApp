import React, { Component } from 'react';
import './todolist.css';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase';
import {db} from '../../index';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Description from '@material-ui/icons/Description';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';




const styles = theme => ({
    list: {
     'text-align': 'center',
      backgroundColor: theme.palette.background.paper,
    },
    button: {
        'width': '40px',
        'height': '20px',
        'margin-left': '10px',
        'float': 'right,'
    },
    textField: {
        'width': '50%',
    },
  });


//this component props
//  todoID  todo description    userID
//for material ui menue



const ITEM_HEIGHT = 42;

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateVal: '',
            todos: {},
          
        }
    }
 
    
    
      deleteTodo = () => {
          var todoID = this.props.todoID;
      
            var that = this;
            var todoData={};
            var userData ={};
          
            
          //getting data
          db.collection("users").doc(this.props.userID).get().then(function(doc) {
             userData = doc.data();
            todoData = userData.todos;
            // console.log(userData)
            console.log(todoData)

            //deleting todo
            for(var key in todoData) {
                console.log(todoData[key].todoID)
                console.log(todoID)
                       
                if(todoID === todoData[key].todoID) {
                    delete todoData[key]
                    
                    console.log('delete')
                    console.log(todoData)
                  
                        db.collection("users").doc(that.props.userID).update({
                        "todos" : todoData
                         })
                        .then(function() {
                        console.log("Document successfully updated!");
                        });
                        // .catch(function(error) {
                        //     console.error("Error writing document: ", error);
                        // });
                   
                }
               
                }
   
          
          
         })
    .catch(function(error) {
            console.log("Error getting document:", error);
        });
        
         
      }

      updateHandler = (ev) => {
            this.setState({updateVal: ev.target.value})
      }

      updateTodo = () => {
          console.log('update')
          console.log(this.state.updateVal)
          var todoID = this.props.todoID;
      
          var that = this;
          var todoData={};
          var userData ={};
        
          
        //getting data
        db.collection("users").doc(this.props.userID).get().then(function(doc) {
           userData = doc.data();
          todoData = userData.todos;
          // console.log(userData)
          console.log(todoData)

          //updating todo
         
          for(var key in todoData) {
              console.log(todoData[key].todoID)
              console.log(todoID)
                     
              if(todoID === todoData[key].todoID) {
                //   delete todoData[key]
                todoData[key].todo = that.state.updateVal
                console.log('updating')
                  
             
                  console.log(todoData)
                
                      db.collection("users").doc(that.props.userID).update({
                      "todos" : todoData
                       })
                      .then(function() {
                      console.log("Document successfully updated!");
                      });
                      // .catch(function(error) {
                      //     console.error("Error writing document: ", error);
                      // });
                 
              }
             
              }
 
        
        
      })
  .catch(function(error) {
          console.log("Error getting document:", error);
      });
      
      }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            
                 <p className='list-text'>{this.props.todo}</p>
        
                </ExpansionPanelSummary>


                <ExpansionPanelDetails>

                     <TextField
                    id="update"
                    label="update"
                    value={this.state.updateVal}
                    className={classes.textField}
                    onChange={this.updateHandler}
                    margin="normal"
                    />
                                     {/* <h2>Description:</h2>
                                     <p>{this.props.description}</p> */}
                                     
                              <Button variant="fab" onClick={this.updateTodo} color="primary" className={classes.button} aria-label="Update" >
                            <UpdateIcon />
                             </Button>    
                             <Tooltip title={this.props.description}>
                             <Button variant="fab" onClick={this.deleteTodo} color="primary" className={classes.button} aria-label="Description" >
                            <Description />
                             </Button>  
                             </Tooltip>      
                             <Button variant="fab" onClick={this.deleteTodo} color="primary" className={classes.button} aria-label="Delete" >
                            <DeleteIcon />
                        </Button>
                     

                </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
            </div>
        )
    }
}





TodoList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default (withStyles(styles)(TodoList));



