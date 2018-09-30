import React from 'react';
import { connect } from 'react-redux'
import { TodoComponent } from '../components/todo';
import { FireActions } from '../store/actions/index';

class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo:"",
            allTodos:[],
            isEdit:false,
            updatedTodo:"",
            snackbar : "none"
        }
       this.props.viewTwo();

    }
    componentDidMount(){
        
    }
    componentWillReceiveProps(nextProps){
            if(nextProps.fireReducer.todo !== null){
                this.setState({
                    allTodos : this.props.fireReducer.todo
                })
                console.log("done")
            }

    }

    onChangeEvent(e){
        this.setState({[e.target.name]:e.target.value, snackbar : "none"})
    }

    addItem(){
        if(this.state.todo.trim() !== ""){
            let todoObj = {
                todo:this.state.todo.trim(),
                createDate : new Date().toDateString() + " " + new Date().toLocaleTimeString(),
                dueDate : "12:10:2018",
            }
            this.props.addBtn(todoObj)
            let previousTodos = []
            previousTodos = this.props.fireReducer.todo
            previousTodos.push(todoObj)
            this.setState({todo:""})
        }
        else
        {
            this.setState({snackbar : "block"})

        }

    }
    deleteItem(key , ind){
        this.props.deleteBtn(key, ind)
        this.deleteSuccess()
    }
    deleteSuccess(){
        this.setState({allTodos : this.props.fireReducer.todo})
    }
    editItem(key){
        this.props.editBtn(key);
        this.setState({updatedTodo : ''});
    }

    saveEditbtn(id,index){
        if(this.state.updatedTodo.trim() !== ""){
            let value ={
                todo:this.state.updatedTodo.trim(),
                isEdit:this.state.isEdit
            }
            this.props.saveEdit(id,value,index)
            this.setState({updatedTodo:""})
            this.props.viewTwo();
        }
        else{
            this.setState({snackbar : "block"})
        }
        
    }
    closeEditItem(id){
        this.props.closeEditbtn(id);
    }
    render() {
        
        return (
            <div>
                <TodoComponent _addBtn={this.addItem.bind(this)} _onChangeEvent={this.onChangeEvent.bind(this)}
                _reducerState={this.props.fireReducer}
                 _componentState={this.state}  
                _deleteItem={this.deleteItem.bind(this)} _editItem={this.editItem.bind(this)}
                _saveEditValue={this.saveEditbtn.bind(this)} _closeEdit={this.closeEditItem.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return({
        authReducer : state.auth,
        fireReducer: state.fire
    })
}
function mapDispatchToProps(dispatch){
    return({
        addBtn: (data)=>{dispatch(FireActions.submitTodoToDB(data))},
        deleteBtn: (id)=>{dispatch(FireActions.deleteTodo(id))},
        editBtn: (id)=>{dispatch(FireActions.editTodo(id))},
        saveEdit: (id, value, index) => {dispatch(FireActions.saveEditTodo(id, value, index))},
        closeEditbtn : (id) => {dispatch(FireActions.closeEdit(id))},
        viewTwo : (currentUser)=>{dispatch(FireActions.viewTodo(currentUser))}
        
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoContainer);
