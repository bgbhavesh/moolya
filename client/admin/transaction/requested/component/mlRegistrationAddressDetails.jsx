import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import  Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect';
import {addRegistrationStep3Details} from '../actions/addRegistrationStep3DetailsAction';
import {findUserRegistartionActionHandler} from '../actions/findUserRegistrationDocument'
import {findRegistrationActionHandler} from '../actions/findRegistration';
import {updateRegistrationInfoDetails} from '../actions/updateRegistration'
import update from 'immutability-helper';

export default class AddressDetails extends React.Component{
  constructor(props){
    super(props);
    let addressInfoObject = {"addressType" : " ","addressTypeName": "Add New",'name' : '','phoneNumber' : '','addressFlat' : '',
      'addressLocality': '','addressLandmark':'','addressArea': '',
      'addressCity': '','addressState':'','addressCountry':'','addressPinCode':''}
    this.state={
      loading:true,
      selectedTab : null,
      selectedAddressLabel : " ",
      selectedValue : null,
      /* selectedValuesList : [],*/
      addressInformation : addressInfoObject,
      addressDetails: this.props.registrationInfo.addressInfo || []

    }
    //this.optionsBySelectNumberType.bind(this)
    this.findRegistration.bind(this)
    return this;
  }


  optionsBySelectAddressType(selectedIndex,handler,selectedObj){
    this.setState({selectedValue : selectedIndex,selectedAddressLabel:selectedObj.label});
  }
  updateOptions(index, did, selectedValue, selObject,callback){
    /* let selectedSocialLinkArray =  this.state.socialLinkArray || []
     let selectedArrayObject = selectedSocialLinkArray[index] || {};
     selectedArrayObject =  JSON.parse(JSON.stringify(selectedArrayObject));*/
    if (index !== -1) {
      // do your stuff here

      let updatedComment = update(this.state.addressDetails[index], {
        addressTypeName : {$set: selObject.label},
        addressType : {$set: did},
        name : {$set: this.refs["name"+index].value},
        phoneNumber : {$set: this.refs["phoneNumber"+index].value},
        addressFlat : {$set: this.refs["addressFlat"+index].value},
        addressLocality : {$set: this.refs["addressLocality"+index].value},
        addressLandmark : {$set: this.refs["addressLandmark"+index].value},
        addressArea : {$set: this.refs["addressArea"+index].value},
        addressCity : {$set: this.refs["addressCity"+index].value},
        addressState : {$set: this.refs["addressState"+index].value},
        addressCountry : {$set: this.refs["addressCountry"+index].value},
        addressPinCode : {$set: this.refs["addressPinCode"+index].value}
      });

      let newData = update(this.state.addressDetails, {
        $splice: [[index, 1, updatedComment]]
      });



    }

  }
  addressTabSelected(index,value){
    this.setState({selectedTab : true});
  }



  async onDeleteAddress(index,value){

    let listArray = update(this.state.addressDetails, {
      $splice: [[index, 1]]
    });
    let detailsType = "ADDRESSTYPE";
    let registerid = this.props.registerId;
    const response = await updateRegistrationInfoDetails(listArray,detailsType,registerid);
    this.setState({loading:false,addressDetails:response.addressInfo});

  }


  async onSavingAddress(index,value){
    const detailsType = "ADDRESSTYPE";
    const registerid = this.props.registerId;

    let addressDetailsObject = this.state.addressInformation;
      addressDetailsObject.addressType = this.state.selectedValue,
      addressDetailsObject.addressTypeName = this.state.selectedAddressLabel,
      addressDetailsObject.name = this.refs["name"].value,
      addressDetailsObject.phoneNumber = this.refs["phoneNumber"].value,
      addressDetailsObject.addressFlat = this.refs["addressFlat"].value,
      addressDetailsObject.addressLocality = this.refs["addressLocality"].value,
      addressDetailsObject.addressLandmark = this.refs["addressLandmark"].value,
      addressDetailsObject.addressArea = this.refs["addressArea"].value,
      addressDetailsObject.addressCity = this.refs["addressCity"].value,
      addressDetailsObject.addressState = this.refs["addressState"].value,
      addressDetailsObject.addressCountry =  this.refs["addressCountry"].value,
      addressDetailsObject.addressPinCode = this.refs["addressPinCode"].value;
      const response = await addRegistrationStep3Details(addressDetailsObject,detailsType,registerid);
      if(response){
        //this.props.getRegistrationContactInfo();
        if(!response.success){
          toastr.error(response.result);
          this.findRegistration();
        }else{
          this.findRegistration();
          this.refs["name"].value=""
          this.refs["phoneNumber"].value = "";
          this.refs["addressFlat"].value = "";
          this.refs["addressLocality"].value="";
          this.refs["addressLandmark"].value="";
          this.refs["addressArea"].value = "";
          this.refs["addressCity"].value = "";
          this.refs["addressState"].value = "";
          this.refs["addressCountry"].value = "";
          this.refs["addressPinCode"].value = "";
          this.setState({selectedValue : "",selectedAddressLabel : ""});
        }


      }


  }

  async onEditAddress(index,value){
    const detailsType = "ADDRESSTYPE";
    const registerid = this.props.registerId;
    if (index !== -1) {
      // do your stuff here
      let registrationDetails = this.props.registrationInfo.addressInfo
      let dbData = _.pluck(registrationDetails, 'addressType') || [];
      let contactExist = null;
      if(this.state.selectedValue){
        contactExist = _.contains(dbData,this.state.selectedValue );
      }
      if(contactExist){
        toastr.error("Address Type Already Exists!!!!!");
        this.findRegistration();
      }else{
        let updatedComment = update(this.state.addressDetails[index], {
          addressTypeName : {$set: this.state.selectedAddressLabel},
          addressType : {$set: this.state.selectedValue},
          name : {$set: this.refs["name"+index].value},
          phoneNumber : {$set: this.refs["phoneNumber"+index].value},
          addressFlat : {$set: this.refs["addressFlat"+index].value},
          addressLocality : {$set: this.refs["addressLocality"+index].value},
          addressLandmark : {$set: this.refs["addressLandmark"+index].value},
          addressArea : {$set: this.refs["addressArea"+index].value},
          addressCity : {$set: this.refs["addressCity"+index].value},
          addressState : {$set: this.refs["addressState"+index].value},
          addressCountry : {$set: this.refs["addressCountry"+index].value},
          addressPinCode : {$set: this.refs["addressPinCode"+index].value}
        });

        let newData = update(this.state.addressDetails, {
          $splice: [[index, 1, updatedComment]]
        });


        const response = await updateRegistrationInfoDetails(newData,detailsType,registerid);
        if(response){
          if(!response.success){
            toastr.error(response.result);
          }
          this.findRegistration();

        }
      }


    }
  }

  async findRegistration(){
    let registrationId=this.props.registerId;

    const response = await findRegistrationActionHandler(registrationId);

    this.setState({loading:false,addressDetails:response.addressInfo});
     //this.setState({'isMoolyaChecked':this.state.data&&this.state.data.isMoolya})
    //return response;
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
             <li className="active">
                <a  href="#1a" data-toggle="tab">New Tab&nbsp;<b><FontAwesome name='minus-square'/></b></a>
             </li>
            {that.state.addressDetails.map(function(options,key){

              return(
                <li key={key} onClick={that.addressTabSelected.bind(that,key)}>
                  <a data-toggle="pill" href={'#adressType'+key} className="add-contact">
                    <FontAwesome name='plus-square' />{options.addressTypeName}</a>
                </li>)


            })}
          </ul>

          <div className="tab-content clearfix">

              <div className="tab-pane active" id="1a">
                <div className="form-group">
                  <Moolyaselect multiSelect={false} ref={'address'}
                                placeholder="Select Address Type"
                                className="form-control float-label" selectedValue={this.state.selectedValue}
                                valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={addressTypeQuery}
                                queryOptions={addressTypeOption} onSelect={this.optionsBySelectAddressType.bind(this)}
                                isDynamic={true}/>
                </div>
                <div className="form-group">
                  <input type="text"  ref={'name'} placeholder="Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref={'phoneNumber'} placeholder="Phone Number" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" ref={'addressFlat'} placeholder="Flat/House/Floor/Bulding No" className="form-control float-label" id="" a/>
                </div>
                <div className="form-group">
                  <input type="text" ref={'addressLocality'} placeholder="Colony/Street/Loculaty" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" ref={'addressLandmark'} placeholder="Landmark" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" ref={'addressArea'} placeholder="Area" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" ref={'addressCity'} placeholder="Town/City" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" ref={'addressState'} placeholder="State" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" ref={'addressCountry'} placeholder="Country" name ={'addressCountry'}
                         className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" ref={'addressPinCode'} placeholder="Pincode" name ={'addressPinCode'}
                         className="form-control float-label" id="" />
                </div>
                <div className="ml_btn">
                  <a href="#" className="save_btn" onClick={this.onSavingAddress.bind(this)}><span
                    className="ml ml-save"></span></a>
                </div>
              </div>




            {that.state.addressDetails.map(function(options,key) {

              return(
                <div className="tab-pane" id={'adressType' + key}>
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} ref={'address' + key}
                                  placeholder="Select NumberType"
                                  className="form-control float-label" selectedValue={options.addressType}
                                  valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={addressTypeQuery}
                                  queryOptions={addressTypeOption} onSelect={that.updateOptions.bind(that,key)}
                                  isDynamic={true}/>
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

                  <div className="ml_btn">
                    {/*<a href="#" className="save_btn">Save</a>*/}
                    <a href="#" onClick={that.onEditAddress.bind(that,key)}
                       className="save_btn"><span
                      className="ml ml-save"></span></a>
                    <a href="#" className="cancel_btn" onClick={that.onDeleteAddress.bind(that,key)}><span className="ml ml-delete"></span></a>
                  </div>
                </div>)
            })}
          </div>

        </div>
      </div>
    )}
}
