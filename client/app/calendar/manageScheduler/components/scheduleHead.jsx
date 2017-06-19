import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {getUserProfileActionHandler} from '../actions/activityActionHandler'

export default class ScheduleHead extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      profile:[],
      profilePic:"",
      displayName:"",
      profileDisplay: false,
      subMenu: false
    }
    this.getUserProfiles.bind(this)
  }


  componentDidMount()
  {
    $('.users_list li').click(function(){
      if($(this).next('li').hasClass('sub_list_wrap')) {
        $(this).toggleClass('active_user')
        $(this).next('.sub_list_wrap').toggleClass('hidden_list');
      }
    });
  }

  componentWillMount() {
    this.getUserProfiles()
  }

  userClickAction(){
    if(!this.state.profileDisplay) {
        this.setState({profileDisplay:true})
    }
  }

  userClickProfile(){
    if(!this.state.subMenu) {
      this.setState({subMenu:true})
    }
  }


async getUserProfiles() {
  const resp = await getUserProfileActionHandler();
  this.setState({profile: resp})
  let name = resp[0].displayName;
  let profileImage = resp[0].profileImage;
  this.setState({displayName: name , profilePic: profileImage})
  return resp;
}


  render(){

    let users= this.state.profile || [];
    let profiles = [];
    let that = this
    const userProfile = users.map(function(profile){
      return(
                < li >
                  <div >
                    <a href="#">
                    <span className="icon_bg"> <span className="icon_lg ml ml-funder"></span></span><br />
                    <div className="tooltiprefer">
                      <span>{profile.communityName}</span>
                    </div>
                    </a>
                  </div>
                </li>
      )

    })


    return (
      <div className="col-lg-12">
        <ul className="users_list well well-sm">
          <li>
            <a href="#">
              <img src={that.state.profilePic?that.state.profilePic:"/images/p_5.jpg"} /><br />
                <div className="tooltiprefer" >
                <span>{that.state.displayName?that.state.displayName:"All"}</span>
              </div>
            </a>
          </li>
          {userProfile}



          {/*<a href="#">*/}
              {/*<span className="icon_bg"> <span className="icon_lg ml ml-funder"></span></span><br />*/}
              {/*<div className="tooltiprefer">*/}
                {/*<span>Funder</span>*/}
              {/*</div>*/}
            {/*</a>*/}
          {/*</li>*/}
          {/*<li className="active_user">*/}
            {/*<a href="#">*/}
              {/*<span className="icon_bg"><span className="icon_lg ml ml-ideator"></span></span><br />*/}
              {/*<div className="tooltiprefer">*/}
                {/*<span>Ideator</span>*/}
              {/*</div>*/}
            {/*</a>*/}
          {/*</li>*/}

          <li className="sub_list_wrap">{/*hidden_list*/}
            <ul className="sub_list">
              <li className="active_user">
                <a href="#">
                  <span className="icon_bg"><span className="icon_lg fa fa-file-text-o"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Activity</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_bg"><span className="icon_lg fa fa-list-alt"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Task Master</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_bg"><span className="icon_lg fa fa-puzzle-piece"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Services</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_bg"><span className="icon_lg fa fa-calendar"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Calendar</span>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
};
