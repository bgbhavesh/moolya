import React, {Component, PropTypes} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {render} from "react-dom";
import {fetchCommunitiesHandler} from "../actions/fetchCommunitiesActionHandler";
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
import Moolyaselect from "../../../commons/components/select/MoolyaSelect";
import {fetchUserDetailsHandler} from "../actions/fetchUserDetails";
import {registerAsInfo} from "../../../admin/transaction/requested/actions/registrationAs";
let Select = require('react-select');
export default class MlAppCommunitiesList extends Component {
    constructor(props){
        super(props);
        this.state={communities:[], popoverOpen:false, selectedCommunity:"",
          country:'',
          selectedCity:'',
          userType:null,
          clusterId:null,
          registrationType:'',
        }
        this.fetchCommunities.bind(this)
        this.setSelectedCommunity.bind(this)
        this.toggle.bind(this);
        return this;
    }

    componentDidMount(){
      this.fetchUserDetails();

    }

  async fetchUserDetails() {
    let response = await fetchUserDetailsHandler()
    if (response) {
      let registrationInfo = response.registrationInfo
      this.setState({
        status: response.status,
        registerId: response._id,
        firstName: registrationInfo.firstName,
        lastName: registrationInfo.lastName,
        contactNumber: registrationInfo.contactNumber,
        email: registrationInfo.email,
        userName: registrationInfo.userName,
        country: registrationInfo.countryId,
        communityId: registrationInfo.registrationType
      });
      this.fetchCommunities();
    }
  }

    setSelectedCommunity(selCommunity,idx, e){
        this.setState({selectedCommunity:selCommunity, popoverOpen : !(this.state.popoverOpen)})
      this.setState({identity:null,registrationType:null,clusterId:null})
    }

    toggle() {
        this.setState({popoverOpen: !this.state.popoverOpen});
    }
  cancel(){
      this.toggle()
    FlowRouter.go("/app/myProfile/registerAs");
  }
  async registerAs(){
    let registrationInfo={
      userName:this.state.userName,
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      contactNumber:this.state.contactNumber,
      email:this.state.email,
      registrationType:this.state.selectedCommunity,
      identityType:this.state.identity,
      clusterId:this.state.clusterId,
      cityId:this.state.selectedCity,
      countryId:this.state.country

    }
    let registrationId=this.state.registerId
    const response = await registerAsInfo(registrationInfo,registrationId);
    if(response.success){
      let registrtionId=response.result
     let registrtion= JSON.parse(registrtionId)
      toastr.success("user registered successfully");
      FlowRouter.go("/app/register/"+registrtion.registrationId);
    }else{
      this.toggle()
      toastr.error(response.result);
      FlowRouter.go("/app/myProfile/registerAs");
    }
  }

    async fetchCommunities() {
        let communities = await fetchCommunitiesHandler();
        let userCommunity=this.state.communityId
      let status=this.state.status
      if(status=="Approved"){
        if(userCommunity=="CMP"){
          let communitilist= _.filter(communities, function(community) {
            return community.code==="CMP"
          });
          this.setState({communities:communitilist})
        }else if(userCommunity=="INS"){
          let communitilist= _.filter(communities, function(community) {
            return community.code==="INS"
          });
          this.setState({communities:communitilist})
        }else if(userCommunity=="BRW"){
          let communitilist= _.filter(communities, function(community) {
            return community.code!="BRW"
          });
          this.setState({communities:communitilist})
        }else{
          let communitilist= _.filter(communities, function(community) {
            return community.code==="FUN" ||community.code==="IDE"||community.code==="STU"||community.code==="SPS"
          });
          this.setState({communities:communitilist})
        }
      }else{
        let communitilist= _.filter(communities, function(community) {
          return community.code!="BRW"
        });
        this.setState({communities:communitilist})
      }


        return communities;
    }

  optionsBySelectCountry(value){
    this.setState({country:value})
  }
  /*optionsBySelectCity(value){
    this.setState({selectedCity:value})
  }*/
  optionBySelectRegistrationType(value, calback, selObject){
    this.setState({registrationType:value});
   // this.setState({identityType:null});
    this.setState({coummunityName:selObject.label})
  }
  optionsBySelectIdentity(val){
    this.setState({identity:val})
  }
  optionsBySelectOperationCountry(val){
    this.setState({clusterId:val})
  }


    render(){

            let countryQuery = gql`query{
       data:fetchCountries {
          value:_id
          label:country
        }
      }`

      //       let chapterQuery = gql`query($id:String){
      //   data:fetchChaptersWithoutAll(id:$id) {
      //     value:_id
      //     label:chapterName
      //   }
      // }`;
      let fetchcommunities = gql` query{
  data:fetchCommunityDefinition{label:name,value:code}
} 
`;
      let fetchIdentity=gql`query($communityId:String){
        data:FetchCommunityBasedIdentity(communityId:$communityId) {
          value: identityTypeName
          label: identityTypeName
        }
      }`;

  //     let userTypequery = gql` query($communityCode:String){
  //   data:FetchUserType(communityCode:$communityCode) {
  //     value:_id
  //     label:userTypeName
  // }  }
  //   `;
  //     let industriesquery=gql` query{
  //   data:fetchIndustries{label:industryName,value:_id}
  //   }
  //   `;

    //   let professionQuery=gql` query($industryId:String){
    //   data:fetchIndustryBasedProfession(industryId:$industryId) {
    //     label:professionName
    //     value:_id
    //   }
    // }`;

    //   let citiesquery = gql`query($countryId:String){
    //   data:fetchCitiesPerCountry(countryId:$countryId){label:name,value:_id}
    // }
    // `;
      let clusterQuery = gql`query{data:fetchClustersForMap{label:displayName,value:_id}}`;

      let identityOptions={options: {variables: {communityId:this.state.selectedCommunity}}};
      // let professionQueryOptions = {options: {variables: {industryId:this.state.selectedTypeOfIndustry}}};
      // let userTypeOption={options: { variables: {communityCode:this.state.registrationType}}};
      // let countryOption = {options: { variables: {countryId:this.state.country}}};
        const data = this.state.communities || [];
        const list=  data.map((prop, idx) =>
            <div className="col-lg-2 col-md-4 col-sm-4" key={prop.code}>
                <div className="list_block">
                    {/*<div className={`cluster_status ${prop.isActive?"active":"inactive"}_cl `}></div>*/}
                        <a href="" onClick={this.setSelectedCommunity.bind(this, prop.code,idx)} id={"selCommunity"+prop.code}>
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
                        <Moolyaselect multiSelect={false} placeholder="Registration Type" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedCommunity} queryType={"graphql"} query={fetchcommunities}  isDynamic={true} onSelect={this.optionBySelectRegistrationType.bind(this)} disabled={true}/>
                      </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Identity"  selectedValue={this.state.identity} queryType={"graphql"} query={fetchIdentity} queryOptions={identityOptions} isDynamic={true}  onSelect={this.optionsBySelectIdentity.bind(this)}   />
                      </div>
                      <div className="col-md-6 nopadding-left">
                        <div className="form-group ">
                          <input type="text" ref="firstName" value={this.state.firstName} placeholder="First Name" className="form-control float-label" disabled="true" />
                        </div>
                        <div className="form-group ">
                          <input type="text" ref="contactNumber" value={this.state.lastName} placeholder="Contact number" className="form-control float-label" id="" disabled="true"/>
                        </div>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Your Country"  selectedValue={this.state.country} queryType={"graphql"} query={countryQuery} isDynamic={true}  onSelect={this.optionsBySelectCountry.bind(this)}  disabled={true} />
                      </div>

                      </div>
                      <div className="col-md-6 nopadding-right">
                        <div className="form-group ">
                          <input type="text" ref="lastName" value={this.state.contactNumber} placeholder="Last Name"className="form-control float-label" id="" disabled="true"/>
                        </div>
                        <div className="form-group ">
                          <input type="text" ref="email"   value={this.state.email} placeholder="Email ID" className="form-control float-label" id="" disabled="true" />
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Operation Country"  selectedValue={this.state.clusterId} queryType={"graphql"} query={clusterQuery} isDynamic={true}  onSelect={this.optionsBySelectOperationCountry.bind(this)} />
                          {/*<Moolyaselect multiSelect={false} placeholder="Your City" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedCity} queryType={"graphql"} queryOptions={countryOption} query={citiesquery} onSelect={this.optionsBySelect.bind(this)} isDynamic={true}/>*/}
                        </div>
                      </div>
                      <div className="assign-popup">
                        <a data-toggle="tooltip" title="Save" data-placement="top"  className="hex_btn hex_btn_in" onClick={this.registerAs.bind(this)}>
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
