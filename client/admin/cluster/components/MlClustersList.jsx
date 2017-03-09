import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import clusterRoutes from '../actions/clustersRoutes';
import MlActionComponent from '../../../commons/components/actions/ActionComponent'

export default class MlClustersList extends Component {

  render(){
    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
      // {
      //   showAction: true,
      //   actionName: 'add',
      //   handler: async(event) => this.props.handler(this.assignBackendUsers.bind(this))
      // },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-lg-2 col-md-3 col-sm-3" key={prop.displayName}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={clusterRoutes.clusterDetailsRoute(prop.id)}> <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>
          <h3>{prop.displayName}</h3>
        </div>
      </div>
    );

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          {list}
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>
      </div>
    );

  }

}
