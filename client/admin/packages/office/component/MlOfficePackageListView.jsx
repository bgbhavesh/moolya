import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
let FontAwesome = require('react-fontawesome');


export default class MlOfficePackageListView extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-lg-2 col-md-3 col-sm-3">
          <a href="/admin/cardsOfficePurchase">
            <div className="list_block content_block">
              <div className="hex_outer"><span className="ml ml-moolya-symbol"></span></div>
              <ul>
                <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>1</b></li>
                <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>2</b></li>
                <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>3</b></li>
                <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>4</b></li>
                <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>5</b></li>
              </ul>
              <h3>One</h3>
            </div>
          </a>
        </div>
      </div>
    )
  }
}
