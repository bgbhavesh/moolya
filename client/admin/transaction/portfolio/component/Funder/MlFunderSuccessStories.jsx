import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import Datetime from "react-datetime";
import {Popover, PopoverContent} from "reactstrap";
import _ from 'lodash'
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../client/admin/utils/formElemUtil";
import {fetchfunderPortfolioSuccess} from "../../actions/findPortfolioFunderDetails";
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
      selectedObject: "default"
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
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
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

  onLockChange(field, e) {
    let details = this.state.data || {};
    let key = field;
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

  onSaveAction(e) {
    this.setState({funderSuccessList: this.state.funderSuccess, popoverOpen: false})
  }


  sendDataToParent() {
    let data = this.state.data;
    let investment = this.state.funderSuccess;
    let funderSuccess = _.cloneDeep(investment);
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
      let updateItem = _.omit(newItem, 'logo');
      arr.push(updateItem)
    })
    funderSuccess = arr;
    this.setState({funderSuccess: funderSuccess})
    this.props.getSuccessStoriesDetails(funderSuccess);
  }

  render() {
    let that = this;
    const showLoader = that.state.loading;
    let funderSuccessList = that.state.funderSuccessList || [];
    return (
      <div>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
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
                              <img src="../images/p_5.jpg"/>
                              <div><p>{details.storyTitle}</p></div>
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
                <PopoverContent>
                  <div className="team_list-main">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                      inputProps={{placeholder: "Select Date"}} ref="date"
                                      defaultValue={this.state.data.date ? this.state.data.date : ''}
                                      onBlur={this.dateChange.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon"
                                         onClick={this.onLockChange.bind(this, "isDatePrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isDatePrivate}/>
                          </div>
                          <div className="form-group">
                            <div className="fileUpload mlUpload_btn">
                              <span>Upload Pic</span>
                              <input type="file" className="upload"/>
                            </div>
                            <div className="previewImg ProfileImg">
                              <img src="/images/ideator_01.png"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Enter title of Story" className="form-control float-label"
                                   name="storyTitle" defaultValue={this.state.data.storyTitle}
                                   onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon"
                                         onClick={this.onLockChange.bind(this, "isStoryTitlePrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isStoryTitlePrivate}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Description" className="form-control float-label"
                                   name="description" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon"
                                         onClick={this.onLockChange.bind(this, "isDescPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isDescPrivate}/>
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
