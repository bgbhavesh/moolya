import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MoolyaAdminViewContainer from '../adminview/AdminViewContainer.jsx'
import  MoolyaHeader from '../../components/header/MoolyaHeader'
import LeftNavContainer from '../adminLeftNav/LeftNavContainer'
//import AdminHeaderContainer from '../adminHeader/AdminHeaderContainer'
import AdminSelectContainer from '../adminSelect/AdminSelectContainer'
import  $ from 'jquery'
import MoolyaloginContainer from '../../../login/container/loginContainer'
export default class MoolyaAdminLayoutContainer extends Component {
  constructor(props){
    super(props);
    this.onlogout=this.onlogout.bind(this);
    return this;
  }

  onlogout(logout){
    if(logout){
      let loginContainer=MoolyaloginContainer.loginContainer
      loginContainer.logout()
    }
  }


  render(){
    let navOptions=[

      {
        image: '/images/db_icon.png',
        link: '/admin/dashboard',
        name: 'dashboard'
      },
      {
        image: '/images/cluster_icon.png',
        link: '/admin',
        name: 'cluster'
      },
      {
        image: '/images/chapter_icon.png',
        link: '/admin/dashboard',
        name: 'chapter'
      },
      {
        image: '/images/community_icon.png',
        link: '/admin/dashboard',
        name: 'community'
      },
      {
        image: '/images/documents_icon.png',
        link: '/admin/dashboard',
        name: 'documents'
      },
      {
        image: '/images/services_icon.png',
        link: '',
        name: 'services'
      },
      {
        image: '/images/settings_icon.png',
        link: '',
        name: 'settings'
      }

    ]
    let tabOptions=[

      {

        link: '/admin/dashboard',
        name: 'clusters'
      },
      {

        link: '/admin',
        name: 'chapters'
      },
      {

        link: '/admin/dashboard',
        name: 'communities'
      },
      {

        link: '/admin/dashboard',
        name: 'users'
      }]
    let onClickViewMOde = function(className){

      if(className=="view_switch map_view"){
        alert(className)

      }else{
        alert(className)
      }
    }

    let  clusterListOptions=[
      {
        imageLink: '/images/afghanistan.png',
        nameField: 'Afghanistan',
        statusField: 'active',
        listRouterPath:'/admin/dashboard'
      },
      {
        imageLink: '/images/australia.png',
        nameField: 'Australia',
        statusField: 'inactive',
        listRouterPath:'/admin/dashboard'
      }
    ]
    let footerOptions=[
      {
        imagefield:'/images/edit_icon.png',
        route:'/admin/dashboard',
      },
      {
        imagefield:'/images/act_add_icon.png',
        route:'/admin/dashboard',
      },
      {
        imagefield:'/images/act_logout_icon.png',
        route:'/admin/dashboard',
      },
      {
        imagefield:'/images/act_progress_icon.png',
        route:'/admin/dashboard',
      },
      {
        imagefield:'/images/act_select_icon.png',
        route:'/admin/dashboard',
      }
    ]
    logoutUser=function(logout){
      alert()
    }




    return(

      <div>
        {/*<AdminHeaderContainer module="dashboard" tabOptions={tabOptions}  logoutProfile={logoutProfile}/>*/}
        <MoolyaHeader  onlogout={this.onlogout.bind(this)}/>
        <LeftNavContainer />
        {/*<AdminSelectContainer/>*/}
        <MoolyaAdminViewContainer clusterListOptions={clusterListOptions} listRouterPath="listRouterPath" nameField="nameField" imageLink="imageLink" statusField="statusField"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>
      </div>

    )
  }

}




