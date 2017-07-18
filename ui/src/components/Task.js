import React, { Component } from 'react';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDetails: false
    }
  }
  handleDisplayDetailsClick(e) {
    e.preventDefault();

    this.setState({
      displayDetails: !this.state.displayDetails
    })
  }
  getDetails() {
    if (!this.state.displayDetails) {
      return <div></div>;
    }
    return <div className="details">
      <p>details</p>
    </div>
  }
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
            <a href="#" onClick={this.handleDisplayDetailsClick.bind(this)}>
              <i className="fa fa-eye"></i>
            </a>
          </div>
        </div>
        {this.getDetails()}
      </div>
    );
  }
}
export default Task
