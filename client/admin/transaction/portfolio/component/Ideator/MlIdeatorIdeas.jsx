import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import {findIdeatorIdeasActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import _ from 'lodash';
import MlLoader from '../../../../../commons/components/loader/loader'



export default class MlIdeatorIdeas extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      privateKey:{}
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
  onClick(fieldName, field,e){
    let details = this.state.data||{};
    let key = e.target.id;
    var isPrivate = false;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true;
    }else{
      details=_.extend(details,{[key]:false});
    }

    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate}
    this.setState({privateKey:privateKey})

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
    let empty = _.isEmpty(that.context.idea)
    if(empty){
      const response = await findIdeatorIdeasActionHandler(ideaId);
      if (response) {
        this.setState({loading: false, data: response});
      }

      _.each(response.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })

    }else{
      this.setState({loading: false, data: that.context.idea});
    }

  }
  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }

    data=_.omit(data,["privateFields"]);

    this.props.getIdeas(data, this.state.privateKey)
  }

  render(){
    const showLoader = this.state.loading;
    let description = this.state.data.description?this.state.data.description:''
    let lockStatus =  this.state.data.isIdeasPrivate?this.state.data.isIdeasPrivate:false
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? (<MlLoader/>) : (
      <div>
        <h2>Ideas</h2>
        <div className="col-lg-2 col-lg-offset-5 col-md-3 col-md-offset-4 col-sm-3 col-sm-offset-4">
          <a href="#" >
            <div className="list_block notrans">
              <FontAwesome name='lock'/>
              <div className="hex_outer portfolio-font-icons"><span className="ml ml-idea"></span></div>
              <h3>Ideas</h3>
            </div>
          </a>
        </div>
        <div className="form_bg col-lg-8 col-lg-offset-2">
          <form>
            <div className="form-group">
              <input type="text" placeholder="Title" className="form-control float-label" id="cluster_name" defaultValue={this.state.data.title} name="title" onBlur={this.handleBlur.bind(this)}/>
              <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeasTitlePrivate" onClick={this.onClick.bind(this, "title", "isIdeasTitlePrivate")}/>
            </div>
            <div className="form-group">
              <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description} name="description" onBlur={this.handleBlur.bind(this)}></textarea>
              <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeasPrivate" onClick={this.onClick.bind(this, "description", "isIdeasPrivate")}/>
            </div>
          </form>
        </div>
      </div>)}
      </div>
    )}
};
MlIdeatorIdeas.contextTypes = {
  idea: PropTypes.object,
};
