import React from 'react';
class ActiveFormatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }
  onChange(data) {
    // const data=this.state.data;
    // if(e.currentTarget.checked){
    //   this.setState({"data":{"isActive":true}});
    // }else{
    //   this.setState({"data":{"isActive":false}});
    // }
  }
  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    alert(response)
  };

  render() {
    return (
      <div className="form-group switch_wrap"><label className="switch"><input type="checkbox" ref="status" id="status" checked={this.state.data && this.state.data.isActive} onChange={this.onChange.bind(this)}/><div className="slider"></div></label></div>
     // <input type='checkbox' checked={ this.props.data.isActive } onChange={this.onChange.bind(this,this.props.data)}/>
    );
  }
};

export default ActiveFormatter;
