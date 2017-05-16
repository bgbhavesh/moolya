import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {Popover, PopoverContent, PopoverTitle} from "reactstrap";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../client/admin/utils/formElemUtil";
import _ from "lodash";
import Datetime from "react-datetime";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import Moolyaselect from "../../../../../../client/commons/components/select/MoolyaSelect";
import {fetchfunderPortfolioInvestor} from "../../actions/findPortfolioFunderDetails";
var FontAwesome = require('react-fontawesome');

export default class MlFunderInvestment extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      funderInvestment: [],
      popoverOpen: false,
      selectedIndex: -1,
      funderInvestmentList: [],
      selectedVal: null,
      selectedObject: "default"
    }
    this.handleBlur.bind(this);
    this.onSaveAction.bind(this);
    this.dateChange.bind(this)
    this.fetchPortfolioDetails.bind(this);
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
    this.fetchPortfolioDetails();
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.investments)
    if (empty) {
      const response = await fetchfunderPortfolioInvestor(portfolioDetailsId);
      if (response) {
        this.setState({loading: false, funderInvestment: response, funderInvestmentList: response});
      }
    } else {
      this.setState({
        loading: false,
        funderInvestment: that.context.funderPortfolio.investments,
        funderInvestmentList: that.context.funderPortfolio.investments
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

  dateChange(e) {
    let details = this.state.data;
    let name = 'dateOfInvestment';
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: this.refs.dateOfInvestment.state.inputValue});
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  onSaveAction(e) {
    this.setState({funderInvestmentList: this.state.funderInvestment, popoverOpen: false})
  }

  addInvestment() {
    this.setState({selectedObject: "default", popoverOpen: !(this.state.popoverOpen), data: {}})
    if (this.state.funderInvestment) {
      this.setState({selectedIndex: this.state.funderInvestment.length})
    } else {
      this.setState({selectedIndex: 0})
    }
  }

  onOptionSelected(selectedFunding) {
    let details = this.state.data;
    details = _.omit(details, ["typeOfFundingId"]);
    details = _.extend(details, {["typeOfFundingId"]: selectedFunding});
    this.setState({data: details}, function () {
      this.setState({"selectedVal": selectedFunding})
      this.sendDataToParent()
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

  onTileClick(index, e) {
    let cloneArray = _.cloneDeep(this.state.funderInvestment);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if (details && details.logo) {
      delete details.logo['__typename'];
    }
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      popoverOpen: !(this.state.popoverOpen),
      "selectedVal": details.typeOfFundingId
    });
  }

  sendDataToParent() {
    let data = this.state.data;
    let investment = this.state.funderInvestment;
    let funderInvestment = _.cloneDeep(investment);
    data.index = this.state.selectedIndex;
    funderInvestment[this.state.selectedIndex] = data;
    let arr = [];
    _.each(funderInvestment, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, "__typename");
      let updateItem = _.omit(newItem, 'logo');
      arr.push(updateItem)
    })
    funderInvestment = arr;
    this.setState({funderInvestment: funderInvestment})
    this.props.getInvestmentsDetails(funderInvestment);
  }

  render() {
    let query = gql`query{
      data:fetchFundingTypes {
        label:displayName
        value:_id
      }
    }`;
    let that = this;
    const showLoader = that.state.loading;
    let funderInvestmentList = that.state.funderInvestmentList || [];
    return (
      <div>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
          <div className="portfolio-main-wrap">
            <h2>Investments</h2>
            <div className="requested_input main_wrap_scroll">

              <ScrollArea
                speed={0.8}
                className="main_wrap_scroll"
                smoothScrolling={true}
                default={true}
              >
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-2 col-md-4 col-sm-4">
                      <a href="#" id="create_clientdefault" data-placement="top" data-class="large_popover">
                        <div className="list_block notrans" onClick={this.addInvestment.bind(this)}>
                          <div className="hex_outer"><span className="ml ml-plus "></span></div>
                          <h3 onClick={this.addInvestment.bind(this)}>Add New Investor</h3>
                        </div>
                      </a>
                    </div>
                    {funderInvestmentList.map(function (details, idx) {
                      return (
                        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                          <a href="#" id={"create_client" + idx}>
                            <div className="list_block notrans funding_list">
                              {/*<div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>*/}
                              <div className="cluster_status inactive_cl">
                                <FontAwesome name='lock' id="isPrivate" defaultValue={details.isPrivate}/>
                                <input type="checkbox" className="lock_input" id="isPrivate"
                                       checked={details.isPrivate}/></div>
                              <div onClick={that.onTileClick.bind(that, idx)}>
                                <p>{details.companyName}</p>
                                <p className="fund">{details.investmentAmount}</p>
                              </div>
                              <h3>{details.dateOfInvestment ? details.dateOfInvestment : 'Date :'}</h3>
                            </div>
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollArea>
              <Popover placement="right" isOpen={this.state.popoverOpen}
                       target={"create_client" + this.state.selectedObject} toggle={this.toggle}>
                <PopoverTitle> Add New Member </PopoverTitle>
                <PopoverContent>
                  <div className="ml_create_client">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                      inputProps={{placeholder: "Enter Date of Investment"}} ref="dateOfInvestment"
                                      defaultValue={this.state.data.dateOfInvestment ? this.state.data.dateOfInvestment : ''}
                                      onBlur={this.dateChange.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isDateOfInvestmentPrivate"
                                         onClick={this.onLockChange.bind(this, "isDateOfInvestmentPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isDateOfInvestmentPrivate}/>
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
                            <input type="text" placeholder="Investment Amount" name="investmentAmount"
                                   defaultValue={this.state.data.investmentAmount}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isInvestmentAmountPrivate"
                                         onClick={this.onLockChange.bind(this, "isInvestmentAmountPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isInvestmentAmountPrivate}/>
                          </div>
                          <div className="form-group">
                            <Moolyaselect multiSelect={false} className="form-field-name" valueKey={'value'}
                                          labelKey={'label'} queryType={"graphql"} query={query}
                                          isDynamic={true} placeholder="Select Funding.."
                                          onSelect={this.onOptionSelected.bind(this)}
                                          selectedValue={this.state.selectedVal}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="About" name="aboutInvestment"
                                   defaultValue={this.state.data.aboutInvestment}
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isAboutInvestmentPrivate"
                                         onClick={this.onLockChange.bind(this, "isAboutInvestmentPrivate")}/>
                            <input type="checkbox" className="lock_input"
                                   checked={this.state.data.isAboutInvestmentPrivate}/>
                          </div>
                          <div className="form-group">
                            <div className="input_types">
                              <input id="isPrivate" type="checkbox"
                                     checked={this.state.data.isPrivate && this.state.data.isPrivate}
                                     name="checkbox"
                                     onChange={this.onStatusChangeNotify.bind(this)}/>
                              <label htmlFor="checkbox1"><span></span>Make Private</label></div>
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
MlFunderInvestment.contextTypes = {
  funderPortfolio: PropTypes.object,
};
