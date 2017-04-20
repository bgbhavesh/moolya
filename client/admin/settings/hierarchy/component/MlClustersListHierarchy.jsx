import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import hierarchyRoutes from '../actions/hierarchyRoutes';

export default class MlClustersListHierarchy extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-lg-2 col-md-4 col-sm-4" key={prop.displayName}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={hierarchyRoutes.chapterListRoute(prop.id)}> <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>
          <h3>{prop.displayName}</h3>
        </div>
      </div>
    );

    return (
    <div className="row">
          {list}
      </div>
    );

  }

}
