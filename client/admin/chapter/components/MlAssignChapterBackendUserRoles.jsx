import React from "react";
import {render} from "react-dom";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {findUserDepartmentypeActionHandler} from "../actions/findUserDepartments";
import MoolyaSelect from "../../../commons/components/select/MoolyaSelect";

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


export default class MlAssignChapterBackendUserRoles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      roleForm: [],
      roleDetails: [{
        roleId: null,
        validFrom: '',
        validTo: '',
        isActive: '',
        clusterId: this.props.clusterId,
        chapterId: this.props.chapterId,
        subChapterId: this.props.subChapterId,
        communityId: "",
        hierarchyLevel: "",
        hierarchyCode: "",
        departmentId: '',
        departmentName: '',
        subDepartmentId: '',
        subDepartmentName: ''
      }],
      selectedRole: "",
      chapterAdmin: false
    }
    this.findUserDepartments.bind(this);
    this.isChapterAdmin.bind(this);
    return this;
  }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });

    // $('.switch input').change(function () {
    //   if ($(this).is(':checked')) {
    //     $(this).parent('.switch').addClass('on');
    //   } else {
    //     $(this).parent('.switch').removeClass('on');
    //   }
    // });
    // setTimeout(function () {
    //   // initSwiper();
    // }, 1000)

    if (this.props.userId) {
      const resp = this.findUserDepartments();
    }

  }

  optionsBySelectRole(index, did, selectedValue, callback, selObject) {
    if (selObject.label == "subchapteradmin") {
      $("#chapter_admin_check").removeAttr('disabled');
    } else {
      this.setState({chapterAdmin: false});
      this.props.getChapterAdmin(false);
      $("#chapter_admin_check").attr('disabled', 'disabled');
    }
    let roleDetails = this.state.roleDetails;
    roleDetails[index]['roleId'] = selectedValue;
    roleDetails[index]['departmentId'] = this.state.roleForm[did]['department'];
    roleDetails[index]['departmentName'] = this.state.roleForm[did]['departmentName'];
    roleDetails[index]['subDepartmentId'] = this.state.roleForm[did]['subDepartment'];
    roleDetails[index]['subDepartmentName'] = this.state.roleForm[did]['subDepartmentName'];
    this.setState({roleDetails: roleDetails})
    this.props.getAssignedRoles(this.state.roleDetails)
  }

  addRoleComponent(id) {
    this.setState({
      roleDetails: this.state.roleDetails.concat([{
        roleId: null,
        validFrom: '',
        validTo: '',
        isActive: '',
        clusterId: this.props.clusterId,
        chapterId: this.props.chapterId,
        subChapterId: this.props.subChapterId,
        communityId: "",
        hierarchyLevel: "",
        hierarchyCode: "",
        departmentId: '',
        departmentName: '',
        subDepartmentId: '',
        subDepartmentName: ''
      }])
    });
  }

  isChapterAdmin(event) {
    this.setState({chapterAdmin: event.target.checked})
    this.props.getChapterAdmin(event.target.checked)
  }

  onChange(id, event) {
    let roleDetails = this.state.roleDetails
    if (event.target.checked) {
      roleDetails[id]['isActive'] = true;
    } else {
      roleDetails[id]['isActive'] = false;
    }
    console.log("1")
    this.setState({roleDetails: roleDetails})
    console.log("2")
    this.props.getAssignedRoles(this.state.roleDetails)
    console.log("6")
  }

  onClickDate(id, event) {
    let filedName = event.target.name
    let fieldId = filedName + id
    $("#" + fieldId).datepicker({format: 'dd-mm-yyyy', autoclose: true, stateDate: '+0d'});
    $("#" + fieldId).focus();
  }

  onValidFromChange(index, event) {
    let roleDetails = this.state.roleDetails
    roleDetails[index]['validFrom'] = event.target.value
    this.setState({roleDetails: roleDetails})
    this.props.getAssignedRoles(this.state.roleDetails)
  }

  onValidToChange(index, event) {
    let roleDetails = this.state.roleDetails
    roleDetails[index]['validTo'] = event.target.value
    this.setState({roleDetails: roleDetails})
    this.props.getAssignedRoles(this.state.roleDetails)
  }

  componentWillReceiveProps(nextProps, nextState) {
    if ((this.props.userId !== nextProps.userId)) {
      const resp = this.findUserDepartments();
    }
  }
  checkValue(value){
    console.log(value);
  }
  async findUserDepartments() {
    let userId = this.props.userId;
    let subChapterId = this.props.subChapterId;
    const response = await findUserDepartmentypeActionHandler(userId, subChapterId);
    let data = response ? response : []
    this.setState({loading: false, roleForm: data});
    if (this.props.assignedRoles && this.props.assignedRoles.length > 0) {
      this.setState({roleDetails: this.props.assignedRoles})
      this.setState({chapterAdmin: this.props.chapterAdmin})
    }
  }

  render() {
    let that = this
    let userDepartments = that.state.roleForm || [];
    let roleDetails = that.state.roleDetails;
    console.log("5")
    let chapterAdmin = that.state.chapterAdmin;

    // const roles = roleDetails.map(function (details, idx)
    // {
    //   return (
    //     <div className="form_inner_block" key={idx}>
    //       <div className="add_form_block"><img src="/images/add.png"
    //                                            onClick={that.addRoleComponent.bind(that, idx)}/>
    //       </div>
    //       <div className="form-group">
    //         {details.roleName?<input type="text" defaultValue={details.roleName}
    //                                  className="form-control float-label"
    //                                  disabled="true"/>:
    //           <MoolyaSelect multiSelect={false} className="form-control float-label"
    //                         valueKey={'value'}
    //                         labelKey={'label'} queryType={"graphql"} query={query}
    //                         queryOptions={queryOptions} isDynamic={true}
    //                         onSelect={that.optionsBySelectRole.bind(that, idx, id)}
    //                         selectedValue={details.roleId}/>}
    //       </div>
    //       <div className="form-group left_al">
    //         <input type="text" placeholder="Valid from" id={'validFrom' + idx} name={'validFrom'}
    //                onClick={that.onClickDate.bind(that, idx)} className="form-control float-label"
    //                onBlur={that.onValidFromChange.bind(that, idx)}
    //                value={details.validFrom}/>
    //       </div>
    //       <div className="form-group left_al">
    //         <input type="text" placeholder="Valid to" id={'validTo' + idx} name={'validTo'}
    //                onClick={that.onClickDate.bind(that, idx)} className="form-control float-label"
    //                onBlur={that.onValidToChange.bind(that, idx)}
    //                value={details.validTo}/>
    //       </div>
    //       <div className="form-group switch_wrap">
    //         <label>Status</label>
    //         <label className="switch">
    //           <input type="checkbox" name={'status'} checked={details.isActive}
    //                  onChange={that.onChange.bind(that, idx)}/>
    //           <div className="slider"></div>
    //         </label>
    //       </div>
    //       <br className="brclear"/>
    //     </div>
    //   )
    // })

    return (
      <div>
        {userDepartments.map(function (department, id) {
          let queryOptions = {
            options: {
              variables: {
                departmentId: department.department,
                clusterId: that.props.clusterId,
                chapterId: that.props.chapterId,
                subChapterId: that.props.subChapterId
              }
            }
          };
          let query = gql`query($departmentId:String, $clusterId:String, $chapterId:String, $subChapterId:String){data:fetchRolesByDepSubDep(departmentId: $departmentId, clusterId: $clusterId, chapterId: $chapterId, subChapterId: $subChapterId) {value:_id, label:roleName}}`;
          return (
            <div className="panel panel-default" key={id}>
              <div className="panel-heading">Assign Role</div>
              {department.isAvailiable ? (
                <div className="panel-body">
                  <div className="form-group">
                    <input type="text" placeholder="Department" className="form-control float-label" id="Dept"
                           value={department.departmentName}/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Sub Department" className="form-control float-label" id="sDept"
                           value={department.subDepartmentName}/>
                  </div>

                  <div className="input_types"><input id="chapter_admin_check" type="checkbox" checked={chapterAdmin}
                                                      onChange={that.isChapterAdmin.bind(that)} disabled/><label
                    htmlFor="chapter_admin_check"><span></span>Is ChapterAdmin</label></div>
                  <br className="brclear"/>
                  <div className="">
                    <div className="">
                      {roleDetails.map(function (details, idx) {
                        {/*if (department.department == details.departmentId && department.subDepartment == details.subDepartmentId) */}
                        {
                          return (
                            <div className="form_inner_block" key={idx}>
                              <div className="add_form_block"><img src="/images/add.png"
                                                                   onClick={that.addRoleComponent.bind(that, idx)}/>
                              </div>
                              <div className="form-group">
                                {details.roleName ? <input type="text" defaultValue={details.roleName}
                                                           className="form-control float-label"
                                                           disabled="true"/> :
                                  <MoolyaSelect multiSelect={false} className="form-control float-label"
                                                valueKey={'value'}
                                                labelKey={'label'} queryType={"graphql"} query={query}
                                                queryOptions={queryOptions} isDynamic={true}
                                                onSelect={that.optionsBySelectRole.bind(that, idx, id)}
                                                selectedValue={details.roleId}/>}
                              </div>
                              <div className="form-group left_al">
                                <input type="text" placeholder="Valid from" id={'validFrom' + idx} name={'validFrom'}
                                       onClick={that.onClickDate.bind(that, idx)} className="form-control float-label"
                                       onBlur={that.onValidFromChange.bind(that, idx)}
                                       value={details.validFrom}/>
                              </div>
                              <div className="form-group left_al">
                                <input type="text" placeholder="Valid to" id={'validTo' + idx} name={'validTo'}
                                       onClick={that.onClickDate.bind(that, idx)} className="form-control float-label"
                                       onBlur={that.onValidToChange.bind(that, idx)}
                                       value={details.validTo}/>
                              </div>
                              <div className="form-group switch_wrap">
                                <label>Status</label>
                                <label className="switch">
                                  <input type="checkbox" name={'status'} checked={details.isActive}
                                         onChange={that.onChange.bind(that, idx)}/>
                                  <div className="slider"></div>
                                </label>
                              </div>
                              <br className="brclear"/>
                            </div>
                          )
                        }
                      })}
                    </div>
                    <br className="brclear"/>

                  </div>
                </div>
              ) :
                <div className="panel-body">
                  <div className="form-group">
                    <input type="text" placeholder="Department" className="form-control float-label" id="Dept"
                           value={department.departmentName}/>
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
