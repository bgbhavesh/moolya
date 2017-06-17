import React from 'react';
import { render } from 'react-dom';
import ProfileTileComponent from './ProfileTileComponent';
import MlLoader from '../../../../commons/components/loader/loader'
import {fetchMyFollowingsActionHandler} from "../../actions/myListActions"


export default class MyFollowings extends React.Component{

  constructor(props){
    super(props)
    this.state =  {loading: true,data: []};
  }

  async componentWillMount() {
    const response = await fetchMyFollowingsActionHandler();
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
