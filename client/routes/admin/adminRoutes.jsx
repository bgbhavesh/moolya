import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';

import AdminLayout from '../../admin/layouts/AdminLayout';
import RegistrationContent from '../../admin/components/registration/registration.jsx';
import MoolyaDropDown from '../../common/components/Dropdown.jsx'
import MoolyaMultiSelectDropDown from '../../common/components/Multiselectdropdown.jsx';
import UsersListContainer from '../../admin/containers/users/UsersListContainer'
import MoolyaMapComponent from '../../common/components/mapComponent/mapComponent'



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
    mount(AdminContent, {children:(<UsersListContainer/>)})
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

let multiselectOnChange = function(multiselect){
  alert("multiple selcected values:"+multiselect)
}

adminSection.route('/multiselectdropdown', {
  action(){
    mount(AdminContent, {children:( <MoolyaMultiSelectDropDown id='myDropdown' options={options} value='c' labelField='description' valueField='code' customChange={multiselectOnChange}/>)})
  }

});

adminSection.route('/map', {
  action(){
    mount(AdminContent, {children:( <MoolyaMapComponent/>)})
  }

});


