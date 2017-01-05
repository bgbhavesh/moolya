import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import MoolyaLeftNav from '../../commons/components/leftNavbar/LeftNav'
import  MoolyaHeader from '../../commons/components/header/Header'
import AdminLayout from '../../admin/dashboard/layouts/AdminLayout'
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
adminSection.route('/dashboard', {
  action(){
    mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<MoolyaLeftNav navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>})
  }
});
