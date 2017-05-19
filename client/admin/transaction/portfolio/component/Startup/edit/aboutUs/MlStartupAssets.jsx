import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import Moolyaselect from  '../../../../../../../commons/components/select/MoolyaSelect';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import {multipartASyncFormHandler} from '../../../../../../../commons/MlMultipartFormAction'
import {fetchDetailsStartupActionHandler} from '../../../../actions/findPortfolioStartupDetails';
import MlLoader from '../../../../../../../commons/components/loader/loader'


export default class MlStartupAssets extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: false,
      data:{},
      startupAssets:this.props.assetsDetails || [],
      startupAssetsList:this.props.assetsDetails || [],
      popoverOpen:false,
      selectedIndex:-1,
      selectedAssetType:null,
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
    let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.assets)
    if(!empty){
      this.setState({loading: false, startupAssets: this.context.startupPortfolio.assets, startupAssetsList:this.context.startupPortfolio.assets});
    }
  }
  onSaveAction(e){
    this.setState({startupAssetsList:this.state.startupAssets,popoverOpen : false})
  }

  addAsset(){
    this.setState({selectedObject : "default", popoverOpen : !(this.state.popoverOpen), data : {}})
    if(this.state.startupAssets){
      this.setState({selectedIndex:this.state.startupAssets.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }

  onTileClick(index, e){
    let cloneArray = _.cloneDeep(this.state.startupAssets);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({selectedIndex:index, data:details,selectedObject : index,popoverOpen : !(this.state.popoverOpen), "selectedVal" : details.assetTypeId});
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
  // onDeleteAsset(index,e){
  //   let assetDetails = this.state.startupAssets[index];
  //   assetDetails = _.omit(assetDetails, "__typename");
  //   if(index != -1) {
  //     assetDetails.splice(index, 1);
  //   }
  //   this.setState({data:assetDetails}, function () {
  //     this.sendDataToParent()
  //   })
  // }

  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  assetTypeOptionSelected(selectedId){
    let details =this.state.data;
    details=_.omit(details,["assetTypeId"]);
    details=_.extend(details,{["assetTypeId"]: selectedId});
    this.setState({data:details}, function () {
      this.setState({"selectedVal" : selectedId})
      this.sendDataToParent()
    })
  }

  sendDataToParent(){
    let data = this.state.data;
    let assets = this.state.startupAssets;
    let startupAssets = _.cloneDeep(assets);
    data.index = this.state.selectedIndex;
    startupAssets[this.state.selectedIndex] = data;
    let arr = [];
    _.each(startupAssets, function (item)
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
    startupAssets = arr;
    this.setState({startupAssets:startupAssets})
    this.props.getStartupAssets(startupAssets);
  }

  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{assets:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));
  }
  onFileUploadCallBack(resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.setState({loading:true})
        this.fetchOnlyImages();
      }
    }
  }

  async fetchOnlyImages(){
    const response = await fetchDetailsStartupActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let thisState=this.state.selectedIndex;
      let dataDetails =this.state.startupAssets
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response.assets[thisState]
        specificData['logo']= curUpload['logo']
        this.setState({loading: false, startupAssets:cloneBackUp });
      }else {
        this.setState({loading: false})
      }
    }
  }
  render(){
    let assetsQuery=gql`query{
      data:fetchAssets {
        label:displayName
        value:_id
      }
    }`;
    let that = this;
    const showLoader = that.state.loading;
    let assetsArray = that.state.startupAssetsList || [];
    return(
      <div>
        <h2>Assets</h2>
        {showLoader === true ? ( <MlLoader/>) : (
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
                  <a href="#" id="create_clientdefault" data-placement="right" data-class="large_popover" >
                    <div className="list_block notrans" onClick={this.addAsset.bind(this)}>
                      <div className="hex_outer"><span className="ml ml-plus "></span></div>
                      <h3 onClick={this.addAsset.bind(this)}>Add New Asset</h3>
                    </div>
                  </a>
                </div>
                {assetsArray.map(function (details, idx) {
                 return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                    <a href="#" id={"create_client"+idx}>
                      <div className="list_block">
                        <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                        {/*<div className="cluster_status inactive_cl" onClick={that.onDeleteAsset.bind(that, idx)}><FontAwesome name='times'/></div>*/}
                        <div className="hex_outer portfolio-font-icons" onClick={that.onTileClick.bind(that, idx)}><img src={details.logo&&details.logo.fileUrl}/></div>
                        <h3>{details.description?details.description:""}<span className="assets-list">{details.quantity?details.quantity:"0"}</span></h3>
                      </div>
                    </a>
                  </div>)
                })}
              </div>
            </div>

          </ScrollArea>
          <Popover placement="right" isOpen={this.state.popoverOpen} target={"create_client"+this.state.selectedObject} toggle={this.toggle}>
            <PopoverContent>
              <div  className="ml_create_client">
                <div className="medium-popover"><div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                    labelKey={'label'} queryType={"graphql"} query={assetsQuery}
                                    isDynamic={true} placeholder={'Select  Asset..'}
                                    onSelect={this.assetTypeOptionSelected.bind(this)}
                                    selectedValue={this.state.selectedVal}/>
                    </div>

                    <div className="form-group">
                      <input type="text" name="quantity" placeholder="Enter Number of Quantity" className="form-control float-label" id="" defaultValue={this.state.data.quantity} onBlur={this.handleBlur.bind(this)}/>
                      {/*<FontAwesome name='unlock' className="input_icon"/>*/}
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAssetTypePrivate" defaultValue={this.state.data.isAssetTypePrivate} onClick={this.onLockChange.bind(this, "isAssetTypePrivate")}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={this.state.data.isAssetTypePrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" name="description" placeholder="About" className="form-control float-label" id="" defaultValue={this.state.data.description} onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/><input type="checkbox" className="lock_input" id="isDescriptionPrivate" checked={this.state.data.isDescriptionPrivate}/>
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
                </div></div>
              </div>
            </PopoverContent>
          </Popover>
        </div>)}
      </div>
    )
  }
}
MlStartupAssets.contextTypes = {
  startupPortfolio: PropTypes.object,
};
