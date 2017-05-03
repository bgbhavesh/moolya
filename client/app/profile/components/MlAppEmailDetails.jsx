/**
 * Created by viswadeep on 2/5/17.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import Moolyaselect from  '../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
export default class AppEmailDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeTab : "active"
    }
    return this;
  }
  render(){
    let details=this.props.emailInfoDetails
    let that=this;
    let emailTypeQuery=gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let emailTypeOption={options: { variables: {type : "EMAILTYPE",hierarchyRefId:this.props.clusterId}}};

    return (<div className="panel-body">
        <div className="ml_tabs">
          <ul  className="nav nav-pills">
            <li className={this.state.activeTab}>
              <a  href="#emailA" data-toggle="tab">Add New&nbsp;<b><FontAwesome name='plus-square' /></b></a>
            </li>
            {that.state.emailDetails && (that.state.emailDetails.map(function(options,key){
              return(
                <li key={key} onClick={that.emailTabSelected.bind(that,key)}>
                  <a data-toggle="pill" href={'#emailIdType'+key} className="add-contact">
                    <FontAwesome name='minus-square'/>{options.emailIdTypeName}</a>
                </li>)
            }))}
          </ul>
          <div className="tab-content clearfix">
            <div className={"tab-pane"+this.state.activeTab} id="emailA">
              <div className="form-group">
                {/*<Moolyaselect multiSelect={false} ref={'emailType'}*/}
                              {/*placeholder="Select Email Type"*/}
                              {/*className="form-control float-label" selectedValue={this.state.selectedEmailTypeValue}*/}
                              {/*valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={emailTypeQuery}*/}
                              {/*queryOptions={emailTypeOption}*/}
                              {/*isDynamic={true}/>*/}
                <input type="text"  ref={'name'} placeholder="Name" className="form-control float-label" defaultValue="selectedEmailTypeValue" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Enter Email Id" ref={'emailId'} className="form-control float-label"/>
              </div>
              <div className="ml_icon_btn">
                <a href="#" className="save_btn" >
                  <span className="ml ml-save"></span>
                </a>
              </div>
            </div>
            {that.state.emailDetails && (that.state.emailDetails.map(function(options,key) {
              return(<div className="tab-pane" id={'emailIdType'+key} key={key}>
                <div className="form-group">
                  {/*<Moolyaselect multiSelect={false} ref={'emailIdType'+key}*/}
                                {/*placeholder="Select Email Type"*/}
                                {/*className="form-control float-label" selectedValue={options.emailIdType}*/}
                                {/*valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={emailTypeQuery}*/}
                                {/*queryOptions={emailTypeOption}*/}
                                {/*isDynamic={true}/>*/}
                  <input type="text"  ref={'name'} placeholder="Name" className="form-control float-label" defaultValue="Email Type" />
                </div>
                <div className="form-group">
                  <input type="text" ref={'emailId'+key} placeholder="Enter URL" valueKey={options.emailId} className="form-control float-label" defaultValue={options.emailId}/>
                </div>
                <div className="ml_icon_btn">
                  <a href="#" className="save_btn">
                    <span className="ml ml-save"></span>
                  </a>
                  <a href="#" className="cancel_btn">
                    <span className="ml ml-delete"></span>
                  </a>
                </div>
              </div>)
            }))}
          </div>
        </div>
      </div>
    )}
}
