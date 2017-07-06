/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This is the list view
 * JavaScript XML file MlserviceCardsList.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import Datetime from "react-datetime";
import moment from "moment";
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
var Select = require('react-select');


/**
 * options
 * Description :: Used in <Select/> tag to select the frequency
 */

var options = [
  {value: 'Weekly', label: 'Weekly'},
  {value: 'Daily', label: 'Daily'},
  {value: 'Monthly', label: 'Monthly'}
];

export default class MlServiceCardStep1 extends React.Component{
  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props){
    super(props)
    this.state = {
      displayName:"",serviceName:"",frequencyType:"",validTillDate:"",status:"",clusterCode:"",
      chapterObject:[{id:"",name:""}],
      subChapterObject:[{}],
      communityObject:[{}],
      chapters:[],chapterName:[],
      states:[],subChapterName:[],
      communities:[],communitiesName:[]
    }
  }

  /**
   * ComponentDidMount
   * Desc :: Initializing the float labels
   */


  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }

  /**
   * componentWillMount
   * Desc :: Uses the props to set the various initial values
   */
  componentWillMount() {
    console.log(this.props.data)
    let statess = []
    let citiess = []
    let communitiess = []
    this.props.data.state.map(function (data) {
      statess.push(data.name)
    })
    this.setState({states: statess})
    this.props.data.city.map(function(data){
      citiess.push(data.name)
    })
    this.setState({chapters:citiess})
    this.props.data.community.map(function(data){
      communitiess.push(data.name)
    })
    this.setState({communities:communitiess})
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */

  render(){
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Service Name" className="form-control float-label" id="" value={this.props.data.name} disabled/>
                </div>
                <div className="form-group">
                  <label>Total number of Sessions Rs. <input type="text"className="form-control inline_input" value={this.props.data.noOfSession} disabled /> </label>
                </div>
                <div className="form-group">
                  <label>Duration: &nbsp; <input type="text" className="form-control inline_input" value={this.props.data.duration.hours} disabled /> Hours <input type="text" className="form-control inline_input"  value={this.props.data.duration.minutes} disabled /> Mins </label>
                </div>
                <div className="form-group" id="date-time">
                  <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "Valid Till"}}  value={moment(this.props.data.validTill).format('DD-MM-YY')} />
                  <FontAwesome name="calendar" className="password_icon" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Display Name" className="form-control float-label" value={this.props.data.displayName} disabled id=""/>
                </div>
                <span className="placeHolder active">Frequency type</span>
                <div className="form-group">
                  <Select name="form-field-name"   options={options} value={this.props.data.sessionFrequency} placeholder='Frequency Type' disabled />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" className="form-control float-label" value={this.props.data.cluster.name} disabled/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="States" className="form-control float-label" value={this.state.states} disabled id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cities" className="form-control float-label" value={this.state.chapters} disabled id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Communities" className="form-control float-label" value={this.state.communities} disabled id=""/>
                </div>
                <div className="form-group switch_wrap inline_switch">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" checked={this.props.data.status} />
                    <div className="slider"></div>
                  </label>
                </div>
                <br className="brclear"/>
                <div className="form-group">
                  <label>Service expires &nbsp; <input type="text" className="form-control inline_input" value={this.state.serviceExpiral}  /> days from the date of purchase</label>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
