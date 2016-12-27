import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';


AdminLeftNavContent = React.createClass({
  render(){
    return (
      <div className="col-md-2 col-sm-2 col-xs-4 left-fixed-menu leftmenu-padding">
        <div className="collapse-menu panel-group" id="accordion">
          <div className="menu-links panel panel-default active">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a href="/admin/users">
                  <i className="sidemenu-icon fa fa-tachometer"></i> Users
                </a>

              </h4><br></br>
              <h4 className="panel-title">
                <a href="/admin/registration">
                  <i className="sidemenu-icon fa fa-tachometer"></i> Registration
                </a>

              </h4><br></br>
              <h4 className="panel-title">
                <a href="/admin/dropdown">
                  <i className="sidemenu-icon fa fa-tachometer"></i> Dropdown
                </a>

              </h4>
              <br></br>
              <h4 className="panel-title">
                <a href="/admin/multiselectdropdown">
                  <i className="sidemenu-icon fa fa-tachometer"></i> Multiselectdropdown
                </a>

              </h4>
            </div>

          </div>
          {/*<div className="menu-links panel panel-default">*/}
            {/*<div className="panel-heading">*/}
              {/*<h4 className="panel-title">*/}
                {/*<a href="/admin/appointments">*/}
                  {/*<i className="sidemenu-icon fa fa-tachometer"></i> Appointments*/}
                {/*</a>*/}
              {/*</h4>*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }
})
