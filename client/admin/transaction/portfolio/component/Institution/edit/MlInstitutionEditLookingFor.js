import React, {Component, PropTypes}  from "react";
import ScrollArea from 'react-scrollbar'
import {Button, Popover, PopoverTitle, PopoverContent} from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
var FontAwesome = require('react-fontawesome');
import Moolyaselect from  '../../../../../commons/components/MlAdminSelectWrapper';
import gql from 'graphql-tag';
import _ from 'lodash';
import {fetchInstitutionDetailsHandler} from '../../../actions/findPortfolioInstitutionDetails'
import MlLoader from '../../../../../../commons/components/loader/loader'

const KEY = "lookingFor"
export default class MlInstitutionEditLookingFor extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {},
      institutionLookingFor: [],
      popoverOpen: false,
      selectedIndex: -1,
      institutionLookingForList: [],
      selectedVal: null,
      selectedObject: "default"
    }
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
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

  componentWillMount() {
    this.fetchPortfolioDetails();
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.institutionPortfolio && that.context.institutionPortfolio.lookingFor)
    if (empty) {
      const response = await fetchInstitutionDetailsHandler(portfolioDetailsId, KEY);
      if (response && response.lookingFor) {
        this.setState({
          loading: false,
          institutionLookingFor: response.lookingFor,
          institutionLookingForList: response.lookingFor
        });
      } else {
        this.setState({loading: false})
      }
    } else {
      this.setState({
        loading: false,
        institutionLookingFor: that.context.institutionPortfolio.lookingFor,
        institutionLookingForList: that.context.institutionPortfolio.lookingFor
      });
    }
  }

  addLookingFor() {
    this.setState({selectedObject: "default", popoverOpen: !(this.state.popoverOpen), data: {}})
    if (this.state.institutionLookingFor) {
      this.setState({selectedIndex: this.state.institutionLookingFor.length})
    } else {
      this.setState({selectedIndex: 0})
    }
  }

  onTileClick(index, e) {
    let cloneArray = _.cloneDeep(this.state.institutionLookingFor);
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
      "selectedVal": details.typeId
    });

    setTimeout(function () {
      _.each(details.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  onSaveAction(e) {
    this.setState({institutionLookingForList: this.state.institutionLookingFor, popoverOpen: false})
  }

  onLockChange(fieldName, field, e) {
    var isPrivate = false;
    let details = this.state.data || {};
    let key = e.target.id;
    details = _.omit(details, [key]);
    let className = e.target.className;
    if (className.indexOf("fa-lock") != -1) {
      details = _.extend(details, {[key]: true});
      isPrivate = true
    } else {
      details = _.extend(details, {[key]: false});
    }

    var privateKey = {
      keyName: fieldName,
      booleanKey: field,
      isPrivate: isPrivate,
      index: this.state.selectedIndex,
      tabName: KEY
    }
    this.setState({privateKey: privateKey})

    this.setState({data: details}, function () {
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

  onOptionSelected(selectedId, callback, selObject) {
    let details = this.state.data;
    details = _.omit(details, ["typeId"]);
    details = _.omit(details, ["lookingForName"]);
    details = _.extend(details, {["typeId"]: selectedId, ["lookingForName"]: selObject.label});
    this.setState({data: details}, function () {
      this.setState({"selectedVal": selectedId})
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

  sendDataToParent() {
    let data = this.state.data;
    let institutionLookingFor1 = this.state.institutionLookingFor;
    let institutionLookingFor = _.cloneDeep(institutionLookingFor1);
    data.index = this.state.selectedIndex;
    institutionLookingFor[this.state.selectedIndex] = data;
    let arr = [];
    _.each(institutionLookingFor, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      newItem = _.omit(item, "__typename")
      newItem = _.omit(newItem, ["privateFields"])
      if (item && item.logo) {
        delete item.logo['__typename'];
      }
      arr.push(newItem)
    })

    console.log(arr)
    institutionLookingFor = arr;
    this.setState({institutionLookingFor: institutionLookingFor})
    this.props.getLookingForDetails(institutionLookingFor, this.state.privateKey);    //indexArray

  }


  render() {
    let query = gql`query($communityCode:String){
        data:fetchLookingFor(communityCode:$communityCode) {
          label:lookingForName
          value:_id
        }
      }`;
    const showLoader = this.state.loading;
    let lookingOption = {options: {variables: {communityCode: "STU"}}};
    let that = this;
    let institutionLookingForList = that.state.institutionLookingForList || [];
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="portfolio-main-wrap">
            <h2>Looking For</h2>
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
                      <a href="" id="create_clientdefault" data-placement="top" data-class="large_popover">
                        <div className="list_block notrans" onClick={this.addLookingFor.bind(this)}>
                          <div className="hex_outer"><span className="ml ml-plus "></span></div>
                          <h3 onClick={this.addLookingFor.bind(this)}>Add New Looking For</h3>
                        </div>
                      </a>
                    </div>
                    {institutionLookingForList.map(function (details, idx) {
                      return (<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                        <a href="" id={"create_client" + idx}>
                          <div className="list_block">
                            <FontAwesome name='unlock' id="makePrivate" defaultValue={details.makePrivate}/><input
                            type="checkbox" className="lock_input" id="isAssetTypePrivate"
                            checked={details.makePrivate}/>
                            <div className="hex_outer" onClick={that.onTileClick.bind(that, idx)}><img
                              src={details.logo && details.logo.fileUrl}/></div>
                            <h3>{details.lookingForName ? details.lookingForName : ""}</h3>
                          </div>
                        </a>
                      </div>)
                    })}
                  </div>
                </div>
              </ScrollArea>
              <Popover placement="right" isOpen={this.state.popoverOpen}
                       target={"create_client" + this.state.selectedObject} toggle={this.toggle}>
                <PopoverTitle>Add New Looking For</PopoverTitle>
                <PopoverContent>
                  <div className="ml_create_client">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <Moolyaselect multiSelect={false} placeholder="Select LookingFor"
                                          className="form-control float-label" valueKey={'value'}
                                          labelKey={'label'} queryType={"graphql"} query={query}
                                          isDynamic={true}
                                          queryOptions={lookingOption}
                                          onSelect={this.onOptionSelected.bind(this)}
                                          selectedValue={this.state.selectedVal}/>

                            <div className="form-group">
                              <input type="text" name="lookingDescription" placeholder="About"
                                     className="form-control float-label"
                                     defaultValue={this.state.data.lookingDescription}
                                     onBlur={this.handleBlur.bind(this)}/>
                              <FontAwesome name='unlock' className="input_icon" id="isDescriptionPrivate"
                                           onClick={this.onLockChange.bind(this, "lookingDescription", "isDescriptionPrivate")}/>
                            </div>
                            <div className="form-group">
                              <div className="input_types">
                                <div className="input_types"><input id="makePrivate" type="checkbox"
                                                                    checked={this.state.data && this.state.data.makePrivate?this.state.data.makePrivate:false}
                                                                    name="checkbox"
                                                                    onChange={this.onStatusChangeNotify.bind(this)}/><label
                                  htmlFor="checkbox1"><span></span>Make Private</label></div>
                              </div>
                              <div className="ml_btn" style={{'textAlign': 'center'}}>
                                <a href="" className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                              </div>
                            </div>
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
MlInstitutionEditLookingFor.contextTypes = {
  institutionPortfolio: PropTypes.object,
};