import React, { Component } from 'react';
import ClusterSelector from '../components/ClusterSelector';
import ClusterBody from '../components/ClusterBody';
import { $http } from '../utils';


class EcsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusters: {
        loading: false,
        data: [],
        current: -1
      }
    }
  }
  componentDidMount() {
    this.setState({
      clusters: {
        loading: true,
        data: this.state.clusters.data,
        current: -1
      }
    });
    $http.get('/api/clusters').then((data) => {
      this.setState({
        clusters: {
          loading: false,
          data: data,
          current: -1
        }
      })
    })
  }
  handleClusterChange(index) {
    this.setState({
      clusters: {
        loading: false,
        data: this.state.clusters.data,
        current: index - 1 // There is an empty option
      }
    })
  }
  getClusterDetails() {
    if (this.state.clusters.current === -1) {
      return <div>No details</div>;
    }
    let clusters = this.state.clusters.data;
    let index = this.state.clusters.current;
    return <ClusterBody cluster={clusters[index]} />
  }
  getBody() {
    if (this.state.clusters.loading) {
      return <center>
        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </center>
    }
    return (
      <div>
        <ClusterSelector
          selectedCluster={this.state.clusters.current}
          clusters={this.state.clusters.data}
          onClusterChange={this.handleClusterChange.bind(this)} />
        { this.getClusterDetails() }
      </div>
    );
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <b>Basic ECS Cluster Panel</b>
            </div>
            <div className="panel-body">
              {this.getBody()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EcsContainer;
