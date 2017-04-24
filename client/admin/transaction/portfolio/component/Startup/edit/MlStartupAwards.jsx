import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
var FontAwesome = require('react-fontawesome');
import Moolyaselect from  '../../../../../../commons/components/select/MoolyaSelect';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import {multipartASyncFormHandler} from '../../../../../../commons/MlMultipartFormAction'
import {fetchStartupPortfolioAwards} from '../../../actions/findPortfolioStartupDetails'
var Select = require('react-select');
var options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' }
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlStartupAwards extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupInvestor: [],
      popoverOpen:false,
      index:"",
      startupAwardsList:[],
      indexArray:[],
      selectedVal:null,
      selectedObject:"default"
    }
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.onSaveAction.bind(this);
    return this;
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    // const response = await fetchStartupPortfolioAwards(portfoliodetailsId);
    // if (response) {
    //   this.setState({loading: false, startupInvestor: response, startupAwardsList: response});
    // }
    let empty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.awardsRecognition)
    if(empty){
      const response = await fetchStartupPortfolioAwards(portfoliodetailsId);
      if (response) {
        this.setState({loading: false, startupInvestor: response, startupAwardsList: response});
      }
    }else{
      this.setState({loading: false, startupInvestor: that.context.startupPortfolio.awardsRecognition, startupAwardsList: that.context.startupPortfolio.awardsRecognition});
    }
  }
  addInvestor(){
    this.setState({selectedObject : "default"})
    this.setState({popoverOpen : !(this.state.popoverOpen)})
    this.setState({data : {}})
    if(this.state.startupInvestor){
      this.setState({index:this.state.startupInvestor.length})
    }else{
      this.setState({index:0})
    }
  }
  onSaveAction(e){
    this.setState({startupAwardsList:this.state.startupInvestor})
    this.setState({popoverOpen : false})
  }
  onSelect(index, e){
    let details = this.state.startupInvestor[index]
    details = _.omit(details, "__typename");
    this.setState({index:index});
    this.setState({data:details})
    this.setState({selectedObject : index})
    this.setState({popoverOpen : !(this.state.popoverOpen)});
    this.setState({"selectedVal" : details.fundingType});
    let indexes = this.state.indexArray;
    let indexArray = _.cloneDeep(indexes)
    indexArray.push(index);
    indexArray = _.uniq(indexArray);
    this.setState({indexArray: indexArray})
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

  onStatusChangeNotify(e)
  {
    let updatedData = this.state.data||{};
    let key = e.target.id;
    updatedData=_.omit(updatedData,[key]);
    if (e.currentTarget.checked) {
      updatedData=_.extend(updatedData,{[key]:true});
    } else {
      updatedData=_.extend(updatedData,{[key]:false});
    }
    this.setState({data:updatedData}, function () {
      this.sendDataToParent()
    })
  }

  onOptionSelected(selectedIndex,handler,selectedObj){

    let details =this.state.data;
    details=_.omit(details,["award"]);
    details=_.extend(details,{["award"]:selectedIndex});
    this.setState({data:details}, function () {
      this.setState({"selectedVal" : selectedIndex})
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
    let startupInvestor1 = this.state.startupInvestor;
    let startupInvestor = _.cloneDeep(startupInvestor1);
    startupInvestor[this.state.index] = data;
    let arr = [];
    _.each(startupInvestor, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      newItem = _.omit(item, "__typename")
      arr.push(newItem)
    })
    startupInvestor = arr;
    // startupManagement=_.extend(startupManagement[this.state.arrIndex],data);
    this.setState({startupInvestor:startupInvestor})
    let indexArray = this.state.indexArray;
    this.props.getAwardsDetails(startupInvestor,indexArray);
  }

  render(){
    let query=gql`query{
      data:fetchTechnologies {
        label:displayName
        value:_id
      }
    }`;
    let that = this;
    let startupAwardsList = that.state.startupAwardsList || [];
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap portfolio-main-wrap">
          <h2>Awards</h2>
          <div className="requested_input main_wrap_scroll">

            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-2 col-md-3 col-sm-3">
                    <a href="#" id="create_clientdefault" data-placement="top" data-class="large_popover" >
                      <div className="list_block notrans" onClick={this.addInvestor.bind(this)}>
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3 onClick={this.addInvestor.bind(this)}>Add New Awards</h3>
                      </div>
                    </a>
                  </div>
                  {startupAwardsList.map(function (details, idx) {
                    return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a href="#" id={"create_client"+idx}>
                        <div className="list_block">
                          <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                          {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
                          <div className="hex_outer" onClick={that.onSelect.bind(that, idx)}><img src="/images/meteor-logo.png"/></div>
                          <h3>{details.description}</h3>
                        </div>
                      </a>
                    </div>)
                  })}



                </div>
              </div>

            </ScrollArea>

            <Popover placement="right" isOpen={this.state.popoverOpen}  target={"create_client"+this.state.selectedObject} toggle={this.toggle}>
              {/* <PopoverTitle>Add Asset</PopoverTitle>*/}
              <PopoverContent>
                <div  className="ml_create_client">
                  <div className="medium-popover"><div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                      labelKey={'label'} queryType={"graphql"} query={query}
                                      isDynamic={true}
                                      onSelect={this.onOptionSelected.bind(this)}
                                      selectedValue={this.state.selectedVal}/>
                      </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                      labelKey={'label'} queryType={"graphql"} query={query}
                                      isDynamic={true}
                                      onSelect={this.onOptionSelected.bind(this)}
                                      selectedValue={this.state.selectedVal}/>
                      </div>
                      <div className="form-group">
                        <input type="text" name="description" placeholder="About" className="form-control float-label" id="" defaultValue={this.state.data.description}  onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" defaultValue={this.state.data.isDescriptionPrivate}  onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isDescriptionPrivate}/>
                      </div>
                      <div className="form-group">
                        <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data.makePrivate&&this.state.data.makePrivate}  name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                      </div>
                      <div className="ml_btn" style={{'textAlign': 'center'}}>
                        <a href="" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                      </div>
                    </div>
                  </div></div>
                </div>
              </PopoverContent>
            </Popover>




          </div>
        </div>


      </div>
    )
  }
}
MlStartupAwards.contextTypes = {
  startupPortfolio: PropTypes.object,
};