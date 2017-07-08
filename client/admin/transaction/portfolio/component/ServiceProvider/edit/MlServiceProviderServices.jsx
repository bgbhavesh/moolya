import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../utils/formElemUtil";
var FontAwesome = require('react-fontawesome');


export default class MlServiceProviderServices extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: this.props.serviceProductsDetails || {},
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
  }

  componentWillMount() {
    let empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.serviceProducts)
    if (!empty) {
      this.setState({loading: false, data: this.context.startupPortfolio.serviceProducts});
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

  sendDataToParent() {
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    this.props.getServiceProviderServices(data)
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

  render() {
    return (


      <div className="requested_input">
        <div className="col-lg-12">
          <div className="row">
            <h2>Services</h2>
            <div className="panel panel-default panel-form">

              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." name="description" className="form-control" id="cl_about"
                            defaultValue={this.state.data && this.state.data.description}
                            onBlur={this.handleBlur.bind(this)}></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate"
                               defaultValue={this.state.data && this.state.data.isDescriptionPrivate}
                               onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/><input type="checkbox"
                                                                                                      className="lock_input"
                                                                                                      id="isDescriptionPrivate"
                                                                                                      checked={this.state.data.isDescriptionPrivate}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
MlServiceProviderServices.contextTypes = {
  startupPortfolio: PropTypes.object,
};
