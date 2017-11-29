import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch } from '../../../../../../utils/formElemUtil';
import MlLoader from '../../../../../../../commons/components/loader/loader';
import { fetchInstitutionDetailsHandler } from '../../../../actions/findPortfolioInstitutionDetails';

const KEY = 'institutionIncubators'

export default class MlInstitutionStartupIncubators extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      // data:this.props.serviceProductsDetails || {},
      data: {},
      privateKey: {},
      institutionIncubators: {}
    }
    this.handleBlur.bind(this);
    return this;
  }
  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
    this.updatePrivateKeys();
  }
  // componentWillMount(){
  //   let empty = _.isEmpty(this.context.institutionPortfolio && this.context.institutionPortfolio.serviceProducts)
  //   if(!empty){
  //     this.setState({loading: false, data: this.context.institutionPortfolio.serviceProducts});
  //   }
  // }
  componentWillMount() {
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    const that = this;
    const portfolioDetailsId = that.props.portfolioDetailsId;
    const empty = _.isEmpty(that.context.institutionPortfolio && that.context.institutionPortfolio.institutionIncubators)
    if (empty) {
      const response = await fetchInstitutionDetailsHandler(portfolioDetailsId, KEY);
      if (response && response.institutionIncubators) {
        let object = response.institutionIncubators;
        object = _.omit(object, '__typename')
        // this.setState({data: object});
        this.setState({ loading: false, data: object, privateFields: object.privateFields });
      } else {
        this.setState({ loading: false })
      }
    } else {
      this.setState({ loading: false, data: that.context.institutionPortfolio.institutionIncubators });
    }
    this.updatePrivateKeys();
  }

  handleBlur(e) {
    let details = this.state.data;
    const name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: e.target.value });
    this.setState({ data: details }, function () {
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
    this.props.getStartupIncubators(data, this.state.privateKey)
  }
  onLockChange(fieldName, field, e) {
    let isPrivate = false;
    let details = this.state.data || {};
    const key = e.target.id;
    details = _.omit(details, [key]);
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      details = _.extend(details, { [key]: true });
      isPrivate = true
    } else {
      details = _.extend(details, { [key]: false });
    }
    const privateKey = { keyName: fieldName, booleanKey: field, isPrivate }
    this.setState({ privateKey })
    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }

  updatePrivateKeys() {
    const response = this.state.data
    _.each(response.privateFields, (pf) => {
      $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }


  render() {
    const that = this;
    const showLoader = that.state.loading;
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="requested_input">
            <div className="col-lg-12">
              <div className="row">
                <h2>Startup Incubators</h2>
                <div className="panel panel-default panel-form">

                  <div className="panel-body">

                    <div className="form-group nomargin-bottom">
                      <textarea placeholder="Describe..." name="institutionIncubatorsDescription" className="form-control" id="cl_about" defaultValue={this.state.data && this.state.data.institutionIncubatorsDescription} onBlur={this.handleBlur.bind(this)}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isInstitutionIncubatorsPrivate" defaultValue={this.state.data && this.state.data.isInstitutionIncubatorsPrivate} onClick={this.onLockChange.bind(this, 'institutionIncubatorsDescription', 'isInstitutionIncubatorsPrivate')}/>
                    </div>

                  </div>
                </div>


              </div>
            </div>
          </div>)}
      </div>
    )
  }
}
MlInstitutionStartupIncubators.contextTypes = {
  institutionPortfolio: PropTypes.object
};
