/**
 * Created by Mukhil on 20/6/17.
 */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import Datetime from "react-datetime";
import moment from "moment";
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import {createServiceActionHandler, fetchServiceActionHandler, fetchProfileActionHandler, updateServiceActionHandler} from '../actions/MlServiceActionHandler'
var Select = require('react-select');
import Moolyaselect from "../../../../../commons/components/select/MoolyaSelect";



var options = [
  {value: 'Weekly', label: 'Weekly'},
  {value: 'Daily', label: 'Daily'},
  {value: 'Monthly', label: 'Monthly'}
];

export default class MlAppServiceStep1 extends React.Component{
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
    this.getDetails.bind(this)
    this.getUserProfile.bind(this)
  }

  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));

  }
componentWillMount() {
    this.getDetails()

}

async getUserProfile() {
    let profileId = FlowRouter.getParam('profileId')
    const resp = await fetchProfileActionHandler(profileId)
  if(resp) {
      this.setState({clusters:resp.clusterId, clusterName:resp.clusterName, clusterCode:resp.countryId})
  }
}

async getDetails() {
  let id = FlowRouter.getQueryParam('id')
  if (id) {
    const resp = await fetchServiceActionHandler(id)
    this.setState({
      serviceName: resp.name, displayName: resp.displayName, sessionsCost: resp.noOfSession,
      frequencyType: resp.sessionFrequency, hour: resp.duration.hours, minute: resp.duration.minutes,
      status: resp.status, validTillDate: resp.validTill
    })
    let statess = []
    let citiess = []
    let communitiess = []
    // let statesArray = resp.state;
    // let citiesArray = resp.city;
    // let communitiesArray = resp.community;
    resp.state.map(function (data) {
      statess.push(data.id)
    })
    this.setState({states: statess})
    console.log(this.state.states)


    resp.city.map(function(data){
        citiess.push(data.id)
      })
      this.setState({chapters:citiess})
    console.log(this.state.chapters)

    resp.community.map(function(data){
        communitiess.push(data.id)
      })
      this.setState({communities:communitiess})
    console.log(this.state.communities)

  }

  this.getUserProfile();

}

  async saveDetails() {
    let cities = []
    let states = []
    let communities = []
    let chapName = this.state.chapterName || [];
    let statName = this.state.stateName || [];
    let communityName = this.state.communitiesName || [];

    chapName.map(function(data){
      cities.push({id: data.value, name: data.label})
    })

    statName.map(function(data){
      states.push({id: data.value, name: data.label})
    })

    communityName.map(function(data){
      communities.push({id: data.value, name: data.label})
    })

    let profileId = FlowRouter.getParam('profileId')
    let services = {
      profileId: profileId,
      userId: "",
      name: this.state.serviceName,
      displayName: this.state.displayName,
      noOfSession: this.state.sessionsCost,
      sessionFrequency: this.state.frequencyType,
      duration: {
        hours: this.state.hour,
        minutes: this.state.minute
      },
      status: this.state.status,
      validTill: this.state.validTillDate,
      city: cities,
      cluster: {
        id: this.state.clusters,
        name: this.state.clusterName
      },
      state: states,
      community: communities
      // }
    }
    let idExist = FlowRouter.getQueryParam('id');
    if(!idExist){
      const resp = await createServiceActionHandler(services)
      let id = resp.result;
      FlowRouter.setQueryParams({id:id})
      this.getDetails();
    }else {
      const res = await updateServiceActionHandler(idExist,services)
      this.getDetails();
    }
  }

  serviceExpires(e) {
    if(e.currentTarget.value >= 0) {
      this.setState({"serviceExpiral":e.currentTarget.value});
    } else {
      this.setState({"serviceExpiral":0});
    }
  }

  textFieldSaves(type,e){
    switch(type){
      case "ServiceName":
        let serviceNameValue = e.target.value;
        this.setState({serviceName:serviceNameValue })
        break;
      case "DisplayName":
        let displayNameValue = e.target.value;
        this.setState({displayName:displayNameValue})
        break;
    }
  }

  frequency(value) {
    this.setState({frequencyType:value.value})
  }

  validTillToggle(){
    $('#date-time').toggleClass('rdtOpen')
  }

  validTill(event) {
    if (event._d) {
      let value = moment(event._d).format(Meteor.settings.public.dateFormat);
      this.setState({validTillDate: value});
    }
  }
  checkBoxHandler(e){
    let value = e.target.checked;
    this.setState({status:value})
  }

  optionsBySelectChapters(value, calback, selObject){
    // let temp = this.state.chapterObject || []
    this.setState({chapters:value})
    this.setState({chapterName:selObject});
    // console.log(this.state.chapterName,this.state.chapters)
    this.setState({subChapterName:null})
  }

  optionsBySelectstates(value, calback, selObject) {
    // let temp = this.state.subChapterObject ||[]
    this.setState({states: value})
    this.setState({stateName: selObject})
  }

  optionsBySelectCommunities(value, calback, selObject){
    // let temp = this.state.communityObject || []
    this.setState({communities:value})
    this.setState({communitiesName:selObject})
  }

  render(){

    let statesQuery=gql`query ($countryId: String) {
        data: fetchStatesPerCountry(countryId: $countryId) {
        value: _id
        label: name
      }
    }`;

    let citiesQuery=gql`query($id:String){data:fetchChapters(id:$id) {
    value:_id
    label:chapterName
      }  
    }`;


    let fetchcommunities = gql` query{
      data:fetchCommunityDefinitionForSelect{label:name,value:code}
    }
    `;

    let statesOption={options: { variables: {countryId:this.state.clusterCode}}};

    let citiesOption={options: { variables: {id:this.state.clusters}}};

    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Service Name" className="form-control float-label" id="" value={this.state.serviceName} onChange={this.textFieldSaves.bind(this,"ServiceName")}/>
                </div>
                <div className="form-group">
                  <label>Total number of Sessions Rs. <input type="text"className="form-control inline_input" disabled={true} value={this.state.sessionsCost}  /> </label>
                  {/*<input type="number" className="form-control "/>*/}
                </div>
                <div className="form-group">
                  <label>Duration: &nbsp;
                    <input type="text" className="form-control inline_input" disabled={true} value={this.state.hour}  /> Hours
                    <input type="text" className="form-control inline_input" disabled={true} value={this.state.minute}  /> Mins
                  </label>
                </div>
                <div className="form-group" id="date-time">
                  <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "Valid Till"}}   closeOnSelect={true} value={moment(this.state.validTillDate).format('DD-MM-YY')} onChange={this.validTill.bind(this)}/>
                  <FontAwesome name="calendar" className="password_icon"  onClick={this.validTillToggle.bind(this)}/>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Display Name" className="form-control float-label" value={this.state.displayName} onChange={this.textFieldSaves.bind(this,"DisplayName")} id=""/>
                </div>
                <span className="placeHolder active">Frequency type</span>
                <div className="form-group">
                  <Select name="form-field-name"   options={options} value={this.state.frequencyType} placeholder='Frequency Type' onChange={this.frequency.bind(this)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" className="form-control float-label" value={this.state.clusterName} disabled/>
                </div>
                {/*<div className="form-group">*/}
                  {/*<Moolyaselect multiSelect={false}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} value={this.state.clusters} isDynamic={true} id={'clusterquery'}  />*/}
                {/*</div>*/}
                <div className="form-group">
                  <Moolyaselect multiSelect={true}  placeholder={"States"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.states} value={this.state.states}  queryType={"graphql"} query={statesQuery} queryOptions={statesOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectstates.bind(this)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}  placeholder={"Cities"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters} value={this.state.chapters}  queryType={"graphql"} query={citiesQuery} queryOptions={citiesOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}  placeholder={"Communities"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.communities}  value={this.state.communities}   queryType={"graphql"} query={fetchcommunities}  isDynamic={true} id={'fetchcommunities'} onSelect={this.optionsBySelectCommunities.bind(this)} />
                </div>
                <div className="form-group switch_wrap inline_switch">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" checked={this.state.status} onChange={this.checkBoxHandler.bind(this)}/>
                    <div className="slider"></div>
                  </label>
                </div>
                <br className="brclear"/>
                <div className="form-group">
                  <label>Service expires &nbsp; <input type="text" className="form-control inline_input" onChange={(e)=>this.serviceExpires(e)} value={this.state.serviceExpiral}  /> days from the date of purchase</label>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div> <div className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};
