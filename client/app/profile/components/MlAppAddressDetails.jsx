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
export default class AppAddressDetails extends React.Component {
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
    let addressTypeQuery=gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;

    let addressTypeOption={options: { variables: {type : "ADDRESSTYPE",hierarchyRefId:this.props.clusterId}}};

    return (
      <div className="panel-body">
        <div className="ml_tabs">
          <ul  className="nav nav-pills">
            <li className={this.state.activeTab}>
              <a  href="#1a" data-toggle="tab">Add New&nbsp;<b><FontAwesome name='plus-square' /></b></a>
            </li>
            {that.state.addressDetails && (that.state.addressDetails.map(function(options,key){
              return(
                <li key={key}>
                  <a data-toggle="pill" href={'#adressType'+key} className="add-contact">
                    <FontAwesome name='minus-square'/>{options.addressTypeName}</a>
                </li>)
            }))}
          </ul>
          <div className="tab-content clearfix">
            <div className={"tab-pane"+this.state.activeTab} id="1a">
              <div className="form-group">
                {/*<Moolyaselect multiSelect={false} ref={'address'}*/}
                              {/*placeholder="Select Address Type" query={addressTypeQuery} queryOptions={addressTypeOption}*/}
                              {/*className="form-control float-label" selectedValue={this.state.selectedValue}*/}
                              {/*valueKey={'value'} labelKey={'label'} queryType={"graphql"}*/}
                              {/*isDynamic={true}/>*/}
                <input type="text"  ref={'name'} placeholder="Name" className="form-control float-label" defaultValue="Names" />
              </div>
              <div className="form-group">
                <input type="text"  ref={'name'} placeholder="Name" className="form-control float-label" />
              </div>
              <div className="form-group">
                <input type="text" ref={'phoneNumber'} placeholder="Phone Number" className="form-control float-label"/>
              </div>
              <div className="form-group">
                <input type="text" ref={'addressFlat'} placeholder="Flat/House/Floor/Bulding No" className="form-control float-label"/>
              </div>
              <div className="form-group">
                <input type="text" ref={'addressLocality'} placeholder="Colony/Street/Locality" className="form-control float-label"/>
              </div>
              <div className="form-group">
                <input type="text" ref={'addressLandmark'} placeholder="Landmark" className="form-control float-label" />
              </div>
              <div className="form-group">
                <input type="text" ref={'addressArea'} placeholder="Area" className="form-control float-label"/>
              </div>
              <div className="form-group">
                <input type="text" ref={'addressCity'} placeholder="Town/City" className="form-control float-label"/>
              </div>
              <div className="form-group">
                <input type="text" ref={'addressState'} placeholder="State" className="form-control float-label"/>
              </div>
              <div className="form-group">
                <input type="text" ref={'addressCountry'} placeholder="Country" name ={'addressCountry'}
                       className="form-control float-label" />
              </div>
              <div className="form-group">
                <input type="text" ref={'addressPinCode'} placeholder="Pincode" name ={'addressPinCode'}
                       className="form-control float-label" />
              </div>
              <div className="ml_icon_btn">
                <a href="#" className="save_btn">
                  <span className="ml ml-save"></span>
                </a>
              </div>
            </div>
            {that.state.addressDetails && (that.state.addressDetails.map(function(options,key) {
              return(
                <div className="tab-pane" id={'adressType' + key} key={key}>
                  <div className="form-group">
                    {/*<Moolyaselect multiSelect={false} ref={'address' + key}*/}
                                  {/*placeholder="Select NumberType"*/}
                                  {/*className="form-control float-label" selectedValue={options.addressType}*/}
                                  {/*valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={addressTypeQuery}*/}
                                  {/*queryOptions={addressTypeOption}*/}
                                  {/*isDynamic={true}/>*/}
                    <input type="text"  ref={'name'} placeholder="Name" className="form-control float-label" defaultValue="addressType" />
                  </div>
                  <div className="form-group">
                    <input type="text" name ={'name'} ref={'name' + key} placeholder="Name"
                           className="form-control float-label" id="" defaultValue={options.name}/>
                  </div>

                  <div className="form-group">
                    <input type="text" name ={'phoneNumber'} ref={'phoneNumber' + key} placeholder="Phone Number"
                           className="form-control float-label" id="" defaultValue={options.phoneNumber} />
                  </div>
                  <div className="form-group">
                    <input type="text" ref={'addressFlat' + key} name ={'addressFlat'} className="form-control float-label"
                           placeholder="Flat/House/Floor/Bulding No" defaultValue={options.addressFlat} id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref={'addressLocality' + key} name ={'addressLocality'}
                           placeholder="Colony/Street/Loculaty" className="form-control float-label" id=""
                           defaultValue={options.addressLocality}/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref={'addressLandmark' + key} placeholder="Landmark" name ={'addressLandmark'}
                           className="form-control float-label" id="" defaultValue={options.addressLandmark}/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref={'addressArea' + key} placeholder="Area" name ={'addressArea'}
                           className="form-control float-label" id="" defaultValue={options.addressArea}/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref={'addressCity' + key} placeholder="Town/City" name ={'addressCity'}
                           className="form-control float-label" id="" defaultValue={options.addressCity}/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref={'addressState' + key} placeholder="State" name ={'addressState'}
                           className="form-control float-label" id="" defaultValue={options.addressState} />
                  </div>
                  <div className="form-group">
                    <input type="text" ref={'addressCountry' + key} placeholder="Country" name ={'addressCountry'}
                           className="form-control float-label" id="" defaultValue={options.addressCountry}/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref={'addressPinCode' + key} placeholder="Pincode" name ={'addressPinCode'}
                           className="form-control float-label" id="" valueKey={options.addressPinCode}/>
                  </div>

                  <div className="ml_icon_btn">
                    <a href="#" className="save_btn">Save</a>
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
