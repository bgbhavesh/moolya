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

/*let initSwiper = () => {
 new Swiper('.blocks_in_form', {
 speed: 400,
 spaceBetween: 25,
 slidesPerView:2,
 pagination: '.swiper-pagination',
 paginationClickable: true
 });
 }*/


export default class MlAssignChapterBackendUserRoles extends React.Component{
  constructor(props){
      super(props)
      this.state={
          roleForm:[],
          roleDetails:[{ roleId: null, validFrom:'', validTo:'', isActive:false, clusterId:this.props.clusterId, chapterId:this.props.chapterId, subChapterId:this.props.subChapterId,  communityId:"", hierarchyLevel:"", hierarchyCode:""}],
          selectedRole:"",
          hierarchyLevel:''
      }
      this.findUserDepartments.bind(this);
      return this;
      // this.getUserDepSubDep = this.getUserDepSubDep.bind(this);
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
     // initSwiper();
    }, 1000)

    if(this.props.userId) {
      const resp = this.findUserDepartments();
      /*if (this.props.assignedRoles && this.props.assignedRoles.length > 0) {
        this.setState({roleDetails: this.props.assignedRoles})
      }*/
    }

  }

  optionsBySelectRole(index, selectedValue){
      console.log(index)
      let roleDetails = this.state.roleDetails
      roleDetails[index]['roleId']=selectedValue
      this.setState({roleDetails:roleDetails})
      this.props.getAssignedRoles(this.state.roleDetails)
  }

  addRoleComponent(id){
     /* var mySwiper = new Swiper('.blocks_in_form', {
        // speed: 400,
        pagination: '.swiper-pagination',
        spaceBetween: 0,
        slidesPerView:'auto',
        freeMode:true,
        paginationClickable: false
      });
      mySwiper.updateContainerSize()*/
      this.setState({
          roleDetails: this.state.roleDetails.concat([{ roleId: null, validFrom:'', validTo:'', isActive:false, clusterId:this.props.clusterId, chapterId:this.props.chapterId, subChapterId:this.props.subChapterId, communityId:"", hierarchyLevel:"", hierarchyCode:""}])

      });
  }

  optionsBySelectAction(index, event) {

   /* if (event.target.checked) {
      let value = event.target.name
      actions.push({actionId: value})
    }else {
      let flag='';
      _.each(actions,function (item,key) {
        if (item.actionId==event.target.name){
          flag=key;
        }
      })
      actions.splice(flag,1);
    }

    this.setState({assignModulesToRoles: assignModulesToRoles})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)*/
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
      $("#"+fieldId).datepicker({ format: this.state.dateformate });
      $("#"+fieldId).focus();
  }

  componentWillReceiveProps(nextProps, nextState){
      if((this.props.userId !==nextProps.userId)) {
          const resp=this.findUserDepartments();
      }

  }

  async findUserDepartments(){
    let hierarchyLevel = Meteor.user().profile.InternalUprofile.moolyaProfile.userProfiles[0].userRoles[0].hierarchyLevel;
    this.setState({hierarchyLevel: hierarchyLevel})
    let userId = this.props.userId;
    let subChapterId = this.props.subChapterId;
    const response = await findUserDepartmentypeActionHandler(userId, subChapterId);
    let data = response ? response : []
    this.setState({loading:false,roleForm:data});
    if(this.props.assignedRoles && this.props.assignedRoles.length>0){
      this.setState({roleDetails: this.props.assignedRoles})
    }
  }

  render(){
    let that = this
    let userDepartments = that.state.roleForm || [];
    let roleDetails = that.state.roleDetails
    return(
      <div>
        {userDepartments.map(function (department) {
          let queryOptions = {options: { variables: {departmentId:department.department, clusterId:that.props.clusterId,hierarchyLevel:that.state.hierarchyLevel}}};
          let query = gql`query($departmentId:String, $clusterId:String, $hierarchyLevel:String){data:fetchRolesByDepSubDepTest(departmentId: $departmentId, clusterId: $clusterId,hierarchyLevel:$hierarchyLevel) {value:_id, label:roleName}}`;
          return(
            <div className="panel panel-default">
              <div className="panel-heading">Assign Role</div>
              <div className="panel-body">
                <div className="form-group">
                  <input type="text" placeholder="Department" className="form-control float-label" id="Dept" value={department.departmentName}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Department" className="form-control float-label" id="sDept"
                         value={department.subDepartmentName}/>
                </div>

                  {/*<div className="input_types"><input id="chapter_admin_check" type="checkbox"  name="CREATE"
                                                      onChange={that.optionsBySelectAction.bind(that)}/><label
                    htmlFor="chapter_admin_check"><span></span>is ChapterAdmin</label></div>*/}

                <div className="">
                  <div className="">
                    {roleDetails.map(function (details, idx) {
                      return(
                        <div className="form_inner_block" key={details.roleId}>
                          <div className="add_form_block"><img src="/images/add.png" onClick={that.addRoleComponent.bind(that, idx)}/></div>
                          <div className="form-group">
                            <MoolyaSelect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={query} queryOptions={queryOptions} isDynamic={true} onSelect={that.optionsBySelectRole.bind(that, idx)} selectedValue={details.roleId}/>
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
                                <input type="checkbox" name={'status'}  value={details.isActive} onChange={that.onChange.bind(that,idx)}/>
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
            </div>
          )
        })}
      </div>
    )
  }
}
