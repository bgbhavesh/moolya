import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlUserTypeTableConfig} from "../config/mlRequestedConfig";
import  MlAssignComponent from "./MlAssignComponent"
import _ from 'lodash';
export default class MlRequestedList extends Component {
  constructor(props){
     super(props);
     this.state={show:false,requestId:null};
     this.assignActionHandler.bind(this);
  }
  componentDidMount() {

    /*$("#Reg_Request").popover({
      'title' : 'Title Here',
      'html' : true,
      'placement' : 'top',
      'container' : '.admin_main_wrap',
      'content' : $(".ml_assignrequest").html()
    });*/

  }
  assignActionHandler(data){
    if(data&&data.id){
    this.setState({requestId:data.id,show:true});
    console.log(data);
    console.log("yipppe its working");
    }else{
      this.setState({requestId:null,show:false});
      toastr.error("Please select a record");
    }
  }

  render() {
   let actions= mlUserTypeTableConfig.actionConfiguration;
   let action = _.find(actions, {"actionName": "assign"});
   action.handler=this.assignActionHandler.bind(this);
   let showAssignComponent=this.state.show;
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Requested List</h2>

          <MlTableViewContainer {...mlUserTypeTableConfig} forceFetch={false}/>
          {showAssignComponent&&<MlAssignComponent />}
        </div>


      </div>
    )
  }
}
