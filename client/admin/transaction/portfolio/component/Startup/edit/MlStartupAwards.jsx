import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {Popover, PopoverContent} from "reactstrap";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../utils/formElemUtil";
import Moolyaselect from "../../../../../../commons/components/select/MoolyaSelect";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import _ from "lodash";
import Datetime from "react-datetime";
import {multipartASyncFormHandler} from "../../../../../../commons/MlMultipartFormAction";
import {fetchStartupPortfolioAwards} from "../../../actions/findPortfolioStartupDetails";
var FontAwesome = require('react-fontawesome');

export default class MlStartupAwards extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupAwards: [],
      popoverOpen:false,
      // index:"",
      selectedIndex:-1,
      startupAwardsList:[],
      indexArray:[],
      selectedVal:null,
      selectedObject:"default"
    }
    this.handleBlur.bind(this);
    this.handleYearChange.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.onSaveAction.bind(this);
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
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.awardsRecognition)
    if(empty){
      const response = await fetchStartupPortfolioAwards(portfolioDetailsId);
      if (response) {
        this.setState({loading: false, startupAwards: response, startupAwardsList: response});
      }
    }else{
      this.setState({loading: false, startupAwards: that.context.startupPortfolio.awardsRecognition, startupAwardsList: that.context.startupPortfolio.awardsRecognition});
    }
  }
  addAward(){
    this.setState({selectedObject : "default", popoverOpen : !(this.state.popoverOpen), data : {}})
    if(this.state.startupAwards){
      this.setState({selectedIndex:this.state.startupAwards.length})
    }else{
      this.setState({selectedIndex:0})
    }
  }

  onSaveAction(e){
    this.setState({startupAwardsList:this.state.startupAwards, popoverOpen : false})
  }

  onTileClick(index, e){
    let cloneArray = _.cloneDeep(this.state.startupAwards);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if(details && details.logo){
      delete details.logo['__typename'];
    }
    this.setState({selectedIndex:index, data:details,selectedObject : index,popoverOpen : !(this.state.popoverOpen), "selectedVal" : details.awardId});
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

  onOptionSelected(selectedAward){
    let details =this.state.data;
    details=_.omit(details,["awardId"]);
    details=_.extend(details,{["awardId"]: selectedAward});
    this.setState({data:details}, function () {
      this.setState({"selectedVal" : selectedAward})
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
    let awards = this.state.startupAwards;
    let startupAwards = _.cloneDeep(awards);
    data.index = this.state.selectedIndex;
    startupAwards[this.state.selectedIndex] = data;
    let arr = [];
    _.each(startupAwards, function (item)
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
    startupAwards = arr;
    this.setState({startupAwards:startupAwards})
    let indexArray = this.state.indexArray;
    this.props.getAwardsDetails(startupAwards, indexArray);
  }

  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{awardsRecognition:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));
  }
  onFileUploadCallBack(resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
      }
    }
  }


  render(){
    let query=gql`query{
      data:fetchActiveAwards {
        label:awardDisplayName
        value:_id
      }
    }`;
    let that = this;
    let startupAwardsList = that.state.startupAwardsList || [];
    return (
        <div className="admin_padding_wrap portfolio-main-wrap">
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
                  {startupAwardsList.map(function (details, idx) {
                    return(<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a href="#" id={"create_client"+idx}>
                        <div className="list_block">
                          <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                          {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
                          <div className="hex_outer" onClick={that.onTileClick.bind(that, idx)}><img src={details.logo&&details.logo.fileUrl}/></div>
                          <h3>{details.description?details.description:""}</h3>
                        </div>
                      </a>
                    </div>)
                  })}
                </div>
              </div>
            </ScrollArea>
            <Popover placement="right" isOpen={this.state.popoverOpen}  target={"create_client"+this.state.selectedObject} toggle={this.toggle}>
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
                                  inputProps={{placeholder: "Select Year"}} defaultValue={this.state.data.year}
                                  closeOnSelect={true} ref="year" onBlur={this.handleYearChange.bind(this)}/>
                      </div>
                      <div className="form-group">
                        <input type="text" name="description" placeholder="About" className="form-control float-label" id="" defaultValue={this.state.data.description}  onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" defaultValue={this.state.data.isDescriptionPrivate}  onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isDescriptionPrivate}/>
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
                        <a href="" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
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
MlStartupAwards.contextTypes = {
  startupPortfolio: PropTypes.object,
};
