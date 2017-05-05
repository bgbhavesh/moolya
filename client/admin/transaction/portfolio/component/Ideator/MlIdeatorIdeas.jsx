import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import {findIdeatorIdeasActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import _ from 'lodash';



export default class MlIdeatorIdeas extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
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
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  onClick(field,e){
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
    }else{
      details=_.extend(details,{[key]:false});
    }
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })

  }
  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  async fetchPortfolioDetails() {
    let that = this;
    let ideaId=that.props.ideaId;
    let empty = _.isEmpty(that.context.ideatorPortfolio && that.context.ideatorPortfolio.ideas)
    if(empty){
      const response = await findIdeatorIdeasActionHandler(ideaId);
      if (response) {
        this.setState({loading: false, data: response});
      }
    }else{
      this.setState({loading: false, data: that.context.ideatorPortfolio.ideas});
    }

  }
  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    this.props.getIdeas(data)
  }

  render(){
    const showLoader = this.state.loading;
    let description = this.state.data.description?this.state.data.description:''
    let lockStatus =  this.state.data.isIdeasPrivate?this.state.data.isIdeasPrivate:false
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
      <div>
        <h2>Ideas</h2>
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
              <input type="text" placeholder="Title" className="form-control float-label" id="cluster_name" defaultValue={this.state.data.title} name="title" onBlur={this.handleBlur.bind(this)}/>
              <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeasTitlePrivate" onClick={this.onClick.bind(this, "isIdeasTitlePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isIdeasTitlePrivate}/>
            </div>
            <div className="form-group">
              <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description} name="description" onBlur={this.handleBlur.bind(this)}></textarea>
              <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeasPrivate" onClick={this.onClick.bind(this, "isIdeasPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={lockStatus}/>
            </div>
          </form>
        </div>
      </div>)}
      </div>
    )}
};
MlIdeatorIdeas.contextTypes = {
  ideatorPortfolio: PropTypes.object,
};
