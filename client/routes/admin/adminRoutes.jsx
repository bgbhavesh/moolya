import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import MoolyaLeftNav from '../../commons/components/leftNavbar/LeftNav'
import  MoolyaHeader from '../../commons/components/header/Header'
import AdminLayout from '../../admin/dashboard/layouts/AdminLayout'
import MoolyaLoginLayout from '../../login/layouts/login'
import MoolyaAdminViewContainer from '../../commons/containers/adminview/AdminViewContainer.jsx'
import loginActions,{loginActionHandler} from '../../login/actions/loginActions'
import LeftNavConnection from '../../commons/containers/adminLeftNav/mainConnection'
adminSection = FlowRouter.group({
  prefix: "/admin"
});
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


adminSection.route('/dashboard', {
    // action(){
    //   mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<MoolyaLeftNav navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} nameField="name" imageLink="image" statusField="status"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})
    // }
  action(){
    mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<LeftNavConnection navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} listRouterPath="listRouterPath" nameField="nameField" imageLink="imageLink" statusField="statusField"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})
  }
});

adminSection.route('/login', {
    action(){
        mount(MlLoginLayout, {content:<MlLoginContent formSubmit={loginActionHandler.onLoginFormSubmit}/>})
    }
});
