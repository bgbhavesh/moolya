import React, {Component} from "react";
import {render} from "react-dom";
import gql from "graphql-tag";
import ScrollArea from "react-scrollbar";
import {findTaskActionHandler} from "../actions/saveCalanderTask";
import MoolyaSelect from "../../../../../commons/components/select/MoolyaSelect";
import _ from "lodash";
// import {fetchActivitiesActionHandler} from "../../activity/actions/fetchActivities";
var FontAwesome = require('react-fontawesome');


export default class MlAppTaskSession extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, data: {}, sessionData: []};
    this.findTaskDetails.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findTaskDetails();
    return resp;
  }

  async findTaskDetails() {
    let taskId = this.props.taskId
    var response = await findTaskActionHandler(taskId);
    console.log(response)
    if (response) {
      let userSession = _.range(this.state.data ? this.state.data.noOfSession : 0)
      let obj = {
        duration: {
          hours: '',
          minutes: ''
        },
        activities: []
      }
      let sessionData = []
      _.each(userSession, function (item, value) {
        sessionData.push(obj)
      })
      this.setState({loading: false, data: response, sessionData: sessionData});
    }
    return response
  }

  // async fetchActivities() {
  //   let profileId = this.props.profileId;
  //   let response = await fetchActivitiesActionHandler(profileId);
  //   console.log(response)
  //   this.setState({activities: response});
  //   return response
  // }

  optionsBySelectActivity(id, selectedValue, callback, selObject) {
    let data = this.state.sessionData
    let specificData = data[id]
    specificData.activities = _.concat(specificData.activities, selectedValue)

    this.setState({sessionData: data}, function () {
      this.sendSessionDataToParent()
    })
    console.log(selObject);
  }

  sendSessionDataToParent() {
    let data = this.state.sessionData;
    this.props.getSessionDetails(data);
  }

  componentDidMount() {
    var mySwiper = new Swiper('.blocks_in_form', {
      speed: 400,
      spaceBetween: 20,
      slidesPerView: 5,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (310 + $('.admin_header').outerHeight(true)));
  }

  render() {

    let that = this
    let profileId = this.props.profileId
    let queryOptions = {
      options: {
        variables: {
          profileId: profileId
        }
      }
    };
    let query = gql`query($profileId:String) {
      data: fetchActivities(profileId: $profileId) {
        value:_id
        label: displayName
        imageLink
        mode
        duration {
          hours
          minutes
        }
      }
    }`;
    let userSession = _.range(this.state.data ? this.state.data.noOfSession : 0)
    const showLoader = this.state.loading;
    return (
      <div className="step_form_wrap step1">
        {/*{showLoader === true ? ( <MlLoader/>) : (*/}
          <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <div className="form_bg">
          {userSession.map(function (session, id) {
            return (
              <div className="panel panel-default" key={id}>
                <div className="panel-heading">
                  <div className="col-md-3 nopadding-left">Section 1</div>
                  <div className="col-md-3">
                    <div style={{'marginTop': '-4px'}}>
                      <label>Duration: &nbsp; <input type="text" className="form-control inline_input"/> Hours
                        <input
                          type="text" className="form-control inline_input"/> Mins </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{'marginTop': '-12px'}}>
                      <MoolyaSelect multiSelect={false} className="form-control float-label"
                                    valueKey={'value'}
                                    labelKey={'label'} queryType={"graphql"} query={query}
                                    queryOptions={queryOptions} isDynamic={true} placeholder="Select Activity"
                                    onSelect={that.optionsBySelectActivity.bind(that, id)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                  &nbsp;
                  <span className="see-more pull-right"><a href=""><FontAwesome name='plus'/>Add</a></span>
                </div>
                <div className="panel-body">
                  <div className="swiper-container blocks_in_form">
                    <div className="swiper-wrapper">

                      <div className="swiper-slide">
                        <div className="list_block notrans funding_list">
                          <div>
                            <p className="offline">Offline</p>
                            <span>Duration: <FontAwesome name='pencil'/></span><br />
                            <div className="form-group">
                              <label><input type="text" className="form-control inline_input"/> Hours <input
                                type="text"
                                className="form-control inline_input"/>
                                Mins </label>
                            </div>

                          </div>
                          <h3>name</h3>
                        </div>
                      </div>

                      <div className="swiper-slide">
                        <div className="list_block notrans funding_list">
                          <div>
                            <p className="online">mode online/offine</p>
                            <span>Duration: <FontAwesome name='pencil'/></span><br />
                            <div className="form-group">
                              <label><input type="text" className="form-control inline_input"/> Hours <input
                                type="text"
                                className="form-control inline_input"/>
                                Mins </label>
                            </div>

                          </div>
                          <h3>Activity display name</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
          </ScrollArea>
        {/*)}*/}
      </div>
    )
  }
};
