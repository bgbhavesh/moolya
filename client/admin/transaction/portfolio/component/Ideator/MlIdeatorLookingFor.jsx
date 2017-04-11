import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';


export default class MlIdeatorLookingFor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this)
  }
  componentDidMount()
  {
    OnLockSwitch();
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });
    dataVisibilityHandler();
  }

  onClick(field,e){
    let details =this.state.data;
    let className = e.target.className;
    let key = e.target.id;
    if(className.indexOf("fa-lock") != -1){
      details[key] = true;
    }else{
      details[key] = false;
    }
    this.setState({data:details})
    this.sendDataToParent()
  }
  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details[name]= e.target.value
    this.setState({data:details})
    this.sendDataToParent()
  }

  sendDataToParent(){
    this.props.getLookingFor(this.state.data)
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
                      Looking For
                    </div>
                    <div className="panel-body">

                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" name="description" onBlur={this.handleBlur.bind(this)}></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isLookingForPrivate" onClick={this.onClick.bind(this, "isLookingForPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isLookingForPrivate}/>
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
