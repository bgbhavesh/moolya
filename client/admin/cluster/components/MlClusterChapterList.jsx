import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import clusterRoutes from '../actions/clustersRoutes';
export default class MlClusterChapterList extends Component
{
  constructor(props){
      super(props)
      this.state={
        data:[]
      }
      return this;
  }

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>{
      let image=prop.countryFlag&&prop.countryFlag.trim()!==""?<img src={`${prop.countryFlag}`}/>:<span className="ml ml-chapter"></span>;
      return (
        <div className="col-lg-2 col-md-4 col-sm-4" key={prop.chapterName}>
          <div className="list_block">
            <div className={`cluster_status ${prop.isActive|| ""}_cl `}></div>
            <a href={clusterRoutes.subChapterListRoute(prop.clusterId,prop._id)}> <div className={"hex_outer"}>
              {/*<img src={prop.countryFlag}/>*/}
              {image}
            </div></a>
            <h3>{prop.chapterName}</h3>
          </div>
        </div>
    )}
    );

    return (<div className="row">{list}</div>);

  }
}
