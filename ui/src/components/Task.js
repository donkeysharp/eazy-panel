import React, { Component } from 'react';
import ContainerDetails from './ContainerDetails';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDetails: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.task.TaskArn !== nextProps.task.TaskArn) {
      this.setState({ displayDetails: false });
    }
  }
  handleDisplayDetailsClick(e) {
    e.preventDefault();

    this.setState({
      displayDetails: !this.state.displayDetails
    })
    if (this.props.onTaskDefinitionLoad && !this.props.taskDefinition) {
      this.props.onTaskDefinitionLoad(this.props.task.TaskDefinitionArn)
    }
  }
  getDetails() {
    if (!this.state.displayDetails) {
      return <div></div>;
    }
    let taskDefinition = this.props.taskDefinition;

    if (!taskDefinition) {
      return <div><i className="fa fa-spinner fa-spin"></i>&nbsp;Loading...</div>
    }

    return <div className="details">
      <p><b>Containers</b>:</p>
      <ContainerDetails
        taskDefinition={taskDefinition}
        task={this.props.task}
        containers={this.props.task.Containers}
      />
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
