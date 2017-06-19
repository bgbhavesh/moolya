/**
 * Created by Mukhil on 18/6/17.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import Moolyaselect from  '../../../../../commons/components/select/MoolyaSelect'
import gql from 'graphql-tag'
import {getTeamUsersActionHandler, updateActivityActionHandler} from '../actions/activityActionHandler'

export default class MlAppChooseTeam extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        communityType:"",
        branch:"",
        teamUsers:[],
        addComponent:[{}],
        team: [{
          users:[]
        }],
      }
      this.fetchTeam.bind(this)

  }
  componentDidMount()
  {

    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }


  addComponent(){
    let team = this.state.team;
    team.push({
      users:[]
    });
    this.setState({team:team});
  }

  removeComponent(){
    let team = this.state.team;
    team.pop({})
    this.setState({team:team})
  }

  async saveDetails(){

    console.log(this.props)
    let team  = this.state.team;
    let id = FlowRouter.getQueryParam('id')
    let teams = {
      teams:team,
    }

     const res = await updateActivityActionHandler(id,teams)
     return res;
  }
  async SelectTeamMember(index,value){
    console.log(index);
    let team = this.state.team;
    team[index].communityType = value;
    let TeamAttributes = {
      officeId: team[index].branch,
      communityType:team[index].communityType
    }
    const resp = await getTeamUsersActionHandler(TeamAttributes);
    team[index].users = resp;
    this.setState({
      team:team
    });
    this.fetchTeam(this.state.team, index);
  }

  SelectBranch(index,value){
    console.log(index);
    let team = this.state.team;
    team[index].branch = value;
    this.setState({
      team:team
    });
    // this.fetchTeam(this.state.team, index);
  }

  async fetchTeam(temp, index){
    let TeamAttributes = {
        officeId: temp[0].branch,
        communityType:temp[0].communityType
    }
    const resp = await getTeamUsersActionHandler(TeamAttributes)
    console.log(resp)
    this.setState({teamUsers: resp})
  }


  render(){
  let teamQuery= gql`
   query  {
  data: getTeamMembers {
    label: communityName
    value: communityId
  }
}
  `;

  let branchQuery = gql`
  query{
  data: getBranchDetails{
    label: branchType
    value: _id
  }
}

`;

  let that =  this;
    let data = that.state.teamUsers || []
    // const users =  data.map(function(user, id){
    //   return(
    //     <div className="col-md-12 nopadding att_members" >
    //       <ul className="users_list">
    //         <li>
    //           <a href="#">
    //             <img src="/images/p_3.jpg" /><br />
    //             <div className="tooltiprefer">
    //               <span>{user.name}</span>
    //             </div>
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   )
    // })

    // let temp = this.state.addComponent || []
    const newComponent =  this.state.team.map(function(indi, id){
      return(
        <div className="col-md-6 nopadding-left">
          <div className="panel panel-default cal_view_task">
            <div className="panel-heading">Suggestable teams <span className="see-more pull-right"><a href=""><FontAwesome name='plus' onClick={that.addComponent.bind(that,indi)}/></a><FontAwesome name='minus' onClick={that.removeComponent.bind(that)}/></span></div>
            <div className="panel-body ">
              <div className="col-md-12 nopadding">
                <div className="col-md-6 nopadding-left">
                  <form>
                    <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                  labelKey={'label'} queryType={"graphql"} query={branchQuery}
                                  isDynamic={true} placeholder="Select Branch Type"
                                  onSelect={that.SelectBranch.bind(that, id)}
                                  selectedValue={indi.branch}/>
                  </form>
                </div>
                <div className="col-md-6 nopadding-right">
                  <form>
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control f
                      loat-label" valueKey={'value'}
                                    labelKey={'label'} queryType={"graphql"} query={teamQuery}
                                    isDynamic={true} placeholder="Select Team Member"
                                    onSelect={that.SelectTeamMember.bind(that, id)}
                                    selectedValue={indi.communityType}/>
                    </div>
                  </form>
                </div>
              </div>
              {indi.users.map(function ( user, index ) {
                return (
                  <div className="col-md-12 nopadding att_members" >
                    <ul className="users_list">
                      <li>
                        <a href="#">
                          <img src="/images/p_3.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>{user.name}</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      )
    })
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <br/>
          {newComponent}
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div> <div className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};
