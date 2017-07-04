/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This will manage the team information
 * JavaScript XML file MlAppChooseTeam.jsx
 * *************************************************************** */

import React from 'react';
import ScrollArea from 'react-scrollbar';
import Moolyaselect from  '../../../../../commons/components/select/MoolyaSelect'
import gql from 'graphql-tag'
import {getTeamUsersActionHandler, updateActivityActionHandler, getActivityActionHandler} from '../actions/activityActionHandler'
import _ from "lodash";
let Select = require('react-select');
let FontAwesome = require('react-fontawesome');

let options = [
  {value: 'principal', label: 'Principal'},
  {value: 'teamMember', label: 'Team Member'},
  {value: 'moolyaAdmins', label: 'Moolya Admins'}
];

export default class MlAppChooseTeam extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        userType:"",
        branch:"",
        teamUsers:[],
        addComponent:[{}],
        team: [{
          users:[]
        }],
        responseTeam:[{}],
        teamBearerType:[]
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

  removeComponent(index,e){
    let team = this.state.team;
    team.splice(index,1)
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
    if(res.success) {
      toastr.success("Saved Successfully")
    }
     return res;
  }
  async SelectTeamMember(index,value){
    let that = this;
    console.log(index);
    that.setState({teamBearerType:value})
    let team = that.state.team;
    team[index].userType = value.label;
    let TeamAttributes = {
      officeId: team[index].branch,
      userType:team[index].userType
    }
    const resp = await getTeamUsersActionHandler(TeamAttributes);
    let temp = [];
    resp.map(function(data){
      temp.push({
        name: data.name,
        userId: data.userId
      })
    })
    team[index].users = temp
    this.setState({
      team:team
    });
    console.log(this.state.team)
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
        userType:temp[0].userType
    }
    const resp = await getTeamUsersActionHandler(TeamAttributes)
    console.log(resp)
    this.setState({teamUsers: resp})
  }

  // teamBearers(val, index) {
  //   console.log(index);
  //   let team = this.state.team;
  //   team[index].team = value;
  //   this.setState({
  //     team:team
  //   });
  //   this.setState({teamBearerType:val})
  //     }


  render(){
//   let teamQuery= gql`
//    query  {
//   data: getTeamMembers {
//     label: communityName
//     value: communityId
//   }
// }
//   `;

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
            <div className="panel-heading">Suggestable teams <span className="see-more pull-right"><a href=""><FontAwesome name='plus' onClick={that.addComponent.bind(that,indi)}/></a><FontAwesome name='minus' onClick={that.removeComponent.bind(that, id)}/></span></div>
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
                      <Select name="form-field-name" options={options} value={indi.userType} placeholder='Select Team Bearer' onChange={that.SelectTeamMember.bind(that, id)} />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-12 nopadding att_members" >
                <ul className="users_list">
              {indi.users.map(function ( user, index ) {
                return (

                      <li>
                        <a href="">
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
