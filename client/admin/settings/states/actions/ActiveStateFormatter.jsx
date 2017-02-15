import React from 'react';
import {updateStateActionHandler} from './updateStateAction'
class ActiveStateFormatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    return this;
  }
  componentDidMount() {
    if(this.props.data.isActive){
      this.refs.status.checked = true
    }
  }
  onChange(data) {
    if (this.refs.status.checked == true) {
      $('#status').prop('checked', true);
      this.setState({"data": {"isActive": true}});
    } else {
      $('#status').prop('checked', false);
      this.setState({"data": {"isActive": false}});
    }

    let StateDetails = {
      id: data.id,
      state: data.name,
      countryId: data.countryId,
      countryCode: data.countryCode,
      isActive: this.refs.status.checked
    }

    updateStateActionHandler(StateDetails);
  }

  render() {
    return (
      <div className="form-group switch_wrap"><label className="switch"><input type="checkbox" ref="status" id="status" checked={this.state.data && this.state.data.isActive} onChange={this.onChange.bind(this,this.props.data)}/><div className="slider"></div></label></div>
      // <input type='checkbox' checked={ this.props.data.isActive } onChange={this.onChange.bind(this,this.props.data)}/>
    );
  }
};

export default ActiveStateFormatter;
