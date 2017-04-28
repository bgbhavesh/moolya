import React from "react";
import {render} from "react-dom";

export default class MlAppIdeatorLanding extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12 ideators_list">
            <div className="row">
              <div className="col-md-3 col-sx-3 col-sm-4 col-lg-3">
                <a href="/app/ideator/viewPortfolio">
                  <div className="ideators_list_block">
                    <div className="premium"><span>Starter</span></div>
                    <h3>Kranthi Kumar</h3>
                    <div className="list_icon"><span className="ml ml-ideator"></span></div>
                    <p>Penny Tracker<br/>Health Oriented<br/>...</p>
                    <div className="block_footer">
                      <span>Mumbai</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-3 col-sx-3 col-sm-4 col-lg-3">
                <a href="/app/ideator/viewPortfolio">
                  <div className="ideators_list_block">
                    <div className="regular"><span>Premium</span></div>
                    <h3>Shikha Maheswari</h3>
                    <div className="list_icon"><span className="ml ml-ideator"></span></div>
                    <p>M-Aid<br/>Reducing Pollution in the City<br/>...</p>
                    <div className="block_footer">
                      <span>Delhi</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-3 col-sx-3 col-sm-4 col-lg-3">
                <a href="/app/ideator/viewPortfolio">
                  <div className="ideators_list_block">
                    <div className="premium"><span>Starter</span></div>
                    <h3>Animesh Katewal</h3>
                    <div className="list_icon"><span className="ml ml-ideator"></span></div>
                    <p><br/>Bhejo Parcel<br/>...</p>
                    <div className="block_footer">
                      <span>Hyderabad</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-3 col-sx-3 col-sm-4 col-lg-3">
                <a href="/app/ideator/viewPortfolio">
                  <div className="ideators_list_block">
                    <div className="premium"><span>Starter</span></div>
                    <h3>Usha Nirmala</h3>
                    <div className="list_icon"><span className="ml ml-ideator"></span></div>
                    <p><br/>Shopping portal<br/>...</p>
                    <div className="block_footer">
                      <span>Kolkata</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
