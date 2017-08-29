import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {Popover, PopoverContent, PopoverTitle} from "reactstrap";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../client/admin/utils/formElemUtil";
import _ from "lodash";
import {multipartASyncFormHandler} from "../../../../../../client/commons/MlMultipartFormAction";
import {fetchfunderPortfolioPrincipal, fetchfunderPortfolioTeam} from "../../actions/findPortfolioFunderDetails";
import {fetchPortfolioActionHandler} from '../../actions/findClusterIdForPortfolio'
import {putDataIntoTheLibrary} from '../../../../../commons/actions/mlLibraryActionHandler';
import NoData from '../../../../../commons/components/noData/noData'
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import MlLoader from '../../../../../commons/components/loader/loader'
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/MlAdminSelectWrapper'
export default class MlFunderPrincipalTeam extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      funderPrincipal: [],
      funderTeam: [],
      popoverOpenP: false,
      popoverOpenT: false,
      selectedIndex: -1,
      funderPrincipalList: [],
      funderTeamList: [],
      selectedVal: null,
      selectedObject: "default",
      title:'',
      selectedTab: 'principal',
      clusterId:'',
      privateKeys:[],
      privateKey:{},
      principalContext:'active',
      teamContext:''
    }
    this.handleBlur.bind(this);
    this.onSavePrincipalAction.bind(this);
    this.onSaveTeamAction.bind(this);
    this.fetchPrincipalDetails.bind(this);
    this.fetchTeamDetails.bind(this);
    this.libraryAction.bind(this);
    return this;
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentWillMount() {
    this.fetchPrincipalDetails();
    this.fetchTeamDetails();
    this.fetchClusterId();
  }
  async fetchClusterId() {
    const response = await fetchPortfolioActionHandler(this.props.portfolioDetailsId);
    if (response) {
      this.setState({loading: false, clusterId: response.clusterId});
    }
  }
  async fetchPrincipalDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.principal)
    if (empty) {
      const response = await fetchfunderPortfolioPrincipal(portfolioDetailsId);
      if (response) {
        this.setState({loading: false, funderPrincipal: response, funderPrincipalList: response});
        // this.setState({privateKeys:response.privateFields})
        // _.each(response.privateFields, function (pf) {
        //   $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
        // })
      }
    } else {
      // var funderPrincipalList = [];
      // funderPrincipalList.push(that.context.funderPortfolio.principal)
      this.setState({
        loading: false,
        funderPrincipal: that.context.funderPortfolio.principal,
        funderPrincipalList: that.context.funderPortfolio.principal
      });
    }
  }
  async fetchTeamDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.team)
    if (empty) {
      const response = await fetchfunderPortfolioTeam(portfolioDetailsId);
      if (response) {
        this.setState({loading: false, funderTeam: response, funderTeamList: response});
        _.each(response.privateFields, function (pf) {
          $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
        })
      }

    } else {
      this.setState({
        loading: false,
        funderTeam: that.context.funderPortfolio.team,
        funderTeamList: that.context.funderPortfolio.team
      });
    }
  }

  onLockChange(fieldName, field, e) {
    let details = this.state.data || {};
    let key = e.target.id;
    var isPrivate = false;
    details = _.omit(details, [key]);
    let className = e.target.className;
    if (className.indexOf("fa-lock") != -1) {
      details = _.extend(details, {[key]: true});
      isPrivate = true;
    } else {
      details = _.extend(details, {[key]: false});
    }

    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate, index:this.state.selectedIndex, tabName:this.state.selectedTab}
    this.setState({privateKey:privateKey})
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  handleYearsOfExperience(value) {
    let blankSpace = value.indexOf(' ') >= 0;
    let experience = parseInt(value);
    let valuesArray = value.split(".");
    let decimalExperience = valuesArray.length > 0 ?  valuesArray[0] : "";
    if(decimalExperience) {
      experience = parseInt(decimalExperience);
      if(experience > 75){
        toastr.error('Experience cannot be more than 75 years')
        return false;
      }
    }
    if(blankSpace) {
      toastr.error('Blank spaces are not allowed')
      return false;
    } else if(experience > 75 ) {
      toastr.error('Experience cannot be more than 75 years')
      return false;
    } else if (!experience) {
      toastr.error('Experience not valid')
      return false
    } else {return true}
  }

  handleBlur(e) {
    let details = this.state.data;
    let name = e.target.name;
    let validExperience;
    if(name === "yearsOfExperience") {
      validExperience = this.handleYearsOfExperience(e.target.value)
      if(validExperience) {
        details = _.omit(details, [name]);
        details = _.extend(details, {[name]: e.target.value});
        this.setState({data: details}, function () {
          this.sendDataToParent()
        })
      }
    } else {
      details = _.omit(details, [name]);
      details = _.extend(details, {[name]: e.target.value});
      this.setState({data: details}, function () {
        this.sendDataToParent()
      })
    }
  }
  onSavePrincipalAction(e) {
    this.setState({funderPrincipalList: this.state.funderPrincipal, popoverOpenP: false})
  }
  onSaveTeamAction(e) {
    this.setState({funderTeamList: this.state.funderTeam, popoverOpenT: false})
  }

  addPrincipal() {
    this.setState({selectedObject: "default", popoverOpenP: !(this.state.popoverOpenP), data: {}})
    if (this.state.funderPrincipal) {
      this.setState({selectedIndex: this.state.funderPrincipal.length})
    } else {
      this.setState({selectedIndex: 0})
    }
  }

  addTeam() {
    this.setState({selectedObject: "default", popoverOpenT: !(this.state.popoverOpenT), data: {}})
    if (this.state.funderTeam) {
      this.setState({selectedIndex: this.state.funderTeam.length})
    } else {
      this.setState({selectedIndex: 0})
    }
  }
  optionsBySelectTitle(val){
    let data = _.cloneDeep(this.state.data);
    data.title=val;
    this.setState({data:data}, function () {
      this.sendDataToParent();
    })
  }

  onStatusChangeNotify(e) {
    let updatedData = this.state.data || {};
    let key = e.target.id;
    updatedData = _.omit(updatedData, [key]);
    if (e.currentTarget.checked) {
      updatedData = _.extend(updatedData, {[key]: true});
    } else {
      updatedData = _.extend(updatedData, {[key]: false});
    }
    this.setState({data: updatedData}, function () {
      this.sendDataToParent()
    })
  }

  onPrincipalTileClick(index, e) {
    let cloneArray = _.cloneDeep(this.state.funderPrincipal);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if (details && details.logo) {
      delete details.logo['__typename'];
    }
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      popoverOpenP: !(this.state.popoverOpenP),
      // "selectedVal": details.typeOfFundingId
    });

    setTimeout(function () {
      _.each(details.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)


  }
  onTeamTileClick(index, e) {
    let cloneArray = _.cloneDeep(this.state.funderTeam);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if (details && details.logo) {
      delete details.logo['__typename'];
    }
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      popoverOpenT: !(this.state.popoverOpenT),
      // "selectedVal": details.typeOfFundingId
    });

    setTimeout(function () {
      _.each(details.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  sendDataToParent() {
    let data = this.state.data;
    selectedTab = this.state.selectedTab;
    if (selectedTab == "principal") {
      let fun = this.state.funderPrincipal;
      let funderPrincipal = _.cloneDeep(fun);
      data.index = this.state.selectedIndex;
      funderPrincipal[this.state.selectedIndex] = data;
      let arr = [];
      _.each(funderPrincipal, function (item) {
        for (var propName in item) {
          if (item[propName] === null || item[propName] === undefined) {
            delete item[propName];
          }
        }
        let newItem = _.omit(item, "__typename");
        newItem =_.omit(newItem,"privateFields");
        // let updateItem = _.omit(newItem, 'logo');
        arr.push(newItem)
      })
      funderPrincipal = arr;
      // funderPrincipal=_.omit(funderPrincipal,["privateFields"]);
      this.setState({funderPrincipal: funderPrincipal})
      this.props.getPrincipalDetails(funderPrincipal, this.state.privateKey);

    } else if (selectedTab == "team") {

      let fun = this.state.funderTeam;
      let funderTeam = _.cloneDeep(fun);
      data.index = this.state.selectedIndex;
      funderTeam[this.state.selectedIndex] = data;
      let arr = [];
      _.each(funderTeam, function (item) {
        for (var propName in item) {
          if (item[propName] === null || item[propName] === undefined) {
            delete item[propName];
          }
        }
        let newItem = _.omit(item, "__typename");
        newItem =_.omit(newItem,"privateFields");
        // let updateItem = _.omit(newItem, 'logo');
        arr.push(newItem)
      })
      funderTeam = arr;
      // funderTeam=_.omit(funderTeam,["privateFields"]);
      this.setState({funderTeam: funderTeam})
      this.props.getTeamDetails(funderTeam, this.state.privateKey);
    }

  }

  onTabSelect(tab, e) {
    this.setState({
      selectedTab: tab,
      popoverOpenP: false,
      popoverOpenT: false,
    });
  }
  onPrincipalLogoFileUpload(e) {
    if (e.target.files[0].length == 0)
      return;
    let file = e.target.files[0];
    let fileName = e.target.files[0].name;
    let data = {
      moduleName: "PORTFOLIO",
      actionName: "UPLOAD",
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: {principal: [{logo: {fileUrl: '', fileName: fileName}, index: this.state.selectedIndex}]}
    };
    let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this,file));
  }
  onTeamLogoFileUpload(e) {
    if (e.target.files[0].length == 0)
      return;
    let file = e.target.files[0];
    let fileName = e.target.files[0].name;
    let data = {
      moduleName: "PORTFOLIO",
      actionName: "UPLOAD",
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: {team: [{logo: {fileUrl: '', fileName: fileName}, index: this.state.selectedIndex}]}
    };
    let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this,file));
  }

  onFileUploadCallBack(file,resp) {
    if (resp) {
      let result = JSON.parse(resp)
      let userOption = confirm("Do you want to add the file into the library")
      if(userOption){
        let fileObjectStructure = {
          fileName: file&&file.name?file.name:"",
          fileType: file&&file.type?file.type:"",
          fileUrl: result.result,
          libraryType: "image"
        }
        this.libraryAction(fileObjectStructure)
      }
      if (result.success) {
        toastr.success("Photo Updated Successfully");
        this.setState({loading: true})
        this.fetchOnlyImages();
      }
    }
  }

  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    return resp;
  }

  async fetchOnlyImages() {

    if(this.state.selectedTab == "principal"){
      const response = await fetchfunderPortfolioPrincipal(this.props.portfolioDetailsId);
      if (response && !_.isEmpty(response)) {
        let thisState = this.state.selectedIndex;
        let dataDetails = this.state.funderPrincipal
        let cloneBackUp = _.cloneDeep(dataDetails);
        let specificData = cloneBackUp[thisState];
        if (specificData) {
          let curUpload = response[thisState]
          specificData['logo'] = curUpload['logo']
          this.setState({loading: false, funderPrincipal: cloneBackUp, principalContext:"active", teamContext:""});
        } else {
          this.setState({loading: false, principalContext:"active", teamContext:""})
        }
      }
    }else if(this.state.selectedTab == "team" ){
      const response = await fetchfunderPortfolioTeam(this.props.portfolioDetailsId);
      if (response && !_.isEmpty(response)) {
        let thisState = this.state.selectedIndex;
        let dataDetails = this.state.funderTeam
        let cloneBackUp = _.cloneDeep(dataDetails);
        let specificData = cloneBackUp[thisState];
        if (specificData) {
          let curUpload = response[thisState]
          specificData['logo'] = curUpload['logo']
          this.setState({loading: false, funderTeam: cloneBackUp, teamContext:"active", principalContext:""});
        } else {
          this.setState({loading: false, teamContext:"active", principalContext:""})
        }
      }
    }

  }

  render() {
    let titlequery=gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let titleOption={options: { variables: {type : "TITLE",hierarchyRefId:this.state.clusterId}}};
    let that = this;
    const showLoader = that.state.loading;
    let funderPrincipalList = that.state.funderPrincipal || [];
      return (
        <div>
          {showLoader === true ? (<MlLoader/>) : (
            <div className="portfolio-main-wrap">
              <div className="main_wrap_scroll">
                <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
                  <div className="ml_tabs ml_tabs_large">
                    <ul className="nav nav-pills" id="myTabs">
                      <li id="principal" className={that.state.principalContext}
                          onClick={this.onTabSelect.bind(this, "principal")}>
                        <a href="#1a" data-toggle="tab">Principal</a>
                      </li>
                      <li id="team" className={that.state.teamContext} onClick={this.onTabSelect.bind(this, "team")}>
                        <a href="#2a" data-toggle="tab">Team</a>
                      </li>
                    </ul>

                    {/*principle list*/}
                    <div className="tab-content clearfix requested_input">
                      {/*<div className="tab-pane active" id="1a">*/}
                      <div id="1a" className={`tab-pane ${that.state.principalContext}`}>
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-2 col-md-4 col-sm-4" onClick={this.addPrincipal.bind(this)}>
                              <a href="#" id="create_clientPdefault" data-placement="top" data-class="large_popover">
                                <div className="list_block notrans">
                                  <div className="hex_outer"><span className="ml ml-plus "></span></div>
                                  <h3>Add New Principal</h3>
                                </div>
                              </a>
                            </div>
                            {funderPrincipalList.map(function (principal, idx) {
                              return (
                                <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                                  <a href="#" id={"create_clientP" + idx}>
                                    <div className="list_block notrans funding_list"
                                         onClick={that.onPrincipalTileClick.bind(that, idx)}>
                                      <FontAwesome name='unlock'  id="makePrivate" defaultValue={principal.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={principal.makePrivate}/>
                                      <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                                      <img src={principal.logo ? principal.logo.fileUrl : "/images/def_profile.png"}/>
                                      <div>
                                        <p>{principal.firstName}</p><p className="small">{principal.designation}</p>
                                      </div>
                                      {/*<div className="ml_icon_btn">*/}
                                        {/*<a href="#" className="save_btn"><FontAwesome name='facebook'/></a>*/}
                                        {/*<a href="#" className="save_btn"><FontAwesome name='twitter'/></a>*/}
                                        {/*<a href="#" className="save_btn"><FontAwesome name='linkedin'/></a>*/}
                                      {/*</div>*/}
                                    </div>
                                  </a>
                                </div>
                              )
                            })}

                          </div>
                        </div>
                      </div>

                      {/*team list view*/}
                      {/*<div className="tab-pane" id="2a">*/}
                      <div id="2a" className={`tab-pane ${that.state.teamContext}`}>
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-2 col-md-4 col-sm-4" onClick={this.addTeam.bind(this)}>
                              <a href="#" id="create_clientTdefault" data-placement="top" data-class="large_popover">
                                <div className="list_block notrans">
                                  <div className="hex_outer"><span className="ml ml-plus "></span></div>
                                  <h3>Add New</h3>
                                </div>
                              </a>
                            </div>
                            {that.state.funderTeamList.map(function (team, idx) {
                              return (
                                <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                                  <a href="#" id={"create_clientT" + idx}>
                                    <div className="list_block notrans funding_list"
                                         onClick={that.onTeamTileClick.bind(that, idx)}>
                                      <FontAwesome name='unlock'  id="makePrivate" defaultValue={team.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={team.makePrivate}/>
                                      <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                                      <img src={team.logo ? team.logo.fileUrl : "/images/def_profile.png"}/>
                                      <div><p>{team.firstName}</p><p
                                        className="small">{team.designation}</p></div>
                                      {/*<div className="ml_icon_btn">*/}
                                        {/*<a href="#" className="save_btn"><FontAwesome name='facebook'/></a>*/}
                                        {/*<a href="#" className="save_btn"><FontAwesome name='twitter'/></a>*/}
                                        {/*<a href="#" className="save_btn"><FontAwesome name='linkedin'/></a>*/}
                                      {/*</div>*/}
                                    </div>
                                  </a>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </ScrollArea>

                {/*principle popover*/}
                <Popover placement="right" isOpen={this.state.popoverOpenP}
                         target={"create_clientP" + this.state.selectedObject} toggle={this.toggle}>
                  <PopoverTitle> Add New Member </PopoverTitle>
                  <PopoverContent>
                    <div className="ml_create_client">
                      <div className="medium-popover">
                        <div className="row">
                          <div className="col-md-12">
                            {this.state.selectedObject != "default" ?
                              <div className="form-group">
                                <div className="fileUpload mlUpload_btn">
                                  <span>Upload Pic</span>
                                  <input type="file" className="upload"
                                         onChange={this.onPrincipalLogoFileUpload.bind(this)}/>
                                </div>
                                <div className="previewImg ProfileImg">
                                  <img
                                    src={this.state.data.logo ? this.state.data.logo.fileUrl : "/images/def_profile.png"}/>
                                </div>
                              </div> : <div></div>
                            }

                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="Title" name="title"*/}
                            {/*defaultValue={this.state.data.title}*/}
                            {/*className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>*/}
                            {/*/!*<FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"*!/*/}
                            {/*/!*onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>*!/*/}
                            {/*/!*<input type="checkbox" className="lock_input"*!/*/}
                            {/*/!*checked={this.state.data.isCompanyNamePrivate}/>*!/*/}
                            {/*</div>*/}
                            <div className="form-group">
                              <Moolyaselect multiSelect={false} placeholder="Title" className="form-control float-label"
                                            valueKey={'value'} labelKey={'label'} selectedValue={this.state.data.title}
                                            queryType={"graphql"} query={titlequery} queryOptions={titleOption}
                                            onSelect={that.optionsBySelectTitle.bind(this)} isDynamic={true}/>

                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="First Name" name="firstName"
                                     defaultValue={this.state.data.firstName} className="form-control float-label"
                                     id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate"
                                           onClick={this.onLockChange.bind(this, "firstName", "isFirstNamePrivate")}/>
                            </div>

                            <div className="form-group">
                              <input type="text" placeholder="Last Name" name="lastName"
                                     defaultValue={this.state.data.lastName} className="form-control float-label"
                                     id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon un_lock" id="isLastNamePrivate"
                                           onClick={this.onLockChange.bind(this, "lastName", "isLastNamePrivate")}/>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Designation" name="designation"
                                     defaultValue={this.state.data.designation}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon un_lock" id="isDesignationPrivate"
                                           onClick={this.onLockChange.bind(this, "designation", "isDesignationPrivate")}/>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Company Name" name="principalcompanyName"
                                     defaultValue={this.state.data.principalcompanyName}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon un_lock" id="isCompanyNamePrivate"
                                           onClick={this.onLockChange.bind(this, "principalcompanyName", "isCompanyNamePrivate")}/>

                            </div>

                            <div className="form-group">
                              <input type="text" placeholder="Duration" name="duration"
                                     defaultValue={this.state.data.duration}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon" id="isDurationPrivate"
                                           onClick={this.onLockChange.bind(this, "duration", "isDurationPrivate")}/>

                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Years of Experience" name="yearsOfExperience"
                                     defaultValue={this.state.data.yearsOfExperience}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon un_lock" id="isYearsOfExperiencePrivate"
                                           onClick={this.onLockChange.bind(this, "yearsOfExperience", "isYearsOfExperiencePrivate")}/>

                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Qualification" name="qualification"
                                     defaultValue={this.state.data.qualification}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate"
                                           onClick={this.onLockChange.bind(this, "qualification", "isQualificationPrivate")}/>

                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="About" name="aboutPrincipal"
                                     defaultValue={this.state.data.aboutPrincipal}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon un_lock" id="isAboutPrincipalPrivate"
                                           onClick={this.onLockChange.bind(this, "aboutPrincipal", "isAboutPrincipalPrivate")}/>

                            </div>
                            {/*<div className="form-group">*/}
                              {/*<input type="text" placeholder="LinkedIn" className="form-control float-label"/>*/}
                              {/*<FontAwesome name="linkedin-square" className="password_icon"/>*/}
                            {/*</div>*/}

                            <div className="input_types">
                              <input id="makePrivate" type="checkbox"
                                     checked={this.state.data.makePrivate && this.state.data.makePrivate}
                                     name="checkbox"
                                     onChange={this.onStatusChangeNotify.bind(this)}/>
                              <label htmlFor="checkbox1"><span></span>Make Private</label></div>
                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="Facebook" className="form-control float-label"  />*/}
                            {/*<FontAwesome name="facebook-square" className="password_icon"/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="twitter" className="form-control float-label"  />*/}
                            {/*<FontAwesome name="twitter-square" className="password_icon"/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="Youtube" className="form-control float-label"  />*/}
                            {/*<FontAwesome name="youtube-square" className="password_icon"/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="Google plus" className="form-control float-label"  />*/}
                            {/*<FontAwesome name="google-plus-square" className="password_icon"/>*/}
                            {/*</div>*/}
                            <div className="ml_btn" style={{'textAlign': 'center'}}>
                              <a className="save_btn" onClick={this.onSavePrincipalAction.bind(this)}>Save</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/*team popover*/}
                <Popover placement="right" isOpen={this.state.popoverOpenT}
                         target={"create_clientT" + this.state.selectedObject} toggle={this.toggle}>
                  <PopoverTitle> Add New Member </PopoverTitle>
                  <PopoverContent>
                    <div className="ml_create_client">
                      <div className="medium-popover">
                        <div className="row">
                          <div className="col-md-12">
                            {this.state.selectedObject != "default" ?
                              <div className="form-group">
                                <div className="fileUpload mlUpload_btn">
                                  <span>Upload Pic</span>
                                  <input type="file" className="upload"
                                         onChange={this.onTeamLogoFileUpload.bind(this)}/>
                                </div>
                                <div className="previewImg ProfileImg">
                                  <img
                                    src={this.state.data.logo ? this.state.data.logo.fileUrl : "/images/def_profile.png"}/>
                                </div>
                              </div> : <div></div>
                            }
                            <div className="form-group">
                              <Moolyaselect multiSelect={false} placeholder="Title" className="form-control float-label"
                                            valueKey={'value'} labelKey={'label'} selectedValue={this.state.data.title}
                                            queryType={"graphql"} query={titlequery} queryOptions={titleOption}
                                            onSelect={that.optionsBySelectTitle.bind(this)} isDynamic={true}/>

                            </div>
                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="Title" name="title"*/}
                            {/*defaultValue={this.state.data.title}*/}
                            {/*className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>*/}
                            {/*/!*<FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"*!/*/}
                            {/*/!*onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>*!/*/}
                            {/*/!*<input type="checkbox" className="lock_input"*!/*/}
                            {/*/!*checked={this.state.data.isCompanyNamePrivate}/>*!/*/}
                            {/*</div>*/}

                            <div className="form-group">
                              <input type="text" placeholder="First Name" name="firstName"
                                     defaultValue={this.state.data.firstName} className="form-control float-label"
                                     id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate"
                                           onClick={this.onLockChange.bind(this, "firstName", "isFirstNamePrivate")}/>
                            </div>

                            <div className="form-group">
                              <input type="text" placeholder="Last Name" name="lastName"
                                     defaultValue={this.state.data.lastName} className="form-control float-label"
                                     id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon un_lock" id="isLastNamePrivate"
                                           onClick={this.onLockChange.bind(this, "lastName", "isLastNamePrivate")}/>
                            </div>

                            <div className="form-group">
                              <input type="text" placeholder="Designation" name="designation"
                                     defaultValue={this.state.data.designation}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon" id="isDesignationPrivate"
                                           onClick={this.onLockChange.bind(this, "designation", "isDesignationPrivate")}/>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Company Name" name="teamcompanyName"
                                     defaultValue={this.state.data.teamcompanyName}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"
                                           onClick={this.onLockChange.bind(this, "teamcompanyName", "isCompanyNamePrivate")}/>

                            </div>

                            <div className="form-group">
                              <input type="text" placeholder="Duration" name="duration"
                                     defaultValue={this.state.data.duration}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon" id="isDurationPrivate"
                                           onClick={this.onLockChange.bind(this, "duration", "isDurationPrivate")}/>

                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Years of Experience" name="yearsOfExperience"
                                     defaultValue={this.state.data.yearsOfExperience}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon" id="isYearsOfExperiencePrivate"
                                           onClick={this.onLockChange.bind(this, "yearsOfExperience", "isYearsOfExperiencePrivate")}/>

                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Qualification" name="qualification"
                                     defaultValue={this.state.data.qualification}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon" id="isQualificationPrivate"
                                           onClick={this.onLockChange.bind(this, "qualification", "isQualificationPrivate")}/>

                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="About" name="aboutTeam"
                                     defaultValue={this.state.data.aboutTeam}
                                     className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon" id="isAboutTeamPrivate"
                                           onClick={this.onLockChange.bind(this, "aboutTeam", "isAboutTeamPrivate")}/>
                            </div>
                            {/*<div className="form-group">*/}
                              {/*<input type="text" placeholder="LinkedIn" className="form-control float-label"/>*/}
                              {/*<FontAwesome name="linkedin-square" className="password_icon"/>*/}
                            {/*</div>*/}

                            <div className="input_types">
                              <input id="makePrivate" type="checkbox"
                                     checked={this.state.data.makePrivate && this.state.data.makePrivate}
                                     name="checkbox"
                                     onChange={this.onStatusChangeNotify.bind(this)}/>
                              <label htmlFor="checkbox1"><span></span>Make Private</label></div>
                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="Facebook" className="form-control float-label"  />*/}
                            {/*<FontAwesome name="facebook-square" className="password_icon"/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="twitter" className="form-control float-label"  />*/}
                            {/*<FontAwesome name="twitter-square" className="password_icon"/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="Youtube" className="form-control float-label"  />*/}
                            {/*<FontAwesome name="youtube-square" className="password_icon"/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*<input type="text" placeholder="Google plus" className="form-control float-label"  />*/}
                            {/*<FontAwesome name="google-plus-square" className="password_icon"/>*/}
                            {/*</div>*/}
                            <div className="ml_btn" style={{'textAlign': 'center'}}>
                              <a className="save_btn" onClick={this.onSaveTeamAction.bind(this)}>Save</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>)}
        </div>
      )
  }
};
MlFunderPrincipalTeam.contextTypes = {
  funderPortfolio: PropTypes.object,
};
