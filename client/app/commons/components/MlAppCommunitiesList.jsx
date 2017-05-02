import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { render } from 'react-dom';
import {fetchCommunitiesHandler} from '../actions/fetchCommunitiesActionHandler'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import Moolyaselect from '../../../commons/components/select/MoolyaSelect'
let Select = require('react-select');
export default class MlAppCommunitiesList extends Component {
    constructor(props){
        super(props);
        this.state={communities:[], popoverOpen:false, selectedCommunity:"",
          country:'',
          selectedCity:'',
          cluster:'',
          chapter:'',
          identity:'',
          userType:null,
          selectedTypeOfIndustry:'',
          profession:null,
          registrationType:'',
        }
        this.fetchCommunities.bind(this)
        this.setSelectedCommunity.bind(this)
        this.toggle.bind(this);
        return this;
    }

    componentDidMount(){
        this.fetchCommunities();
    }

    setSelectedCommunity(selCommunity, e){
        this.setState({selectedCommunity:selCommunity, popoverOpen : !(this.state.popoverOpen)})
    }

    toggle() {
        this.setState({popoverOpen: !this.state.popoverOpen});
    }
  cancel(){
      this.toggle()
    FlowRouter.go("app/myProfile/registerAs");
  }

    async fetchCommunities() {
        const communities = await fetchCommunitiesHandler();
        this.setState({communities:communities})
        return communities;
    }

  optionsBySelectCountry(value){
    this.setState({country:value})
  }
  optionsBySelectCity(value){
    this.setState({selectedCity:value})
  }
  optionsBySelectCluster(value){
    this.setState({cluster:value})
  }
  optionsBySelectChapter(value){
    this.setState({chapter:value})
  }
  optionBySelectRegistrationType(value, calback, selObject){
    this.setState({registrationType:value});
    this.setState({identityType:null});
    this.setState({coummunityName:selObject.label})
  }
  optionsBySelectIdentity(val){
    this.setState({identity:val.value})
  }
  optionsBySelectUserType(value){
    this.setState({userType:value})
  }
  optionsBySelectTypeOfIndustry(value){
    this.setState({selectedTypeOfIndustry:value})
  }
  optionsBySelectProfession(val){
    this.setState({profession:val})
  }
    render(){
            let countryQuery = gql`query{
       data:fetchCountries {
          value:_id
          label:country
        }
      }`
            let clusterQuery = gql`query{data:fetchClustersForMap{label:displayName,value:_id}}
          `;
            let chapterQuery = gql`query($id:String){  
        data:fetchChaptersWithoutAll(id:$id) {
          value:_id
          label:chapterName
        }  
      }`;
      let fetchcommunities = gql` query{
  data:fetchCommunityDefinition{label:name,value:code}
} 
`;
      let userTypequery = gql` query($communityCode:String){  
    data:FetchUserType(communityCode:$communityCode) {
      value:_id
      label:userTypeName
  }  }
    `;
      let industriesquery=gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }
    `;

      let professionQuery=gql` query($industryId:String){
      data:fetchIndustryBasedProfession(industryId:$industryId) {
        label:professionName
        value:_id
      }
    }`;
      let IdentityOptions = [
        {value: 'Company', label: 'Company'},
        {value: 'Individual', label: 'Individual'}
      ];
      let citiesquery = gql`query($countryId:String){
      data:fetchCitiesPerCountry(countryId:$countryId){label:name,value:_id}
    }
    `;
      let professionQueryOptions = {options: {variables: {industryId:this.state.selectedTypeOfIndustry}}};
      let userTypeOption={options: { variables: {communityCode:this.state.registrationType}}};
      let countryOption = {options: { variables: {countryId:this.state.country}}};
        const data = this.state.communities || [];
        const list=  data.map((prop, idx) =>
            <div className="col-lg-2 col-md-4 col-sm-4" key={prop.code}>
                <div className="list_block">
                    {/*<div className={`cluster_status ${prop.isActive?"active":"inactive"}_cl `}></div>*/}
                        <a href="" onClick={this.setSelectedCommunity.bind(this, idx)} id={"selCommunity"+idx}>
                            <div className={"hex_outer"}>
                                <span className={prop.communityImageLink}></span>
                            </div>
                        </a>
                        <h3>{prop.name}</h3>
                </div>
            </div>
        );
        return(
            <div className="app_main_wrap">
                <div className="app_padding_wrap">
                    <h2>Select Community</h2>
                    {list}
                </div>
                <Popover placement="right" isOpen={this.state.popoverOpen} target={"selCommunity"+this.state.selectedCommunity} toggle={this.toggle.bind(this)}>
                  <PopoverTitle>Register As </PopoverTitle>
                    <PopoverContent>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} placeholder="Registration Type" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.registrationType} queryType={"graphql"} query={fetchcommunities}  isDynamic={true} onSelect={this.optionBySelectRegistrationType.bind(this)}/>
                      </div>
                      <div className="form-group">
                        <Select name="form-field-name"  placeholder={"Identity"}  className="float-label"  options={IdentityOptions}  value={this.state.identity}  onChange={this.optionsBySelectIdentity.bind(this)}/>
                      </div>
                      <div className="col-md-6 nopadding-left">
                        <div className="form-group ">
                          <input type="text" ref="firstName" placeholder="First Name" className="form-control float-label" disabled="true" />
                        </div>
                        <div className="form-group ">
                          <input type="text" ref="contactNumber" placeholder="Contact number" className="form-control float-label" id="" disabled="true"/>
                        </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Your Country"  selectedValue={this.state.country} queryType={"graphql"} query={countryQuery} isDynamic={true}  onSelect={this.optionsBySelectCountry.bind(this)}   />
                      </div>

                      </div>
                      <div className="col-md-6 nopadding-right">
                        <div className="form-group ">
                          <input type="text" ref="lastName" placeholder="Last Name"className="form-control float-label" id="" disabled="true"/>
                        </div>
                        <div className="form-group ">
                          <input type="text" ref="email"   placeholder="Email ID" className="form-control float-label" id="" disabled="true" />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false} placeholder="Your City" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedCity} queryType={"graphql"} queryOptions={countryOption} query={citiesquery} onSelect={this.optionsBySelectCity.bind(this)} isDynamic={true}/>
                        </div>
                        {/*<div className="form-group mart20">
                        <Moolyaselect multiSelect={false} placeholder="Select User Category" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.userType} queryType={"graphql"} query={userTypequery} reExecuteQuery={true} queryOptions={userTypeOption} onSelect={this.optionsBySelectUserType.bind(this)}  isDynamic={true}/>
                      </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} placeholder="Select Type Of Industry" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfIndustry} queryType={"graphql"} query={industriesquery} onSelect={this.optionsBySelectTypeOfIndustry.bind(this)} isDynamic={true}/>
                      </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} placeholder="Select Profession" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.profession} queryType={"graphql"} query={professionQuery} queryOptions={professionQueryOptions} onSelect={this.optionsBySelectProfession.bind(this)} isDynamic={true}/>

                      </div>*/}
                      </div>
                      <div className="assign-popup">
                        <a data-toggle="tooltip" title="Save" data-placement="top"  className="hex_btn hex_btn_in">
                          <span className="ml ml-save"></span>
                        </a>
                        <a data-toggle="tooltip" title="Cancel" data-placement="top" href=""  className="hex_btn hex_btn_in" onClick={this.cancel.bind(this)} >
                          <span className="ml ml-delete"></span>
                        </a>
                      </div>
                    </PopoverContent>
                </Popover>
            </div>
        )
    }
}
