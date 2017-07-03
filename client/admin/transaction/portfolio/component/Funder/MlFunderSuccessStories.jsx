import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import Datetime from "react-datetime";
import {Popover, PopoverContent, PopoverTitle} from "reactstrap";
import _ from "lodash";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../client/admin/utils/formElemUtil";
import {multipartASyncFormHandler} from "../../../../../../client/commons/MlMultipartFormAction";
import {fetchfunderPortfolioSuccess} from "../../actions/findPortfolioFunderDetails";
import MlLoader from '../../../../../commons/components/loader/loader'
var FontAwesome = require('react-fontawesome');

export default class MlFunderSuccessStories extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      funderSuccess: [],
      popoverOpen: false,
      selectedIndex: -1,
      funderSuccessList: [],
      selectedObject: "default",
      privateKey:{}
    }
    this.handleBlur.bind(this);
    this.onSaveAction.bind(this);
    this.dateChange.bind(this)
    this.fetchPortfolioDetails.bind(this);
    return this;
  }

  componentWillMount() {
    this.fetchPortfolioDetails();
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.successStories)
    if (empty) {
      const response = await fetchfunderPortfolioSuccess(portfolioDetailsId);
      if (response) {
        this.setState({loading: false, funderSuccess: response, funderSuccessList: response});
        // _.each(response.privateFields, function (pf) {
        //   $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
        // })
      }

    } else {
      this.setState({
        loading: false,
        funderSuccess: that.context.funderPortfolio.successStories,
        funderSuccessList: that.context.funderPortfolio.successStories
      });
    }
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

  dateChange(e) {
    let details = this.state.data;
    let name = 'date';
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: this.refs.date.state.inputValue});
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  onTileClick(index, e) {
    let cloneArray = _.cloneDeep(this.state.funderSuccess);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if (details && details.logo) {
      delete details.logo['__typename'];
    }
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      popoverOpen: !(this.state.popoverOpen)
    });

    setTimeout(function () {
      _.each(details.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
    // initalizeFloatLabel();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  addSuccess() {
    this.setState({selectedObject: "default", popoverOpen: !(this.state.popoverOpen), data: {}})
    if (this.state.funderSuccess) {
      this.setState({selectedIndex: this.state.funderSuccess.length})
    } else {
      this.setState({selectedIndex: 0})
    }
  }

  onLockChange(fieldName, field, e) {
    let details = this.state.data || {};
    let key = field;
    var isPrivate = false;
    details = _.omit(details, [key]);
    let className = e.target.className;
    if (className.indexOf("fa-lock") != -1) {
      details = _.extend(details, {[key]: true});
      isPrivate = true;
    } else {
      details = _.extend(details, {[key]: false});
    }
    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate, index:this.state.selectedIndex}
    this.setState({privateKey:privateKey})
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  onSaveAction(e) {
    this.setState({funderSuccessList: this.state.funderSuccess, popoverOpen: false})
  }

  onLogoFileUpload(e) {
    if (e.target.files[0].length == 0)
      return;
    let file = e.target.files[0];
    let fileName = e.target.files[0].name;
    let data = {
      moduleName: "PORTFOLIO",
      actionName: "UPLOAD",
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: {successStories: [{logo: {fileUrl: '', fileName: fileName}, index: this.state.selectedIndex}]}
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
    const response = await fetchfunderPortfolioSuccess(this.props.portfolioDetailsId);
    if (response) {
      let thisState = this.state.selectedIndex;
      let dataDetails = this.state.funderSuccess
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if (specificData) {
        let curUpload = response[thisState]
        specificData['logo'] = curUpload['logo']
        this.setState({loading: false, funderSuccess: cloneBackUp});
      } else {
        this.setState({loading: false})
      }
    }
  }

  sendDataToParent() {
    let data = this.state.data;
    let success = this.state.funderSuccess;
    let funderSuccess = _.cloneDeep(success);
    data.index = this.state.selectedIndex;
    funderSuccess[this.state.selectedIndex] = data;
    let arr = [];
    _.each(funderSuccess, function (item) {
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
    funderSuccess = arr;
    // funderSuccess=_.omit(funderSuccess,["privateFields"]);
    this.setState({funderSuccess: funderSuccess})
    this.props.getSuccessStoriesDetails(funderSuccess, this.state.privateKey);
  }

  render() {
    var yesterday = Datetime.moment().subtract(0,'day');
    var valid = function( current ){
      return current.isBefore( yesterday );
    };
    let that = this;
    const showLoader = that.state.loading;
    let funderSuccessList = that.state.funderSuccessList || [];
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="portfolio-main-wrap">
            <h2>Success Stories</h2>
            <div className="main_wrap_scroll">
              <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-2 col-md-4 col-sm-4">
                      <a href="#" id="team_listdefault" data-placement="top" data-class="large_popover">
                        <div className="list_block notrans" onClick={this.addSuccess.bind(this)}>
                          <div className="hex_outer"><span className="ml ml-plus "></span></div>
                          <h3 onClick={this.addSuccess.bind(this)}>Add New</h3>
                        </div>
                      </a>
                    </div>

                    {/*list of stories*/}
                    {funderSuccessList.map(function (details, idx) {
                      return (
                        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                          <a href="#" id={"team_list" + idx}>
                            <div className="list_block notrans funding_list" onClick={that.onTileClick.bind(that, idx)}>
                              <FontAwesome name='lock'/>
                              <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                              <img src={details.logo ? details.logo.fileUrl : "/images/def_profile.png"}/>
                              <div><p>{details.storyTitle}</p><p>{details.description}</p></div>
                              <h3>{details.date ? details.date : "Date : "}</h3>
                            </div>
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollArea>

              {/*popover view*/}
              <Popover placement="right" isOpen={this.state.popoverOpen}
                       target={"team_list" + this.state.selectedObject} toggle={this.toggle}>
                <PopoverTitle>Add New Success Story </PopoverTitle>
                <PopoverContent>
                  <div className="team_list-main">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                      inputProps={{placeholder: "Select Date"}} ref="date" closeOnSelect={true}
                                      defaultValue={this.state.data.date ? this.state.data.date : ''}
                                      onBlur={this.dateChange.bind(this)}  isValidDate={ valid }/>
                            <FontAwesome name='unlock' className="input_icon un_lock"
                                         onClick={this.onLockChange.bind(this, "date", "isDatePrivate")}/>
                          </div>
                          <div className="clearfix"></div>
                          <div className="form-group">
                            <div className="fileUpload mlUpload_btn">
                              <span>Upload Pic</span>
                              <input type="file" className="upload" name="logo" id="logo" accept="image/*"
                                     onChange={this.onLogoFileUpload.bind(this)}/>
                            </div>
                            {/*<div className="previewImg ProfileImg">*/}
                            {/*<img src="/images/ideator_01.png"/>*/}
                            {/*</div>*/}
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Enter title of Story" className="form-control float-label"
                                   name="storyTitle" defaultValue={this.state.data.storyTitle}
                                   onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome id="isStoryTitlePrivate" name='unlock' className="input_icon un_lock"
                                         onClick={this.onLockChange.bind(this, "storyTitle", "isStoryTitlePrivate")}/>

                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Description" className="form-control float-label"
                                   name="description" defaultValue={this.state.data.description}
                                   onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome id="isDescPrivate" name='unlock' className="input_icon un_lock"
                                         onClick={this.onLockChange.bind(this, "description", "isDescPrivate")}/>

                          </div>
                          <div className="ml_btn" style={{'textAlign': 'center'}}>
                            <a className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
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
MlFunderSuccessStories.contextTypes = {
  funderPortfolio: PropTypes.object,
};
