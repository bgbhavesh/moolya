/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import React from "react";
import {render} from "react-dom";

export default class PopoverActionIcon extends React.Component {

  constructor(props) {
    super(props);
    return this;
  }

  render() {

    return (

      <li id={this.props.actionName} className={this.props.activeClass}>
        <a href="#" onClick={this.props.onClickHandler}> <span
          className={this.props.iconClass} id={this.props.target}></span>
          <br />{this.props.actionName}</a>
      </li>
    )
  }

}
