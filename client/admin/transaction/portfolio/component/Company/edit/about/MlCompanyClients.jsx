import React, { Component, PropTypes }  from "react";
import ScrollArea from 'react-scrollbar'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import {multipartASyncFormHandler} from '../../../../../../../commons/MlMultipartFormAction'
import {fetchCompanyDetailsHandler} from '../../../../actions/findCompanyPortfolioDetails';
import {putDataIntoTheLibrary} from '../../../../../../../commons/actions/mlLibraryActionHandler'
import MlLoader from '../../../../../../../commons/components/loader/loader'
import {mlFieldValidations} from "../../../../../../../commons/validations/mlfieldValidation";

const KEY = 'clients'

export default class MlCompanyClients extends Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: false,
      data:{},
      privateKey:{},
      companyClients:this.props.employmentDetails || [],
      popoverOpen:false,
      selectedIndex:-1,
      companyClientsList:this.props.employmentDetails || [],
      selectedVal:null,
      selectedObject:"default"
    }
    this.tabName = this.props.tabName || ""
    this.handleBlur = this.handleBlur.bind(this);
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
      this.setState({loading: false, companyClients: this.context.companyPortfolio.clients, companyClientsList:this.context.companyPortfolio.clients});
    }
  }

  addClient(){
    this.setState({selectedObject : "default", popoverOpen : !(this.state.popoverOpen), data : {}})
    if(this.state.companyClients){
      this.setState({selectedIndex:this.state.companyClients.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }

  onTileSelect(index, e){
    let cloneArray = _.cloneDeep(this.state.companyClients);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({selectedIndex:index, data:details,selectedObject : index,popoverOpen : !(this.state.popoverOpen), "selectedVal" : details.companyId});
    setTimeout(function () {
      _.each(details.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  onLockChange(fieldName, field, e){
    var isPrivate = false
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true
    }else{
      details=_.extend(details,{[key]:false});
    }

    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate, index:this.state.selectedIndex, tabName:KEY}
    this.setState({privateKey:privateKey})

    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  onSaveAction(e){
    this.sendDataToParent(true)
    var setObject =  this.state.companyClients
    if(this.context && this.context.companyPortfolio && this.context.companyPortfolio.clients ){
      setObject = this.context.companyPortfolio.clients
    }
    this.setState({companyClientsList:setObject,popoverOpen : false})
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
      // this.sendDataToParent()
    })
  }

  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      // this.sendDataToParent()
    })
  }


  getFieldValidations() {
    const ret = mlFieldValidations(this.refs);
    return {tabName: this.tabName, errorMessage: ret, index: this.state.selectedIndex}
  }

  sendDataToParent(){
    const requiredFields = this.getFieldValidations();
    let data = this.state.data;
    let clients = this.state.companyClients;
    let companyClients = _.cloneDeep(clients);
    data.index = this.state.selectedIndex;
    companyClients[this.state.selectedIndex] = data;
    let arr = [];
    _.each(companyClients, function (item)
    {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, "__typename");
      newItem = _.omit(newItem, ["privateFields"])
      let updateItem = _.omit(newItem, 'logo');
      arr.push(updateItem)
    })
    companyClients = arr;
    this.setState({companyClients:companyClients})
    this.props.getClients(companyClients, this.state.privateKey, requiredFields);

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
    const response = await fetchCompanyDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response && response.clients) {
      let thisState=this.state.selectedIndex;
      let dataDetails =this.state.companyClients
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response.clients[thisState]
        specificData['logo']= curUpload['logo']
        this.setState({loading: false, companyClients:cloneBackUp });
      }else {
        this.setState({loading: false})
      }
    }
  }

  async imagesDisplay(){
    const response = await fetchCompanyDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response && response.clients) {
      let dataDetails =this.state.companyClients;
      if(!dataDetails || dataDetails.length<1){
        dataDetails = response&&response.clients?response.clients:[]
      }
      let cloneBackUp = _.cloneDeep(dataDetails);
      if(cloneBackUp && cloneBackUp.length>0) {
        _.each(dataDetails, function (obj, key) {
          cloneBackUp[key]["logo"] = obj.logo;
        })
      }
      let listDetails = this.state.companyClientsList || [];
      listDetails = cloneBackUp
      let cloneBackUpList = _.cloneDeep(listDetails);
      this.setState({loading: false, companyClients:cloneBackUp,companyClientsList:cloneBackUpList});
    }
  }

  emptyClick(e) {
    if (this.state.popoverOpen)
      this.setState({popoverOpen: false})
  }

  render(){
    let that = this;
    const showLoader = that.state.loading;
    let clientsArray = that.state.companyClientsList || [];
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
                    <a href="" id="create_clientdefault" data-placement="right" data-class="large_popover" >
                      <div className="list_block notrans" onClick={this.addClient.bind(this)}>
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3 onClick={this.addClient.bind(this)}>Add New Client</h3>
                      </div>
                    </a>
                  </div>
                  {clientsArray.map(function (details, idx) {
                    return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a href="" id={"create_client"+idx}>
                        <div className="list_block">
                          <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                          <div className="hex_outer portfolio-font-icons" onClick={that.onTileSelect.bind(that, idx)}><img src={details.logo&&details.logo.fileUrl}/></div>
                          <h3>{details.clientName || ''} </h3>
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
                      <div className="form-group mandatory">
                        <input type="text" name="clientName" placeholder="Name" className="form-control float-label"
                               ref={"clientName"}
                               defaultValue={this.state.data.clientName} onBlur={this.handleBlur} data-required={true}
                               data-errMsg="Client Name is required"/>
                        <FontAwesome name='unlock' className="input_icon" id="isClientNamePrivate"  defaultValue={this.state.data.isClientNamePrivate}  onClick={this.onLockChange.bind(this, "clientName", "isClientNamePrivate")}/>
                      </div>
                      <div className="form-group">
                        <input type="text" name="clientDescription" placeholder="About" className="form-control float-label" defaultValue={this.state.data.clientDescription} onBlur={this.handleBlur}/>
                        <FontAwesome name='unlock' className="input_icon" id="isDescriptionPrivate"  defaultValue={this.state.data.isDescriptionPrivate}  onClick={this.onLockChange.bind(this, "clientDescription", "isDescriptionPrivate")}/>
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
                        <a href="" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
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
