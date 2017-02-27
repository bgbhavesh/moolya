import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import clusterRoutes from '../actions/clustersRoutes';
import {findChaptersTypeHandler} from '../actions/findChaptersTypeHandler'
export default class MlClusterChapterList extends Component
{
  constructor(props){
      super(props)
      this.findChapters.bind(this)
      this.state={
        data:[]
      }
      return this;
  }

  componentDidMount() {
    const resp=this.findChapters();
  }

  async findChapters() {
    let clusterId = this.props.params;
    const response = await findChaptersTypeHandler(clusterId);
    this.setState({loading: false, data: response});
    return response;
  }

  render(){
    const data=this.state.data||[];
    const list=  data.map((prop) =>
      <div className="col-md-2" key={prop._id}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={clusterRoutes.subChapterListRoute(prop.clusterId,prop._id)}> <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>
          <h3>{prop.chapterName}</h3>
        </div>
      </div>
    );

    return (<div>{list}</div>);

  }

}
