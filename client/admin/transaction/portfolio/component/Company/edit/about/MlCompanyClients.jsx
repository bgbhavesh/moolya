import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import Moolyaselect from  '../../../../../../commons/components/MlAdminSelectWrapper';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import {multipartASyncFormHandler} from '../../../../../../../commons/MlMultipartFormAction'
import {fetchDetailsStartupActionHandler} from '../../../../actions/findPortfolioStartupDetails';
import {putDataIntoTheLibrary} from '../../../../../../../commons/actions/mlLibraryActionHandler'
import MlLoader from '../../../../../../../commons/components/loader/loader'


export default class MlCompanyClients extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: false,
      data:{},
      clients:this.props.employmentDetails || [],
      popoverOpen:false,
      selectedIndex:-1,
      clientsList:this.props.employmentDetails || [],
      selectedVal:null,
      selectedObject:"default"
    }
    this.handleBlur.bind(this);
    this.onSaveAction.bind(this);
    this.imagesDisplay.bind(this);
    this.libraryAction.bind(this);
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
    let empty = _.isEmpty(this.context.companyPortfolio && this.context.companyPortfolio.clients)
    if(!empty){
      this.setState({loading: false, clients: this.context.companyPortfolio.clients, clientsList:this.context.companyPortfolio.clients});
    }
  }

  addClient(){
    this.setState({selectedObject : "default", popoverOpen : !(this.state.popoverOpen), data : {}})
    if(this.state.clients){
      this.setState({selectedIndex:this.state.clients.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }

  onTileSelect(index, e){
    let cloneArray = _.cloneDeep(this.state.clients);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({selectedIndex:index, data:details,selectedObject : index,popoverOpen : !(this.state.popoverOpen), "selectedVal" : details.companyId});
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
  onSaveAction(e){
    this.setState({clientsList:this.state.clients,popoverOpen : false})
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

  // onOptionSelected(selectedId){
  //   let details =this.state.data;
  //   details=_.omit(details,["companyId"]);
  //   details=_.extend(details,{["companyId"]: selectedId});
  //   this.setState({data:details}, function () {
  //     this.setState({"selectedVal" : selectedId})
  //     this.sendDataToParent()
  //   })
  //
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

  sendDataToParent(){
    let data = this.state.data;
    let clients = this.state.clients;
    clients = _.cloneDeep(clients);
    data.index = this.state.selectedIndex;
    clients[this.state.selectedIndex] = data;
    let arr = [];
    _.each(clients, function (item)
    {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      newItem = _.omit(item, "__typename");
      let updateItem = _.omit(newItem, 'logo');
      arr.push(updateItem)
    })
    clients = arr;
    this.setState({clients:clients})
    this.props.getClients(clients);

  }

  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{clients:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, file));
  }

  onFileUploadCallBack(file,resp) {
    if (resp) {
      let result = JSON.parse(resp)
      let userOption = confirm("Do you want to add the file into the library")
      if (userOption) {
        let fileObjectStructure = {
          fileName: file.name,
          fileType: file.type,
          fileUrl: result.result,
          libraryType: "image"
        }
        this.libraryAction(fileObjectStructure)
        if (result.success) {
          this.setState({loading: true})
          this.fetchOnlyImages();
          this.imagesDisplay();
        }
      }
    }
  }

  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    return resp;
  }

  async fetchOnlyImages(){
    const response = await fetchDetailsStartupActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let thisState=this.state.selectedIndex;
      let dataDetails =this.state.clients
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response.clients[thisState]
        specificData['logo']= curUpload['logo']
        this.setState({loading: false, clients:cloneBackUp });
      }else {
        this.setState({loading: false})
      }
    }
  }

  async imagesDisplay(){
    const response = await fetchDetailsStartupActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let dataDetails =this.state.clients;
      if(!dataDetails || dataDetails.length<1){
        dataDetails = response&&response.clients?response.clients:[]
      }
      let cloneBackUp = _.cloneDeep(dataDetails);
      if(cloneBackUp && cloneBackUp.length>0) {
        _.each(dataDetails, function (obj, key) {
          cloneBackUp[key]["logo"] = obj.logo;
        })
      }
      let listDetails = this.state.clientsList || [];
      listDetails = cloneBackUp
      let cloneBackUpList = _.cloneDeep(listDetails);
      this.setState({loading: false, clients:cloneBackUp,clientsList:cloneBackUpList});
    }
  }

  emptyClick(e) {
    if (this.state.popoverOpen)
      this.setState({popoverOpen: false})
  }

  render(){
    // let query=gql`query{
    //   data:fetchStageOfCompany {
    //     label:stageOfCompanyDisplayName
    //     value:_id
    //   }
    // }`;
    let that = this;
    const showLoader = that.state.loading;
    let clientsArray = that.state.clientsList || [];
    let displayUploadButton = null;
    if(this.state.selectedObject != "default"){
      displayUploadButton = true
    }else{
      displayUploadButton = false
    }
    return(
      <div onClick={this.emptyClick.bind(this)}>
        <h2>Clients</h2>
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
                    <div className="list_block notrans" onClick={this.addClient.bind(this)}>
                      <div className="hex_outer"><span className="ml ml-plus "></span></div>
                      <h3 onClick={this.addClient.bind(this)}>Add New Client</h3>
                    </div>
                  </a>
                </div>
                {clientsArray.map(function (details, idx) {
                  return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                    <a href="#" id={"create_client"+idx}>
                      <div className="list_block">
                        <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                        <div className="hex_outer portfolio-font-icons" onClick={that.onTileSelect.bind(that, idx)}><img src={details.logo&&details.logo.fileUrl}/></div>
                        {/*<h3>{details.description} <span className="assets-list">50</span></h3>*/}
                        <h3>{details.companyName?details.companyName:""} </h3>
                      </div>
                    </a>
                  </div>)
                })}
              </div>
            </div>
          </ScrollArea>
          <Popover placement="right" isOpen={this.state.popoverOpen} target={"create_client"+this.state.selectedObject}  toggle={this.toggle}>
             <PopoverTitle>Add New Client</PopoverTitle>
            <PopoverContent>
              <div className="ml_create_client">
                <div className="medium-popover"><div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}*/}
                                    {/*labelKey={'label'} queryType={"graphql"} query={query}*/}
                                    {/*isDynamic={true}*/}
                                    {/*onSelect={this.onOptionSelected.bind(this)}*/}
                                    {/*selectedValue={this.state.selectedVal}/>*/}
                      <input type="text" name="companyName" placeholder="Company Name" className="form-control float-label" defaultValue={this.state.data.companyName} onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"  defaultValue={this.state.data.isCompanyNamePrivate}  onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>
                      <input type="checkbox" className="lock_input" id="isCompanyNamePrivate" checked={this.state.data.isCompanyNamePrivate}/>
                    </div>
                    <div className="form-group">
                      <input type="text" name="description" placeholder="About" className="form-control float-label" id="" defaultValue={this.state.data.description} onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon" id="isDescriptionPrivate"  defaultValue={this.state.data.isDescriptionPrivate}  onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/>
                      <input type="checkbox" className="lock_input" id="isDescriptionPrivate" checked={this.state.data.isDescriptionPrivate}/>
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
                </div></div>
              </div>
            </PopoverContent>
          </Popover>
        </div>)}
      </div>
    )
  }
}
MlCompanyClients.contextTypes = {
  companyPortfolio: PropTypes.object,
};
