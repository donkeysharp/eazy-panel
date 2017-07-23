import React, { Component } from 'react';

function getTaskId(taskArn) {
  let idx = taskArn.indexOf('/');
  if (idx === -1) {
    return taskArn;
  }

  return taskArn.slice(idx + 1);
}

function getLogsUrl(taskDefinition, task, index) {
  const containerDefinition = taskDefinition.ContainerDefinitions[index];

  const region = containerDefinition.LogConfiguration.Options['awslogs-region'];
  const logsGroup = containerDefinition.LogConfiguration.Options['awslogs-group'];
  const streamPrefix = containerDefinition.LogConfiguration.Options['awslogs-stream-prefix'];
  const containerName = containerDefinition.Name;
  const taskId = getTaskId(task.TaskArn);

  const protocol = 'https://';
  const cloudWatch = '.console.aws.amazon.com/cloudwatch/home?region=';

  let url = protocol + region + cloudWatch + region + '#logEventViewer:group=';
  url += logsGroup + ';stream=' + streamPrefix + '/' + containerName + '/' + taskId;

  return url;
}

function Status(props) {
  let className = 'label label-danger'
  if (props.status === 'RUNNING') {
    className = 'label label-success'
  };

  return <span className={className}>{props.status}</span>;
}

class ContainerDetails extends Component {
  render() {
    let taskDefinition = this.props.taskDefinition;
    let task = this.props.task;
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered table-condensed">
            <thead>
              <tr>
                <th className="col-md-1">Name</th>
                <th className="col-md-5">Image</th>
                <th className="col-md-1">Last Status</th>
                <th className="col-md-1">Logs</th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.containers.map((item, idx) => {
                return <tr key={idx}>
                  <td>{item.Name}</td>
                  <td>{taskDefinition.ContainerDefinitions[idx].Image}</td>
                  <td>
                    <Status status={item.LastStatus} />
                  </td>
                  <td>
                    <a href={getLogsUrl(taskDefinition, task, idx)} target="blank">
                      <i className="fa fa-file"></i>
                    </a>
                  </td>
                </tr>
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ContainerDetails;
