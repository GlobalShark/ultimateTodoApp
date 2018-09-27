import axios from 'axios';//Axios
import TodoActions from '../actions/todo';//Redux Actions
export default class TodoMiddleware{

// Add Todo
    static asynctodo(data){
        return (dispatch)=>{
            console.log('mY DATA',data)
        axios.post(`http://localhost:5050/addTodo`, {data })
        .then(res=>{
            console.log('res',res)
        })
        }
    }

    // Fetch Todo
    static asyncFetchTodo(){
        return (dispatch)=>{
            axios.get(`http://localhost:5050/fetchtodoapi/v1.0`).then((res)=>{
                dispatch(TodoActions.fetchTodos(res.data))
             })   
        }
    }

    // Delete Todo
    static deleteTodo(data){
        return (dispatch)=>{
            axios.delete(`http://localhost:5050/delete`, {data })
            .then(res=>{
            console.log('res',res)
        })
        }
    }

    // Update Todo
    static updateTodo(data){
        return(dispatch)=>{
            axios.put(`http://localhost:5050/update`, {data })
            .then(res=>{
            console.log('res',res)
        })  
        }
    }

}