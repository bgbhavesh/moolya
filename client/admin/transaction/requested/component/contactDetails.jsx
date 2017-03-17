import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import  Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

export default class ContactDetails extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedValue : null,
      selectedCountryCode : null,
      selectedTab : null,
      enteredPhoneNum: null,
      contactNumber:[{"numberTypeName" : "Add New",'countryCode' : '','contactNumber' : ''}],

    }
    return this;
  }
  componentDidMount(){
 /*   $('#save_contact').click(function(e){
      e.preventDefault();
      var numType = $('#numberType').val();
      var ConCode = $('#contryCode').val();
      var phoneNum = $('#phoneNumber').val();
      var id = $(this).parents(".tab-content").prev('ul').children().length; //think about it ;)
      var tabId = 'contact_' + id;
      $(this).parents(".tab-content").prev('.nav-pills').append('<li>' +
        '<a data-toggle="pill" href="#contact_' + id + '"><span class="fa fa-minus-square-o"></span>&nbsp'+numType+'</a> </li>');
      $(this).parents(".tab-content").append('<div class="tab-pane" id="' + tabId + '"><div class="form-group"><select class="form-control" id="numberType"><option>Number Type</option> <option value="Home">Home</option> <option value="Work">Work</option> <option value="Other">Other</option> </select></div><div class="form-group"> <input type="text" placeholder="Country Code" id="contryCode" value="'+ConCode+'" class="form-control float-label" id="" /> </div> <div class="form-group"> <input type="text" placeholder="Enter Number" value="'+phoneNum+'" id="phoneNumber" class="form-control float-label" id="" /> </div> <div class="ml_icon_btn"> <a href="#" id="save_contact" class="save_btn"><span class="ml ml-save"></span></a> <a href="#" id="cancel_contact" class="cancel_btn"><span class="ml ml-delete"></span></a> </div> </div>');
      $("#"+tabId).find('select').val(numType);
      $(this).parents(".tab-content").prev('.nav-pills').find('li:last-of-type a').click();
      $('.float-label').jvFloat();
      //$("#new #cancel_contact").click();
      $('.tab-content #new').find('input').val('');
      $('.tab-content #new').find('select').val('default');
      $("#new select option[id='"+numType+"']").remove();
    });*/
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
   onSavingContact(value){
    let contactDetails=this.state.contactNumber
     console.log("////////////////////////////////////////");
     console.log(this.refs.phoneNumber.value);
     this.setState({enteredPhoneNum : this.refs.phoneNumber.value});
     contactDetails.push({'numberTypeName' : this.state.selectedValue,'countryCode' : this.state.selectedCountryCode,'contactNumber' : this.state.phoneNumber});
     let step3ContactDetails = {
       numberType: this.state.selectedValue,
       countryCode: this.state.selectedCountryCode,
       contactNumber: this.state.phoneNumber
     }
     const response = addRegistrationContactDetails(step3ContactDetails);
     this.setState({contactNumber: contactDetails});
     this.setState({selectedValue : ""});
     this.setState({selectedCountryCode: ""});
     this.setState({enteredPhoneNum : ""});

  }
  tabSelected(index,value){
    this.setState({selectedTab : index});
  }

  optionsBySelectNumberType(selectedIndex){
    this.setState({selectedValue : selectedIndex})
  }
  optionsBySelectCountryCode(selectedIndex){
    this.setState({selectedCountryCode : selectedIndex})
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
     let selectedNumType = this.state.selectedTab;
     let selectedNumId = "";
     let selectedCountryId = "";
    let enteredPhoneNumber = "";

    if(selectedNumType > 0){
      selectedNumId = this.state.contactNumber[selectedNumType].numberTypeName || "";
      selectedCountryId = this.state.contactNumber[selectedNumType].countryCode || "";
      enteredPhoneNumber = this.state.contactNumber[selectedNumType].contactNumber || "";
    }else{
      selectedNumId = this.state.selectedValue || "";
      selectedCountryId = this.state.selectedCountryCode || "";
      enteredPhoneNumber = this.state.enteredPhoneNum || "";
    }


    return (

      <div className="panel-body">
        <div className="ml_tabs">
          <ul className="nav nav-pills">
            {/*/!*<li className="active"> <a href="#1a" data-toggle="tab">Home&nbsp;<b><FontAwesome name='minus-square'/></b></a> </li>
             <li> <a href="#2a" data-toggle="tab">Office&nbsp;<b><FontAwesome name='minus-square'/></b></a> </li>*!/*/}
            {that.state.contactNumber.map(function(options,key){
            return(
            <li  onClick={that.tabSelected.bind(that,key)}>
              <a data-toggle="pill" href={'numberType'+key} className="add-contact">
                <FontAwesome name='plus-square' />{options.numberTypeName}</a>
            </li>)


            })}

          </ul>
          <div className="tab-content clearfix">

            <div className="tab-pane active" id={'numberType'+this.state.selectedTab}>
              <div className="form-group">

                <Moolyaselect multiSelect={false} ref="numberType" placeholder="Select NumberType"
                              className="form-control float-label" selectedValue = {selectedNumId}
                              valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={numberTypeQuery}
                              queryOptions={numberTypeOption} onSelect={this.optionsBySelectNumberType.bind(this)}
                              isDynamic={true}/>
              </div>
              <div className="form-group">
               {/* <input type="text" placeholder="Country Code" id="contryCode" className="form-control float-label"/>*/}
                <Moolyaselect multiSelect={false} ref="countryCode" placeholder="Select Country Code"
                              className="form-control float-label" selectedValue = {selectedCountryId}
                              valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={numberTypeQuery}
                              queryOptions={numberTypeOption} onSelect={this.optionsBySelectCountryCode.bind(this)}
                              isDynamic={true}/>
              </div>
              <div className="form-group">
                <input type="text" ref="phoneNumber" placeholder="Enter Number" id="phoneNumber" valueKey={enteredPhoneNumber} className="form-control float-label"/>
              </div>
              <div className="ml_icon_btn">
                <a href="#"  onClick={this.onSavingContact.bind(this)}  className="save_btn" ><span
                  className="ml ml-save"></span></a>
                <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a>
              </div>
            </div>

          </div>
        </div>
      </div>
    )}
}
