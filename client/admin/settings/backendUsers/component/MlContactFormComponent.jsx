import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../commons/components/MlAdminSelectWrapper';
import {findCountryCode} from "../actions/findCountryCode";
var FontAwesome = require('react-fontawesome');

export default class MlContactFormComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      contactForm:[{contactNumberType: null,countryCode:'',number:'',isOTPValidated:false}],
      isWorkEnble:true,
      isOfficeEnable:false,
      activeTab:0,
      contactForm:[]
    }
    this.onChangeNumberType =  this.onChangeNumberType.bind(this);
    this.onNumberChange =  this.onNumberChange.bind(this);
    this.tabSelected = this.tabSelected.bind(this);
    this.onDeleteContact = this.onDeleteContact.bind(this);
  }

  componentDidMount() {
    this.props.getAssignedContacts(this.state.contactForm);
    let defaultCountryCode = this.state.countryDetails && this.state.countryDetails.phoneNumberCode ? this.state.countryDetails.phoneNumberCode : "";
    this.setState({defaultCountryCode});

    this.fetchCountryCode();
  }

  componentWillMount(){
    let assignContactForm = this.props.contacts;
    if (assignContactForm && assignContactForm.length>0) {
      let contactForm=[];
      for(let i=0;i<assignContactForm.length;i++){
        let json={
          contactNumberType:assignContactForm[i].contactNumberType,
          countryCode:assignContactForm[i].countryCode,
          number:assignContactForm[i].number,
          isOTPValidated:assignContactForm[i].isOTPValidated
        }
        contactForm.push(json)
      }
      this.setState({contactForm});
    }
  }

  // AssignDepartment(idx){
  //   this.setState({
  //     contactForm: this.state.contactForm.concat([{ contactNumberType: null,countryCode:'',number:'',isOTPValidated:''}])
  //   });
  // }
  // optionsBySelectNumberType(index, selectedValue){
  //   let assignContactDetails=this.state.contactForm
  //   assignContactDetails[index]['contactNumberType']=selectedValue
  //   this.setState({contactForm:assignContactDetails})
  //   this.props.getAssignedContacts(this.state.contactForm);
  // }
  // optionsBySelectCountryCode(index, selectedValue) {
  //   let assignContactDetails = this.state.contactForm
  //   assignContactDetails[index]['countryCode'] = selectedValue
  //   this.setState({contactForm: assignContactDetails})
  //   this.props.getAssignedContacts(this.state.contactForm);
  // }

  // updateValue(that, field){
  //   let {contactForm} = that.state;
  //   contactForm[that.state.activeTab-1][field]='';
  //   that.setState({contactForm});
  // }

  async fetchCountryCode() {
    let clusterId = this.props.clusterId;
    if(clusterId){
      const response = await findCountryCode(clusterId);
      let countryPhoneCode = response && response.phoneNumberCode ? response.phoneNumberCode : "";
      this.setState({"countryPhoneCode": countryPhoneCode});
    }
  }

  addNewTab(){
    let {contactForm} = this.state;
    contactForm.push({countryCode:this.state.countryPhoneCode});
    this.setState({contactForm});
  }

  tabSelected(index){
    let {contactForm,activeTab} = this.state;
    if(index<=contactForm.length);
      this.setState({activeTab:index});
  }

  onDeleteContact(index){
    let {contactForm,activeTab} = this.state;
    contactForm.splice(index,1);
    this.setState({contactForm,activeTab:0});
    this.props.getAssignedContacts(contactForm);
  }

  onChangeNumberType(value,handler,selectedObj){
    let {contactForm} = this.state;
    if(this.state.activeTab>0){
      contactForm[this.state.activeTab-1].contactNumberType = value;
      this.setState({contactForm});
      this.props.getAssignedContacts(contactForm);
    }
  }

  onNumberChange(value){
    let {contactForm} = this.state;
    if(this.state.activeTab>0){
      contactForm[this.state.activeTab-1].number = value;
      this.setState({contactForm});
      this.props.getAssignedContacts(contactForm);
    }
  }

  onChangeOPTValidation(value){
    let {contactForm} = this.state;
    if(this.state.activeTab>0){
      contactForm[this.state.activeTab-1].isOTPValidated = value;
      this.setState({contactForm});
      this.props.getAssignedContacts(contactForm);
    }
  }

  render() {
    let query=gql` query{
      data:fetchCountriesSearch{label:country,value:countryCode}
    }
    `;

    let that = this;
    let contactForm ={};
    if(this.state.activeTab>0){
      contactForm = this.state.contactForm[this.state.activeTab-1];
      if(!contactForm || contactForm.length===0){
        contactForm={};
      }
    }

    let numberTypeQuery = gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
        label
        value
      }
     }
     `;

    let numberTypeOption = {options: {variables: {type: "CONTACTTYPE"}}};
    let clusterId = this.props.clusterId;
    if(clusterId){
      numberTypeOption.options.variables.hierarchyRefId = clusterId;
    }
    let countryPhoneCode = that.state.countryPhoneCode;
    console.log('contactForm=',this.state.contactForm);
    console.log('activeTab=',this.state.activeTab);

    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-heading"> Contact Number Details</div>
          <div className="panel-body">
            <ul className="nav nav-pills">
              <li className={that.state.activeTab ===0?'active':''}>
                <a><span onClick={e=>that.tabSelected(0)}>Add New&nbsp;</span><b>
                  <FontAwesome onClick={that.addNewTab.bind(that)} name='plus-square'/></b></a>
              </li>

              {that.state.contactForm && that.state.contactForm.length && (that.state.contactForm.map(function (options, key) {

                return (
                  <li key={key+1} className={that.state.activeTab ===key+1?'active':''}>
                    <a  className="add-contact"><FontAwesome name='minus-square' onClick={e=>that.onDeleteContact(key)}
                      /><span onClick={e=>that.tabSelected(key+1)}>{'New' || options.contactNumberType}</span></a>
                  </li>)
              }))}
            </ul><br/>
            {clusterId && <Moolyaselect multiSelect={false} valueKey={'value'} className="form-control float-label"
                          placeholder="Select NumberType" selectedValue = {(that.state.activeTab>0)?contactForm.contactNumberType:''}
                          queryType={"graphql"} query={numberTypeQuery} isDynamic={true} labelKey={'label'}
                          queryOptions={numberTypeOption} onSelect={that.onChangeNumberType}
                          data-required={true} data-errMsg="Number Type is required"  mandatory={true}
            />}

            <div className="form-group">
              <input type="text" placeholder="Enter Country Code"
                     value={(that.state.activeTab>0)?(contactForm.countryCode || countryPhoneCode):countryPhoneCode}
                     className="form-control float-label" disabled={true} />
            </div>

            <div className="form-group mandatory">
              <input type="text" placeholder="Enter Number" id="phoneNumber"
                     value={(that.state.activeTab>0)? contactForm.number:""}
                     onChange={e=>that.onNumberChange(e.target.value)}
                     className="form-control float-label" data-required={true} data-errMsg="Number is required"/>
            </div>

            <div className="form-group switch_wrap inline_switch">
              <label>OTP Validation</label>
              <label className="switch">
                <input type="checkbox"  checked={ (that.state.activeTab>0)?(contactForm.isOTPValidated || false):false}
                       onChange={e=>that.onChangeOPTValidation(e.target.checked)}
                />
                <div className="slider"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

    )
  }
};

