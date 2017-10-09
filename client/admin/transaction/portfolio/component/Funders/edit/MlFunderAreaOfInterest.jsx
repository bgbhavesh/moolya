import React, {Component, PropTypes} from "react";
import ScrollArea from "react-scrollbar";
import _ from "lodash";
import gql from "graphql-tag";
var FontAwesome = require('react-fontawesome');
import {Popover, PopoverContent, PopoverTitle} from "reactstrap";
import Moolyaselect from "../../../../../commons/components/MlAdminSelectWrapper";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../../client/admin/utils/formElemUtil";
import {fetchfunderPortfolioAreaInterest} from "../../../actions/findPortfolioFunderDetails";
import MlLoader from '../../../../../../commons/components/loader/loader'
import {mlFieldValidations} from "../../../../../../commons/validations/mlfieldValidation";

export default class MlFunderAreaOfInterest extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      funderAreaOfInterest: [],
      popoverOpen: false,
      selectedIndex: -1,
      funderAreaOfInterestList: [],
      selectedObject: "default",
      privateKey:{}
    };
    this.tabName = this.props.tabName || ""
    this.handleBlur.bind(this);
    this.onSaveAction.bind(this);
    this.dateChange.bind(this)
    this.fetchPortfolioDetails.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.areaOfInterest)
    const response = await fetchfunderPortfolioAreaInterest(portfolioDetailsId);
      if (empty) {
        if(response && response.length)
          this.setState({loading: false, funderAreaOfInterest: response, funderAreaOfInterestList: response});
        else
          this.setState({loading: false})
      } else {
        this.setState({
          loading: false,
          funderAreaOfInterest: that.context.funderPortfolio.areaOfInterest,
          funderAreaOfInterestList: that.context.funderPortfolio.areaOfInterest
        });
      }
      this.funderAreaOfInterestServer = response
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
    let cloneArray = _.cloneDeep(this.state.funderAreaOfInterest);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if (details && details.logo) {
      delete details.logo['__typename'];
    }
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      popoverOpen: !(this.state.popoverOpen)}, () => {
      this.lockPrivateKeys(index)
    });
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

    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate, index:this.state.selectedIndex, tabName: this.props.tabName}
    // this.setState({privateKey:privateKey})
    this.setState({data: details, privateKey:privateKey}, function () {
      this.sendDataToParent()
    })

  }

  /**
   * UI creating lock function\
   * @Note: For the first Time context data is not working
   *        from the second time context when connection establish then its working
   * */
  //todo:// context data connection first time is not coming have to fix
  lockPrivateKeys(selIndex) {
    var privateValues = this.funderAreaOfInterestServer && this.funderAreaOfInterestServer[selIndex]?this.funderAreaOfInterestServer[selIndex].privateFields : []
    var filterPrivateKeys = _.filter(this.context.portfolioKeys.privateKeys, {tabName: this.props.tabName, index:selIndex})
    var filterRemovePrivateKeys = _.filter(this.context.portfolioKeys.removePrivateKeys, {tabName: this.props.tabName, index:selIndex})
    var finalKeys = _.unionBy(filterPrivateKeys, privateValues, 'booleanKey')
    var keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssssss', keys)
    _.each(keys, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }


  onSaveAction(e) {
    this.setState({funderAreaOfInterestList: this.state.funderAreaOfInterest, popoverOpen: false})
  }

  onOptionSelectedIndustry(selectedFunding, callback, selObject) {
    let details = this.state.data;
    details = _.omit(details, ["industryTypeId"]);
    details = _.extend(details, {["industryTypeId"]: selectedFunding, "industryTypeName": selObject.label});
    this.setState({data: details, "selectedVal": selectedFunding, "industryTypeName": selObject.label}, function () {
      // this.setState({"selectedVal": selectedFunding, "industryTypeName": selObject.label})
      this.sendDataToParent()
    })
  }

  onOptionSelectedSubDomain(selectedSubDomain) {
    let details = this.state.data;
    details = _.omit(details, ["subDomainId"]);
    details = _.extend(details, {["subDomainId"]: selectedSubDomain});
    this.setState({data: details}, function () {
      this.setState({"selectedValDomain": selectedSubDomain})
      this.sendDataToParent()
    })
  }

  getFieldValidations() {
    const ret = mlFieldValidations(this.refs);
    return {tabName: this.tabName, errorMessage: ret, index: this.state.selectedIndex}
  }

  /**
   * UI creating lock function\
   * @Note: For the first Time context data is not working
   *        from the second time context when connection establish then its working
   * */
  //todo:// context data connection first time is not coming have to fix
  lockPrivateKeys(selIndex) {
    var privateValues = this.funderInvestmentServer && this.funderInvestmentServer[selIndex]?this.funderInvestmentServer[selIndex].privateFields : []
    var filterPrivateKeys = _.filter(this.context.portfolioKeys.privateKeys, {tabName: this.props.tabName, index:selIndex})
    var filterRemovePrivateKeys = _.filter(this.context.portfolioKeys.removePrivateKeys, {tabName: this.props.tabName, index:selIndex})
    var finalKeys = _.unionBy(filterPrivateKeys, privateValues, 'booleanKey')
    var keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssssss', keys)
    _.each(keys, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  sendDataToParent() {
    const requiredFields = this.getFieldValidations();
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
      updateItem =_.omit(updateItem,"privateFields");
      arr.push(updateItem)
    })
    funderAreaOfInterest = arr;
    this.setState({funderAreaOfInterest: funderAreaOfInterest})
    this.props.getAreaOfInterestDetails(funderAreaOfInterest, this.state.privateKey, requiredFields);
  }


  render() {
    let that = this;
    let industriesquery = gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }
  `;
    let subDomainQuery = gql` query($industryId:String){
    data:fetchIndustryDomain(industryId:$industryId){label:name,value:_id}
    }
  `;
    let subDomainOption = {options: {variables: {industryId: this.state.data.industryTypeId}}};
    const showLoader = that.state.loading;
    let funderAreaOfInterestList = that.state.funderAreaOfInterestList || [];
      return (
        <div>
          {showLoader === true ? (<MlLoader/>) : (
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
                        <a href="" id="create_clientdefault" data-placement="top" data-class="large_popover">
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
                            <a href="" id={"create_client" + idx}>
                              <div className="list_block list_block_intrests notrans">`
                                <FontAwesome name='unlock'  id="makePrivate" defaultValue={details.makePrivate}/>
                                <input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                                {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
                                <div className="hex_outer" onClick={that.onTileClick.bind(that, idx)}>
                                  {/*<div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>*/}
                                  <div className="hex_outer"><img src="/images/def_profile.png"/></div>
                                </div>
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
                  <PopoverTitle>Add New Area of Interest</PopoverTitle>
                  <PopoverContent>
                    <div className="ml_create_client">
                      <div className="medium-popover">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <Moolyaselect multiSelect={false} className="form-field-name" valueKey={'value'} ref={"industryTypeId"}
                                            labelKey={'label'} queryType={"graphql"} query={industriesquery} mandatory={true}
                                            isDynamic={true} placeholder="Select Industry.."
                                            onSelect={this.onOptionSelectedIndustry.bind(this)}
                                            selectedValue={this.state.selectedVal} data-required={true}
                                            data-errMsg="Industry is required"/>
                            </div>
                            <div className="form-group">
                              <Moolyaselect multiSelect={false} className="form-field-name" valueKey={'value'}
                                            labelKey={'label'} queryType={"graphql"} query={subDomainQuery}
                                            queryOptions={subDomainOption}
                                            isDynamic={true} placeholder="Select SubDomain.."
                                            onSelect={this.onOptionSelectedSubDomain.bind(this)}
                                            selectedValue={this.state.selectedValDomain}/>
                            </div>
                            <div className="form-group">
                              <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data.makePrivate&&this.state.data.makePrivate}  name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>
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
  portfolioKeys :PropTypes.object,
};
