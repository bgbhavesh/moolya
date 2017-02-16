import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
export default class MlContactFormComponent extends React.Component {
  constructor(props){
    super(props);
   this.state={
      contactForm:[{numberType: null,countryCode:'',contactNumber:'',otpStatus:false}],
     isWorkEnble:true,
     isOfficeEnable:false,
    }
    return this;
  }
  AssignDepartment(idx){
    this.setState({
      contactForm: this.state.contactForm.concat([{ numberType: null,countryCode:null,contactNumber:'',otpStatus:false}])
    });
  }
  RemoveAssignContactForm(idx,event){
    let assignContactForm;
    assignContactForm= this.state.contactForm.filter(function(object,index){
      return idx !== index;
    });
    this.setState({
      contactForm: assignContactForm
    })
  }
  optionsBySelectNumberType(index, selectedValue){
    let assignContactDetails=this.state.contactForm
    assignContactDetails[index]['numberType']=selectedValue
    this.setState({contactForm:assignContactDetails})
    this.props.getAssignedContacts(this.state.contactForm);
  }
  optionsBySelectCountryCode(index, selectedValue) {
    let assignContactDetails = this.state.contactForm
    assignContactDetails[index]['countryCode'] = selectedValue
    this.setState({contactForm: assignContactDetails})
    this.props.getAssignedContacts(this.state.contactForm);
  }
  onChangeContactNumber(index,event){
    let assignContactDetails=this.state.contactForm
      assignContactDetails[index]['contactNumber']=event.target.value
      this.setState({contactForm: assignContactDetails})
      this.props.getAssignedContacts(this.state.contactForm);
  }
  onStatusChange(index,event){
    let assignContactDetails=this.state.contactForm
    if(event.currentTarget.checked){
      assignContactDetails[index]['otpStatus']=true
      this.setState({contactForm:assignContactDetails})
      this.props.getAssignedContacts(this.state.contactForm);
    }else {
      assignContactDetails[index]['otpStatus'] = false
      this.setState({contactForm: assignContactDetails})
      this.props.getAssignedContacts(this.state.contactForm);
    }
  }
  render() {
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;
    let that = this;
    return(
      <div>
        <div className="form-group"> <a onClick={that.AssignDepartment.bind(this)} className="mlUpload_btn">Assign  Contacts</a></div>
        {that.state.contactForm.map(function(contactForm, idx){
          return(
            <div className="panel panel-default" key={idx}>
              <div className="panel-heading"> Assign Contacts
                <div className="pull-right block_action" onClick={that.RemoveAssignContactForm.bind(that,idx)}><img src="/images/remove.png"/></div>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={contactForm.numberType} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={that.optionsBySelectNumberType.bind(that,idx)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={contactForm.countryCode} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={that.optionsBySelectCountryCode.bind(that,idx)} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control float-label" placeholder="Enter Number" onBlur={that.onChangeContactNumber.bind(that,idx)} />
                </div>
                <div className="form-group switch_wrap inline_switch">
                  <label>OTP Validation</label>
                  <label className="switch">
                    <input type="checkbox" checked={contactForm.otpStatus} onChange={that.onStatusChange.bind(that,idx)}/>
                    <div className="slider"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        )}
      </div>

    )
  }
};

