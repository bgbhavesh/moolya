import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import _ from 'lodash';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import {findIdeatorLookingForActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import MlLoader from '../../../../../commons/components/loader/loader'

export default class MlIdeatorLookingFor extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading:true,
      data:{},
      privateKey:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this)
    this.fetchPortfolioDetails.bind(this);
  }

  componentWillMount(){
    this.fetchPortfolioDetails();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidUpdate()
  {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  async fetchPortfolioDetails() {
    let empty = _.isEmpty(this.context.ideatorPortfolio && this.context.ideatorPortfolio.lookingFor)
    if(empty){
      const response = await findIdeatorLookingForActionHandler(this.props.portfolioDetailsId);
      if (response) {
        this.setState({loading: false, data: response});
      }

      _.each(response.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })

    }else{
      this.setState({loading: false, data: this.context.ideatorPortfolio.lookingFor});
    }
  }

  onClick(fieldName, field,e){
    let details = this.state.data||{};
    let key = e.target.id;
    var isPrivate = false
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true
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

  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    data=_.omit(data,["privateFields"]);
    this.props.getLookingFor(data, this.state.privateKey)
  }


  render(){
    const showLoader = this.state.loading;
    let description = this.state.data.lookingForDescription?this.state.data.lookingForDescription:''
    let lockStatus =  this.state.data.isLookingForPrivate?this.state.data.isLookingForPrivate:false
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <MlLoader/>) : (
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
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description} name="lookingForDescription" onBlur={this.handleBlur.bind(this)}></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isLookingForPrivate" onClick={this.onClick.bind(this, "lookingForDescription", "isLookingForPrivate")}/>
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

MlIdeatorLookingFor.contextTypes = {
  ideatorPortfolio: PropTypes.object,
};
