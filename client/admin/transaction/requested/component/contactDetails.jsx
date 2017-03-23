import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import  Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {addRegistrationStep3Details} from '../actions/addRegistrationStep3DetailsAction';
import {findUserRegistartionActionHandler} from '../actions/findUserRegistrationDocument'
import {findRegistrationActionHandler} from '../actions/findRegistration';
import {updateRegistrationInfoDetails} from '../actions/updateRegistration';
import update from 'immutability-helper';

export default class ContactDetails extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedNumberTypeValue : null,
      selectedContactTab: null,
      selectedNumberTypeLabel: null,
      contactNumberObject:{numberType : "",numberTypeName: "",countryCode: "",contactNumber: ""},
      contactNumberArray : this.props.registrationInfo.contactInfo || []

    }
    this.findRegistration.bind(this);
    return this;
  }

  componentDidMount(){

    $("#cancel_contact").click(function(e) {
      e.preventDefault();
      $(this).closest('.tab-pane').find("input").val("");
      $(this).closest('.tab-pane').find("select").val("default");
    });
  }
  componentWillUpdate(nextProps, nextState) {
   /*  console.log("Component Will Update");
    console.log(nextState);
    this.setState({contactNumber:nextState.contactNumber})*/
  }
  updateContactOptions(index, did, selectedValue, selObject,callback){
    if (index !== -1) {
      // do your stuff here
      let updatedComment = update(this.state.contactNumberArray[index], {
        numberTypeName : {$set: selObject.label},
        numberType :   {$set: did},
        countryCode : {$set: this.refs["countryCode"+index].value},
        contactNumber : {$set: this.refs["contactNumber"+index].value}});

      let newData = update(this.state.contactNumberArray, {
        $splice: [[index, 1, updatedComment]]
      });
      this.setState({contactNumberArray : newData,selectedNumberTypeValue : did,selectedNumberTypeLabel : selObject.label});

    }
  }
   async onSavingContact(index,value){
     let detailsType = "CONTACTTYPE";
     let registerid = this.props.registerId;

      let contactList = this.state.contactNumberObject;
        contactList.numberType = this.state.selectedNumberTypeValue,
        contactList.numberTypeName = this.state.selectedNumberTypeLabel,
        contactList.countryCode = this.refs["countryCode"].value,
        contactList.contactNumber = this.refs["contactNumber"].value;
      const response = await addRegistrationStep3Details(contactList,detailsType,registerid);
      if(response){
        //this.props.getRegistrationSocialLinks();
        this.findRegistration();
      }


  }
  async onEditingContact(index,value){
    let detailsType = "CONTACTTYPE";
    let registerid = this.props.registerId;
      let updatedComment = update(this.state.contactNumberArray[index], {
        numberTypeName : {$set: this.state.selectedNumberTypeLabel},
        numberType :   {$set: this.state.selectedNumberTypeValue},
        countryCode : {$set: this.refs["countryCode"+index].value},
        contactNumber : {$set: this.refs["contactNumber"+index].value}});

      let newData = update(this.state.contactNumberArray, {
        $splice: [[index, 1, updatedComment]]
      });
      const response = await updateRegistrationInfoDetails(newData,detailsType,registerid);
      if(response){
        this.findRegistration();

      }


  }
  async findRegistration(){
    let registrationId=this.props.registerId;

    const response = await findRegistrationActionHandler(registrationId);

    this.setState({loading:false,contactNumberArray:response.contactInfo});
    //this.setState({'isMoolyaChecked':this.state.data&&this.state.data.isMoolya})
    //return response;
  }
  tabSelected(index,value){
    this.setState({selectedContactTab : true});
    this.findRegistration();
  }



  optionsBySelectNumberType(selectedIndex,handler,selectedObj){
    this.setState({selectedNumberTypeValue : selectedIndex,selectedNumberTypeLabel:selectedObj.label});
  }
  async onDeleteEmail(index,value){
    let listArray = this.state.contactNumberArray;
    delete listArray[index];
    this.setState({loading:false,contactNumberArray:listArray});
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

     let numberTypeOption={options: { variables: {type : "CONTACTTYPE",hierarchyRefId:"vsraSG7GeWZRdXkF9"}}};


    return (

      <div className="panel-body">
        {/*div className="ml_tabs">
          <ul className="nav nav-pills">
            <li className="active"> <a href="#1a" data-toggle="tab">Add New&nbsp;<b><FontAwesome name='minus-square'/></b></a> </li>

            {that.state.contactNumberArray.map(function(options,key){
            return(
            <li  onClick={that.tabSelected.bind(that,key)}>
              <a data-toggle="pill" href={'numberType'+key} className="add-contact">
                <FontAwesome name='plus-square' />{options.numberTypeName}</a>
            </li>)
            })}

          </ul>
          <div className="tab-content clearfix">

            <div className="tab-pane active" id="1a">
              <div className="form-group">

                <Moolyaselect multiSelect={false} ref="numberType" placeholder="Select NumberType"
                              className="form-control float-label" selectedValue = {selectedNumId}
                              valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={numberTypeQuery}
                              queryOptions={numberTypeOption} onSelect={this.optionsBySelectNumberType.bind(this)}
                              isDynamic={true}/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Enter Country Code" ref={'contryCode'} className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="{phoneNumber}" placeholder="Enter Number" id="phoneNumber" className="form-control float-label"/>
              </div>
              <div className="ml_icon_btn">
                <a href="#"  onClick={this.onSavingContact.bind(this)}  className="save_btn" ><span
                  className="ml ml-save"></span></a>
                <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a>
              </div>
            </div>
            {that.state.contactNumberArray.map(function(options,key) {
              return (<div className="tab-pane active" id={"numberType"+key}>
                <div className="form-group">

                  <Moolyaselect multiSelect={false} ref={"numberType"+key} placeholder="Select NumberType"
                                className="form-control float-label" selectedValue={selectedNumId}
                                valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={numberTypeQuery}
                                queryOptions={numberTypeOption} onSelect={that.updateContactOptions.bind(that,key)}
                                isDynamic={true}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter Country Code" ref={'contryCode'+key}
                         className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref={'phoneNumber'+key} placeholder="Enter Number" id="phoneNumber"
                         className="form-control float-label"/>
                </div>
                <div className="ml_icon_btn">
                  <a href="#" onClick={that.onSavingContact.bind(that,key)} className="save_btn"><span
                    className="ml ml-save"></span></a>
                  <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a>
                </div>
              </div>)
            })}*/}
        <div className="ml_tabs">
          <ul  className="nav nav-pills">
            <li className="active">
              <a  href="#contactA" data-toggle="tab">Add New&nbsp;<b><FontAwesome name='minus-square'/></b></a>
            </li>
            {that.state.contactNumberArray.map(function(options,key){

              return(
                <li key={key} onClick={that.tabSelected.bind(that,key)}>
                  <a data-toggle="pill" href={'#numberType'+key} className="add-contact">
                    <FontAwesome name='plus-square' />{options.numberTypeName}</a>
                </li>)


            })}
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active" id="contactA">
              <div className="form-group">
                <Moolyaselect multiSelect={false} ref="numberType" placeholder="Select NumberType"
                              className="form-control float-label" selectedValue = {this.state.selectedNumberTypeValue}
                              valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={numberTypeQuery}
                              queryOptions={numberTypeOption} onSelect={this.optionsBySelectNumberType.bind(this)}
                              isDynamic={true}/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Enter Country Code" ref={'countryCode'} className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref={"contactNumber"} placeholder="Enter Number" id="phoneNumber" className="form-control float-label"/>
              </div>
              <div className="ml_icon_btn">
                <a href="#"  onClick={this.onSavingContact.bind(this)}  className="save_btn" ><span
                  className="ml ml-save"></span></a>
                <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a>
              </div>
            </div>
            {that.state.contactNumberArray.map(function(options,key) {
              return(<div className="tab-pane" id={'numberType'+key} >
                <div className="form-group">
                  <Moolyaselect multiSelect={false} ref={"numberType"+key} placeholder="Select NumberType"
                                className="form-control float-label" selectedValue={options.numberType}
                                valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={numberTypeQuery}
                                queryOptions={numberTypeOption} onSelect={that.updateContactOptions.bind(that,key)}
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
                  <a href="#" onClick={that.onEditingContact.bind(that,key)} className="save_btn"><span
                    className="ml ml-save"></span></a>
                  <a href="#" id="cancel_contact" className="cancel_btn" onClick={that.onDeleteEmail.bind(that,key)} ><span className="ml ml-delete"></span></a>
                </div>
              </div>)
            })}

          </div>
        </div>
      </div>
    )}
}
