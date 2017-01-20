import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

export default class MoolyaTabView extends Component {
  constructor(props){
    super(props);
    this.state={
      tabOptions: props.tabOptions,
      linkField: props.linkField,
      nameField: props.nameField,
    }
    return this;
  }

  render(){
    console.log(this.props.tabOptions)
    let self = this;
   // let tabOptions
    let tabOptions = self.state.tabOptions.map(function(option) {

      return (
        <li key={option.name}>
          <div className={"moolya_btn"} ><a href={option[self.state.linkField]} className={"moolya_btn moolya_btn_in"}>  {option[self.state.nameField]} </a> </div>
        </li>
      )
    });
 /* let tabOptions = self.state.tabOptions.map(function(option) {

      return (
        <li key={option.name}>
        <div className={"moolya_btn"} ><a href={option[self.state.linkField]} className={"moolya_btn moolya_btn_in"}>  {option[self.state.nameField]} </a> </div>
        </li>
      )
    });*/
    return(

          <ul className="swiping_filters">
            {tabOptions}
          </ul>


    )
  }

}
MoolyaTabView.propTypes={
 // tabOptions: React.PropTypes.array.isRequired,
 // linkField: React.PropTypes.string,
 // nameField: React.PropTypes.string,
}
