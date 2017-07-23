import React, { Component } from 'react';
import Task from './Task'
import './cluster-body.css'

class ClusterBody extends Component {
  handleTaskDefintionLoad(taskDefinitionArn) {
    if (this.props.onTaskDefinitionLoad) {
      this.props.onTaskDefinitionLoad(taskDefinitionArn);
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h4 className="subtitle">Tasks</h4>
          <div className="row">
            <div className="col-md-12">
            {
              this.props.cluster.Tasks.map((item, idx) => {
                return (
                  <Task
                    key={idx}
                    task={item}
                    taskDefinition={this.props.taskDefinitions[item.TaskDefinitionArn]}
                    onTaskDefinitionLoad={this.handleTaskDefintionLoad.bind(this)}
                  />
                );
              })
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClusterBody
