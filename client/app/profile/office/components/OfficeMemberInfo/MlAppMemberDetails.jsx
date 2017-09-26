/**
 * Created by pankaj on 8/6/17.
 */

import React from 'react';
import {fetchOfficeMember} from '../../actions/findOfficeMember';
import {updateOfficeMemberActionHandler} from '../../actions/updateOfficeMember'
import {fetchOfficeMemberById} from '../../actions/findOfficeById';
import moment from 'moment';
import gql from "graphql-tag";
import Moolyaselect from  '../../../../../commons/containers/select/MlSelectComposer';
import {appClient} from '../../../../core/appConnection';
import {setOfficeMemberIndependent} from '../../actions/setOfficeMemberIndependent';

export default class MlAppMemberDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      memberInfo: {},
      office:{
        availableCommunities:[]
      },
      communityCode:'',
      showCommunityBlock: false
    };
    this.onCommunitySelect = this.onCommunitySelect.bind(this);
  }

  componentDidMount() {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });
    this.getOffice();
    this.getMemberDetail();
  }
  async getOffice(){
    let id = FlowRouter.getParam('officeId');
    let office = await fetchOfficeMemberById(id);
    this.setState({
      office: office
    })
  }
  async getMemberDetail(){
    let id = FlowRouter.getParam('memberId');
    let response = await fetchOfficeMember(id);
    if(response) {
      this.setState({
        memberInfo: response
      });
    }
  }

  async updateMemberFlags(type){
    let update = {};
    update[type] = true;
    let id = FlowRouter.getParam('memberId');
    let officeId = FlowRouter.getParam('officeId');
    let response = await updateOfficeMemberActionHandler(officeId, id, update);
    if(response.success){
      toastr.success(response.result);
    } else {
      toastr.error(response.result);
    }
  }

  async updateIsIndependent(e){
    let update = {
      isIndependent:e.target.checked
    };
    let id = FlowRouter.getParam('memberId');
    let officeId = FlowRouter.getParam('officeId');
    console.log(id, officeId);

    this.setState({
      showCommunityBlock: e.target.checked
    });
    // let response = await updateOfficeMemberActionHandler(officeId, id, update);
    // if(response.success){
    //   toastr.success(response.result);
    // } else {
    //   toastr.error(response.result);
    // }
  }

  onCommunitySelect(value) {
    this.setState({
      communityCode: value
    });
  }

  async makeIndependent(){
    let id = FlowRouter.getParam('memberId');
    let communityCode = this.state.communityCode;
    let response = await setOfficeMemberIndependent(id, communityCode);
    if(response.success){
      toastr.success(response.result);
      this.getMemberDetail();
    } else {
      toastr.error(response.result);
    }
  }

  render() {
    const that = this;
    let community = this.state.office.availableCommunities.find(function (item) {
      return item.communityId == that.state.memberInfo.communityType;
    });

    let query = gql`{
                data:fetchCommunitiesSelect {
                    value:code
                    label:name
                  }
                }
              `,
    communityName = community ?  community.communityName : '';
    communityName = communityName ? communityName : ( this.state.memberInfo.isPrincipal ? 'Principal':' ' ) ;
    return (
      <div>
        <div className="investement-view-content">
          <div className="row">
            <div className="col-md-6">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Name" defaultValue=" " value={this.state.memberInfo.name} disabled={true} className="form-control float-label" id="cluster_name" />
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Phone Number" defaultValue=" " value={this.state.memberInfo.mobileNumber} disabled={true} className="form-control float-label" id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Joining Date" defaultValue=" " value={this.state.memberInfo.joiningDate ? moment(this.state.memberInfo.joiningDate).format('MM/DD/YYYY HH:mm:ss') : ' '} disabled={true} className="form-control float-label" id="cluster_name"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Email-ID" defaultValue=" " value={this.state.memberInfo.emailId} disabled={true} className="form-control float-label" id="cluster_name" />
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Role" defaultValue=" " value={communityName} className="form-control float-label" id="cluster_name" />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Status" value={this.state.memberInfo.isActive ? 'Active' : 'Not Active'} disabled={true}  className="form-control float-label" id="cluster_name" />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-center"><img src={this.state.memberInfo.profileImage ? this.state.memberInfo.profileImage : "/images/ideator_01.png"}/></div>
              <br />
              <div className="clearfix"></div>
              <div className="form-group switch_wrap inline_switch">
                <label>Show Independent</label>
                <label className="switch">
                  <input type="checkbox" onClick={(e)=>this.updateIsIndependent(e)} defaultChecked={this.state.memberInfo.isIndependent} disabled={this.state.memberInfo.isIndependent || !this.state.memberInfo.isActive ? true : false } />
                  <div className="slider"></div>
                </label>
              </div>
              <div className="clearfix"></div>
              {
                that.state.showCommunityBlock && !that.state.memberInfo.isIndependent
                  ?
                  <div>
                    <div className="form-group">
                      <Moolyaselect
                        multiSelect={false}
                        className="form-control float-label"
                        valueKey={'value'}
                        labelKey={'label'}
                        queryType={"graphql"}
                        placeholder="Select Community"
                        selectedValue={this.state.communityCode}
                        connection={appClient}
                        query={query}
                        id={"communityType"}
                        isDynamic={true}
                        onSelect={this.onCommunitySelect.bind(this)}
                        ref="listSelect"
                        reExecuteQuery={true}
                        queryOptions={{}}
                      />
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group text-right padding10">
                      <a href="" onClick={()=> that.makeIndependent() } className="mlUpload_btn">Make Independent</a>
                    </div>
                  </div>
                  :
                  ""
              }
              <div className="clearfix"></div>
              <div className="form_bg">
                <form>
                  <div className="panel panel-default">
                    <div className="panel-heading"> Interaction with </div>

                    <div className="panel-body">
                      <div className="input_types">
                        <input id="radio1" type="radio" name="radio1" disabled={true} checked={this.state.memberInfo.isExternalUserInteraction} value="1"/><label htmlFor="radio1"><span><span></span></span>Internal Users</label>
                      </div>
                      <div className="input_types">
                        <input id="radio2" type="radio" name="radio2" disabled={true} checked={this.state.memberInfo.isInternalUserInteraction} value="2"/><label htmlFor="radio2"><span><span></span></span>External Users</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-right well padding10">
          <a href="" onClick={()=>this.updateMemberFlags('isFreeze')} className="mlUpload_btn">Freeze</a>
          <a href="" onClick={()=>this.updateMemberFlags('isPrincipal')} className="mlUpload_btn">Make Principal</a>
          <a href="" onClick={()=>this.updateMemberFlags('isRetire')} className="mlUpload_btn">Retire</a>
        </div>
      </div>
    )
  }
};
