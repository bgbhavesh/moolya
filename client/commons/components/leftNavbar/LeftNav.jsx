import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import $ from 'jquery'

export default class MoolyaLeftNav extends Component {
constructor(props){
  super(props);
  this.state={
    navOptions: props.navOptions,
    imageField: props.imageField,
    linkField: props.linkField,
    nameField: props.nameField,
  }
}
  componentDidMount()
  {
    let WinWidth = $(window).width();
    let WinHeight = $(window).height();
    $('.admin_menu, .admin_main_wrap ').height(WinHeight-$('.admin_header').outerHeight(true));


  }

  render(){

    let self = this;

    let navOptions = self.state.navOptions.map(function(option) {

      return (
        <li className={"menu_item"} key={option.name}>
          <a href={option[self.state.linkField]}>
        <div className={"menu_in"}>
          <img src={option[self.state.imageField]}/>
          {option[self.state.nameField]}
          </div>
        <div className={"menu_item menu_item_in"}></div>
        </a>
        </li>
      )
    });
    return(
      <div className="admin_menu">
        <ScrollArea
          speed={0.8}
          className="admin_menu"
          smoothScrolling={true}
        >
          <ul>
            {navOptions}

            <li className="menu_item">
              <div className="menu_item menu_item_in"> </div>
            </li>
          </ul>
        </ScrollArea>
      </div>

    )
  }

}
MoolyaLeftNav.propTypes={
  navOptions: React.PropTypes.array.isRequired,
  imageField: React.PropTypes.string,
  linkField: React.PropTypes.string,
  nameField: React.PropTypes.string,
}
