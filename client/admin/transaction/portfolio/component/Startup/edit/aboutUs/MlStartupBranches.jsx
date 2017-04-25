import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
var FontAwesome = require('react-fontawesome');
import Moolyaselect from  '../../../../../../../commons/components/select/MoolyaSelect';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import {multipartASyncFormHandler} from '../../../../../../../commons/MlMultipartFormAction'

export default class MlStartupBranches extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupBranches:this.props.branchDetails || [],
      popoverOpen:false,
      index:"",
      startupBranchesList:this.props.branchDetails || [],
      indexArray:[],
      selectedVal:null,
      selectedObject:"default"
    }
    this.handleBlur.bind(this);
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
    let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.branches)
    if(!empty){
      this.setState({loading: false, startupBranches: this.context.startupPortfolio.branches, startupBranchesList:this.context.startupPortfolio.branches});
    }
  }
  onSaveAction(e){
    this.setState({startupBranchesList:this.state.startupBranches})
    this.setState({popoverOpen : false})
  }
  addBranch(){
    this.setState({selectedObject : "default"})
    this.setState({popoverOpen : !(this.state.popoverOpen)})
    this.setState({data : {}})
    if(this.state.startupBranches){
      this.setState({index:this.state.startupBranches.length})
    }else{
      this.setState({index:0})
    }
  }

  onSelect(index, e){
    let details = this.state.startupBranches[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({index:index});
    this.setState({data:details})
    this.setState({selectedObject : index})
    this.setState({popoverOpen : !(this.state.popoverOpen)});
    this.setState({"selectedVal" : details.addressType});
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
    details=_.omit(details,["addressType"]);
    details=_.extend(details,{["addressType"]:selectedIndex});
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
    let startupBranches1 = this.state.startupBranches;
    let startupBranches = _.cloneDeep(startupBranches1);
    startupBranches[this.state.index] = data;
    let arr = [];
    _.each(startupBranches, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      newItem = _.omit(item, "__typename");
      if(item && item.logo){
        delete item.logo['__typename'];
      }
      arr.push(newItem)
    })
    startupBranches = arr;
    // startupManagement=_.extend(startupManagement[this.state.arrIndex],data);
    this.setState({startupBranches:startupBranches})
    let indexArray = this.state.indexArray;
    this.props.getStartupBranches(startupBranches,indexArray);
  }
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{branches:{logo:{fileUrl:'', fileName : fileName}}},indexArray:this.state.indexArray};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }
  onFileUploadCallBack(name,fileName, resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){

      }
    }
  }

  render(){
    let branchesQuery=gql`query{
      data:fetchAssets {
        label:displayName
        value:_id
      }
    }`;
    let that = this;
    let branchesArray = that.state.startupBranchesList || [];
    return (
      <div>
        <h2>Branches</h2>
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
                  return(<div className="col-lg-2 col-md-3 col-sm-3">
                    <a href="#" id={"create_client"+idx}>
                      <div className="list_block">
                        <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                        <div className="hex_outer portfolio-font-icons" onClick={that.onSelect.bind(that, idx)}><img src={details.logo&&details.logo.fileUrl}/></div>
                        <h3>{details.name?details.name:""}</h3>
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
                                        isDynamic={true}
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
                        <div className="form-group">
                          <div className="fileUpload mlUpload_btn">
                            <span>Upload Logo</span>
                            <input type="file" name="logo" id="logo" className="upload"  accept="image/*" onChange={this.onLogoFileUpload.bind(this)}  />
                          </div>
                        </div>
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





        </div>


      </div>
    )
  }
}
MlStartupBranches.contextTypes = {
  startupPortfolio: PropTypes.object,
};
