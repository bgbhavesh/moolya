import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';

import AdminLayout from '../../admin/layouts/AdminLayout';
import RegistrationContent from '../../admin/components/registration/registration.jsx';
import MoolyaDropDown from '../../common/components/Dropdown.jsx'
import MoolyaMultiSelectDropDown from '../../common/components/Multiselectdropdown.jsx'
import MoolyaDatepicker from '../../common/components/Datepicker.jsx'


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
let dropdownStyles={
  padding:"70px"
}


adminSection.route('/dropdown', {
  action(){
    mount(AdminContent, {children:( <MoolyaDropDown id='myDropdown' options={options} value='b' labelField='description' valueField='code' customChange={dropDownOnChange} styles={dropdownStyles}/> )})
  }

});

let multiselectOnChange = function(multiselect){
  alert("multiple selcected values:"+multiselect)
}
let multiselectStyles={
  padding:"70px"
}
adminSection.route('/multiselectdropdown', {
  action(){
    mount(AdminContent, {children:( <MoolyaMultiSelectDropDown id='myDropdown' options={options} value='c' labelField='description' valueField='code' customChange={multiselectOnChange} styles={multiselectStyles}/>)})
  }

});
let selectDate=function(datepicker){
  alert("selected date:"+datepicker)
}
let styleOptions={
  padding: "70px",

}
adminSection.route('/datepicker', {
  action(){
    mount(AdminContent, {children:( <MoolyaDatepicker defaultValue="1/1/2000" dateformate="dd/mm/yy" customSelect={selectDate} styles={styleOptions}/>)})
  }

});


