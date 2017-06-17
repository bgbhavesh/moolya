import React from 'react';
import { render } from 'react-dom';
import ProfileTileComponent from './ProfileTileComponent';


export default class MyConnections extends React.Component{
  constructor(props){
    super(props)
    this.state =  {data: []};
  }

  render(){
    var data = this.state.data || [];
    const list = data.map(function (prop, idx) {
      return (<ProfileTileComponent data={prop} key={idx}/> );
    });
    return (<div>
        <div className="row">
          {list}
        </div>
      </div>
    )
  }
};
