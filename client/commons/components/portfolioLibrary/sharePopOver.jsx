import React from 'react';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
var Select = require('react-select');
import Datetime from "react-datetime";

var options = [
  { value: 'moolyaAdmin', label: 'Moolya Admin' },
  { value: 'myConnections', label: 'My Connections' },
  { value: 'officeTeamMembers', label: 'Office Team Members' }
];

export default class SharePopOver extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.state = {
      popoverOpen: false,
      popoverTwoOpen: false
    };
  }

  toggle() {

    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  toggleButton() {

    this.setState({
      popoverTwoOpen: !this.state.popoverTwoOpen
    });
  }

  selectUserType(selectedUserType) {
    this.setState({userType: selectedUserType})
  }

  validDate(current) {
    let yesterday = Datetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  validTillToggle(){
      $('#date-time').toggleClass('rdtOpen');
  }

  isDownloadable(e) {
    this.setState({downloadable: e.target.checked})
  }

  sharedStartDate(e) {
    console.log(e)
  }
  sharedEndDate(e) {
    console.log(e)
  }

render(){
    return(
        <div>
          {/*<h3>Share</h3>*/}
          <ul className="doc_upload">
            <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/></li>
            <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/></li>
            <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/></li>
          </ul>
          <div className="clearfix" />
          <div className="form-group">
            <Select        name="form-field-name"
                           options={options}
                           value={this.state.userType}
                           onChange={this.selectUserType.bind(this)}
                           />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Search here" className="form-control float-label" id=""></input>
          </div>
          <ul className="img_upload ul-hide">
            <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
            <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
            <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/><span>test text here</span></li>
          </ul>
          <div className="clearfix" />
          <div className="col-md-6 nopadding-left">
            <div className="form-group" id="date-time">
              <Datetime dateFormat={"DD-MM-YYYY"}
                        timeFormat={false}
                        inputProps={{placeholder: "Shared Start Date"}}
                        closeOnSelect={true}
                        isValidDate={(current) => this.validDate(current)}
                        onChange={(event) => this.sharedStartDate(event)}
                        />
              <FontAwesome name="calendar"
                           className="password_icon"
                           onClick={this.validTillToggle.bind(this)}
                           />
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form-group" id="date-time">
              <Datetime dateFormat={"DD-MM-YYYY"}
                        timeFormat={false}
                        inputProps={{placeholder: "Shared End Date"}}
                        closeOnSelect={true}
                        isValidDate={(current) => this.validDate(current)}

                        onChange={(event) => this.sharedEndDate(event)}
                        disabled={this.props.viewMode}/>
              <FontAwesome name="calendar"
                           className="password_icon"
                           onClick={this.validTillToggle.bind(this)}
                           />
            </div>
          </div>
          <div className="clearfix" />
          <div className="form-group">
            <div className="input_types"><input id="checkbox1" type="checkbox" name="isDownloadable"  onChange={this.isDownloadable.bind(this)} value="1" /><label htmlFor="checkbox1"><span></span>Can Download this content</label></div>
          </div>
          <div className="clearfix" />
          <div className="ml_btn">
            <a href="#" className="save_btn">Send</a>
            <a href="#" className="cancel_btn">Cancel</a>
          </div>
        </div>
      )
  }
}
