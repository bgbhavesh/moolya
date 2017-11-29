import React, { Component, PropTypes } from 'react';
import ScrollArea from 'react-scrollbar'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import gql from 'graphql-tag';
import _ from 'lodash';
const FontAwesome = require('react-fontawesome');
import Moolyaselect from '../../../../../commons/components/MlAdminSelectWrapper';
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../../utils/formElemUtil';
import { fetchInstitutionDetailsHandler } from '../../../actions/findPortfolioInstitutionDetails'
import MlLoader from '../../../../../../commons/components/loader/loader';
import { mlFieldValidations } from '../../../../../../commons/validations/mlfieldValidation';

const KEY = 'lookingFor';

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
      selectedObject: 'default'
    };
    this.tabName = this.props.tabName || ''
    this.handleBlur = this.handleBlur.bind(this);
    this.onSaveAction.bind(this);
    return this;
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
    initalizeFloatLabel();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  async fetchPortfolioDetails() {
    const that = this;
    const portfolioDetailsId = that.props.portfolioDetailsId;
    const empty = _.isEmpty(that.context.institutionPortfolio && that.context.institutionPortfolio.lookingFor)
    if (empty) {
      const response = await fetchInstitutionDetailsHandler(portfolioDetailsId, KEY);
      if (response && response.lookingFor) {
        this.setState({
          loading: false,
          institutionLookingFor: response.lookingFor,
          institutionLookingForList: response.lookingFor
        });
      } else {
        this.setState({ loading: false })
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
    this.setState({ selectedObject: 'default', popoverOpen: !(this.state.popoverOpen), data: {} })
    if (this.state.institutionLookingFor) {
      this.setState({ selectedIndex: this.state.institutionLookingFor.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
  }

  onTileClick(index, e) {
    const cloneArray = _.cloneDeep(this.state.institutionLookingFor);
    let details = cloneArray[index]
    details = _.omit(details, '__typename');
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      popoverOpen: !(this.state.popoverOpen),
      selectedVal: details.lookingForId
    });

    setTimeout(() => {
      _.each(details.privateFields, (pf) => {
        $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  onSaveAction(e) {
    const requiredFields = this.getFieldValidations();
    if (requiredFields && !requiredFields.errorMessage) {
      this.sendDataToParent(true)
    } else {
      toastr.error(requiredFields.errorMessage);
      return
    }
    let setObject = this.state.institutionLookingFor
    if (this.context && this.context.institutionPortfolio && this.context.institutionPortfolio.lookingFor) { setObject = this.context.institutionPortfolio.lookingFor }
    this.setState({ institutionLookingForList: setObject, popoverOpen: false })
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
      tabName: KEY
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
    const institutionLookingFor1 = this.state.institutionLookingFor;
    let institutionLookingFor = _.cloneDeep(institutionLookingFor1);
    data.index = this.state.selectedIndex;
    if (isSaveClicked) { institutionLookingFor[this.state.selectedIndex] = data; }
    const arr = [];
    _.each(institutionLookingFor, (item) => {
      for (const propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, '__typename')
      newItem = _.omit(newItem, ['privateFields'])
      arr.push(newItem)
    })

    institutionLookingFor = arr;
    this.setState({ institutionLookingFor })
    this.props.getLookingForDetails(institutionLookingFor, this.state.privateKey);
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
    const lookingOption = { options: { variables: { communityCode: 'INS' } } };
    const that = this;
    const institutionLookingForList = that.state.institutionLookingForList || [];
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
                    {institutionLookingForList.map((details, idx) => (<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a href="" id={`create_client${idx}`}>
                        <div className="list_block">
                          <div className="cluster_status">
                            <FontAwesome name='unlock' id="makePrivate" defaultValue={details.makePrivate}/>
                            <input type="checkbox" className="lock_input" id="makePrivate" checked={details.makePrivate}/>
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
                              onSelect={this.onOptionSelected.bind(this)} ref={'lookingForId'}
                              selectedValue={this.state.selectedVal} data-required={true}
                              data-errMsg="Looking For is required"/>

                            <div className="form-group">
                              <input
                                type="text" name="lookingDescription" placeholder="About"
                                className="form-control float-label" onBlur={this.handleBlur}
                                defaultValue={this.state.data.lookingDescription}/>
                              <FontAwesome
                                name='unlock' className="input_icon" id="isDescriptionPrivate" defaultValue={this.state.data.isDescriptionPrivate}
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
MlInstitutionEditLookingFor.contextTypes = {
  institutionPortfolio: PropTypes.object
};
