import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var Rating = require('react-rating');
import _ from 'lodash';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';

const KEY = 'rating'

export default class MlInstitutionRating extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      data:this.props.ratingDetails || {},
      privateKey: {}
    }
    this.onRatingChange.bind(this);
  }
  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
    this.updatePrivateKeys();
  }
  componentWillMount(){
    let empty = _.isEmpty(this.context.institutionPortfolio && this.context.institutionPortfolio.rating)
    if(!empty){
      this.setState({data: this.context.institutionPortfolio.rating});
    }
  }
  onClick(fieldName, field, e){
    var isPrivate = false;
    let details = (this.state.data && _.cloneDeep(this.state.data)) || {};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true;
    }else{
      details=_.extend(details,{[key]:false});
    }

    var privateKey = {
      keyName: fieldName,
      booleanKey: field,
      isPrivate: isPrivate,
      tabName: KEY
    }
    this.setState({privateKey: privateKey})
    details=_.omit(details,"privateFields");
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  updatePrivateKeys(){
    let response = this.props.ratingDetails;
    _.each(response.privateFields, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }
  onRatingChange(rate){
    let details = _.cloneDeep(this.state.data);
    details=_.omit(details,"rating");
    details=_.omit(details,"privateFields");
    details=_.extend(details,{"rating":rate});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  sendDataToParent(){
    let data = this.state.data;
    this.props.getInstitutionRating(data, this.state.privateKey);
  }
  render(){
    let rating = parseInt(this.state.data && this.state.data.rating?this.state.data.rating:4);
    return (
    <div className="requested_input">
      <div className="col-lg-12">
        <div className="row">
          <h2>Add Rating</h2>
          <div className="panel panel-default panel-form">
            <div className="panel-body">
              <div className="form-group nomargin-bottom">
                <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isRatingPrivate" onClick={this.onClick.bind(this, "rating", "isRatingPrivate")}/>
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
MlInstitutionRating.contextTypes = {
  institutionPortfolio: PropTypes.object,
};
