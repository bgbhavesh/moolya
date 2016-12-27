import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MoolyaLeftNav  from '../../components/Navbar/leftNav'

AdminLayout = React.createClass({
  render(){
    return <main>{this.props.content}</main>
  }
})
let navOptions=[

  {
    icon: 'users',
    link: '/admin/users',
    name: 'Users'
  },
  {
    icon: 'registered',
    link: '/admin/registration',
    name: 'Registration'
  },
  {
    icon: 'caret-square-o-down',
    link: '/admin/dropdown',
    name: 'Dropdown'
  },
  {
    icon: 'tachometer',
    link: '/admin/multiselectdropdown',
    name: 'Multiselectdropdown'
  }

]

AdminContent = React.createClass({
  render(){
    return (
      <div>
        <AdminHeaderContent/>
        <MoolyaLeftNav navOptions={navOptions} iconField="icon" linkField="link" nameField="name"/>

        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
})
