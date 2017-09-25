import React from 'react';

export default class NoDataList extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="alert alert-info col-md-8 col-md-offset-2 text-center" style={{'marginTop':'40px'}}>
        There are no {this.props.moduleName} to be shown here.
      </div>
    )
  }
}
