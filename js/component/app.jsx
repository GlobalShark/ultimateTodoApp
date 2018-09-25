import React,{Component} from "react";
import {Provider} from 'react-redux';
import store from './store'
import Routers from '../router/router'

class App extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
            <Provider store={store}>
                <Routers />
            </Provider>
            </div>
        )
    }
}
export default App