import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../utils/formElemUtil";
import Moolyaselect from "../../../../../../commons/components/select/MoolyaSelect";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import _ from "lodash";
import {multipartASyncFormHandler} from "../../../../../../commons/MlMultipartFormAction";
import {findStartupInvestorDetailsActionHandler} from "../../../actions/findPortfolioStartupDetails";
import MlLoader from "../../../../../../commons/components/loader/loader";
var FontAwesome = require('react-fontawesome');


export default class MlStartupInvestor extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupInvestor: [],
      popoverOpen:false,
      // index:"",
      selectedIndex:-1,
      startupInvestorList:[],
      selectedVal:null,
      selectedObject:"default"
    }
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
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
    this.imagesDisplay()
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.investor)
    if(empty){
      const response = await findStartupInvestorDetailsActionHandler(portfolioDetailsId);
      if (response) {
        this.setState({loading: false, startupInvestor: response, startupInvestorList: response});
      }
    }else{
      this.setState({loading: false, startupInvestor: that.context.startupPortfolio.investor, startupInvestorList:that.context.startupPortfolio.investor});
    }
  }
  addInvestor(){
    this.setState({selectedObject : "default", popoverOpen : !(this.state.popoverOpen), data : {}})
    if(this.state.startupInvestor){
      this.setState({selectedIndex:this.state.startupInvestor.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }
  onTileClick(index, e){
    let cloneArray = _.cloneDeep(this.state.startupInvestor);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({selectedIndex: index, data:details,selectedObject : index,popoverOpen : !(this.state.popoverOpen),"selectedVal" : details.fundingTypeId});
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

  onOptionSelected(selectedId){
    let details =this.state.data;
    details=_.omit(details,["fundingTypeId"]);
    details=_.extend(details,{["fundingTypeId"]:selectedId});
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
  onSaveAction(e){
    this.setState({startupInvestorList:this.state.startupInvestor, popoverOpen : false})
  }

  sendDataToParent() {
    let data = this.state.data;
    let startupInvestor1 = this.state.startupInvestor;
    let startupInvestor = _.cloneDeep(startupInvestor1);
    data.index = this.state.selectedIndex;
    startupInvestor[this.state.selectedIndex] = data;    //startupInvestor[this.state.index] = data;
    let arr = [];
    _.each(startupInvestor, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, "__typename")
      // if(item && item.logo){
      //   delete item.logo['__typename'];
      // }
      arr.push(newItem)
    })
    startupInvestor = arr;
    this.setState({startupInvestor: startupInvestor})
    this.props.getInvestorDetails(startupInvestor);
    this.imagesDisplay()
  }
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{investor:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }
  onFileUploadCallBack(name,fileName, resp){
    if(resp){
      let result = JSON.parse(resp);
      if(result.success){
        this.setState({loading:true})
        this.fetchOnlyImages();
      }
    }
  }

  async fetchOnlyImages(){
    const response = await findStartupInvestorDetailsActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let thisState=this.state.selectedIndex;
      let dataDetails =this.state.startupInvestor
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response[thisState]
        specificData['logo']= curUpload['logo']
        this.setState({loading: false, startupInvestor:cloneBackUp });
      }else {
        this.setState({loading: false})
      }
    }
  }

  async imagesDisplay(){
    const response = await findStartupInvestorDetailsActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let detailsArray = response?response:[]
      let dataDetails =this.state.startupInvestor
      let cloneBackUp = _.cloneDeep(dataDetails);
      _.each(detailsArray, function (obj,key) {
        cloneBackUp[key]["logo"] = obj.logo;
      })
      let listDetails = this.state.startupInvestorList || [];
      listDetails = cloneBackUp
      let cloneBackUpList = _.cloneDeep(listDetails);
      this.setState({loading: false, startupInvestor:cloneBackUp,startupInvestorList:cloneBackUpList});
    }
  }

  render(){
    let query=gql`query{
      data:fetchFundingTypes {
        label:displayName
        value:_id
      }
    }`;
    let that = this;
    const showLoader = that.state.loading;
    let investorsArray = that.state.startupInvestorList || [];
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
          <h2>Investor</h2>
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
                        <h3 onClick={this.addInvestor.bind(this)}>Add New Investor</h3>
                      </div>
                    </a>
                  </div>
                  {investorsArray.map(function (details, idx) {
                    return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a id={"create_client"+idx}>
                        <div className="list_block">
                          <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                          <div className="hex_outer" onClick={that.onTileClick.bind(that, idx)}><img
                            src={details.logo ? details.logo.fileUrl : "/images/def_profile.png"}/></div>
                          <h3>{details.name ? details.name : ''}</h3>
                        </div>
                      </a>
                    </div>)
                  })}
                </div>
              </div>

            </ScrollArea>

            <Popover placement="right" isOpen={this.state.popoverOpen}  target={"create_client"+this.state.selectedObject} toggle={this.toggle}>
              <PopoverTitle>Add Investor</PopoverTitle>
              <PopoverContent>
                <div  className="ml_create_client">
                  <div className="medium-popover"><div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input type="text" name="name" placeholder="Name" className="form-control float-label" defaultValue={this.state.data.name}  onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isNamePrivate" defaultValue={this.state.data.isNamePrivate}  onClick={this.onLockChange.bind(this, "isNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isNamePrivate}/>
                      </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                      labelKey={'label'} queryType={"graphql"} query={query} placeholder={'Select Funding..'}
                                      isDynamic={true}
                                      onSelect={this.onOptionSelected.bind(this)}
                                      selectedValue={this.state.selectedVal}/>
                      </div>
                      <div className="form-group">
                        <input type="text" name="investmentAmount" placeholder="Investment Amount" className="form-control float-label" id="" defaultValue={this.state.data.investmentAmount}  onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isInvestmentAmountPrivate" defaultValue={this.state.data.isInvestmentAmountPrivate}  onClick={this.onLockChange.bind(this, "isInvestmentAmountPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isInvestmentAmountPrivate}/>
                      </div>
                      <div className="form-group">
                        <input type="text" name="description" placeholder="About" className="form-control float-label" id="" defaultValue={this.state.data.description}  onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" defaultValue={this.state.data.isDescriptionPrivate}  onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isDescriptionPrivate}/>
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
          </div>
        </div>)}
      </div>
    )
  }
}
MlStartupInvestor.contextTypes = {
  startupPortfolio: PropTypes.object
};
