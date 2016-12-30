import React from 'react';
class ActiveFormatter extends React.Component {

  onChange(data) {
    $(this.currentTarget).stopNavigation();
    alert(data?data.userName:"");
  }

  render() {
    return (
      <input type='checkbox' checked={ this.props.data.isActive } onChange={this.onChange.bind(this,this.props.data)}/>
    );
  }
};

export default ActiveFormatter;
