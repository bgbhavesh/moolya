import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
import {dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel} from "../../../../../utils/formElemUtil";
import Moolyaselect from "../../../../../commons/components/MlAdminSelectWrapper";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import _ from "lodash";
import Datetime from "react-datetime";
import {multipartASyncFormHandler} from "../../../../../../commons/MlMultipartFormAction";
import {fetchCompanyDetailsHandler} from "../../../actions/findCompanyPortfolioDetails";
import MlLoader from "../../../../../../commons/components/loader/loader";
import {putDataIntoTheLibrary} from '../../../../../../commons/actions/mlLibraryActionHandler'
import CDNImage from "../../../../../../commons/components/CDNImage/CDNImage";
var FontAwesome = require('react-fontawesome');

const KEY = "awardsRecognition"

export default class MlCompanyAwards extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      privateKey:{},
      awards: [],
      popoverOpen:false,
      selectedIndex:-1,
      awardsList:[],
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
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.companyPortfolio && that.context.companyPortfolio.awardsRecognition)
    if(empty){
      const response = await fetchCompanyDetailsHandler(portfolioDetailsId, KEY);
      if (response && response.awardsRecognition) {
        this.setState({loading: false, awards: response.awardsRecognition, awardsList: response.awardsRecognition});
      }else{
        this.setState({loading:false})
      }
    }else{
      this.setState({loading: false, awards: that.context.companyPortfolio.awardsRecognition, awardsList: that.context.companyPortfolio.awardsRecognition});
    }
  }
  addAward(){
    this.setState({selectedObject : "default", popoverOpen : !(this.state.popoverOpen), data : {}})
    if(this.state.awards){
      this.setState({selectedIndex:this.state.awards.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }

  onSaveAction(e){
    this.setState({awardsList:this.state.awards, popoverOpen : false})
  }

  onTileClick(index, e){
    let cloneArray = _.cloneDeep(this.state.awards);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({selectedIndex:index, data:details,selectedObject : index,popoverOpen : !(this.state.popoverOpen), "selectedVal" : details.awardId});
    setTimeout(function () {
      _.each(details.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  onLockChange(fiedName, field, e){
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
    var privateKey = {keyName:fiedName, booleanKey:field, isPrivate:isPrivate, index:this.state.selectedIndex, tabName:KEY}
    this.setState({privateKey:privateKey})
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

  onOptionSelected(selectedAward, callback, selObject) {
    let details = this.state.data;
    details = _.omit(details, ["awardId"]);
    details = _.omit(details, ["awardName"]);
    if(selectedAward){
      details = _.extend(details, {["awardId"]: selectedAward, "awardName": selObject.label});
      this.setState({data: details}, function () {
        this.setState({"selectedVal": selectedAward, awardName: selObject.label})
        this.sendDataToParent()
      })
    }else {
      details = _.extend(details, {["awardId"]: '', "awardName": ''});
      this.setState({data: details}, function () {
        this.setState({"selectedVal": '', awardName: ''})
        this.sendDataToParent()
      })
    }

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

  handleYearChange(e){
    let details =this.state.data;
    let name  = 'year';
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:this.refs.year.state.inputValue});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }

  sendDataToParent(){
    let data = this.state.data;
    let awards = this.state.awards;
    awards = _.cloneDeep(awards);
    data.index = this.state.selectedIndex;
    awards[this.state.selectedIndex] = data;
    let arr = [];
    _.each(awards, function (item)
    {
        for (var propName in item) {
          if (item[propName] === null || item[propName] === undefined || propName === 'privateFields' || propName === 'logo') {
            delete item[propName];
          }
        }
        newItem = _.omit(item, "__typename");
        newItem = _.omit(newItem, ["privateFields"])
        //let updateItem = _.omit(newItem, 'logo');
        arr.push(newItem)
    })
    awards = arr;
    this.setState({awards:awards})
    this.props.getAwardsDetails(awards, this.state.privateKey);
  }

  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{awardsRecognition:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};
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
    if (response && response.awardsRecognition) {
      let thisState=this.state.selectedIndex;
      let dataDetails =this.state.awards
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response.awardsRecognition[this.state.selectedIndex]
        specificData['logo']= curUpload['logo']
        this.setState({loading: false, awards:cloneBackUp });

      }else {
        this.setState({loading: false})
      }
    }
  }


  async imagesDisplay(){
    const response = await fetchCompanyDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response && response.awardsRecognition) {
      let dataDetails =this.state.awards
      if(!dataDetails || dataDetails.length<1){
        dataDetails = response.awardsRecognition?response.awardsRecognition:[]
      }
      let cloneBackUp = _.cloneDeep(dataDetails);
      if(cloneBackUp && cloneBackUp.length>0){
        _.each(dataDetails, function (obj,key) {
          cloneBackUp[key]["logo"] = obj.logo;
        })
      }
      let listDetails = this.state.awardsList || [];
      listDetails = cloneBackUp
      let cloneBackUpList = _.cloneDeep(listDetails);
      this.setState({loading: false, awards:cloneBackUp,awardsList:cloneBackUpList});
    }
  }


  render(){
    var yesterday = Datetime.moment().subtract(0,'day');
    var valid = function( current ){
      return current.isBefore( yesterday );
    };
    let query=gql`query{
      data:fetchActiveAwards {
        label:awardDisplayName
        value:_id
      }
    }`;
    let that = this;
    const showLoader = that.state.loading;
    let awardsList = that.state.awardsList || [];
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
          <h2>Awards</h2>
          <div className="requested_input main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}>
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-2 col-md-3 col-sm-3">
                    <a href="#" id="create_clientdefault" data-placement="top" data-class="large_popover" >
                      <div className="list_block notrans" onClick={this.addAward.bind(this)}>
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3 onClick={this.addAward.bind(this)}>Add New Awards</h3>
                      </div>
                    </a>
                  </div>
                  {awardsList.map(function (details, idx) {
                    return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a href="#" id={"create_client"+idx}>
                        <div className="list_block">
                          <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                          {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
                          <div className="hex_outer" onClick={that.onTileClick.bind(that, idx)}>
                            {details.logo && details.logo.fileUrl ? <img src={details.logo.fileUrl} /> : <CDNImage src="/images/def_profile.png" /> }
                          </div>
                          <h3>{details.awardName?details.awardName:""}</h3>
                        </div>
                      </a>
                    </div>)
                  })}
                </div>
              </div>
            </ScrollArea>
            <Popover placement="right" isOpen={this.state.popoverOpen}  target={"create_client"+this.state.selectedObject} toggle={this.toggle}>
              <PopoverTitle>Add Award</PopoverTitle>
              <PopoverContent>
                <div  className="ml_create_client">
                  <div className="medium-popover"><div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                      labelKey={'label'} queryType={"graphql"} query={query}
                                      isDynamic={true} placeholder="Select Award.."
                                      onSelect={this.onOptionSelected.bind(this)}
                                      selectedValue={this.state.selectedVal}/>
                      </div>
                      <div className="form-group">
                        <Datetime dateFormat="YYYY" timeFormat={false} viewMode="years"
                                  inputProps={{placeholder: "Select Year", className:"float-label form-control"}} defaultValue={this.state.data.year}
                                  closeOnSelect={true} ref="year" onBlur={this.handleYearChange.bind(this)} isValidDate={ valid }/>
                      </div>
                      <div className="form-group">
                        <input type="text" name="awardsDescription" placeholder="About" className="form-control float-label" defaultValue={this.state.data.awardsDescription}  onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAwardsDescriptionPrivate" defaultValue={this.state.data.isAwardsDescriptionPrivate}  onClick={this.onLockChange.bind(this, "awardsDescription", "isAwardsDescriptionPrivate")}/>
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
MlCompanyAwards.contextTypes = {
  companyPortfolio: PropTypes.object,
};
