import React, { Component, PropTypes } from 'react';


export default class MoolyaLeftNav extends Component {
constructor(props){
  super(props);
  this.state={
    navOptions: props.navOptions,
    iconField: props.iconField,
    linkField: props.linkField,
    nameField: props.nameField,
  }
}

  render(){

    let self = this;

    let navOptions = self.state.navOptions.map(function(option) {

      return (
        <div>
        <h4 className={"panel-title"}>
        <a href={option[self.state.linkField]}>
        <i className={`sidemenu-icon fa fa-${option[self.state.iconField]} `}></i> {option[self.state.nameField]}
        </a>
        </h4><br></br>
        </div>




      )
    });
    return(
      <div className="col-md-2 col-sm-2 col-xs-4 left-fixed-menu leftmenu-padding">
        <div className="collapse-menu panel-group" id="accordion">
          <div className="menu-links panel panel-default active">
            <div className="panel-heading">
              {navOptions}

            </div>

          </div>
        </div>
      </div>

    )
  }

}
MoolyaLeftNav.propTypes={
  navOptions: React.PropTypes.array.isRequired

}
