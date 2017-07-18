import React, { Component } from 'react';

class Task extends Component {
  render() {
    return (
      <div className="task">
        <div className="task-header">
          <div className="item task-id">
            <b>Task ID</b>
            <br />
            {this.props.task.TaskArn}
          </div>
          <div className="item task-def">
            <b>Task Definition</b>
            <br />
            {this.props.task.TaskDefinitionArn}
          </div>
          <div className="item task-view">
            <i className="fa fa-eye"></i>
          </div>
        </div>
        <div className="details">
        </div>
      </div>
    );
  }
}
export default Task
