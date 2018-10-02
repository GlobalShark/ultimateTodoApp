export default class TodoActions{

    // Fetch Todos
    static fetchTodos(data){
        return{
            type:'FETCH_TODOS',
            payload:data
        }
    }
}