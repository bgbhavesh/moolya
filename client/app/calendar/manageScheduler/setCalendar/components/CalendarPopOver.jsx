import React from 'react';
import { render } from 'react-dom';

export default class CalendarPopOver extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="popover-lg">
        <div className="form-group">
          <span>Updating Calendar Settings will cancel your scheduled appointments. Are you sure?</span>
        </div>
        <div className="ml_btn">
          <a href="" className="save_btn"
             // onClick={(e)=>{this.props.save();}}
          >Save</a>
          <a href="" className="cancel_btn"
            // onClick={this.props.toggle.bind(this)}
          >Cancel</a>
        </div>
      </div>
    )
  }
}
