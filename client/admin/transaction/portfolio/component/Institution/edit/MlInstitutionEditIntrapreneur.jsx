import React, {Component, PropTypes} from "react";
import ScrollArea from "react-scrollbar";
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
import {dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel} from "../../../../../utils/formElemUtil";
import Moolyaselect from "../../../../../commons/components/MlAdminSelectWrapper";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import _ from "lodash";
import Datetime from "react-datetime";
import {multipartASyncFormHandler} from "../../../../../../commons/MlMultipartFormAction";
import {fetchInstitutionDetailsHandler} from "../../../actions/findPortfolioInstitutionDetails";
import MlLoader from "../../../../../../commons/components/loader/loader";
import {putDataIntoTheLibrary} from '../../../../../../commons/actions/mlLibraryActionHandler'
var FontAwesome = require('react-fontawesome');
import generateAbsolutePath from '../../../../../../../lib/mlGenerateAbsolutePath';

const KEY = "intrapreneurRecognition"

export default class MlInstitutionEditIntrapreneur extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      privateKey:{},
      institutionIntrapreneur: [],
      popoverOpen:false,
      selectedIndex:-1,
      institutionIntrapreneurList:[],
      selectedVal:null,
      selectedObject:"default"
    }
    this.handleBlur.bind(this);
    this.handleYearChange.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.onSaveAction.bind(this);
    this.imagesDisplay.bind(this);
    this.libraryAction.bind(this);
    return this;
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler()
    initalizeFloatLabel();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
    this.imagesDisplay()
    //initalizeFloatLabel();
  }
  componentWillMount(){
    const resp= this.fetchPortfolioDetails();
    return resp;
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.institutionPortfolio && that.context.institutionPortfolio.intrapreneurRecognition)
    const response = await fetchInstitutionDetailsHandler(portfolioDetailsId, KEY);
    if(empty){
      if (response && response.intrapreneurRecognition && response.intrapreneurRecognition.length>0) {
        this.setState({loading: false, institutionIntrapreneur: response.intrapreneurRecognition, institutionIntrapreneurList: response.intrapreneurRecognition});
      }else{
        this.setState({loading:false})
      }
    }else{
      this.setState({loading: false, institutionIntrapreneur: that.context.institutionPortfolio.intrapreneurRecognition, institutionIntrapreneurList: that.context.institutionPortfolio.intrapreneurRecognition});
    }
    this.institutionIntrapreneurServer = response && response.intrapreneurRecognition?response.intrapreneurRecognition:[]
  }

  addIntrapreneur(){
    this.setState({selectedObject : "default", popoverOpen : !(this.state.popoverOpen), data : {}})
    if(this.state.institutionIntrapreneur){
      this.setState({selectedIndex:this.state.institutionIntrapreneur.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }

  onSaveAction(e){
    this.sendDataToParent(true);
    var setObject = this.state.institutionIntrapreneur
    if (this.context && this.context.institutionPortfolio && this.context.institutionPortfolio.intrapreneurRecognition) {
      setObject = this.context.institutionPortfolio.intrapreneurRecognition
    }
    this.setState({institutionIntrapreneurList: setObject, popoverOpen: false})
  }

  onTileClick(index, e){
    let cloneArray = _.cloneDeep(this.state.institutionIntrapreneur);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({selectedIndex:index, data:details,
                   selectedObject : index,
                   popoverOpen : !(this.state.popoverOpen)},()=>{
                        this.lockPrivateKeys(index)
                  });
  }
  //todo:// context data connection first time is not coming have to fix
  lockPrivateKeys(selIndex) {
    var privateValues = this.institutionIntrapreneurServer && this.institutionIntrapreneurServer[selIndex] ? this.institutionIntrapreneurServer[selIndex].privateFields : []
    var filterPrivateKeys = _.filter(this.context.portfolioKeys && this.context.portfolioKeys.privateKeys, {
      tabName: this.props.tabName,
      index: selIndex
    })
    var filterRemovePrivateKeys = _.filter(this.context.portfolioKeys && this.context.portfolioKeys.removePrivateKeys, {
      tabName: this.props.tabName,
      index: selIndex
    })
    var finalKeys = _.unionBy(filterPrivateKeys, privateValues, 'booleanKey')
    var keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    _.each(keys, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }
  onLockChange(fiedName, field, e){
    var isPrivate = false
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      isPrivate = true
    }
    var privateKey = {keyName:fiedName, booleanKey:field, isPrivate:isPrivate, index:this.state.selectedIndex, tabName: this.props.tabName}
    this.setState({privateKey:privateKey}, function () {
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

  handleYearChange(e){
    let details =this.state.data;
    let name  = 'year';
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:this.refs.year.state.inputValue});
    this.setState({data:details}, function () {
      // this.sendDataToParent()
    })
  }

  sendDataToParent(isSaveClicked){
    let data = this.state.data;
    let intrapreneur = this.state.institutionIntrapreneur;
    let institutionIntrapreneur = _.cloneDeep(intrapreneur);
    data.index = this.state.selectedIndex;
    if(isSaveClicked){
      institutionIntrapreneur[this.state.selectedIndex] = data;
    }
    let arr = [];
    _.each(institutionIntrapreneur, function (item)
    {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      var newItem = _.omit(item, "__typename");
      newItem = _.omit(newItem, ["privateFields"])
      arr.push(newItem)
    })
    institutionIntrapreneur = arr;
    this.setState({institutionIntrapreneur:institutionIntrapreneur})
    this.props.getIntrapreneurDetails(institutionIntrapreneur, this.state.privateKey);
  }

  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{intrapreneurRecognition:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};
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
    const response = await fetchInstitutionDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response && response.intrapreneurRecognition) {
      let dataDetails =this.state.institutionIntrapreneur
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response.intrapreneurRecognition[this.state.selectedIndex]
        specificData['logo']= curUpload['logo']
        this.setState({loading: false, institutionIntrapreneur:cloneBackUp });

      }else {
        this.setState({loading: false})
      }
    }
  }


  async imagesDisplay(){
    const response = await fetchInstitutionDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response && response.intrapreneurRecognition) {
      let dataDetails =this.state.institutionIntrapreneur
      if(!dataDetails || dataDetails.length<1){
        dataDetails = response.intrapreneurRecognition?response.intrapreneurRecognition:[]
      }
      let cloneBackUp = _.cloneDeep(dataDetails);
      if(cloneBackUp && cloneBackUp.length>0){
        _.each(dataDetails, function (obj,key) {
          cloneBackUp[key]["logo"] = obj.logo;
        })
      }
      let listDetails = this.state.institutionIntrapreneurList || [];
      listDetails = cloneBackUp
      let cloneBackUpList = _.cloneDeep(listDetails);
      this.setState({loading: false, institutionIntrapreneur:cloneBackUp,institutionIntrapreneurList:cloneBackUpList});
    }
  }


  render(){
    var yesterday = Datetime.moment().subtract(0,'day');
    var valid = function( current ){
      return current.isBefore( yesterday );
    };
    // let query=gql`query{
    //   data:fetchActiveIntrapreneur {
    //     label:intrapreneurDisplayName
    //     value:_id
    //   }
    // }`;
    console.log('----data---', this.state.data);
    let that = this;
    const showLoader = that.state.loading;
    let institutionIntrapreneurList = that.state.institutionIntrapreneurList || [];
    let displayUploadButton = null;
    if(this.state.selectedObject != "default"){
      displayUploadButton = true
    }else{
      displayUploadButton = false
    }
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div>
            <h2>Intrapreneur</h2>
            <div className="requested_input main_wrap_scroll">
              <ScrollArea
                speed={0.8}
                className="main_wrap_scroll"
                smoothScrolling={true}
                default={true}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-3">
                      <a href="" id="create_clientdefault" data-placement="top" data-class="large_popover" >
                        <div className="list_block notrans" onClick={this.addIntrapreneur.bind(this)}>
                          <div className="hex_outer"><span className="ml ml-plus "></span></div>
                          <h3 onClick={this.addIntrapreneur.bind(this)}>Add New Intrapreneur</h3>
                        </div>
                      </a>
                    </div>
                    {institutionIntrapreneurList.map(function (details, idx) {
                      return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                        <a href="" id={"create_client"+idx}>
                          <div className="list_block">
                            <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                            {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
                            <div className="hex_outer" onClick={that.onTileClick.bind(that, idx)}><img
                              src={details.logo ? generateAbsolutePath(details.logo.fileUrl) : "/images/def_profile.png"}/></div>
                            <h3>{details.intrapreneurName?details.intrapreneurName:""}</h3>
                          </div>
                        </a>
                      </div>)
                    })}
                  </div>
                </div>
              </ScrollArea>
              <Popover placement="right" isOpen={this.state.popoverOpen}  target={"create_client"+this.state.selectedObject} toggle={this.toggle}>
                <PopoverTitle>Add Intrapreneur</PopoverTitle>
                <PopoverContent>
                  <div  className="ml_create_client">
                    <div className="medium-popover"><div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input type="text" name="intrapreneurName" placeholder="Name" className="form-control float-label" defaultValue={this.state.data.intrapreneurName}  onBlur={this.handleBlur.bind(this)}/>
                        </div>
                        {/*<div className="form-group">
                          <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                        labelKey={'label'} queryType={"graphql"} query={query}
                                        isDynamic={true} placeholder="Select Award.."
                                        onSelect={this.onOptionSelected.bind(this)}
                                        selectedValue={this.state.selectedVal}/>
                        </div>*/}
                        <div className="form-group">
                          <Datetime dateFormat="YYYY" timeFormat={false} viewMode="years"
                                    inputProps={{placeholder: "Select Year", className:"float-label form-control",readOnly:true}} defaultValue={this.state.data.year}
                                    closeOnSelect={true} ref="year" onBlur={this.handleYearChange.bind(this)} isValidDate={ valid }/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="intrapreneurDescription" placeholder="About" className="form-control float-label" defaultValue={this.state.data.intrapreneurDescription}  onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" defaultValue={this.state.data.isDescriptionPrivate}  onClick={this.onLockChange.bind(this, "intrapreneurDescription", "isDescriptionPrivate")}/>
                        </div>
                        {displayUploadButton?<div className="form-group">
                          <div className="fileUpload mlUpload_btn">
                            <span>Upload Logo</span>
                            <input type="file" name="logo" id="logo" className="upload"  accept="image/*" onChange={this.onLogoFileUpload.bind(this)}  />
                          </div>
                        </div>:""}
                        <div className="clearfix"></div>
                        <div className="form-group">
                          <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data && this.state.data.makePrivate}  name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                        </div>
                        <div className="ml_btn" style={{'textAlign': 'center'}}>
                          <a className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                        </div>
                      </div>
                    </div></div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>)}
      </div>
    )
  }
}
MlInstitutionEditIntrapreneur.contextTypes = {
  institutionPortfolio: PropTypes.object,
  portfolioKeys :PropTypes.object
};
