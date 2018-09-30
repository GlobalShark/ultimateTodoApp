import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = theme => ({
    snackbar: {
      margin: theme.spacing.unit,
    },
  });

export class TodoComponent extends React.Component {

    
    
    render() {
        return (
            <div>
                <SnackbarContent
                    className={styles.snackbar}
                    style={{"display": this.props._componentState.snackbar , "position" : "absolute"}}
                    message={
                    'Please write some value'
                    }
                />
                <div className = "main">
                    <h6>Write your Todo Here.... </h6>
                    <input type="text" name="todo" className = "input-tab form-control" value={this.props._componentState.todo} onChange={this.props._onChangeEvent}/>
                    <button className="add-btn btn btn-primary" onClick={this.props._addBtn}>Add Todo</button>
                </div>
                <ul className = " list-group">
                    {this.props._reducerState.todo.map((val,ind)=>{
                        return(
                            <li key={val.id} className="list-group-item list-group-item-light">{val.todo}
                            <span className = "edit" onClick={this.props._editItem.bind(this,ind)}>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </span>
                            <span className = "close" onClick={this.props._deleteItem.bind(this,val.id, ind)}>&times;</span>
                            <br/>
                            {(this.props._reducerState.todo[ind].isEdit)?
                                <div className = "row">
                                    <div>
                                        <input type="text" name="updatedTodo" className="form-control input col-md-7" placeholder="Enter text..." value={this.props._componentState.updatedTodo} onChange={this.props._onChangeEvent} />
                                        <span className = "save" onClick={this.props._saveEditValue.bind(this,val.id,ind)}><i className="fa fa-floppy-o" aria-hidden="true"></i></span>
                                        <span className = "edit-close" onClick={this.props._closeEdit.bind(this,ind)}><i className="fa fa-times" aria-hidden="true"></i></span>                         
                                    </div>
                                </div>
                                :
                                ""
                                
                            }
                            </li>
                        )

                    })}
                </ul>
                
            </div>
        )
    }
}
