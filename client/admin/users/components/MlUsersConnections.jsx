/**
 * Created by vishwadeep on 26/7/17.
 */
import React, {Component} from "react";
import {fetchConnectionHandler} from '../actions/findUsersConnectionsHandlers'

export default class MlUsersConnections extends Component {
  constructor(props, context) {
    super(props);
    return this;
  }
  componentWillMount(){
    const resp = this.getAllConnections()
    return resp
  }
  async getAllConnections(){
    let communityCode = this.props.communityCode
    console.log(this.props)
    var response =await fetchConnectionHandler("ascascascasc",communityCode)
    console.log(response)
  }

  render() {
    console.log(this.props)
    return (
      <div className="row">
        <h2> Connection Landing </h2>
      </div>
    );
  }
}
