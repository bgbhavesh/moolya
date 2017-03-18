import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

export default class Step2 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedUserType:null,
      selectedHeadquarter:null,
      selectedBranches:null,
      selectedLookingFor:null,
      selectedTypeOfCompany:null,
      selectedTypeOfEntity:null,
      selectedTypeOfBusiness:null,
      selectedTypeOfIndustry:null,
      selectedSubDomain:null,
      selectedStageOfCompany:null,
      selectedSubsidaryComapny:null,
      selectedInstitutionType:null

    };
    return this;
  }

  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }
  optionsBySelectUserType(value){
    this.setState({selectedUserType:value})
  }
  optionsBySelectHeadquarter(value){
    this.setState({selectedHeadquarter:value})
  }
  optionsBySelectBranch(value){
    this.setState({selectedBranches:value})
  }
  optionsBySelectLookingFor(value){
    this.setState({selectedLookingFor:value})
  }
  optionsBySelectTypeOfCompany(value){
    this.setState({selectedTypeOfCompany:value})
  }
  optionsBySelectTypeOfEntity(value){
    this.setState({selectedTypeOfEntity:value})
  }
  optionsBySelectTypeOfBusiness(value){
    this.setState({selectedTypeOfBusiness:value})
  }
  optionsBySelectTypeOfIndustry(value){
    this.setState({selectedTypeOfIndustry:value})
  }
  optionsBySelectSubDomain(value){
    this.setState({selectedSubDomain:value})
  }
  optionsBySelectStageOfCompany(value){
    this.setState({selectedStageOfCompany:value})
  }
  optionsBySelectSubsidaryComapny(value){
    this.setState({selectedSubsidaryComapny:value})
  }
  optionsBySelectInstitutionType(value){
    this.setState({selectedInstitutionType:value})
  }

  render(){
    let that=this;

    let subsidary = [
      {value: 'Yes', label: 'Yes' , clearableValue: true},
      {value: 'No', label: 'No',clearableValue: true}
    ];

    let businesstypesquery=gql` query{
    data:fetchBusinessTypes{label:businessTypeName,value:_id}
    }
`;
    let companytypesquery=gql` query{
    data:fetchCompanyTypes{label:companyName,value:_id}
    }
`;

    let userTypequery = gql`query{
  data:FetchUserType {label:userTypeName,value:_id
  }
}
`;
    let citiesquery = gql`query{
  data:fetchCities {label:name,value:_id
  }
}
`;
    let entitiesquery = gql`query{
  data:fetchEntities {label:entityName,value:_id
  }
}
`;
    let industriesquery=gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }
    `;
    let lookinforquery=gql` query{
    data:fetchStageOfCompany{label:lookingForName,value:_id}
    }
`;
    let stageofcompquery=gql` query{
    data:fetchStageOfCompany{label:stageOfCompanyName,value:_id}
    }
`;
    return (
      <div className="step_form_wrap step2">
      <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
<div className="col-md-6 nopadding-left">
          <div className="form_bg">
              <form>
            <div className="form-group">
              <input type="text" placeholder="Date & Time" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Request id" className="form-control float-label" id=""/>
            </div>
            <div className="ml_tabs">
                      <ul  className="nav nav-pills">
                        <li className="active">
                          <a  href="#3a" data-toggle="tab">Individual&nbsp;</a>
                        </li>
                        <li>
                          <a href="#4a" data-toggle="tab">Company&nbsp;</a>
                        </li>

                      </ul>

                    </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="select user category" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedUserType} queryType={"graphql"} query={userTypequery} onSelect={that.optionsBySelectUserType.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Company name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Group name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Company website" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Comapany email" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Foundation date" className="form-control float-label" id=""/>
              <FontAwesome name="calendar" className="password_icon"/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Headquarter Location" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedHeadquarter} queryType={"graphql"} query={citiesquery} onSelect={that.optionsBySelectHeadquarter.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={true} placeholder="Branch Location" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedBranches} queryType={"graphql"} query={citiesquery} onSelect={that.optionsBySelectBranch.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
                  <input type="text" placeholder="ISO certification number" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
                  <input type="text" placeholder="Comapany turnover" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
                  <input type="text" placeholder="Partners" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
                  <input type="text" placeholder="Investors" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
                  <Moolyaselect multiSelect={false} placeholder="Looking For" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedLookingFor} queryType={"graphql"} query={lookinforquery} onSelect={that.optionsBySelectLookingFor.bind(this)} isDynamic={true}/>
            </div>
                Institution

                <div className="form-group">
                  <Moolyaselect multiSelect={false} placeholder="select user category" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedUserType} queryType={"graphql"} query={userTypequery} onSelect={that.optionsBySelectUserType.bind(this)} isDynamic={true}/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="Select institution Type" options={institutionTypes} selectedValue={this.state.selectedInstitutionType} onSelect={that.optionsBySelectInstitutionType.bind(this)}  className="float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Institution " className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Investors" className="form-control float-label" id=""/>
                </div>

          </form>
          </div>
    </div>
    <div className="col-md-6 nopadding-right">
    <div className="form_bg">
    <form>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Select Type of Company" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfCompany} queryType={"graphql"} query={companytypesquery} onSelect={that.optionsBySelectTypeOfCompany.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Select Type of Entity" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfEntity} queryType={"graphql"} query={entitiesquery} onSelect={that.optionsBySelectTypeOfEntity.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Select Type of Business" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfBusiness} queryType={"graphql"} query={businesstypesquery} onSelect={that.optionsBySelectTypeOfBusiness.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Select Type Of Industry" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfIndustry} queryType={"graphql"} query={industriesquery} onSelect={that.optionsBySelectTypeOfIndustry.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Select Subdomain" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedSubDomain} queryType={"graphql"} query={industriesquery} onSelect={that.optionsBySelectStageOfCompany.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Select Stage Of Company" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedStageOfCompany} queryType={"graphql"} query={stageofcompquery} onSelect={that.optionsBySelectStageOfCompany.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <Select name="form-field-name" placeholder="Select Subsidary Company" options={subsidary} selectedValue={this.state.selectedSubsidaryComapny} onSelect={that.optionsBySelectSubsidaryComapny.bind(this)}  className="float-label"/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Enter Holding/Group/Owner Company Name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Registration number" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="CEO name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Total number of management people" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Total number of employee" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Associate company" className="form-control float-label" id=""/>
            </div>

</form>
      </div>
    </div>
    </ScrollArea>
      </div>
    )
  }
};
