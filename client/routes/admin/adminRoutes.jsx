import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';

import adminlayout from '../../layouts/admin/admin';
import registerlayout from '../../layouts/admin/registration/registration.jsx';
import MoolyaDropDown from '../../components/dropdown.jsx'


adminSection = FlowRouter.group({
  prefix: "/admin"
});

adminSection.route('/', {
  triggersEnter(context){
      if(!Meteor.userId()){
         FlowRouter.go('/login')
      }
  },
  action(){
    mount(AdminLayout, {content:(<AdminContent/>)})
  }
});

adminSection.route('/users', {
  action(){
    mount(AdminContent, {children:(<AdminUsersContent/>)})
  }
});
adminSection.route('/registration', {
  action(){
    mount(AdminContent, {children:(<RegistrationContent/>)})
  }

});

let options = [
  {
    description: 'option A',
    code: 'a'
  },
  {
    description: 'option B',
    code: 'b'
  },
  {
    description: 'option C',
    code: 'c'
  },
  {
    description: 'option D',
    code: 'd'
  }
];


let dropDownOnChange = function(change) {
  alert('onChangevalue: '
    + change.newValue);
};



adminSection.route('/dropdown', {
  action(){
    mount(AdminContent, {children:( <MoolyaDropDown id='myDropdown' options={options} value='b' labelField='description' valueField='code' customChange={dropDownOnChange}/>)})
  }

});

