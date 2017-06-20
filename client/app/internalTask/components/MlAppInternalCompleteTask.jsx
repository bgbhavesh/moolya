/**
 * Created by pankaj on 20/6/17.
 */

import React from 'react';

export default class MlAppInternalCompleteTask extends React.Component{
  componentDidMount() {
  }
  render(){
    return (
      <div>
        <div className="requested_input">
          <div className="col-lg-12" id="show">
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4">
                <div className="list_block list_block_intrests notrans">
                  <div className="hex_outer"><img src="/images/document.png"/></div>
                  <h3><span className="pull-left"> Asses</span> <span className="pull-right badge ml_badge_red">100%</span> </h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4">
                <div className="list_block list_block_intrests notrans">
                  <div className="hex_outer"><img src="/images/discuss.png"/></div>
                  <h3><span className="pull-left"> Discuss</span> <span className="pull-right badge ml_badge_red">100%</span> </h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4">
                <div className="list_block list_block_intrests notrans">
                  <div className="hex_outer"><img src="/images/valuation.png"/></div>
                  <h3><span className="pull-left">Valuation</span> <span className="pull-right badge ml_badge_red">100%</span> </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

