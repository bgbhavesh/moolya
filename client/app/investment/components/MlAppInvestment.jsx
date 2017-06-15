/**
 * Created by vishwadeep on 10/6/17.
 */
import React, {Component} from "react";
import {render} from "react-dom";
import {findProcessSetupActionHandler} from "../actions/findProcessSetupAction";
import MlLoader from "../../../commons/components/loader/loader";
import AppActionButtons from "../../commons/components/appActionButtons";

export default class MlAppInvestment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, data: {}
    };
    this.findProcessSetup.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findProcessSetup();
    return resp;
  }

  async findProcessSetup() {
    const response = await findProcessSetupActionHandler();
    console.log('find query')
    console.log(response)
    this.setState({loading: false, data: response});
  }


  render() {
    let MlAppActionConfig = [{
      showAction: true,
      actionName: 'save',
      handler: async(event) => {
        console.log('save clicked')
      }
    }]
    var data = this.state.data && this.state.data.processSteps && this.state.data.processSteps.length > 0 ? this.state.data.processSteps : ['']
    const dataList = data.map(function (stage, id) {
      return (
        <li className={(id == 0) ? 'active' : ''} key={id}><a href="#my_shortlist"
                                                              data-toggle="tab">{stage.stageName}</a></li>
      )
    });
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="app_main_wrap">
            <div className="app_padding_wrap">
              <div className="col-md-12">
                <div className="ml_app_tabs">
                  <ul className="nav nav-pills">
                    {/*<li className="active"><a href="#my_likes" data-toggle="tab">Likes</a></li>*/}
                    {dataList}
                  </ul>
                  <div className="tab-content clearfix">
                    <div className="tab-pane" id="my_shortlist">
                      <div className="row">

                        <div className="col-lg-2 col-md-3 col-sm-4">
                          <div className="list_block ideator_block">
                            <div className="ideator_mask">
                              <img src="/images/p_3.jpg"/>
                            </div>
                            <h3>Srinag <br />
                              UAE</h3>
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                          <div className="list_block provider_block">

                            <div className="cluster_flag" style={{backgroundImage: 'url(/images/india.png)'}}></div>
                            <div className="provider_mask">
                              <img src="/images/funder_bg.png"/>
                              <img className="user_pic" src="/images/p_14.jpg"/>
                            </div>
                            <h3>Shikha Maheshwari <br />
                              India</h3>
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                          <div className="list_block provider_block">

                            <div className="cluster_flag" style={{backgroundImage: 'url(/images/india.png)'}}></div>
                            <div className="provider_mask">
                              <img src="/images/funder_bg.png"/>
                              <img className="user_pic" src="/images/p_1.jpg"/>
                            </div>
                            <h3>Usha Nirmala <br />
                              India</h3>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <AppActionButtons ActionOptions={MlAppActionConfig} showAction='showAction' actionName="actionName"/>
          </div>
        )}
      </div>
    )
  }
}
