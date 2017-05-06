import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {Popover, PopoverContent} from "reactstrap";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../client/admin/utils/formElemUtil";
import _ from "lodash";
import Datetime from "react-datetime";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import Moolyaselect from "../../../../../../client/commons/components/select/MoolyaSelect";
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
    details = _.omit(details, ["typeOfFunding"]);
    details = _.extend(details, {["typeOfFunding"]: selectedFunding});
    this.setState({data: details}, function () {
      this.setState({"selectedVal": selectedFunding})
      this.sendDataToParent()
    })
  }

  sendDataToParent(){
    let data = this.state.data;
    let investment = this.state.funderInvestment;
    let funderInvestment = _.cloneDeep(investment);
    data.index = this.state.selectedIndex;
    funderInvestment[this.state.selectedIndex] = data;
    let arr = [];
    _.each(funderInvestment, function (item)
    {
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
    this.setState({funderInvestment:funderInvestment})
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
                        <div className="col-lg-2 col-md-4 col-sm-4">
                          <a href="#" id={"create_client"+idx}>
                            <div className="list_block notrans funding_list">
                              <FontAwesome name='lock'/>
                              <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                              <div><p>DoneThing</p><p className="fund">$300k</p><p>Seed</p></div>
                              <h3>March, 2017</h3>
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
                <PopoverContent>
                  <div className="ml_create_client">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                      inputProps={{placeholder: "Enter Date of Investment"}} refs="dateOfInvestment"
                                      closeOnSelect={true} onBlur={this.dateChange.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isDateOfInvestmentPrivate"/>
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder="Company Name" name="companyName"
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Investment Amount" name="investmentAmount"
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isInvestmentAmountPrivate"/>
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
                                   className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon" id="isAboutInvestmentPrivate"/>
                          </div>
                          <div className="form-group">
                            <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox"
                                                                value="1"/><label htmlFor="checkbox1">
                              <span></span>Make Private</label></div>
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
