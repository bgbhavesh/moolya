/**
 * Created by vishwadeep on 06/9/17.
 */
import React, { Component, PropTypes } from 'react';
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
import { Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import gql from 'graphql-tag';
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../../utils/formElemUtil';
import { findFunderLookingForActionHandler } from '../../../actions/findPortfolioFunderDetails'
import MlLoader from '../../../../../../commons/components/loader/loader'
import Moolyaselect from '../../../../../commons/components/MlAdminSelectWrapper';
import { mlFieldValidations } from '../../../../../../commons/validations/mlfieldValidation';

export default class MlFunderLookingFor extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {},
      funderLookingFor: [],
      popoverOpen: false,
      selectedIndex: -1,
      funderLookingForList: [],
      selectedVal: null,
      selectedObject: 'default'
    };
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
    const empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.lookingFor)
    const response = await findFunderLookingForActionHandler(portfolioDetailsId);
    if (empty) {
      if (response && response.length) {
        this.setState({
          loading: false,
          funderLookingFor: response,
          funderLookingForList: response
        });
      } else {
        this.setState({ loading: false })
      }
    } else {
      this.setState({
        loading: false,
        funderLookingFor: this.context.funderPortfolio.lookingFor,
        funderLookingForList: this.context.funderPortfolio.lookingFor
      });
    }
    this.funderLookingForServer = response
  }

  handleBlur(e) {
    let details = this.state.data;
    const name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: e.target.value });
    this.setState({ data: details })
  }

  addLookingFor() {
    this.setState({
      selectedObject: 'default', popoverOpen: !(this.state.popoverOpen), data: {}, selectedVal: null
    })
    if (this.state.funderLookingFor) {
      this.setState({ selectedIndex: this.state.funderLookingFor.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
  }

  onTileClick(index, e) {
    const cloneArray = _.cloneDeep(this.state.funderLookingFor);
    let details = cloneArray[index]
    details = _.omit(details, '__typename');
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      popoverOpen: !(this.state.popoverOpen),
      selectedVal: details.lookingForId
    }, () => {
      this.lockPrivateKeys(index)
    });

    /*
    setTimeout(function () {
      _.each(details.privateFields, function (pf) {
        $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10) */
  }

  // todo:// context data connection first time is not coming have to fix
  lockPrivateKeys(selIndex) {
    const privateValues = this.funderLookingForServer && this.funderLookingForServer[selIndex] ? this.funderLookingForServer[selIndex].privateFields : []
    const filterPrivateKeys = _.filter(this.context.portfolioKeys.privateKeys, { tabName: this.props.tabName, index: selIndex })
    const filterRemovePrivateKeys = _.filter(this.context.portfolioKeys.removePrivateKeys, { tabName: this.props.tabName, index: selIndex })
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
    let setObject = this.state.funderLookingFor
    if (this.context && this.context.funderPortfolio && this.context.funderPortfolio.lookingFor) { setObject = this.context.funderPortfolio.lookingFor }
    this.setState({ funderLookingForList: setObject, popoverOpen: false })
  }

  onLockChange(fieldName, field, e) {
    let isPrivate = false;
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      isPrivate = true
    }
    const privateKey = {
      keyName: fieldName,
      booleanKey: field,
      isPrivate,
      index: this.state.selectedIndex,
      tabName: this.props.tabName
    }
    this.setState({ privateKey }, () => {
      // this.sendDataToParent()
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

  onOptionSelected(selectedId, callback, selObject) {
    let details = this.state.data;
    details = _.omit(details, ['lookingForId']);
    details = _.omit(details, ['lookingForName']);
    details = _.omit(details, ['lookingDescription']);
    details = _.extend(details, {
      lookingForId: selectedId,
      lookingForName: selObject && selObject.label ? selObject.label : '',
      lookingDescription: selObject && selObject.about ? selObject.about : ''
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
    const funderLookingFor1 = this.state.funderLookingFor;
    let funderLookingFor = _.cloneDeep(funderLookingFor1);
    data.index = this.state.selectedIndex;
    if (isSaveClicked) { funderLookingFor[this.state.selectedIndex] = data; }
    const arr = [];
    _.each(funderLookingFor, (item) => {
      for (const propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, '__typename')
      newItem = _.omit(newItem, ['privateFields'])
      arr.push(newItem)
    })

    funderLookingFor = arr;
    this.setState({ funderLookingFor })
    this.props.getLookingFor(funderLookingFor, this.state.privateKey);
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
    const lookingOption = { options: { variables: { communityCode: 'FUN' } } };
    const that = this;
    const funderLookingForList = that.state.funderLookingForList || [];
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
                    {funderLookingForList.map((details, idx) => (<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
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
                              data-errMsg="Looking for is required"/>
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

MlFunderLookingFor.contextTypes = {
  funderPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
