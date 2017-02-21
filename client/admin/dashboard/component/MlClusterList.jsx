import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import dashboardRoutes from '../actions/routesActionHandler';
export default class MlClusterList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-md-2" key={prop.displayName}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={dashboardRoutes.chapterListRoute(prop.id)}> <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>
          <h3>{prop.displayName}</h3>
        </div>
      </div>
  );

    return (<div>{list}</div>);

  }

}

