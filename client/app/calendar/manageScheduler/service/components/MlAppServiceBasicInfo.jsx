/**
 * Service basic info component
 * @Author :: Mukhil P
 * @Dated :: 20/06/2017
 */

// import NPM module(s)
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import FontAwesome from 'react-fontawesome';
import Datetime from "react-datetime";
import Moment from "moment";
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag';
import Select from 'react-select';
import { cloneDeep } from 'lodash';


// import custom method(s) and component(s)
import {
  createServiceActionHandler,
  fetchServiceActionHandler,
  fetchProfileActionHandler,
  updateServiceActionHandler } from '../actions/MlServiceActionHandler';
import Moolyaselect from '../../../../commons/components/MlAppSelectWrapper';

class MlAppServiceBasicInfo extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
    this.props.getServiceDetails();
  }

  /**
   * Method :: validTillToggle
   * Desc :: set the toggle date time picker
   */
  validTillToggle(){
    $('#date-time').toggleClass('rdtOpen');
  }

  /**
   * Method :: React render
   * Desc :: Showing html page
   * @returns {XML}
   */
  render(){
    const {
      data,
      clusterCode,
      clusters,
      clusterName,
      daysRemaining,
      onChangeFormField,
      validTill,
      optionsBySelectChapters,
      optionsBySelectstates,
      optionsBySelectCommunities,
      checkBoxHandler,
      saveService,
      options,
      setSessionFrequency,
      clusterData } = this.props;

    // fetch states graphql query
    let statesQuery = gql`query ($countryId: String) {
      data: fetchStatesPerCountry(countryId: $countryId) {
        value: _id
        label: name
      }
    }`;

    // fetch cities graphql query
    let citiesQuery = gql`query($id:String){data:fetchChapters(id:$id) {
      value:_id
      label:chapterName
      }  
    }`;

    // fetch communities graphql query
    let fetchcommunities = gql` query{
      data:fetchCommunityDefinitionForSelect{label:name,value:code}
    }
    `;

    let statesOption={options: { variables: {countryId: clusterCode}}};

    let citiesOption={options: { variables: {id: clusters}}};
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true}>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text"
                         placeholder="Service Name"
                         className="form-control float-label"
                         id="name"
                         value={data.name}
                         onChange={(event) => onChangeFormField(event)} />
                </div>
                <div className="form-group">
                  <label>
                    Total number of Sessions
                    <input type="text"
                           className="form-control inline_input"
                           disabled={true}
                           value={data.noOfSession} />
                  </label>
                  {/*<input type="number" className="form-control "/>*/}
                </div>
                <div className="form-group">
                  <label>Duration: &nbsp;
                    <input type="text"
                           className="form-control inline_input"
                           disabled={true}
                           value={data.duration && data.duration.hours}  /> Hours
                    <input type="text"
                           className="form-control inline_input"
                           disabled={true}
                           value={data.duration && data.duration.minutes}  /> Mins
                  </label>
                </div>
                <div className="form-group" id="date-time">
                  <Datetime dateFormat="DD-MM-YYYY"
                            timeFormat={false}
                            inputProps={{placeholder: "Valid Till"}}
                            closeOnSelect={true}
                            value={data.validTill? new Moment(data.validTill).format('DD-MM-YY') : null}
                            onChange={(event) => validTill(event)} />
                  <FontAwesome name="calendar"
                               className="password_icon"
                               onClick={this.validTillToggle.bind(this)} />
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text"
                         placeholder="Display Name"
                         className="form-control float-label"
                         id="displayName"
                         value={data.displayName}
                         onChange={(event) => onChangeFormField(event)} />
                </div>
                <span className="placeHolder active">Renewal Frequency</span>
                <div className="form-group">
                  <Select name="form-field-name"
                          options={options}
                          value={data.sessionFrequency}
                          placeholder='Frequency Type'
                          onChange={(value) => setSessionFrequency(value.value)} />
                </div>
                <div className="form-group">
                  <input type="text"
                         placeholder="Cluster"
                         className="form-control float-label"
                         value={clusterName} disabled />
                </div>
                {/*<div className="form-group">*/}
                  {/*<Moolyaselect multiSelect={false}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} value={this.state.clusters} isDynamic={true} id={'clusterquery'}  />*/}
                {/*</div>*/}
                <div className="form-group">
                  <Moolyaselect multiSelect={true}
                                placeholder={"States"}
                                className="form-control float-label"
                                valueKey={'value'}
                                labelKey={'label'}
                                selectedValue={clusterData.state}
                                value={data.state}
                                queryType={"graphql"}
                                query={statesQuery}
                                queryOptions={statesOption}
                                isDynamic={true} id={'query'}
                                onSelect={(value, calback, selObject) => optionsBySelectstates(value, calback, selObject)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}
                                placeholder={"Cities"}
                                className="form-control float-label"
                                valueKey={'value'} labelKey={'label'}
                                selectedValue={clusterData.chapters}
                                value={data.chapters}
                                queryType={"graphql"}
                                query={citiesQuery}
                                queryOptions={citiesOption}
                                isDynamic={true} id={'query'}
                                onSelect={(value, calback, selObject) => optionsBySelectChapters(value, calback, selObject)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}
                                placeholder={"Communities"}
                                className="form-control float-label"
                                valueKey={'value'} labelKey={'label'}
                                selectedValue={clusterData.community}
                                value={data.community}
                                queryType={"graphql"} query={fetchcommunities}
                                isDynamic={true}
                                id={'fetchcommunities'}
                                onSelect={(value, calback, selObject) => optionsBySelectCommunities(value, calback, selObject)} />
                </div>
                <div className="form-group switch_wrap inline_switch">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" checked={data.status} onChange={(event) => checkBoxHandler(event)} />
                    <div className="slider"></div>
                  </label>
                </div>
                <br className="brclear"/>
                <div className="form-group">
                  <label>
                    Service expires &nbsp;
                    <input type="text"
                           className="form-control inline_input"
                           disabled value={daysRemaining}  />
                    days from the date of purchase
                  </label>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={saveService}>Save</div>
          <div className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};
MlAppServiceBasicInfo.propTypes = {
  data: PropTypes.PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array ]),
  daysRemaining: PropTypes.oneOfType([
                  PropTypes.string,
                  PropTypes.number ]),
  getServiceDetails: PropTypes.func,
  saveService: PropTypes.func,
  checkBoxHandler: PropTypes.func,
  onChangeFormField: PropTypes.func
};
export default MlAppServiceBasicInfo;
