import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import dashboardRoutes from '../actions/routesActionHandler';
export default class MlClusterList extends Component {

  constructor(props){
    super(props);
    this.state={
      userType : "All",
      configState:{}
    }
    return this;
  }
  onStatusChange(userType,e) {
    // const data = this.state.data;
    if (userType) {
      //this.setState({userType: userType});
      console.log(this.props);
      let variables={};
      let hasQueryOptions = this.props.config&&this.props.config.queryOptions ? true : false;
      if (hasQueryOptions) {
        let config = this.props.config
        if(config && config.params){
          let usertype={userType:userType}
          _.extend(config.params,usertype)
        }else{
          let newParams = {params:{userType:userType}}
          data = _.omit(config, 'params')
          config=_.extend(data,newParams);
        }
        let dynamicQueryOption = this.props.config&&this.props.config.buildQueryOptions ? this.props.config.buildQueryOptions(config) : {};
        variables = _.extend(variables,dynamicQueryOption);

      }
      this.props.config.fetchMore(variables);

    }
  }

  render(){

    return (
      <div className="community_icons">
        <a data-toggle="tooltip" title="All" data-placement="bottom" className="active_community" data-filter="all">
          <span className="ml ml-select-all" onClick={this.onStatusChange.bind(this, "All")}></span>{/*<FontAwesome className="ml" name='th'/>*/}
        </a>
        <a data-toggle="tooltip" title="Ideators" data-placement="bottom" className="" data-filter="ideator">
          <span className="ml ml-ideator" onClick={this.onStatusChange.bind(this, "Ideators")}></span>
        </a>
        <a data-toggle="tooltip" title="Funders" data-placement="bottom" data-filter="funder">
          <span className="ml ml-funder" onClick={this.onStatusChange.bind(this, "Funders")}></span>
        </a>
        <a data-toggle="tooltip" title="Start Ups" data-placement="bottom" data-filter="startup">
          <span className="ml ml-startup" onClick={this.onStatusChange.bind(this, "Startups")}></span>
        </a>
        <a data-toggle="tooltip" title="Service Providers" data-placement="bottom" data-filter="provider">
          <span className="ml ml-users" onClick={this.onStatusChange.bind(this, "Service Providers")}></span>
        </a>
        <a data-toggle="tooltip" title="Browsers" data-placement="bottom" data-filter="browser">
          <span className="ml ml-browser" onClick={this.onStatusChange.bind(this, "Browsers")}></span>
        </a>
        <a data-toggle="tooltip" title="Companies" data-placement="bottom" data-filter="company">
          <span className="ml ml-company" onClick={this.onStatusChange.bind(this, "Companies")}></span>
        </a>
        <a data-toggle="tooltip" title="Institutions" data-placement="bottom" data-filter="institution">
          <span className="ml ml-institutions" onClick={this.onStatusChange.bind(this, "Institutions")}></span>
        </a>
        <a data-toggle="tooltip" title="Backend Users" data-placement="bottom" data-filter="internalUser">
          <span className="ml ml-moolya-symbol" onClick={this.onStatusChange.bind(this, "BackendUsers")}></span>
        </a>
      </div>
    );

  }
}

