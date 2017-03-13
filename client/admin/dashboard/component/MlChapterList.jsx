import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import dashboardRoutes from '../actions/routesActionHandler';
export default class MlChapterList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>{
      let image=prop.countryFlag&&prop.countryFlag.trim()!==""?<img src={`${prop.countryFlag}`}/>:<span className="ml ml-chapter"></span>;
      return (
      <div className="col-md-2" key={prop.displayName}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={dashboardRoutes.subChapterListRoute(prop.clusterId,prop._id)}> <div className={"hex_outer"}>
            {/*<img src={prop.countryFlag}/>*/}
            {/*<span className="ml ml-chapter"></span>*/}
            {image}
          </div></a>
          <h3>{prop.displayName}</h3>
        </div>
      </div>)
    }
  );
    return (<div className="row">{list}</div>);
  }
}

{/*
<span className="ml ml-chapter"></span>*/}
