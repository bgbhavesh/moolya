import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler} from '../../../../utils/formElemUtil';
var Select = require('react-select');

export default class MlIdeatorIntellectualPlanningAndTrademark extends React.Component{
   constructor(props) {
     super(props);
     this.state =  {data:{}};
     return this;
   }

  componentDidMount(){
    dataVisibilityHandler();
  }

  onInputChange(event){
    let dataDetails =this.state.data;
    let name  = event.target.name
    dataDetails[name]= event.target.value
    this.setState({data: dataDetails})
    this.sendDataToParent();
  }

  onLockChange(field, e){
    let dataDetails =this.state.data;
    let className = e.target.className;
    // let key = e.target.fieldName;
    let key = e.target.id;
    if(className.indexOf("fa-lock") != -1){
      dataDetails[key] = true;
    }else{
      dataDetails[key] = false;
    }
    this.setState({data:dataDetails})
    this.sendDataToParent();
  }

  sendDataToParent() {
    this.props.getIntellectualPlanning(this.state.data);
  }

  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="row requested_input">
                <div className="col-lg-12">

                  <div className="panel panel-default panel-form">
                    <div className="panel-heading">
                      Intellectual Training and Trademark
                    </div>
                    <div className="panel-body">

                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" onBlur={this.onInputChange.bind(this)} name="description"></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIntellectualPrivate" onClick={this.onLockChange.bind(this, "isIntellectualPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isIntellectualPrivate}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
};
