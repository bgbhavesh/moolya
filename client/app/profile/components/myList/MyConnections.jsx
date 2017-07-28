import React from 'react';
import { render } from 'react-dom';
import ProfileTileComponent from './ProfileTileComponent';
import {fetchMyConnectionsActionHandler} from '../../actions/myListActions'
import MlLoader from '../../../../commons/components/loader/loader'
export default class MyConnections extends React.Component{
  constructor(props){
    super(props);
    this.state =  {loading:true,data: []};
    return this;
  }

  async componentWillMount() {
    const response = await fetchMyConnectionsActionHandler();
    this.setState({loading: false,data: response});
  }

  render(){
    var data = this.state.data || [];
    var showLoader=this.state.loading;
    const list = data.map(function (prop, idx) {
      return (<ProfileTileComponent data={prop} key={idx}/> );
    });
    return ( <div>{showLoader===true?(<MlLoader/>):(<div>
        <div className="row">
          {list}
        </div>
      </div>)}</div>)
  }
};
