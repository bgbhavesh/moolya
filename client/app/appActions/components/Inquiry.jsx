/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import React from "react";
import {render} from "react-dom";
import {inquiryActionHandler} from "../actions/inquiryActionHandler";
export default class Inquiry extends React.Component {

  constructor(props) {
    super(props);
    this.inquiryHandler.bind(this);
    return this;
  }

  async inquiryHandler(){
    var response=await inquiryActionHandler();
  }

  render() {

    return (
      <div>
        <div className="form-group">
          <input type="text" placeholder="Subject" defaultValue="Inquiry" className="form-control float-label"/>
        </div>
        <div className="form-group">
          <textarea placeholder="Message" defaultValue="Inquiry" className="form-control float-label"></textarea>
        </div>
        <div className="ml_btn">
          <a href="#" className="save_btn">Send</a>
          <a href="#" className="cancel_btn" onClick={this.props.toggle}>Cancel</a>
        </div>
      </div>

    );
  }

}
