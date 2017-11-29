import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
const FontAwesome = require('react-fontawesome');
import _ from 'lodash';
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../utils/formElemUtil';
import { findIdeatorIntellectualPlanningTrademarkActionHandler } from '../../actions/findPortfolioIdeatorDetails'
import MlLoader from '../../../../../commons/components/loader/loader'

export default class MlIdeatorIntellectualPlanningAndTrademark extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {},
      privateValues: []
    };
    this.fetchPortfolioDetails.bind(this);
    return this
  }
  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp
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

  async fetchPortfolioDetails() {
    const portfoliodetailsId = this.props.portfolioDetailsId;
    const response = await findIdeatorIntellectualPlanningTrademarkActionHandler(portfoliodetailsId);
    const empty = _.isEmpty(this.context.ideatorPortfolio && this.context.ideatorPortfolio.intellectualPlanning)
    if (empty && response) {
      this.setState({ loading: false, data: response });
      _.each(response.privateFields, (pf) => {
        $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    } else {
      this.setState({ loading: false, data: this.context.ideatorPortfolio.intellectualPlanning, privateValues: response.privateFields }, () => {
        this.lockPrivateKeys()
      });
    }
  }

  /**
   * UI creating lock function
   * */
  lockPrivateKeys() {
    const filterPrivateKeys = _.filter(this.context.portfolioKeys.privateKeys, { tabName: this.props.tabName })
    const filterRemovePrivateKeys = _.filter(this.context.portfolioKeys.removePrivateKeys, { tabName: this.props.tabName })
    const finalKeys = _.unionBy(filterPrivateKeys, this.state.privateValues, 'booleanKey')
    const keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssssss', keys)
    _.each(keys, (pf) => {
      $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  onInputChange(e) {
    let details = this.state.data;
    const name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: e.target.value });
    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }

  onLockChange(fieldName, field, e) {
    let details = this.state.data || {};
    const key = e.target.id;
    let isPrivate = false
    details = _.omit(details, [key]);
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      details = _.extend(details, { [key]: true });
      isPrivate = true
    } else {
      details = _.extend(details, { [key]: false });
    }

    const privateKey = {
      keyName: fieldName, booleanKey: field, isPrivate, tabName: this.props.tabName
    }
    // this.setState({privateKey:privateKey})
    this.setState({ data: details, privateKey }, function () {
      this.sendDataToParent()
    })
  }

  sendDataToParent() {
    let data = this.state.data;
    for (const propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    data = _.omit(data, ['privateFields']);
    this.props.getIntellectualPlanning(data, this.state.privateKey);
  }

  render() {
    const description = this.state.data.IPdescription ? this.state.data.IPdescription : ''
    const isIntellectualPrivate = this.state.data.isIntellectualPrivate ? this.state.data.isIntellectualPrivate : false

    const showLoader = this.state.loading;
    return (
      <div>
        <h2>Intellectual Property And Trademarks</h2>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="row requested_input">
                <div className="col-lg-12">

                  <div className="panel panel-default panel-form">
                    <div className="panel-heading">
                      Intellectual Property And Trademark
                      <FontAwesome name='unlock' className="input_icon req_header_icon un_lock" id="isIntellectualPrivate" onClick={this.onLockChange.bind(this, 'IPdescription', 'isIntellectualPrivate')}/>
                    </div>
                    <div className="panel-body">

                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description} onBlur={this.onInputChange.bind(this)} name="IPdescription"></textarea>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>)}
      </div>
    )
  }
}
MlIdeatorIntellectualPlanningAndTrademark.contextTypes = {
  ideatorPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
