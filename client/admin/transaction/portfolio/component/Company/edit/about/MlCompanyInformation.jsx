import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch } from '../../../../../../utils/formElemUtil';


export default class MlCompanyInformation extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: this.props.informationDetails || {},
      privateKey: {}
    }
    this.handleBlur.bind(this);
    return this;
  }
  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
    this.updatePrivateKeys();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }
  componentWillMount() {
    const empty = _.isEmpty(this.context.companyPortfolio && this.context.companyPortfolio.information)
    if (!empty) {
      this.setState({ loading: false, data: this.context.companyPortfolio.information });
    }
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
    data = _.omit(data, '__typename');
    data = _.omit(data, ['privateFields']);
    this.props.getInfo(data, this.state.privateKey)
  }
  onLockChange(fieldName, field, e) {
    let details = this.state.data || {};
    let isPrivate = false;
    const key = e.target.id;
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
    this.setState({ privateKey })
    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }

  updatePrivateKeys() {
    const response = this.props.informationDetails
    _.each(response.privateFields, (pf) => {
      $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  render() {
    return (


      <div className="requested_input">
        <div className="col-lg-12">
          <div className="row">
            <h2>Information</h2>
            <div className="panel panel-default panel-form">

              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." name="informationDescription" className="form-control" id="cl_about" defaultValue={this.state.data && this.state.data.informationDescription} onBlur={this.handleBlur.bind(this)}></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isInformationDescriptionPrivate" defaultValue={this.state.data && this.state.data.isInformationDescriptionPrivate} onClick={this.onLockChange.bind(this, 'informationDescription', 'isInformationDescriptionPrivate')}/>
                </div>

              </div>
            </div>


          </div> </div>
      </div>


    )
  }
}
MlCompanyInformation.contextTypes = {
  companyPortfolio: PropTypes.object
};
