import React from "react";
import {render} from "react-dom";
var FontAwesome = require('react-fontawesome');

export default class MlFunderNewsView extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h2>News</h2>
        <div className="main_wrap_scroll">
          <ul className="list-info">
            <li>News content here</li>
          </ul>
        </div>
      </div>
    )
  }
};
