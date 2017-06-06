/**
 * Created by vishwadeep on 12/5/17.
 */

import React, {Component} from "react";
import {render} from "react-dom";
import {findUserOfficeActionHandler} from "../actions/findUserOffice";
import MlLoader from "../../../../commons/components/loader/loader";

export default class MlAppMyOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, data: []};
    this.findUserOffice.bind(this);
    return this;
  }

  componentDidUpdate() {
    var swiper = new Swiper('.profile_container', {
      pagination: '.swiper-pagination',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 1,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    });
  }

  componentWillMount() {
    const resp = this.findUserOffice();
    return resp;
  }

  async findUserOffice() {
    const response = await findUserOfficeActionHandler();
    this.setState({loading: false, data: response});
  }

  addNewOffice() {
    FlowRouter.go("/app/addOffice")
  }

  selectOffice(officeId,evt) {
    FlowRouter.go('/app/payOfficeSubscription/' + officeId)
  }

  render() {
    let that = this
    let userOffice = this.state.data && this.state.data.length > 0 ? this.state.data : []
    const userOfficeList = userOffice.map(function (office, id) {
      return (
        <div className="swiper-slide office_accounts my-office-main" key={id} onClick={that.selectOffice.bind(that, office.officeId)}>
          <span className="ml flaticon-ml-building"></span><br />{office.officeLocation}
          <h2>Total: {office.totalCount}</h2>
          <h3>Principal:{office.principalUserCount}&nbsp;&nbsp;Team:{office.teamUserCount}</h3>
        </div>
      )
    });

    const showLoader = this.state.loading;
    return (
      <div className="app_main_wrap">
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="app_padding_wrap no_padding">
            <div className="list_view_block">
              {(userOffice.length < 1) ? <div className="col-md-12 text-center">
                <div className="col-md-offset-3 col-md-6 col-sm-6 col-xs-6 new-ideas2">
                  <div className="col-md-6">
                  </div>
                  <div className="col-md-6">
                    <a onClick={this.addNewOffice.bind(this)} className="ideabtn">Add new office</a>
                  </div>
                </div>
              </div> : <div>
                <div className="col-md-12 text-center">
                  <div className="col-md-offset-3 col-md-6 col-sm-6 col-xs-6">
                    <div className="swiper-container profile_container">
                      <div className="swiper-wrapper">

                        {userOfficeList}

                      </div>
                      <div className="swiper-pagination"></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 text-center well mart100">
                  <div className="col-md-4">
                    <a className="fileUpload mlUpload_btn" onClick={this.addNewOffice.bind(this)}>Add New Office</a>
                  </div>
                  <div className="col-md-4">
                    <a href="#" className="fileUpload mlUpload_btn disabled">Enter into Office</a>
                  </div>
                  <div className="col-md-4">
                    <a href="#" className="fileUpload mlUpload_btn disabled">Deactivate Office</a>
                  </div>
                </div>
              </div>}
            </div>
          </div>)}
      </div>
    )
  }
};
