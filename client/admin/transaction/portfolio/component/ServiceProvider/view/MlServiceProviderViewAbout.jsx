/**
 * Created by vishwadeep on 11/7/17.
 */

import React from "react";
import {render} from "react-dom";
var FontAwesome = require('react-fontawesome');


export default class MlServiceProviderViewAbout extends React.Component {
  componentDidMount() {
    /**fetch the component data*/
  }

  render() {
    return (
      <div className="sp_about">

        <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object" src="/images/p_12.jpg"/>
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">M.Ramesh Kumar</h4>
            <p>Founder,25yr.Experience</p>
          </div>
        </div>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.</p>
      </div>
    )
  }
};
