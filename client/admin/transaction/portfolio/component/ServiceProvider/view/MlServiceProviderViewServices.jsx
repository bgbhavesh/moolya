import React, {Component} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../utils/formElemUtil";
import {findServiceProviderServicesActionHandler} from "../../../actions/findPortfolioServiceProviderDetails";
import _ from "lodash";
import MlLoader from "../../../../../../commons/components/loader/loader";
var FontAwesome = require('react-fontawesome');

export default class MlServiceProviderViewServices extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {}
    }
    this.fetchPortfolioDetails.bind(this);
  }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  /**
   * fetch data handler
   * */
  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    const response = await findServiceProviderServicesActionHandler(portfolioDetailsId);
    if (response) {
      this.setState({loading: false, data: response});
    }
    _.each(response.privateFields, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  /**
   * UI to be render
   * */
  render() {
    let description = this.state.data.servicesDescription ? this.state.data.servicesDescription : ''
    let isServicesPrivate = this.state.data.isServicesPrivate ? this.state.data.isServicesPrivate : false
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? (<MlLoader/>) : (
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <div className="main_wrap_scroll">
                <ScrollArea
                  speed={0.8}
                  className="main_wrap_scroll"
                  smoothScrolling={true}
                  default={true}
                >
                  <div className="row requested_input">
                    <div className="col-lg-12">
                      <div className="panel panel-default panel-form">
                        <div className="panel-heading">
                          Services
                        </div>
                        <div className="panel-body">

                          <div className="form-group nomargin-bottom">
                            <textarea placeholder="Describe..." className="form-control" id="cl_about"
                                      defaultValue={description} name="servicesDescription"></textarea>
                            <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock"
                                         id="isServicesPrivate"/>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>)}
      </div>
    )
  }
};
