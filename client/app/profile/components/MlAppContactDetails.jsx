/**
 * Created by viswadeep on 2/5/17.
 */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../commons/components/select/MoolyaSelect'
export default class AppContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeTab : "active"
    }
    return this;
  }
  render(){
    let that=this;
    let numberTypeQuery=gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let numberTypeOption={options: { variables: {type : "CONTACTTYPE",hierarchyRefId:"svcasvsdvdsvdsv"}}};
    return(
      <div className="panel-body">
        <div className="ml_tabs">
          <ul  className="nav nav-pills">
            <li className={this.state.activeTab}>
              <a  href="#contactA" data-toggle="tab">Add New&nbsp;<b><FontAwesome name='plus-square'/></b></a>
            </li>
            {that.state.contactNumberArray && (that.state.contactNumberArray.map(function(options,key){
              return(
                <li key={key} onClick={that.tabSelected.bind(that,key)}>
                  <a data-toggle="pill" href={'#numberType'+key} className="add-contact">
                    <FontAwesome name='minus-square'/>{options.numberTypeName}</a>
                </li>)
            }))}
          </ul>

          <div className="tab-content clearfix">
            <div className={"tab-pane"+this.state.activeTab} id="contactA">
              <div className="form-group">
                {/*<Moolyaselect multiSelect={false} ref="numberType" placeholder="Select NumberType" query={numberTypeQuery}*/}
                              {/*queryOptions={numberTypeOption} className="form-control float-label" selectedValue = {this.state.selectedNumberTypeValue}*/}
                              {/*valueKey={'value'} labelKey={'label'} queryType={"graphql"}*/}
                              {/*isDynamic={true}/>*/}
                <input type="text"  ref={'name'} placeholder="Name" className="form-control float-label" defaultValue="selectedNumberTypeValue" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Enter Country Code" defaultValue={this.state.contactNumberObject} ref={'countryCode'} className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref={"contactNumber"} placeholder="Enter Number" id="phoneNumber" className="form-control float-label"/>
              </div>
              <div className="ml_icon_btn">
                <a href="#" className="save_btn" >
                  <span className="ml ml-save"></span>
                </a>
              </div>
            </div>
            {that.state.contactNumberArray && (that.state.contactNumberArray.map(function(options,key) {
              let test = that.state.contactNumberArray;
              return(<div className="tab-pane" id={'numberType'+key} key={key} >
                <div className="form-group">
                  <Moolyaselect multiSelect={false} ref={"numberType"+key} placeholder="Select NumberType"
                                className="form-control float-label" selectedValue={options.numberType}
                                valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={numberTypeQuery}
                                queryOptions={numberTypeOption}
                                isDynamic={true}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter Country Code" ref={'countryCode'+key} defaultValue={options.countryCode} valueKey={options.countryCode}
                         className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref={'contactNumber'+key} placeholder="Enter Number" valueKey={options.contactNumber} id="phoneNumber" defaultValue={options.contactNumber}
                         className="form-control float-label"/>
                </div>
                <div className="ml_icon_btn">
                  <a href="#" className="save_btn">
                    <span className="ml ml-save"></span></a>
                  <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a>
                </div>
              </div>)
            }))}
          </div>
        </div>
      </div>
    )
  }
}
