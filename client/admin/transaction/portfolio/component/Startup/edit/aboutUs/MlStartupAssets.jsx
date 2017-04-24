import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import Moolyaselect from  '../../../../../../../commons/components/select/MoolyaSelect';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';


export default class MlStartupAssets extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupAssets:this.props.assetsDetails || [],
      startupAssetsList:this.props.assetsDetails || [],
      popoverOpen:false,
      arrIndex:"",
      indexArray:[],
      selectedAssetType:null,
      selectedAsset:"default"
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

  addAsset(){
    this.setState({selectedAsset : "default"})
    this.setState({popoverOpen : !(this.state.popoverOpen)})
    this.setState({data : {}})
    if(this.state.startupAssets){
      this.setState({arrIndex:this.state.startupAssets.length})
    }else{
      this.setState({arrIndex:0})
    }
  }
  onSelectAsset(index, e){
    let assetDetails = this.state.startupAssets[index]
    assetDetails = _.omit(assetDetails, "__typename");
    this.setState({arrIndex:index});
    this.setState({data:assetDetails})
    this.setState({selectedAsset : index})
    this.setState({popoverOpen : !(this.state.popoverOpen)});
    this.setState({"selectedAssetType" : assetDetails.assetType});
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
  onDeleteAsset(index,e){
    let assetDetails = this.state.startupAssets[index];
    assetDetails = _.omit(assetDetails, "__typename");
    if(index != -1) {
      assetDetails.splice(index, 1);
    }
    this.setState({data:assetDetails}, function () {
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
  assetTypeOptionSelected(selectedIndex,handler,selectedObj){

    let details =this.state.data;
    details=_.omit(details,["assetType"]);
    details=_.extend(details,{["assetType"]:selectedIndex});
    this.setState({data:details}, function () {
      this.setState({"selectedAssetType" : selectedIndex})
      this.sendDataToParent()
    })

  }
  sendDataToParent(){
     let data = this.state.data;
    let startupAssets1 = this.state.startupAssets;
    let startupAssets = _.cloneDeep(startupAssets1);
    startupAssets[this.state.arrIndex] = data;
    let assetsArr = [];
    _.each(startupAssets, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      newItem = _.omit(item, "__typename")
      assetsArr.push(newItem)
    })
    startupAssets = assetsArr;
    // startupManagement=_.extend(startupManagement[this.state.arrIndex],data);
    this.setState({startupAssets:startupAssets})
    let indexArray = this.state.indexArray;
    this.props.getStartupAssets(startupAssets,indexArray);
  }
  render(){
    let assetsQuery=gql`query{
      data:fetchAssets {
        label:displayName
        value:_id
      }
    }`;
    let that = this;
    let assetsArray = that.state.startupAssetsList || [];
    return(
      <div>

        <h2>Assets</h2>
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
                        <div className="cluster_status inactive_cl" onClick={that.onDeleteAsset.bind(that, idx)}><FontAwesome name='times'/></div>
                        <div className="hex_outer portfolio-font-icons" onClick={that.onSelectAsset.bind(that, idx)}><FontAwesome name='laptop'/></div>
                        <h3>{details.description}<span className="assets-list">{details.quantity}</span></h3>
                      </div>
                    </a>
                  </div>)
                })}
              </div>
            </div>

          </ScrollArea>
          <Popover placement="right" isOpen={this.state.popoverOpen} target={"create_client"+this.state.selectedAsset} toggle={this.toggle}>
           {/* <PopoverTitle>Add Asset</PopoverTitle>*/}
            <PopoverContent>
              <div  className="ml_create_client">
                <div className="medium-popover"><div className="row">
                  <div className="col-md-12">


                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                    labelKey={'label'} queryType={"graphql"} query={assetsQuery}
                                    isDynamic={true}
                                    onSelect={this.assetTypeOptionSelected.bind(this)}
                                    selectedValue={this.state.selectedAssetType}/>
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
                      <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data.makePrivate&&this.state.data.makePrivate}  name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                    </div>
                    <div className="ml_btn" style={{'textAlign': 'center'}}>
                      <a href="#" className="save_btn">Save</a>
                    </div>
                  </div>
                </div></div>
              </div>
            </PopoverContent>
          </Popover>





        </div>


      </div>
    )
  }
}
