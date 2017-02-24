import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery';
import _ from 'lodash';
export default class MlActionComponent extends Component {
  constructor(props){
    super(props);
    this.state = {data: {}, isHover: false};
    return this;
    this.onActionSwitch.bind(this);
  }
  componentDidMount() {

  }

  onMouseEnterContent() {
    this.setState({isHover: true});
  }

  onMouseLeaveContent() {
    this.setState({isHover: false});
  }

  markerClickHandler(data) {

  }

  onActionSwitch(e){
    $('.bottom_actions_block').toggleClass('show_block');
    $(e.currentTarget).toggleClass('show_act');
  }


  render(){
    let config=[
      {
        actionName:'onMouseEnterContent',
      },
      {
        actionName:'onMouseLeaveContent',
      },
      {
        actionName:'markerClickHandler',
      }
    ]

    let actionView = this.props.ActionOptions.map(function(option) {
      let activeClass=''

      return (
        <div className={`${activeClass} `} key={option.actionName}  >
          <div onClick={option.handler&&option.handler.bind(this,option)}
               onMouseLeave={option.handler&&option.handler.bind(this,option)}
               onMouseEnter={option.handler&&option.handler.bind(this,option)}>
          </div>
        </div>
      )
    })
    return(
      <div>
          {actionView}
      </div>
    )
  }

}

MlActionComponent.PropTypes={
  routerPath:React.PropTypes.string,
  imagePath:React.PropTypes.string
}


