import React from 'react';
import { render } from 'react-dom';
import {fetchExternalUserProfilesActionHandler} from '../actions/findUserProfiles';


export default class MlAppSwitchProfile extends React.Component{

  constructor(props, context){
      super(props);
      this.state= {loading: false,userProfiles:[]};
      this.fetchExternalUserProfiles.bind(this);
    return this;
  }

  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    var swiper = new Swiper('.profile_container', {
      pagination: '.swiper-pagination',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      initialSlide:1,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true
      }
    });
  }

  async fetchExternalUserProfiles(){
    const response = await fetchExternalUserProfilesActionHandler();
    if(response){
      this.setState({loading: false, userProfiles: response});
    }
  }

  componentWillMount()
  {
    this.fetchExternalUserProfiles();
  }

  render(){
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap portfolio-main-wrap">
          <h2>Switch Profile</h2>


          <div id="location_div">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="swiper-container profile_container">

                <div className="swiper-wrapper">
                    {this.state.userProfiles.map(function (prf, idx) {
                      return(
                        <div className="swiper-slide profile_accounts">
                          <img src={prf.countryFlag?prf.countryFlag:""}/><br />{prf.clusterName?prf.clusterName:""}
                          <h2>{prf.communityDefName?prf.communityDefName:""}</h2>
                        </div>
                      )
                    })}


                </div>

                <div className="swiper-pagination"></div>
              </div>
            </div>
            <div className="col-md-12">
              <br />
              <br />
              <div className="clearfix"></div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" placeholder="Community" className="form-control float-label" id="" value="Ideator"  disabled/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Country" className="form-control float-label" id="" value="India" disabled/>
              </div>

              <div className="form-group">
                <input type="text" placeholder="Subscription Type" className="form-control float-label" id="" value="Stater" disabled/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" placeholder="Identity" className="form-control float-label" id="" value="As individual" disabled/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="City" className="form-control float-label" id="" value="Hyderabad" disabled/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Status" className="form-control float-label" id="" value="Active" disabled/>
              </div>
            </div>
            <div className="col-md-12 text-center">
              <div className="col-md-4">
                <a href="#" className="fileUpload mlUpload_btn">Make Default</a>
              </div>
              <div className="col-md-4">
                <a href="#" className="fileUpload mlUpload_btn">Switch Profile</a>
              </div>
              <div className="col-md-4">
                <a href="#" className="fileUpload mlUpload_btn">Deactivate Profile</a>
              </div>
            </div>

          </div>


        </div>

      </div>
    )
  }
};
