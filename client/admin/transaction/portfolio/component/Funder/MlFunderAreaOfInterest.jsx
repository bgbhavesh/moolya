import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import _ from "lodash";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import {Popover, PopoverContent} from "reactstrap";
import Moolyaselect from "../../../../../../client/commons/components/select/MoolyaSelect";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../client/admin/utils/formElemUtil";
import {fetchfunderPortfolioAreaInterest} from "../../actions/findPortfolioFunderDetails";
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');

var options = [
  {value: 'Select Industry', label: 'Select Industry'},
  {value: '2', label: '2'}
]

var options2 = [
  {value: 'Select Domain', label: 'Select Domain'},
  {value: '2', label: '2'}
]

function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlFunderAreaOfInterest extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      funderAreaOfInterest: [],
      popoverOpen: false,
      selectedIndex: -1,
      funderAreaOfInterestList: [],
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
    let empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.areaOfInterest)
    if (empty) {
      const response = await fetchfunderPortfolioAreaInterest(portfolioDetailsId);
      if (response) {
        this.setState({loading: false, funderAreaOfInterest: response, funderAreaOfInterestList: response});
      }
    } else {
      this.setState({
        loading: false,
        funderAreaOfInterest: that.context.funderPortfolio.areaOfInterest,
        funderAreaOfInterestList: that.context.funderPortfolio.areaOfInterest
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
    // let cloneArray = _.cloneDeep(this.state.funderAreaOfInterest);
    // let details = cloneArray[index]
    // details = _.omit(details, "__typename");
    // if (details && details.logo) {
    //   delete details.logo['__typename'];
    // }
    // this.setState({
    //   selectedIndex: index,
    //   data: details,
    //   selectedObject: index,
    //   popoverOpen: !(this.state.popoverOpen)
    // });
    console.log('tile clicked' + index)
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  addAreaOfInterest() {
    this.setState({selectedObject: "default", popoverOpen: !(this.state.popoverOpen), data: {}})
    if (this.state.funderAreaOfInterest) {
      this.setState({selectedIndex: this.state.funderAreaOfInterest.length})
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
    this.setState({funderAreaOfInterestList: this.state.funderAreaOfInterest, popoverOpen: false})
  }

  onOptionSelected(selectedFunding,  callback, selObject) {
    let details = this.state.data;
    details = _.omit(details, ["industryTypeId"]);
    details = _.extend(details, {["industryTypeId"]: selectedFunding, "industryTypeName" : selObject.label});
    this.setState({data: details}, function () {
      this.setState({"selectedVal": selectedFunding, "industryTypeName" : selObject.label})
      this.sendDataToParent()
    })
  }

  sendDataToParent() {
    let data = this.state.data;
    let investment = this.state.funderAreaOfInterest;
    let funderAreaOfInterest = _.cloneDeep(investment);
    data.index = this.state.selectedIndex;
    funderAreaOfInterest[this.state.selectedIndex] = data;
    let arr = [];
    _.each(funderAreaOfInterest, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, "__typename");
      let updateItem = _.omit(newItem, 'logo');
      arr.push(updateItem)
    })
    funderAreaOfInterest = arr;
    this.setState({funderAreaOfInterest: funderAreaOfInterest})
    this.props.getAreaOfInterestDetails(funderAreaOfInterest);
  }


  render() {
    let that = this;
    const showLoader = that.state.loading;
    let funderAreaOfInterestList = that.state.funderAreaOfInterestList || [];
    let industriesquery=gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }
  `;
    return (
      <div>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
          <div className="portfolio-main-wrap">
            <h2>Area of Interest</h2>
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
                        <div className="list_block list_block_intrests notrans"
                             onClick={this.addAreaOfInterest.bind(this)}>
                          <div className="hex_outer">
                            <span className="ml ml-plus "></span>
                          </div>
                          <h3>Add Area Of Interest</h3>
                        </div>
                      </a>
                    </div>

                    {/*list of interest*/}
                    {funderAreaOfInterestList.map(function (details, idx) {
                      return (
                        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                          <a href="#" id={"create_client" + idx}>
                            <div className="list_block list_block_intrests notrans"
                                 onClick={that.onTileClick.bind(that, idx)}>
                              <FontAwesome name='lock'/>
                              <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                              <div className="hex_outer"><img src="/images/def_profile.png"/></div>
                              <h3>{details.industryTypeName}</h3>
                            </div>
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollArea>

              {/*popover */}
              <Popover placement="right" isOpen={this.state.popoverOpen}
                       target={"create_client" + this.state.selectedObject} toggle={this.toggle}>
                <PopoverContent>
                  <div className="ml_create_client">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">

                          <div className="form-group">
                            {/*<Select*/}
                              {/*name="form-field-name"*/}
                              {/*options={options}*/}
                              {/*value='Select Industry'*/}
                              {/*onChange={logChange}*/}
                            {/*/>*/}
                            <Moolyaselect multiSelect={false} className="form-field-name" valueKey={'value'}
                                          labelKey={'label'} queryType={"graphql"} query={industriesquery}
                                          isDynamic={true} placeholder="Select Industry.."
                                          onSelect={this.onOptionSelected.bind(this)}
                                          selectedValue={this.state.selectedVal}/>
                          </div>
                          <div className="form-group">
                            <Select
                              name="form-field-name"
                              options={options2}
                              value='Select Domain'
                              onChange={logChange}
                            />
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
}

MlFunderAreaOfInterest.contextTypes = {
  funderPortfolio: PropTypes.object,
};