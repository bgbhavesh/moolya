import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {findUserDepartmentypeActionHandler} from '../actions/findUserDepartments'
import MoolyaSelect from '../../../commons/components/select/MoolyaSelect'

let FontAwesome = require('react-fontawesome');
let Select = require('react-select');

let initSwiper = () => {
  new Swiper('.blocks_in_form', {
    speed: 400,
    spaceBetween: 25,
    slidesPerView:2,
    pagination: '.swiper-pagination',
    paginationClickable: true
  });
}


export default class MlAssignBackednUserRoles extends React.Component{
  constructor(props){
    super(props)
    this.state={
      roleForm:[],
      roleDetails:[{ userRole: null,validFrom:'',validTo:'',status:false, department:"", subDepartment:"" }],
      selectedRole:""
    }
    this.findUserDepartments.bind(this);
    return this;

    this.getUserDepSubDep = this.getUserDepSubDep.bind(this);
  }

  componentDidMount() {
    const resp=this.findUserDepartments();
    $(function () {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
    setTimeout(function () {
      initSwiper();
    }, 1000)

  }

  optionsBySelectRole(index, selectedValue){
      console.log(index)
      let roleDetails = this.state.roleDetails
      roleDetails[index]['userRole']=selectedValue
      this.setState({roleDetails:roleDetails})
      this.props.getAssignedRoles(this.state.roleDetails)
  }

  addRoleComponent(){
      var mySwiper = new Swiper('.blocks_in_form', {
        // speed: 400,
        pagination: '.swiper-pagination',
        spaceBetween: 0,
        slidesPerView:'auto',
        freeMode:true,
        paginationClickable: false
      });
      mySwiper.updateContainerSize()
      this.setState({
        roleDetails: this.state.roleDetails.concat([{ userRole: null,validFrom:'',validTo:'',status:false, department:"", subDepartment:"" }])
      });
  }

  onChange(id,event, department){
      let filedName=event.target.name
      let fieldValue=event.target.value;
      if(filedName=='status'){
        fieldValue=event.target.checked;
      }
      let roleDetails=this.state.roleDetails
      // if(department){
      //   roleDetails[id]['department'] = department.department;
      //   roleDetails[id]['subDepartment'] = department.subDepartment
      // }

      this.setState({roleDetails:roleDetails})
      this.props.getAssignedRoles(this.state.roleDetails)
  }

  onClickDate(id,event){
      let filedName=event.target.name
      let fieldId=filedName+id
      $("#"+fieldId).datepicker({ format: this.state.dateformate });
      $("#"+fieldId).focus();
  }

  componentWillReceiveProps(nextProps, nextState){
      if((this.props.userId !==nextProps.userId)) {
          const resp=this.findUserDepartments();
      }
  }

  async findUserDepartments(){
     let userId = this.props.userId;
      const response = await findUserDepartmentypeActionHandler(userId);
      // let data = {response:response && response.profile && response.profile && response.profile:||""}
      let data = response ? response && response.profile && response.profile.InternalUprofile && response.profile.InternalUprofile.moolyaProfile && response.profile.InternalUprofile.moolyaProfile.assignedDepartment : []
      this.setState({loading:false,roleForm:data});
  }

  render(){
    let that = this
    let userDepartments = that.state.roleForm || [];
    let roleDetails = that.state.roleDetails
    return(
      <div>
        {userDepartments.map(function (department) {
          let queryOptions = {options: { variables: {departmentId:department.department, subdepartmentId:department.subDepartment}}};
          let query = gql`query($departmentId:String, $subdepartmentId:String){data:fetchRolesByDepSubDep(departmentId: $departmentId, subDepartmentId: $subdepartmentId) {value:_id, label:roleName}}`;
          return(
            <div className="panel panel-default">
              <div className="panel-heading">Assign Role</div>
              <div className="panel-body">
                <div className="form-group">
                  <input type="text" placeholder="Department" className="form-control float-label" id="Dept" value={department.department}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Department" className="form-control float-label" id="sDept"
                         value={department.subDepartment}/>
                </div>
                <div className="swiper-container blocks_in_form">
                  <div className="swiper-wrapper">
                    {roleDetails.map(function (details, idx) {
                      return(
                        <div className="form_inner_block swiper-slide">
                          <div className="add_form_block"><img src="/images/add.png" onClick={that.addRoleComponent.bind(that, department)}/></div>
                          <div className="form-group">
                            <MoolyaSelect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={query} queryOptions={queryOptions} isDynamic={true} onSelect={that.optionsBySelectRole.bind(that, idx)} selectedValue={details.userRole}/>
                          </div>
                          <div className="form-group left_al">
                            <input type="text" placeholder="Valid from" id={'validFrom'+idx} onClick={that.onClickDate.bind(that,idx)} className="form-control float-label" name={'validFrom'} onBlur={that.onChange.bind(that,idx, event)} value={details.validFrom} />
                          </div>
                          <div className="form-group left_al">
                            <input type="text" placeholder="Valid to" id={'validTo'+idx} onClick={that.onClickDate.bind(that,idx)} className="form-control float-label" name={'validTo'} onBlur={that.onChange.bind(that,idx, event)} value={details.validTo} />
                          </div>
                          <div className="form-group switch_wrap">
                            <label>Status</label>
                            <label className="switch">
                              <input type="checkbox" name={'status'} value={details.status} onChange={that.onChange.bind(that,idx)}/>
                              <div className="slider"></div>
                            </label>
                          </div>
                          <br className="brclear"/>
                        </div>
                      )
                    })}
                  </div>
                  <br className="brclear"/>
                  <div className="swiper-pagination"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
