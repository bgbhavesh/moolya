import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../commons/components/MlAdminSelectWrapper'
import CDNImage from "../../../../commons/components/CDNImage/CDNImage";
export default class MlContactFormComponent extends React.Component {
  constructor(props){
    super(props);
   this.state={
      contactForm:[{contactNumberType: null,countryCode:'',number:'',isOTPValidated:''}],
     isWorkEnble:true,
     isOfficeEnable:false,
    }
    this.onStatusChange = this.onStatusChange.bind(this);
    return this;
  }
  componentDidMount() {
    this.props.getAssignedContacts(this.state.contactForm);
  }
  componentWillMount(){
    let assignContactForm = this.props.contacts
    if (assignContactForm) {
      let assignContactFormDetails=[]
      for(let i=0;i<assignContactForm.length;i++){
        let json={
          contactNumberType:assignContactForm[i].contactNumberType,
          countryCode:assignContactForm[i].countryCode,
          number:assignContactForm[i].number,
          isOTPValidated:assignContactForm[i].isOTPValidated
        }
        assignContactFormDetails.push(json)
      }
      this.setState({contactForm: assignContactFormDetails});
    }
  }
    AssignDepartment(idx){
    this.setState({
      contactForm: this.state.contactForm.concat([{ contactNumberType: null,countryCode:'',number:'',isOTPValidated:''}])
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
    this.props.getAssignedContacts(assignContactForm);
  }
  optionsBySelectNumberType(index, selectedValue){
    let assignContactDetails=this.state.contactForm
    assignContactDetails[index]['contactNumberType']=selectedValue
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
      assignContactDetails[index]['number']=event.target.value
      this.setState({contactForm: assignContactDetails})
      this.props.getAssignedContacts(this.state.contactForm);
  }
  onStatusChange(index,event){
    let assignContactDetails=this.state.contactForm
    if(event.currentTarget.checked){
      assignContactDetails[index]['isOTPValidated']=true
      this.setState({contactForm:assignContactDetails})
      this.props.getAssignedContacts(this.state.contactForm);
    }else {
      assignContactDetails[index]['isOTPValidated'] =false
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
        {/*<div className="form-group"> <a onClick={that.AssignDepartment.bind(this)} className="mlUpload_btn">Assign  Contacts</a></div>*/}
        {that.state.contactForm.map(function(contactForm, idx){
          return(
            <div className="panel panel-default" key={idx}>
              <div className="panel-heading"> Contact Number Details{idx==0&& (<div className="pull-right block_action" onClick={that.AssignDepartment.bind(that)}><CDNImage src="/images/add.png"/></div>)}
                { idx>0&& (<div className="pull-right block_action" onClick={that.RemoveAssignContactForm.bind(that,idx)}><CDNImage src="/images/remove.png"/></div>)}
              </div>
              <div className="panel-body">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={contactForm.contactNumberType} placeholder="Select Contact Number Type" queryType={"graphql"} query={query}  isDynamic={true}  onSelect={that.optionsBySelectNumberType.bind(that,idx)} />
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={contactForm.countryCode} placeholder="Select Country Code" queryType={"graphql"} query={query}  isDynamic={true}  onSelect={that.optionsBySelectCountryCode.bind(that,idx)} />
                <div className="form-group">
                  <input type="text" className="form-control float-label" defaultValue={contactForm.number} placeholder="Enter Number" onBlur={that.onChangeContactNumber.bind(that,idx)} />
                </div>
                <div className="form-group switch_wrap inline_switch">
                  <label>OTP Validation</label>
                  <label className="switch">
                    <input type="checkbox"  checked={contactForm.isOTPValidated} onChange={that.onStatusChange.bind(that,idx)}/>
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

