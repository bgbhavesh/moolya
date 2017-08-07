import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import officePackageRoute from '../actions/officePackageRoutes'
let FontAwesome = require('react-fontawesome');


export default class MlOfficePackageListView extends Component {
  render() {
    const data = this.props.data || [];
    return(
      <div>
        {
          data.map(function (prop, id) {
            return (
                <div className="col-lg-2 col-md-3 col-sm-3"  key={id}>
                  <a href={officePackageRoute.editOfficePackage(prop._id)}>
                    <div className="list_block content_block">
                      <div className="hex_outer"><span className="ml ml-moolya-symbol"></span></div>
                      <ul>
                        <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>1</b></li>
                        <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>2</b></li>
                        <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>3</b></li>
                        <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>4</b></li>
                        <li><span className="ml ml-moolya-symbol"></span>&nbsp;<b>5</b></li>
                      </ul>
                      <h3>{prop.serviceCardName}</h3>
                    </div>
                  </a>
                </div>
            )
          })
        }
      </div>
    )
  }
}
