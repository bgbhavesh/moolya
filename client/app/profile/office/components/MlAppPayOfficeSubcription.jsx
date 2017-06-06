/**
 * Created by pankaj on 6/6/17.
 */
import React from "react";

export default class MlAppPayOfficeSubcription extends React.Component {

  componentDidMount() {
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

  render() {
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap no_padding">
          <div className="list_view_block">
            <div className="col-md-12 text-center">
              <div className="col-md-offset-3 col-md-6 col-sm-6 col-xs-6 new-ideas3">
                <div className="col-md-6">
                  {/* <img src="/images/ideas.png" />*/}
                </div>
                <div className="col-md-6 subscription">
                  <h3>Subscription</h3>

                  <ul>
                    <li>Validity</li>
                    <li>: 1Year</li>
                    <li>Includes</li>
                    <li>: </li>
                    <li>Principal</li>
                    <li>: 1</li>
                    <li>Team</li>
                    <li>: 5</li>
                    <li>Cost</li>
                    <li>: 20,0000 <b>tax inclusive</b></li>
                  </ul>

                  <br />
                  <a href="#" className="ideabtn">Pay</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
