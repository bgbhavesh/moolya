import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import AdminLayout1 from '../../../admin/core/components/MlAdminApp';
import AdminLayoutComposer from './AdminLayoutComposer'
import MoolyaloginContainer from '../../../login/container/loginContainer'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

export default class MoolyaAdminLayoutContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'mlAdminMenu'
    }
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


    const query = gql`fragment subMenu on Menu{
                  id
                  isLink
                  isMenu
                  name 
                  image
                  link
              }
              
              query LeftNavQuery($name: String!) {
        data:FetchMenu(name: $name){
            name
            menu{
              ...subMenu 
                 subMenu{
                  ...subMenu
                    subMenu{
                      ...subMenu
                          subMenu{
                             ...subMenu
                                 }
                           }
                      }
                   }
            }
       
      }`

    let config={'component':AdminLayout1,'query':query, 'options':{options: { variables: { name: this.state.name }}},'options1':{options: { variables: { name: 'mlAdminMenu1' }}}};

    return(<div><AdminLayoutComposer {...config}/></div>)
  }

}




