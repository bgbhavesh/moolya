import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
var FontAwesome = require('react-fontawesome');
import Moolyaselect from  '../../../../../commons/components/MlAdminSelectWrapper';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import {multipartASyncFormHandler} from '../../../../../../commons/MlMultipartFormAction'
import {fetchStartupPortfolioLookingFor} from '../../../actions/findPortfolioStartupDetails'
import MlLoader from '../../../../../../commons/components/loader/loader'


export default class MlStartupLookingFor extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupLookingFor: [],
      popoverOpen:false,
      selectedIndex:-1,
      startupLookingForList:[],
      selectedVal:null,
      selectedObject:"default"
    }
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.onSaveAction.bind(this);
    //this.imagesDisplay.bind(this);
    return this;
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
    //this.imagesDisplay()
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.lookingFor)
    if(empty){
      const response = await fetchStartupPortfolioLookingFor(portfolioDetailsId);
      if (response) {
          this.setState({loading: false, startupLookingFor: response, startupLookingForList:response});
      }
    }else{
      this.setState({loading: false, startupLookingFor: that.context.startupPortfolio.lookingFor, startupLookingForList: that.context.startupPortfolio.lookingFor});
    }
  }
  addLookingFor(){
    this.setState({selectedObject : "default", popoverOpen : !(this.state.popoverOpen), data : {}})
    if(this.state.startupLookingFor){
      this.setState({selectedIndex: this.state.startupLookingFor.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }
  onTileClick(index, e){
    let cloneArray = _.cloneDeep(this.state.startupLookingFor);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({selectedIndex:index, data:details, selectedObject : index, popoverOpen : !(this.state.popoverOpen), "selectedVal" : details.typeId});
  }
  onSaveAction(e){
    this.setState({startupLookingForList:this.state.startupLookingFor, popoverOpen : false})
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

  onOptionSelected(selectedId,callback, selObject){
    let details =this.state.data;
    details=_.omit(details,["typeId"]);
    details=_.omit(details,["lookingForName"]);
    details=_.extend(details,{["typeId"]:selectedId,["lookingForName"]: selObject.label});
    this.setState({data:details}, function () {
      this.setState({"selectedVal" : selectedId})
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
    let startupLookingFor1 = this.state.startupLookingFor;
    let startupLookingFor = _.cloneDeep(startupLookingFor1);
    data.index = this.state.selectedIndex;
    startupLookingFor[this.state.selectedIndex] = data;                 //startupLookingFor[this.state.index] = data;
    let arr = [];
    _.each(startupLookingFor, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      newItem = _.omit(item, "__typename")
      if(item && item.logo){
        delete item.logo['__typename'];
      }
      arr.push(newItem)
    })
    startupLookingFor = arr;
    this.setState({startupLookingFor:startupLookingFor})
    // let indexArray = this.state.indexArray;
    this.props.getLookingForDetails(startupLookingFor);    //indexArray

  }

/*
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{lookingFor:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};    //indexArray:this.state.indexArray
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));
  }

  onFileUploadCallBack(resp){
    if(resp){
      let result = JSON.parse(resp);
      if(result.success){
        this.setState({loading:true})
        this.fetchOnlyImages();
      }
    }
  }

  async fetchOnlyImages(){
    const response = await fetchStartupPortfolioLookingFor(this.props.portfolioDetailsId);
    if (response) {
      let thisState=this.state.selectedIndex;                         // let thisState=this.state.index;
      let dataDetails =this.state.startupLookingFor
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response[thisState]
        specificData['logo']= curUpload['logo']
        this.setState({loading: false, startupLookingFor:cloneBackUp });   //startupLookingForList : cloneBackUp,
      }else{
        this.setState({loading: false})
      }

    }
  }

  async imagesDisplay(){
    const response = await fetchStartupPortfolioLookingFor(this.props.portfolioDetailsId);
    if (response) {
      let detailsArray = response?response:[]
      let dataDetails =this.state.startupLookingFor
      let cloneBackUp = _.cloneDeep(dataDetails);
      _.each(detailsArray, function (obj,key) {
        cloneBackUp[key]["logo"] = obj.logo;
      })
      let listDetails = this.state.startupLookingForList || [];
      listDetails = cloneBackUp
      let cloneBackUpList = _.cloneDeep(listDetails);
      this.setState({loading: false, startupLookingFor:cloneBackUp,startupLookingForList:cloneBackUpList});
    }
  }
*/


  render(){
    let query=gql`query($communityCode:String){
        data:fetchLookingFor(communityCode:$communityCode) {
          label:lookingForName
          value:_id
        }
      }`;
    const showLoader = this.state.loading;
    let lookingOption={options: { variables: {communityCode:"STU"}}};
    let that = this;
    let startupLookingForList = that.state.startupLookingForList || [];
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
        <div className="portfolio-main-wrap">
          <h2>Looking For</h2>
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
                    <a href="" id="create_clientdefault" data-placement="top" data-class="large_popover" >
                      <div className="list_block notrans" onClick={this.addLookingFor.bind(this)}>
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3 onClick={this.addLookingFor.bind(this)}>Add New Looking For</h3>
                      </div>
                    </a>
                  </div>
                  {startupLookingForList.map(function (details, idx) {
                    return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a href="" id={"create_client"+idx}>
                        <div className="list_block">
                          <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                          {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
                          <div className="hex_outer" onClick={that.onTileClick.bind(that, idx)}><img src={details.logo&&details.logo.fileUrl}/></div>
                          <h3>{details.lookingForName?details.lookingForName:""}</h3>
                        </div>
                      </a>
                    </div>)
                  })}
                </div>
              </div>
            </ScrollArea>
            <Popover placement="right" isOpen={this.state.popoverOpen}  target={"create_client"+this.state.selectedObject} toggle={this.toggle}>
               <PopoverTitle>Add New Looking For</PopoverTitle>
              <PopoverContent>
                <div  className="ml_create_client">



                  <div className="medium-popover"><div className="row">
                    <div className="col-md-12">



                      <div className="form-group">
                        <Moolyaselect multiSelect={false} placeholder="Select LookingFor" className="form-control float-label" valueKey={'value'}
                                      labelKey={'label'} queryType={"graphql"} query={query}
                                      isDynamic={true}
                                      queryOptions={lookingOption}
                                      onSelect={this.onOptionSelected.bind(this)}
                                      selectedValue={this.state.selectedVal}/>

                      <div className="form-group">
                        <input type="text" name="description" placeholder="About" className="form-control float-label" id="" defaultValue={this.state.data.description}  onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                    <div className="form-group">
                        <div className="input_types">
                          <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data.makePrivate&&this.state.data.makePrivate}  name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                        </div>
                        <div className="ml_btn" style={{'textAlign': 'center'}}>
                          <a href="" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                        </div>
                    </div>
                  </div></div>






                  {/*<div className="medium-popover"><div className="row">*/}
                    {/*<div className="col-md-12">*/}
                      {/*<div className="form-group">*/}
                        {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}*/}
                                      {/*labelKey={'label'} queryType={"graphql"} query={query}*/}
                                      {/*isDynamic={true}*/}
                                      {/*queryOptions={lookingOption}*/}
                                      {/*onSelect={this.onOptionSelected.bind(this)}*/}
                                      {/*selectedValue={this.state.selectedVal}/>*/}
                      {/*</div>*/}
                      {/*<div className="form-group">*/}
                        {/*<input type="text" name="description" placeholder="About" className="form-control float-label" id="" defaultValue={this.state.data.description}  onBlur={this.handleBlur.bind(this)}/>*/}
                        {/*<FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" defaultValue={this.state.data.isDescriptionPrivate}  onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isDescriptionPrivate}/>*/}
                      {/*</div>*/}
                      {/*<div className="form-group">*/}
                        {/*<div className="fileUpload mlUpload_btn">*/}
                          {/*<span>Upload Logo</span>*/}
                          {/*<input type="file" name="logo" id="logo" className="upload"  accept="image/*" onChange={this.onLogoFileUpload.bind(this)}  />*/}
                        {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="form-group">*/}
                        {/*<div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data.makePrivate&&this.state.data.makePrivate}  name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>*/}
                      {/*</div>*/}
                      {/*<div className="ml_btn" style={{'textAlign': 'center'}}>*/}
                        {/*<a href="" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                  {/*</div></div>*/}
                </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>)}
      </div>
    )
  }
}
MlStartupLookingFor.contextTypes = {
  startupPortfolio: PropTypes.object,
};
