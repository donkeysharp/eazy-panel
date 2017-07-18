import React, { Component } from 'react';

class ClusterSelector extends Component {
  handleClusterChange(e) {
    if (this.props.onClusterChange) {
      this.props.onClusterChange(e.currentTarget.selectedIndex);
    }
  }
  render() {
    let clusters = this.props.clusters;

    return <div className="row">
      <div className="col-md-12">
        <div className="form-group">
          <label>
            ECS Clusters
          </label>
          <select
            value={this.props.selectedCluster}
            className="form-control"
            onChange={this.handleClusterChange.bind(this)}>
            <option value="">--- Choose a Cluster ---</option>
            {
              // TODO: parse arn to the last part
              clusters.map((item, idx) => {
                return <option key={idx} value={idx}>
                  {item.Arn}
                </option>
              })
            }
          </select>
        </div>
      </div>
    </div>
  }
}

export default ClusterSelector;
