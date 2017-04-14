import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import _ from 'lodash';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import {findIdeatorIntellectualPlanningTrademarkActionHandler} from '../../actions/findPortfolioIdeatorDetails'

export default class MlIdeatorIntellectualPlanningAndTrademark extends React.Component{
   constructor(props, context) {
     super(props);
     this.state =  {loading:true,data:{}};
     this.fetchPortfolioDetails.bind(this);
     return this;
   }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.ideatorPortfolio && that.context.ideatorPortfolio.intellectualPlanning)
    if(empty){
      const response = await findIdeatorIntellectualPlanningTrademarkActionHandler(portfoliodetailsId);
      if (response) {
        this.setState({loading: false, data: response});
      }
    }else{
      this.setState({loading: false, data: that.context.ideatorPortfolio.intellectualPlanning});
    }
  }

  onInputChange(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }

  onLockChange(field, e){
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

  sendDataToParent() {
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    this.props.getIntellectualPlanning(data);
  }

  render(){
    let description =this.state.data.description?this.state.data.description:''
    let isIntellectualPrivate = this.state.data.isIntellectualPrivate?this.state.data.isIntellectualPrivate:false

    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
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
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description} onBlur={this.onInputChange.bind(this)} name="description"></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIntellectualPrivate" onClick={this.onLockChange.bind(this, "isIntellectualPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={isIntellectualPrivate}/>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>)}
      </div>
    )
  }
};
MlIdeatorIntellectualPlanningAndTrademark.contextTypes = {
  ideatorPortfolio: PropTypes.object,
};
