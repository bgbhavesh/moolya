import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {Popover, PopoverContent, PopoverTitle} from "reactstrap";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../client/admin/utils/formElemUtil";
import _ from "lodash";
import {multipartASyncFormHandler} from "../../../../../../client/commons/MlMultipartFormAction";
import {fetchfunderPortfolioPrincipal, fetchfunderPortfolioTeam} from "../../actions/findPortfolioFunderDetails";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import MlLoader from '../../../../../commons/components/loader/loader'

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
      selectedTab: 'principal'
    }
    this.handleBlur.bind(this);
    this.onSavePrincipalAction.bind(this);
    this.onSaveTeamAction.bind(this);
    this.fetchPrincipalDetails.bind(this);
    this.fetchTeamDetails.bind(this);
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
    this.fetchTeamDetails()
  }

  async fetchPrincipalDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.principal)
    if (empty) {
      const response = await fetchfunderPortfolioPrincipal(portfolioDetailsId);
      if (response) {
        this.setState({loading: false, funderPrincipal: response, funderPrincipalList: response});
      }
    } else {
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
      }
    } else {
      this.setState({
        loading: false,
        funderTeam: that.context.funderPortfolio.team,
        funderTeamList: that.context.funderPortfolio.team
      });
    }
  }

  onLockChange(field, e) {
    let details = this.state.data || {};
    let key = e.target.id;
    details = _.omit(details, [key]);
    let className = e.target.className;
    if (className.indexOf("fa-lock") != -1) {
      details = _.extend(details, {[key]: true});
    } else {
      details = _.extend(details, {[key]: false});
    }
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  handleBlur(e) {
    let details = this.state.data;
    let name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: e.target.value});
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
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
        // let updateItem = _.omit(newItem, 'logo');
        arr.push(newItem)
      })
      funderPrincipal = arr;
      this.setState({funderPrincipal: funderPrincipal})
      this.props.getPrincipalDetails(funderPrincipal);

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
        // let updateItem = _.omit(newItem, 'logo');
        arr.push(newItem)
      })
      funderTeam = arr;
      this.setState({funderTeam: funderTeam})
      this.props.getTeamDetails(funderTeam);
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
    let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this));
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
    let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this));
  }

  onFileUploadCallBack(resp) {
    if (resp) {
      let result = JSON.parse(resp)
      if (result.success) {
        this.setState({loading: true})
        this.fetchOnlyImages();
      }
    }
  }

  async fetchOnlyImages() {

    if(this.state.selectedTab == "principal"){
      const response = await fetchfunderPortfolioPrincipal(this.props.portfolioDetailsId);
      if (response) {
        let thisState = this.state.selectedIndex;
        let dataDetails = this.state.funderPrincipal
        let cloneBackUp = _.cloneDeep(dataDetails);
        let specificData = cloneBackUp[thisState];
        if (specificData) {
          let curUpload = response[thisState]
          specificData['logo'] = curUpload['logo']
          this.setState({loading: false, funderPrincipal: cloneBackUp});
        } else {
          this.setState({loading: false})
        }
      }
    }else if(this.state.selectedTab == "team" ){
      const response = await fetchfunderPortfolioTeam(this.props.portfolioDetailsId);
      if (response) {
        let thisState = this.state.selectedIndex;
        let dataDetails = this.state.funderTeam
        let cloneBackUp = _.cloneDeep(dataDetails);
        let specificData = cloneBackUp[thisState];
        if (specificData) {
          let curUpload = response[thisState]
          specificData['logo'] = curUpload['logo']
          this.setState({loading: false, funderTeam: cloneBackUp});
        } else {
          this.setState({loading: false})
        }
      }
    }

  }

  render() {
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
                <ul className="nav nav-pills">
                  <li id="principal" className="active" onClick={this.onTabSelect.bind(this, "principal")}>
                    <a href="#1a" data-toggle="tab">Principal</a>
                  </li>
                  <li id="team" onClick={this.onTabSelect.bind(this, "team")}>
                    <a href="#2a" data-toggle="tab">Team</a>
                  </li>
                </ul>

                  {/*principle list*/}
                  <div className="tab-content clearfix requested_input">
                    <div className="tab-pane active" id="1a">
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
                          {that.state.funderPrincipalList.map(function (principal, idx) {
                            return (
                              <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                                <a href="#" id={"create_clientP" + idx}>
                                  <div className="list_block notrans funding_list"
                                       onClick={that.onPrincipalTileClick.bind(that, idx)}>
                                    <FontAwesome name='lock'/>
                                    <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                                    <img src={principal.logo ? principal.logo.fileUrl : "/images/def_profile.png"}/>
                                    <div>
                                      <p>{principal.firstName}</p><p className="small">{principal.designation}</p></div>
                                    <div className="ml_icon_btn">
                                      <a href="#" className="save_btn"><FontAwesome name='facebook'/></a>
                                      <a href="#" className="save_btn"><FontAwesome name='twitter'/></a>
                                      <a href="#" className="save_btn"><FontAwesome name='linkedin'/></a>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            )
                          })}

                        </div>
                      </div>
                    </div>

                    {/*team list view*/}
                    <div className="tab-pane" id="2a">
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
                                    <FontAwesome name='lock'/>
                                    <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                                    <img src={team.logo ? team.logo.fileUrl : "/images/def_profile.png"}/>
                                    <div><p>{team.firstName}</p><p
                                      className="small">{team.designation}</p></div>
                                    <div className="ml_icon_btn">
                                      <a href="#" className="save_btn"><FontAwesome name='facebook'/></a>
                                      <a href="#" className="save_btn"><FontAwesome name='twitter'/></a>
                                      <a href="#" className="save_btn"><FontAwesome name='linkedin'/></a>
                                    </div>
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
                          <div className="form-group">
                            <div className="fileUpload mlUpload_btn">
                              <span>Upload Pic</span>
                              <input type="file" className="upload" onChange={this.onPrincipalLogoFileUpload.bind(this)}/>
                            </div>
                            <div className="previewImg ProfileImg">
                              <img src="/images/def_profile.png"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Title" name="title"
                                   defaultValue={this.state.data.title}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            {/*<FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"*/}
                            {/*onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>*/}
                            {/*<input type="checkbox" className="lock_input"*/}
                            {/*checked={this.state.data.isCompanyNamePrivate}/>*/}
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder="First Name" name="firstName"
                                   defaultValue={this.state.data.firstName} className="form-control float-label"
                                   id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate"
                                         onClick={this.onLockChange.bind(this, "isFirstNamePrivate")}/><input
                            type="checkbox" className="lock_input" id="makePrivate"
                            checked={this.state.data.isFirstNamePrivate}/>
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder="Last Name" name="lastName"
                                   defaultValue={this.state.data.lastName} className="form-control float-label"
                                   id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon un_lock" id="isLastNamePrivate"
                                         onClick={this.onLockChange.bind(this, "isLastNamePrivate")}/><input
                            type="checkbox" className="lock_input" id="makePrivate"
                            checked={this.state.data.isLastNamePrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Designation" name="designation"
                                   defaultValue={this.state.data.designation}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isDesignationPrivate"
                                         onClick={this.onLockChange.bind(this, "isDesignationPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isDesignationPrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Company Name" name="companyName"
                                   defaultValue={this.state.data.companyName}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"
                                         onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isCompanyNamePrivate}/>
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder="Duration" name="duration"
                                   defaultValue={this.state.data.duration}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isDurationPrivate"
                                         onClick={this.onLockChange.bind(this, "isDurationPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isDurationPrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Years of Experience" name="yearsOfExperience"
                                   defaultValue={this.state.data.yearsOfExperience}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isYearsOfExperiencePrivate"
                                         onClick={this.onLockChange.bind(this, "isYearsOfExperiencePrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isYearsOfExperiencePrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Qualification" name="qualification"
                                   defaultValue={this.state.data.qualification}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isQualificationPrivate"
                                         onClick={this.onLockChange.bind(this, "isQualificationPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isQualificationPrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="About" name="aboutPrincipal"
                                   defaultValue={this.state.data.aboutPrincipal}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isAboutPrincipalPrivate"
                                         onClick={this.onLockChange.bind(this, "isAboutPrincipalPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isQualificationPrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="LinkedIn" className="form-control float-label"/>
                            <FontAwesome name="linkedin-square" className="password_icon"/>
                          </div>
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
                          <div className="form-group">
                            <div className="fileUpload mlUpload_btn">
                              <span>Upload Pic</span>
                              <input type="file" className="upload" onChange={this.onTeamLogoFileUpload.bind(this)}/>
                            </div>
                            <div className="previewImg ProfileImg">
                              <img src="/images/def_profile.png"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Title" name="title"
                                   defaultValue={this.state.data.title}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            {/*<FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"*/}
                            {/*onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>*/}
                            {/*<input type="checkbox" className="lock_input"*/}
                            {/*checked={this.state.data.isCompanyNamePrivate}/>*/}
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder="First Name" name="firstName"
                                   defaultValue={this.state.data.firstName} className="form-control float-label"
                                   id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate"
                                         onClick={this.onLockChange.bind(this, "isFirstNamePrivate")}/><input
                            type="checkbox" className="lock_input" id="makePrivate"
                            checked={this.state.data.isFirstNamePrivate}/>
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder="Last Name" name="lastName"
                                   defaultValue={this.state.data.lastName} className="form-control float-label"
                                   id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon un_lock" id="isLastNamePrivate"
                                         onClick={this.onLockChange.bind(this, "isLastNamePrivate")}/><input
                            type="checkbox" className="lock_input" id="makePrivate"
                            checked={this.state.data.isLastNamePrivate}/>
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder="Designation" name="designation"
                                   defaultValue={this.state.data.designation}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isDesignationPrivate"
                                         onClick={this.onLockChange.bind(this, "isDesignationPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isDesignationPrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Company Name" name="companyName"
                                   defaultValue={this.state.data.companyName}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"
                                         onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isCompanyNamePrivate}/>
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder="Duration" name="duration"
                                   defaultValue={this.state.data.duration}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isDurationPrivate"
                                         onClick={this.onLockChange.bind(this, "isDurationPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isDurationPrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Years of Experience" name="yearsOfExperience"
                                   defaultValue={this.state.data.yearsOfExperience}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isYearsOfExperiencePrivate"
                                         onClick={this.onLockChange.bind(this, "isYearsOfExperiencePrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isYearsOfExperiencePrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Qualification" name="qualification"
                                   defaultValue={this.state.data.qualification}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isQualificationPrivate"
                                         onClick={this.onLockChange.bind(this, "isQualificationPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isQualificationPrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="About" name="aboutTeam"
                                   defaultValue={this.state.data.aboutTeam}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isAboutTeamPrivate"
                                         onClick={this.onLockChange.bind(this, "isAboutTeamPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isAboutTeamPrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="LinkedIn" className="form-control float-label"/>
                            <FontAwesome name="linkedin-square" className="password_icon"/>
                          </div>
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
