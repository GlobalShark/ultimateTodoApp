const INITIAL_STATE={
    todoData:{},
    sucess:false
}  
// Fetch Todos
const FetchTodos = (state=INITIAL_STATE,action)=>{
    var FETCH_TODOS = 'FETCH_TODOS'
    switch(action.type){
        case FETCH_TODOS:
        return{
            sucess: true,todoData:action
        }
        default:
             return state;
    }
}
export default FetchTodos;
