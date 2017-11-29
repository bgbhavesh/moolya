import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch } from '../../../../../../utils/formElemUtil';

class MlStartupLegal extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: this.props.legalIssueDetails || {},
      privateKey: {}
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
  componentWillMount() {
    const empty = _.isEmpty(this.context.startupPortfolio && this.context.startupPortfolio.legalIssue)
    if (!empty) {
      this.setState({ loading: false, data: this.context.startupPortfolio.legalIssue });
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
    const data = this.state.data;
    for (const propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    this.props.getStartupLegalIssue(data, this.state.privateKey)
  }

  onLockChange(fieldName, field, e) {
    let details = this.state.data || {};
    const key = e.target.id;
    let isPrivate = false;
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
    /* this.setState({data:details}, function () {
     this.sendDataToParent()
     }) */
  }

  updatePrivateKeys() {
    const response = this.props.legalIssueDetails
    _.each(response.privateFields, (pf) => {
      $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }
  render() {
    return (


      <div className="requested_input">
        <div className="col-lg-12">
          <div className="row">
            <h2>Legal Issue</h2>
            <div className="panel panel-default panel-form">

              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." name="legalDescription" className="form-control" id="cl_about" defaultValue={this.state.data && this.state.data.legalDescription} onBlur={this.handleBlur.bind(this)}></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" onClick={this.onLockChange.bind(this, 'legalDescription', 'isDescriptionPrivate')}/><input type="checkbox" className="lock_input" id="isDescriptionPrivate" checked={this.state.data.isDescriptionPrivate}/>
                </div>

              </div>
            </div>


          </div> </div>
      </div>


    )
  }
}
MlStartupLegal.contextTypes = {
  startupPortfolio: PropTypes.object
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     keys: state.mlStartupEditTemplateReducer.privateKeys
//   };
// }
//
// export default connect(mapStateToProps)(MlStartupLegal);
export default MlStartupLegal;
