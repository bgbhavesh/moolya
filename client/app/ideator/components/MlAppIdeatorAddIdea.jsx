import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../admin/utils/formElemUtil';
import _ from 'lodash';

export default class MlAppIdeatorAddIdea extends React.Component{
  constructor(props, context){
    super(props);
    this.state= {
      loading: false,
    }
    return this;
  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
  }
  componentDidUpdate()
  {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  render(){
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
          <div>
            <h2>Add Idea</h2>
            <div className="col-lg-2 col-lg-offset-5 col-md-3 col-md-offset-4 col-sm-3 col-sm-offset-4">
              <a href="#" >
                <div className="list_block notrans">
                  <FontAwesome name='lock'/>
                  {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
                  <div className="hex_outer portfolio-font-icons"><span className="ml ml-idea"></span></div>
                  <h3>Ideas</h3>
                </div>
              </a>
            </div>
            <div className="form_bg col-lg-8 col-lg-offset-2">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Title" className="form-control float-label" id="cluster_name" name="title"/>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeasTitlePrivate"/><input type="checkbox" className="lock_input" id="makePrivate"/>
                </div>
                <div className="form-group">
                  <textarea placeholder="Describe..." className="form-control" id="cl_about" name="description" ></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeasPrivate"/><input type="checkbox" className="lock_input" id="makePrivate" />
                </div>
              </form>
            </div>
          </div>)}
      </div>
    )}
};
