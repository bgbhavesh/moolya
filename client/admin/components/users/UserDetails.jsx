import React from 'react';
class UserDetails extends React.Component {
  constructor(props){
    super(props);
  }

  onExpandCustomButton(data) {
    console.log(data);
    alert(data?data.userName:"");
  }

  render() {
    if (this.props.data) {
      return (<div>Values are as follows.Id:{this.props.data._id} Name:{this.props.data.userName} MobileNumber:{this.props.data.mobileNumber}<button onClick={this.onExpandCustomButton.bind(this,this.props.data)}>send notification</button></div>);
    }
  }
}

export default UserDetails;
