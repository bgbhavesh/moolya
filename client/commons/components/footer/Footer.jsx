import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery'
export default class MoolyaFooter extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount()
  {
    $('.actions_switch').click(function(){
      $('.bottom_actions_block').toggleClass('show_block');
      $(this).toggleClass('show_act');
    });
  }


  render(){
    let routerPath=this.props.routerPath;
    let imagePath=this.props.imagePath;
    let footerView = this.props.footerOptions.map(function(option) {
      return (
        <div className={"hex_btn"}  >
        <a href={option[routerPath]} key={option.name} className={"hex_btn hex_btn_in"}>
          <img src={option[imagePath]}/>
        </a></div>
      )
    })

    return(

      <div>
        <span className="actions_switch" ></span>
        <div className="bottom_actions_block ">
          {footerView}
        </div>
      </div>

    )
  }

}

MoolyaFooter.PropTypes={
  routerPath:React.PropTypes.string,
  imagePath:React.PropTypes.string
}


