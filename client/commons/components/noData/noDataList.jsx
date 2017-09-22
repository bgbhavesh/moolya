import React from 'react';

export default class NoDataList extends React.Component {

  render(){
    return(
      <div className="alert alert-info col-md-8 col-md-offset-2 text-center" style={{'marginTop':'40px'}}>
        There are no registrations to be shown here.
      </div>
    )
  }
}
