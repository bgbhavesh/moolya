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
import {getTeamUsersActionHandler, updateActivityActionHandler, getActivityActionHandler} from '../actions/activityActionHandler'
import _ from "lodash";

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
        responseTeam:[{}]
      }
      this.fetchTeam.bind(this)
      this.getDetails.bind(this)

  }

  componentWillMount(){
    this.getDetails()
  }

  async getDetails() {

    let id = FlowRouter.getQueryParam('id')
    if (id) {
    const resp = await getActivityActionHandler(id)
    if(resp) {
      // this.setState({responseTeam: resp.teams})
      let team = resp.teams && resp.teams.length ? resp.teams.map(function (data) {
        return data;
      }) : [{users: []}];  //this.state.responseTeam
      console.log(team, Object.isExtensible(team));
      let x =[]
      console.log(team)
      _.each(team, function (item)
      {
        for (var propName in item) {
          if (item[propName] === null || item[propName] === undefined) {
            delete item[propName];
          }
        }
        let newItem = _.omit(item, "__typename");
        x.push(newItem)
      })
      this.setState({
        team: x
      });


      console.log(this.state.team)
      // console.log(this.state.tea
      // m)
    }
    }
}

  componentDidMount()
  {

    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }


  addComponent(){
    let team = this.state.team;
    console.log(team,Object.isExtensible(team));
    team.push({
      users:[]
    });
    console.log('team', team);
    this.setState({
      team:team
    });
  }

  removeComponent(){
    let team = this.state.team;
    team.pop({})
    this.setState({team:team})
  }

  async saveDetails(){

    console.log(this.state.team)
    let team  = this.state.team;
    let temp = [];
      let x =[]
      _.each(team, function (item)
      {
        for (var propName in item) {
          if (item[propName] === null || item[propName] === undefined) {
            delete item[propName];
          }
        }
        let newItem = _.omit(item, "__typename");
        x.push(newItem)
      })
    console.log(x)
    this.setState({team:x})
    let id = FlowRouter.getQueryParam('id')
    let teams = {
      teams:team,
    }
    const res = await updateActivityActionHandler(id,teams)
    this.getDetails();

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
                    <br className="clearfix"/><br className="clearfix"/><br className="clearfix"/>
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
                      <br className="clearfix"/><br className="clearfix"/><br className="clearfix"/>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-12 nopadding att_members" >
                <ul className="users_list">
              {indi.users.map(function ( user, index ) {
                return (

                      <li>
                        <a href="#">
                          <img src="/images/p_3.jpg" /><br />
                          <div className="tooltiprefer">
                            <span>{user.name}</span>
                          </div>
                        </a>
                      </li>
                )
              })}
                </ul>
              </div>
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
