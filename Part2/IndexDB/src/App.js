import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /><br/><br/>
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <div className="wrapper">
          <div className="content-i">
            <div className="element-box">
                <div className="row">
                  <div className="col-sm-12 text-left">
                      <div className="element-wrapper">
                      <div id="todo-list" className="row">
                          <div id="clockers">
                            <div id="clock">
                              <div className="point"></div>
                              <div className="point"></div>
                              <div className="point"></div>
                              <div className="point"></div>
                              <div className="hours"></div>
                              <div className="minutes"></div>
                              <div className="seconds"></div>
                              <div className="center"></div>
                            </div>
                          </div>
                          <div id="txt" ></div>
                        <div className="col-sm-12" id="addToDo"><br/><br/><br/><br/>
                      <h4 className="element-header">
                        Your's Todo
                      </h4><br/>
                        <div id="task">
                          {/* <span className="todo-wrap">
                            <input type="checkbox" id="1" defaultChecked />
                            <label htmlFor="1" className="todo">
                              <i className="fa fa-check"></i>
                              Have a good idea
                            </label>
                            <div className="timeLine">
                              At 15-Sep-18 11:47
                            </div>
                            <span className="delete-item" title="remove">
                              <i className="fa fa-times-circle"></i>
                            </span>
                          </span> */}
                        </div>
                        <span className="todo-wrap">
                          <label htmlFor="" className="todo">
                            <input id="text-todo" type="text" className="input-todo" placeholder="Write.. Todo"/>
                            <input id="date-todo" type="text" className="input-todo single-daterange" />
                            <input id="time-todo" type="text" className="input-todo clockpicker" placeholder="Time"/>
                          </label>
                        </span>
                        </div>
                        <div id="add-todo">
                          <i className="fa fa-plus"></i>
                          Add Item
                        </div> &nbsp; &nbsp;
                          <div id="action-todo">
                            <i className="ti-microphone"></i>
                            Listen Todo
                          </div>
                          {/* <div className="col-sm-12 text-right">
                            <div className="btn btn-danger">
                              <i className="ti-logout"></i>
                              Logout
                            </div>
                          </div> */}
                      </div>
                    </div>
                    </div>
                  </div><br/><br/><br/><br/><br/>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default App;
