import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
const FontAwesome = require('react-fontawesome');
const Select = require('react-select');
const Rating = require('react-rating');
import { dataVisibilityHandler, OnLockSwitch } from '../../../../../../utils/formElemUtil';

const KEY = 'rating'

export default class MlCompanyRating extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      data: this.props.ratingDetails || {},
      privateKey: {}
    }
    this.onRatingChange.bind(this);
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
    const empty = _.isEmpty(this.context.companyPortfolio && this.context.companyPortfolio.rating)
    if (!empty) {
      this.setState({ data: this.context.companyPortfolio.rating });
    }
  }
  onClick(fieldName, field, e) {
    let isPrivate = false;
    let details = this.state.data || {};
    const key = e.target.id;
    details = _.omit(details, [key]);
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      details = _.extend(details, { [key]: true });
      isPrivate = true;
    } else {
      details = _.extend(details, { [key]: false });
    }

    const privateKey = {
      keyName: fieldName,
      booleanKey: field,
      isPrivate,
      tabName: KEY
    }
    this.setState({ privateKey })

    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }
  onRatingChange(rate) {
    let details = this.state.data;
    details = _.omit(details, 'rating');
    details = _.omit(details, 'privateFields');
    details = _.extend(details, { rating: rate });
    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }
  sendDataToParent() {
    const data = this.state.data
    this.props.getRating(data, this.state.privateKey)
  }
  render() {
    const rating = parseInt(this.state.data && this.state.data.rating ? this.state.data.rating : 4);
    return (
      <div className="requested_input">
        <div className="col-lg-12">
          <div className="row">
            <h2>Add Rating</h2>
            <div className="panel panel-default panel-form">
              <div className="panel-body">
                <div className="form-group nomargin-bottom">
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isRatingPrivate" onClick={this.onClick.bind(this, 'rating', 'isRatingPrivate')}/>
                  <div className="star_ratings">
                    <Rating
                      empty="fa fa-star-o empty"
                      full="fa fa-star fill"
                      fractions={2}
                      initialRate={rating}
                      onChange={this.onRatingChange.bind(this)}
                    />
                  </div>
                </div>

              </div>
            </div>


          </div> </div>
      </div>
    )
  }
}
MlCompanyRating.contextTypes = {
  companyPortfolio: PropTypes.object
};
