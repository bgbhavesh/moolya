import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Ideator from './Ideator'
import Institution from './Institution'

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

    let institutionTypes = [
      {value: 'SubChapter', label: 'SubChapter' , clearableValue: true},
      {value: 'Institution', label: 'Institution',clearableValue: true}
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
    data:FetchUserType {label:userTypeName,value:_id}
    }
    `;
    let citiesquery = gql`query{
      data:fetchCities {label:name,value:_id }
    }
    `;
    let entitiesquery = gql`query{
    data:fetchEntities {label:entityName,value:_id  }
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
        {this.props.community=='ideator'?<Ideator/>:<div></div>}
        {this.props.community=='institution'?<Institution/>:<div></div>}
    </ScrollArea>
      </div>
    )
  }
};
