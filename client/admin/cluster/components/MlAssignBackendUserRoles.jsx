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

// let initSwiper = () => {
//   new Swiper('.blocks_in_form', {
//     speed: 400,
//     spaceBetween: 25,
//     slidesPerView:2,
//     pagination: '.swiper-pagination',
//     paginationClickable: true
//   });
// }


export default class MlAssignBackednUserRoles extends React.Component{
  constructor(props){
      super(props)
      this.state={
          roleForm:[],
          roleDetails:[{
            roleId: null,
            validFrom:'', validTo:'',
            isActive:false,
            clusterId: this.props.clusterId?this.props.clusterId:"",
            chapterId: this.props.chapterId?this.props.chapterId:"",
            subChapterId: this.props.subChapterId?this.props.subChapterId:"",
            communityId: this.props.communityId?this.props.communityId:"",
            hierarchyLevel:"",
            hierarchyCode:""
          }],
          selectedRole:"",
          hierarchyLevel:''
      }
      this.findUserDepartments.bind(this);
      return this;
      // this.getUserDepSubDep = this.getUserDepSubDep.bind(this);
  }
  componentDidMount() {
    // const resp=this.findUserDepartments();
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
      // initSwiper();
    }, 1000)

    if(this.props.userId) {
      const resp = this.findUserDepartments();
      // if (this.props.assignedRoles && this.props.assignedRoles.length > 0) {
      //   this.setState({roleDetails: this.props.assignedRoles})
      // }
    }

  }
  optionsBySelectRole(index, selectedValue){
      console.log(index)
      let roleDetails = this.state.roleDetails
      roleDetails[index]['roleId']=selectedValue
      this.setState({roleDetails:roleDetails})
      this.props.getAssignedRoles(this.state.roleDetails)
  }

  addRoleComponent(){
      // var mySwiper = new Swiper('.blocks_in_form', {
      //   // speed: 400,
      //   pagination: '.swiper-pagination',
      //   spaceBetween: 0,
      //   slidesPerView:'auto',
      //   freeMode:true,
      //   paginationClickable: false
      // });
      // mySwiper.updateContainerSize()
      this.setState({
        roleDetails: this.state.roleDetails.concat([{
          roleId: null,
          validFrom: '',
          validTo: '',
          isActive: false,
          clusterId: this.props.clusterId?this.props.clusterId:"",
          chapterId: this.props.chapterId?this.props.chapterId:"",
          subChapterId: this.props.subChapterId?this.props.subChapterId:"",
          communityId: this.props.communityId?this.props.communityId:"",
          hierarchyLevel: "",
          hierarchyCode: ""
        }])
      })

  }

  onChange(id,event){
      let roleDetails=this.state.roleDetails
      let filedName=event.target.name
      let fieldValue=event.target.value;
      if(filedName=='status'){
        fieldValue=event.target.checked;
        roleDetails[id]['isActive']=fieldValue
      }
      else {
          roleDetails[id][[filedName]]=fieldValue
      }
      this.setState({roleDetails:roleDetails})
      this.props.getAssignedRoles(this.state.roleDetails)
  }

  onClickDate(id,event){
      let filedName=event.target.name
      let fieldId=filedName+id
      // $("#"+fieldId).datepicker({ format: this.state.dateformate });
      $("#"+fieldId).datepicker({ format: 'dd-mm-yyyy', startDate:'+0d',autoclose:true });
      $("#"+fieldId).focus();
  }

  componentWillReceiveProps(nextProps){
      if((this.props.userId !==nextProps.userId)) {
          const resp=this.findUserDepartments();
      }
  }

  async findUserDepartments(){
    let hierarchyLevel = Meteor.user().profile.InternalUprofile.moolyaProfile.userProfiles[0].userRoles[0].hierarchyLevel;
    this.setState({hierarchyLevel: hierarchyLevel})
    let userId = this.props.userId;
    let clusterId = this.props.clusterId;
    const response = await findUserDepartmentypeActionHandler(userId, clusterId);
    let data = response ? response : []
    this.setState({loading:false,roleForm:data});
    if(this.props.assignedRoles && this.props.assignedRoles.length>0){
      this.setState({roleDetails: this.props.assignedRoles})
    }
  }

  render(){
    let that = this
    let userDepartments = that.state.roleForm || [];
    let roleDetails =  that.state.roleDetails;
    return(
      <div>
        {userDepartments.map(function (department, id) {
          let queryOptions = {options: { variables: {departmentId:department.department, clusterId:that.props.clusterId}}};
          let query = gql`query($departmentId:String, $clusterId:String){data:fetchRolesByDepSubDep(departmentId: $departmentId, clusterId: $clusterId) {value:_id, label:roleName}}`;
          return(
            <div className="panel panel-default" key={id}>
              <div className="panel-heading">Assign Role</div>
              {department.isAvailiable?(
              <div className="panel-body">
                <div className="form-group">
                  <input type="text" placeholder="Department" className="form-control float-label" id="Dept" value={department.departmentName}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Department" className="form-control float-label" id="sDept"
                         value={department.subDepartmentName}/>
                </div>
                <div className="">
                  <div className="">
                    {roleDetails.map(function (details, idx) {
                      return(
                        <div className="form_inner_block" key={idx}>
                          <div className="add_form_block"><img src="/images/add.png" onClick={that.addRoleComponent.bind(that, department)}/></div>
                          <div className="form-group">
                            {/*<MoolyaSelect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={query} queryOptions={queryOptions} isDynamic={true} onSelect={that.optionsBySelectRole.bind(that, idx)} selectedValue={details.roleId}/>*/}
                            {details.roleName?<input type="text" defaultValue={details.roleName} className="form-control float-label" disabled="true"/> :
                              <MoolyaSelect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                            labelKey={'label'} queryType={"graphql"} query={query}
                                            queryOptions={queryOptions} isDynamic={true}
                                            onSelect={that.optionsBySelectRole.bind(that, idx)}
                                            selectedValue={details.roleId}/>}
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
                                <input type="checkbox" name={'status'} checked={details && details.isActive} onChange={that.onChange.bind(that,idx)}/>
                                <div className="slider"></div>
                            </label>
                          </div>
                          <br className="brclear"/>
                        </div>
                      )
                    })}
                  </div>
                  <br className="brclear"/>
                </div>
              </div>
                ):
                <div className="panel-body">
                  <div className="form-group">
                    <input type="text" placeholder="Department" className="form-control float-label" id="Dept" value={department.departmentName}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Sub Department" className="form-control float-label" id="sDept"
                           value={department.subDepartmentName}/>
                  </div>

                </div>}
            </div>
          )
        })}
      </div>
    )
  }
}
