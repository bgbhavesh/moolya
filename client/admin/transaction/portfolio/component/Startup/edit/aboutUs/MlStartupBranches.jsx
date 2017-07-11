import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
var FontAwesome = require('react-fontawesome');
import Moolyaselect from  '../../../../../../commons/components/MlAdminSelectWrapper';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import {multipartASyncFormHandler} from '../../../../../../../commons/MlMultipartFormAction'
import {fetchDetailsStartupActionHandler} from '../../../../actions/findPortfolioStartupDetails';
import MlLoader from '../../../../../../../commons/components/loader/loader'

export default class MlStartupBranches extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: false,
      data:{},
      startupBranches:this.props.branchDetails || [],
      popoverOpen:false,
      selectedIndex:-1,
      startupBranchesList:this.props.branchDetails || [],
     /* indexArray:[],*/
      selectedVal:null,
      selectedObject:"default"
    }
    this.handleBlur.bind(this);
    this.imagesDisplay.bind(this);
    return this;
  }
  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
    this.imagesDisplay();
  }
  componentWillMount(){
    let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.branches)
    if(!empty){
      this.setState({loading: false, startupBranches: this.context.startupPortfolio.branches, startupBranchesList:this.context.startupPortfolio.branches});
    }
  }
  onSaveAction(e){
    this.setState({startupBranchesList:this.state.startupBranches,popoverOpen : false})
  }
  addBranch(){
    this.setState({selectedObject : "default", popoverOpen : !(this.state.popoverOpen), data : {}})
    if(this.state.startupBranches){
      this.setState({selectedIndex:this.state.startupBranches.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }

  onTileClick(index, e){
    let cloneArray = _.cloneDeep(this.state.startupBranches);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({selectedIndex:index, data:details,selectedObject : index, popoverOpen : !(this.state.popoverOpen), "selectedVal" : details.addressTypeId});
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
  onOptionSelected(selectedBranch){
    let details =this.state.data;
    details=_.omit(details,["addressTypeId"]);
    details=_.extend(details,{["addressTypeId"]: selectedBranch});
    this.setState({data:details}, function () {
      this.setState({"selectedVal" : selectedBranch})
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
    let branches = this.state.startupBranches;
    let startupBranches = _.cloneDeep(branches);
    data.index = this.state.selectedIndex;
    startupBranches[this.state.selectedIndex] = data;
    let arr = [];
    _.each(startupBranches, function (item)
    {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, "__typename");
      // let updateItem = _.omit(newItem, 'logo');
      arr.push(newItem)
    })
    startupBranches = arr;
    this.setState({startupBranches:startupBranches})
    this.props.getStartupBranches(startupBranches);

  }
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{branches:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));
  }
  onFileUploadCallBack(resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.setState({loading:true})
        this.fetchOnlyImages();
        this.imagesDisplay();
      }
    }
  }

  async fetchOnlyImages(){
    const response = await fetchDetailsStartupActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let thisState=this.state.selectedIndex;
      let dataDetails =this.state.startupBranches
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response.branches[thisState]
        specificData['logo']= curUpload['logo']
        this.setState({loading: false, startupBranches:cloneBackUp });
      }else {
        this.setState({loading: false})
      }
    }
  }

  async imagesDisplay(){
    const response = await fetchDetailsStartupActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let detailsArray = response&&response.branches?response.branches:[]
      let dataDetails =this.state.startupBranches
      let cloneBackUp = _.cloneDeep(dataDetails);
      _.each(detailsArray, function (obj,key) {
        cloneBackUp[key]["logo"] = obj.logo;
      })
      let listDetails = this.state.startupBranchesList || [];
      listDetails = cloneBackUp
      let cloneBackUpList = _.cloneDeep(listDetails);
      this.setState({loading: false, startupBranches:cloneBackUp,startupBranchesList:cloneBackUpList});
    }
  }

  emptyClick(e) {
    if (this.state.popoverOpen)
      this.setState({popoverOpen: false})
  }

  render(){
    let branchesQuery=gql`query  {
  data: fetchAddressTypes {
    label: addressName
    value: _id
  }
}


`;
    let that = this;
    const showLoader = that.state.loading;
    let branchesArray = that.state.startupBranchesList || [];
    let displayUploadButton = null
    if(this.state.selectedObject != "default"){
      displayUploadButton = true
    }else{
      displayUploadButton = false
    }
    return (
      <div onClick={this.emptyClick.bind(this)}>
        <h2>Branches</h2>
        {showLoader === true ? (<MlLoader/>) : (
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
                    <div className="list_block notrans" onClick={this.addBranch.bind(this)}>
                      <div className="hex_outer"><span className="ml ml-plus "></span></div>
                      <h3 onClick={this.addBranch.bind(this)}>Add New Branch</h3>
                    </div>
                  </a>
                </div>
                {branchesArray.map(function (details, idx) {
                  return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                    <a href="#" id={"create_client"+idx}>
                      <div className="list_block">
                        <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                        {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
                        <div className="hex_outer portfolio-font-icons" onClick={that.onTileClick.bind(that, idx)}><img src={details.logo&&details.logo.fileUrl}/></div>
                        <h3>{details.name?details.name:""}</h3>
                      </div>
                    </a>
                  </div>)
                })}
              </div>
            </div>
          </ScrollArea>
          <Popover placement="right" isOpen={this.state.popoverOpen}  target={"create_client"+this.state.selectedObject} toggle={this.toggle}>
            <PopoverTitle>Add Branches</PopoverTitle>
            <PopoverContent>
              <div className="ml_create_client">
                <div className="medium-popover scrollbar-wrap">
                  <ScrollArea
                    speed={0.8}
                    className="scrollbar-wrap"
                    smoothScrolling={true}
                    default={true}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                        labelKey={'label'} queryType={"graphql"} query={branchesQuery}
                                        isDynamic={true} placeholder={'Select Branches..'}
                                        onSelect={this.onOptionSelected.bind(this)}
                                        selectedValue={this.state.selectedVal}/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="name" placeholder="Name" className="form-control float-label" id="" defaultValue={this.state.data.name}  onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isNamePrivate" defaultValue={this.state.data.isNamePrivate} onClick={this.onLockChange.bind(this, "isNamePrivate")}/>
                          <input type="checkbox" className="lock_input" id="isNamePrivate" checked={this.state.data.isNamePrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" name="phoneNumber" placeholder="Phone Number" className="form-control float-label" id="" defaultValue={this.state.data.phoneNumber} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isPhoneNumberPrivate" defaultValue={this.state.data.isPhoneNumberPrivate} onClick={this.onLockChange.bind(this, "isNamePrivate")}/>
                          <input type="checkbox" className="lock_input" id="isPhoneNumberPrivate" checked={this.state.data.isPhoneNumberPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" name="address1" placeholder="Flat/House/Floor/Building" className="form-control float-label" id="" defaultValue={this.state.data.address1} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAddressOnePrivate" defaultValue={this.state.data.isAddressOnePrivate} onClick={this.onLockChange.bind(this, "isAddressOnePrivate")}/>
                          <input type="checkbox" className="lock_input" id="isAddressOnePrivate" checked={this.state.data.isAddressOnePrivate}/>
                        </div>


                        <div className="form-group">
                          <input type="text" name="address2" placeholder="Colony/Street/Locality" className="form-control float-label" id="" defaultValue={this.state.data.address2} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAddressTwoPrivate" defaultValue={this.state.data.isAddressTwoPrivate} onClick={this.onLockChange.bind(this, "isAddressTwoPrivate")}/>
                          <input type="checkbox" className="lock_input" id="isAddressTwoPrivate" checked={this.state.data.isAddressTwoPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" name="landmark" placeholder="Landmark" className="form-control float-label" id=""  defaultValue={this.state.data.landmark} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isLandmarkPrivate" defaultValue={this.state.data.isLandmarkPrivate} onClick={this.onLockChange.bind(this, "isLandmarkPrivate")}/>
                          <input type="checkbox" className="lock_input" id="isLandmarkPrivate" checked={this.state.data.isLandmarkPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" name="area" placeholder="Area" className="form-control float-label" id="" defaultValue={this.state.data.area} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAreaPrivate" defaultValue={this.state.data.isAreaPrivate} onClick={this.onLockChange.bind(this, "isAreaPrivate")}/>
                          <input type="checkbox" className="lock_input" id="isAreaPrivate" checked={this.state.data.isAreaPrivate}/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="city" placeholder="Town/City" className="form-control float-label" id="" defaultValue={this.state.data.city} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isCityPrivate" defaultValue={this.state.data.isCityPrivate} onClick={this.onLockChange.bind(this, "isCityPrivate")}/>
                          <input type="checkbox" className="lock_input" id="isCityPrivate" checked={this.state.data.isCityPrivate}/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="state" placeholder="State" className="form-control float-label" id="" defaultValue={this.state.data.state} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isStatePrivate" defaultValue={this.state.data.isStatePrivate} onClick={this.onLockChange.bind(this, "isStatePrivate")}/>
                          <input type="checkbox" className="lock_input" id="isStatePrivate" checked={this.state.data.isStatePrivate}/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="country" placeholder="Country" className="form-control float-label" id="" defaultValue={this.state.data.country} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isCountryPrivate" defaultValue={this.state.data.isCountryPrivate} onClick={this.onLockChange.bind(this, "isCountryPrivate")}/>
                          <input type="checkbox" className="lock_input" id="isCountryPrivate" checked={this.state.data.isCountryPrivate}/>
                        </div>
                        {displayUploadButton?<div className="form-group">
                          <div className="fileUpload mlUpload_btn">
                            <span>Upload Logo</span>
                            <input type="file" name="logo" id="logo" className="upload"  accept="image/*" onChange={this.onLogoFileUpload.bind(this)}  />
                          </div>
                        </div>:""}
                        <div className="clearfix"></div>
                        <div className="form-group">
                          <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data.makePrivate&&this.state.data.makePrivate}  name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                        </div>
                        <div className="ml_btn" style={{'textAlign': 'center'}}>
                          <a href="#" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>)}
      </div>
    )
  }
}
MlStartupBranches.contextTypes = {
  startupPortfolio: PropTypes.object,
};
