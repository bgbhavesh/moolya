import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../admin/utils/formElemUtil';
import _ from 'lodash';
import MlActionComponent from '../../../commons/components/actions/ActionComponent';
import formHandler from '../../../commons/containers/MlFormHandler';
import {createIdeaActionHandler} from '../actions/IdeaActionHandler'
import MlLoader from '../../../commons/components/loader/loader'

class MlAppIdeatorAddIdea extends React.Component{
  constructor(props, context){
      super(props);
      this.state= {loading: false}
      this.createIdea.bind(this);
      this.handleSuccess.bind(this);
      return this;
  }

  componentDidMount()
  {
      OnLockSwitch();
      dataVisibilityHandler();
    initalizeFloatLabel();
  }
  componentDidUpdate()
  {
      OnLockSwitch();
      dataVisibilityHandler();
    initalizeFloatLabel();
  }

  async handleSuccess(response){
      FlowRouter.go('/app/portfolio')
  }

  async createIdea(){
      let idea = {
          title:this.refs.title.value,
          description:this.refs.description.value,
          isIdeaTitlePrivate:false,
          isIdeaPrivate:false,
          isActive:true
      };
      const response = await createIdeaActionHandler(idea)
      if(response && !response.success){
        toastr.error(response.result);
      }else if (response && response.success){
        toastr.success(response.result);
      }
      return response;
  }

  render(){
      let MlActionConfig = [
          {
              showAction: true,
              actionName: 'edit',
              handler: null
          },
          {
              actionName: 'save',
              showAction: true,
              handler: async(event) => this.props.handler(this.createIdea.bind(this), this.handleSuccess.bind(this))
          },
          {
              showAction: true,
              actionName: 'cancel',
              handler:  async(event) => {
                FlowRouter.go("/app/portfolio")
              }
          },
          {
              showAction: true,
              actionName: 'comment',
              handler: null,
             iconID:'Popover1'
          }
      ]
      const showLoader = this.state.loading;
      return (
          <div className="admin_main_wrap">
              <div className="admin_padding_wrap">
                  {showLoader === true ? ( <MlLoader/>) : (
                      <div>
                          <h2>Add Idea</h2>
                          <div className="col-lg-2 col-lg-offset-5 col-md-3 col-md-offset-4 col-sm-3 col-sm-offset-4">
                              <a href="#" >
                                  <div className="list_block notrans">
                                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeaPrivate"/><input type="checkbox" className="lock_input" id="makePrivate"/>
                                      <div className="hex_outer portfolio-font-icons"><span className="ml ml-idea"></span></div>
                                      <h3>Ideas</h3>
                                  </div>
                              </a>
                          </div>
                          <div className="form_bg col-lg-8 col-lg-offset-2">
                              <form>
                                  <div className="form-group">
                                      <input type="text" placeholder="Title" ref="title" className="form-control float-label" id="cluster_name" name="title"/>
                                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeaTitlePrivate"/><input type="checkbox" className="lock_input" id="makePrivate"/>
                                  </div>
                                  <div className="form-group">
                                      <textarea placeholder="Describe..." className="form-control float-label" ref="description" id="cl_about" name="description" ></textarea>
                                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeaDescriptionPrivate"/><input type="checkbox" className="lock_input" id="makePrivate" />
                                  </div>
                              </form>
                          </div>
                      </div>
                  )}
                  <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
              </div>
          </div>
      )
  }
};

export default MlAppIdeatorAddIdea = formHandler()(MlAppIdeatorAddIdea);
