import React, { Component, PropTypes } from 'react';
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
import { Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import gql from 'graphql-tag';
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../../utils/formElemUtil';
import { fetchCompanyDetailsHandler } from '../../../actions/findCompanyPortfolioDetails'
import MlLoader from '../../../../../../commons/components/loader/loader'
import Moolyaselect from '../../../../../commons/components/MlAdminSelectWrapper';
import { mlFieldValidations } from '../../../../../../commons/validations/mlfieldValidation';

const KEY = 'lookingFor';

export default class MlComapanyLookingFor extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {},
      companyLookingFor: [],
      popoverOpen: false,
      selectedIndex: -1,
      companyLookingForList: [],
      selectedVal: null,
      selectedObject: 'default'
    }
    this.tabName = this.props.tabName || ''
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
    initalizeFloatLabel();
  }

  async fetchPortfolioDetails() {
    const that = this;
    const portfolioDetailsId = that.props.portfolioDetailsId;
    const empty = _.isEmpty(that.context.companyPortfolio && that.context.companyPortfolio.lookingFor)
    const response = await fetchCompanyDetailsHandler(portfolioDetailsId, KEY);
    if (empty) {
      if (response && response.length) {
        this.setState({
          loading: false,
          companyLookingFor: response.lookingFor,
          companyLookingForList: response.lookingFor
        });
      } else { this.setState({ loading: false }) }
    } else {
      this.setState({
        loading: false,
        companyLookingFor: this.context.companyPortfolio.lookingFor,
        companyLookingForList: this.context.companyPortfolio.lookingFor
      }, () => {
        // this.lockPrivateKeys()
      });
    }
    this.CompanyLookingForServer = response && response.lookingFor ? response.lookingFor : []
  }

  addLookingFor() {
    this.setState({
      selectedObject: 'default', popoverOpen: !(this.state.popoverOpen), data: {}, selectedVal: null
    })
    if (this.state.companyLookingFor) {
      this.setState({ selectedIndex: this.state.companyLookingFor.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
  }

  onTileClick(index, e) {
    const cloneArray = _.cloneDeep(this.state.companyLookingFor);
    let details = cloneArray[index]
    details = _.omit(details, '__typename');
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      selectedVal: details.lookingForId,
      popoverOpen: !(this.state.popoverOpen)
    }, () => {
      this.lockPrivateKeys(index)
    });
  }

  // todo:// context data connection first time is not coming have to fix
  lockPrivateKeys(selIndex) {
    const privateValues = this.CompanyLookingForServer && this.CompanyLookingForServer[selIndex] ? this.CompanyLookingForServer[selIndex].privateFields : []
    const filterPrivateKeys = _.filter(this.context.portfolioKeys && this.context.portfolioKeys.privateKeys, { tabName: this.props.tabName, index: selIndex })
    const filterRemovePrivateKeys = _.filter(this.context.portfolioKeys && this.context.portfolioKeys.removePrivateKeys, { tabName: this.props.tabName, index: selIndex })
    const finalKeys = _.unionBy(filterPrivateKeys, privateValues, 'booleanKey')
    const keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssss', keys)
    _.each(keys, (pf) => {
      $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  onSaveAction(e) {
    const requiredFields = this.getFieldValidations();
    if (requiredFields && !requiredFields.errorMessage) {
      this.sendDataToParent(true)
    } else {
      toastr.error(requiredFields.errorMessage);
      return
    }
    let setObject = this.state.companyLookingFor
    if (this.context && this.context.companyPortfolio && this.context.companyPortfolio.lookingFor) { setObject = this.context.companyPortfolio.lookingFor }
    this.setState({ companyLookingForList: setObject, popoverOpen: false })
  }

  onLockChange(fieldName, field, e) {
    let isPrivate = false;
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      isPrivate = true
    }
    const privateKey = {
      keyName: fieldName, booleanKey: field, isPrivate, index: this.state.selectedIndex, tabName: this.props.tabName
    }
    this.setState({ privateKey }, function () {
      this.sendDataToParent()
    })
  }

  onStatusChangeNotify(e) {
    let updatedData = this.state.data || {};
    const key = e.target.id;
    updatedData = _.omit(updatedData, [key]);
    if (e.currentTarget.checked) {
      updatedData = _.extend(updatedData, { [key]: true });
    } else {
      updatedData = _.extend(updatedData, { [key]: false });
    }
    this.setState({ data: updatedData }, () => {
      // this.sendDataToParent()
    })
  }

  handleBlur(e) {
    let details = this.state.data;
    const name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: e.target.value });
    this.setState({ data: details })
  }

  onOptionSelected(selectedId, callback, selObject) {
    let details = this.state.data;
    details = _.omit(details, ['lookingForId']);
    details = _.omit(details, ['lookingForName']);
    details = _.omit(details, ['lookingDescription']);
    details = _.extend(details, {
      lookingForId: selectedId,
      lookingForName: selObject.label,
      lookingDescription: selObject.about
    });
    this.setState({ data: details, selectedVal: selectedId }, () => {
      // this.sendDataToParent()
    })
  }

  getFieldValidations() {
    const ret = mlFieldValidations(this.refs);
    return { tabName: this.tabName, errorMessage: ret, index: this.state.selectedIndex }
  }

  sendDataToParent(isSaveClicked) {
    const data = this.state.data;
    const companyLookingFor1 = this.state.companyLookingFor;
    let companyLookingFor = _.cloneDeep(companyLookingFor1);
    data.index = this.state.selectedIndex;
    if (isSaveClicked) { companyLookingFor[this.state.selectedIndex] = data; }
    const arr = [];
    _.each(companyLookingFor, (item) => {
      for (const propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, '__typename')
      newItem = _.omit(newItem, ['privateFields'])
      arr.push(newItem)
    })

    companyLookingFor = arr;
    this.setState({ companyLookingFor })
    this.props.getLookingForDetails(companyLookingFor, this.state.privateKey);
  }

  render() {
    const query = gql`query($communityCode:String){
        data:fetchLookingFor(communityCode:$communityCode) {
          label:lookingForName
          value:_id
          about
        }
      }`;
    const showLoader = this.state.loading;
    const lookingOption = { options: { variables: { communityCode: 'IDE' } } };
    const that = this;
    const companyLookingForList = that.state.companyLookingForList || [];
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
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
                    {companyLookingForList.map((details, idx) => (<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a href="" id={`create_client${idx}`}>
                        <div className="list_block">
                          <div className="cluster_status">
                            <FontAwesome name='unlock' id="makePrivate" defaultValue={details.makePrivate}/>
                            <input
                              type="checkbox" className="lock_input" id="makePrivate"
                              checked={details.makePrivate}/>
                          </div>
                          <div className="hex_outer" onClick={that.onTileClick.bind(that, idx)}>
                            <span className="ml my-ml-browser_3"/>
                          </div>
                          <h3>{details.lookingForName ? details.lookingForName : ''}</h3>
                        </div>
                      </a>
                    </div>))}
                  </div>
                </div>
              </ScrollArea>
              <Popover
                placement="right" isOpen={this.state.popoverOpen}
                target={`create_client${this.state.selectedObject}`} toggle={this.toggle}>
                <PopoverTitle>Add New Looking For</PopoverTitle>
                <PopoverContent>
                  <div className="ml_create_client">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <Moolyaselect
                              multiSelect={false} placeholder="Select Looking For"
                              className="form-control float-label" valueKey={'value'}
                              labelKey={'label'} queryType={'graphql'} query={query}
                              isDynamic={true} mandatory={true}
                              queryOptions={lookingOption}
                              onSelect={this.onOptionSelected.bind(this)}
                              selectedValue={this.state.selectedVal} ref={'lookingForId'}
                              data-required={true}
                              data-errMsg="Looking For is required"/>

                            <div className="form-group">
                              <input
                                type="text" name="lookingDescription" placeholder="About"
                                className="form-control float-label" onBlur={this.handleBlur}
                                defaultValue={this.state.data.lookingDescription}/>
                              <FontAwesome
                                name='unlock' className="input_icon" id="isDescriptionPrivate"
                                defaultValue={this.state.data.isDescriptionPrivate}
                                onClick={this.onLockChange.bind(this, 'lookingDescription', 'isDescriptionPrivate')}/>
                            </div>
                            <div className="form-group">
                              <div className="input_types">
                                <div className="input_types"><input
                                  id="makePrivate" type="checkbox"
                                  checked={this.state.data && this.state.data.makePrivate ? this.state.data.makePrivate : false}
                                  name="checkbox"
                                  onChange={this.onStatusChangeNotify.bind(this)}/><label
                                  htmlFor="checkbox1"><span></span>Make Private</label></div>
                              </div>
                              <div className="ml_btn" style={{ textAlign: 'center' }}>
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

MlComapanyLookingFor.contextTypes = {
  companyPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
