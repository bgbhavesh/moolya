import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlRequestedPortfolioTableConfig} from "../config/mlRequestedPortfolioConfig";
import  MlAssignComponent from "../../requested/component/MlAssignComponent"
import _ from 'lodash';
export default class MlRequestedPortfolioList extends Component {
  constructor(props){
    super(props);
    this.state={show:false,requestId:null};
    this.assignActionHandler.bind(this);
  }

  assignActionHandler(data){
    if(data&&data.id){
      this.setState({requestId:data.id,show:true});
      console.log(data);
      console.log("yipppe its working");
    }else{
      this.setState({requestId:null,show:false});
      toastr.error("please select a record");
    }
  }

  render() {
    let actions= mlRequestedPortfolioTableConfig.actionConfiguration;
    let action = _.find(actions, {"actionName": "assign"});
    action.handler=this.assignActionHandler.bind(this);
    let showAssignComponent=this.state.show;
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Requested List</h2>

          <MlTableViewContainer {...mlRequestedPortfolioTableConfig} forceFetch={false}/>

        </div>


      </div>
    )
  }
}
