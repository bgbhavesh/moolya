import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import chapterRoutes from '../actions/chapterRoutes';
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
export default class MlChapterList extends Component {

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
      <div className="col-md-2" key={prop._id}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={chapterRoutes.subChapterListRoute(prop.clusterId,prop._id)}> <div className={"hex_outer"}><img src={prop.subChapterImageLink}/></div></a>
          <h3>{prop.chapterName} </h3>
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

