import React from "react";
import {render} from "react-dom";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {findUserDepartmentypeActionHandler} from "../actions/findUserDepartments";
import MoolyaSelect from "../../../commons/components/select/MoolyaSelect";
import _ from "lodash";
import Datetime from "react-datetime";
import moment from "moment";
import {getAdminUserContext} from '../../../commons/getAdminUserContext'
let FontAwesome = require('react-fontawesome');

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
        roleId: '',
        validFrom: '',
        validTo: '',
        isActive: '',
        clusterId: this.props.clusterId ? this.props.clusterId : "",
        chapterId: this.props.chapterId ? this.props.chapterId : "",
        subChapterId: this.props.subChapterId ? this.props.subChapterId : "",
        communityId: this.props.communityId ? this.props.communityId : "",
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
    if (this.props.userId) {
      const resp = this.findUserDepartments();
    }
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
  }

  optionsBySelectRole(index, did, selectedValue, callback, selObject) {
    let roleDetails = this.state.rolesData;
    let cloneBackUp = _.cloneDeep(roleDetails);
    let specificRole = cloneBackUp[did];
    specificRole.roles[index]['roleId'] = selectedValue;
    // specificRole.roles[index]['roleName'] = selObject.label;
    specificRole.roles[index]['departmentId'] = this.state.roleForm[did]['department'];
    specificRole.roles[index]['departmentName'] = this.state.roleForm[did]['departmentName'];
    specificRole.roles[index]['subDepartmentId'] = this.state.roleForm[did]['subDepartment'];
    specificRole.roles[index]['subDepartmentName'] = this.state.roleForm[did]['subDepartmentName'];
    roleDetails.splice(did, 1);
    roleDetails.splice(did, 0, specificRole);
    this.setState({loading: false, rolesData: roleDetails});

    if (this.state.roleForm[did]['departmentName'] === "operations") {
      if (selObject.label == "subchapteradmin") {
        // $("#chapter_admin_check").removeAttr('disabled');
      } else {
        this.setState({chapterAdmin: false});
        this.props.getChapterAdmin(false);
        // $("#chapter_admin_check").attr('disabled', 'disabled');
      }
    }
    this.sendRolesToParent();
  }

  sendRolesToParent() {
    let value = this.state.rolesData;
    let rolesArrayFinal = [];
    let clusterId = this.props.clusterId
    _.each(value, function (item, key) {
      _.each(item.roles, function (say, val) {
        if (say.roleId && say.clusterId == clusterId) {
          rolesArrayFinal.push(say)
        }
      })
    })
    this.props.getAssignedRoles(rolesArrayFinal);
  }

  addRoleComponent(did) {
    let emptyRoleBox = {
      roleId: '',
      validFrom: '',
      validTo: '',
      isActive: '',
      clusterId: this.props.clusterId ? this.props.clusterId : "",
      chapterId: this.props.chapterId ? this.props.chapterId : "",
      subChapterId: this.props.subChapterId ? this.props.subChapterId : "",
      communityId: this.props.communityId ? this.props.communityId : "",
      hierarchyLevel: "",
      hierarchyCode: "",
      departmentId: '',
      departmentName: '',
      subDepartmentId: '',
      subDepartmentName: ''
    };

    let allData = this.state.rolesData
    let specificDepartment = allData[did];
    let rolesArray = specificDepartment.roles;
    rolesArray.push(emptyRoleBox);
    this.setState({rolesData: allData});
  }

  isChapterAdmin(did, event) {
    let roleDetails = this.state.rolesData;
    let cloneBackUp = _.cloneDeep(roleDetails);
    let specificRole = cloneBackUp[did];
    specificRole.roles[0]['roleName'] = '';
    roleDetails.splice(did, 1);
    roleDetails.splice(did, 0, specificRole);
    this.setState({loading: false, rolesData: roleDetails, chapterAdmin: event.target.checked});

    this.props.getChapterAdmin(event.target.checked)
    this.sendRolesToParent();
  }

  onStatusChange(index, did, event) {
    let value = event.target.checked
    let roleDetails = this.state.rolesData;
    let cloneBackUp = _.cloneDeep(roleDetails);
    let specificRole = cloneBackUp[did];
    specificRole.roles[index]['isActive'] = value;
    roleDetails.splice(did, 1);
    roleDetails.splice(did, 0, specificRole);
    this.setState({loading: false, rolesData: roleDetails});
    this.sendRolesToParent();
  }

  onValidFromChange(index, did, event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      let roleDetails = this.state.rolesData;
      let cloneBackUp = _.cloneDeep(roleDetails);
      let specificRole = cloneBackUp[did];
      specificRole.roles[index]['validFrom'] = value;
      roleDetails.splice(did, 1);
      roleDetails.splice(did, 0, specificRole);
      this.setState({loading: false, rolesData: roleDetails});
      this.sendRolesToParent();
    }
  }

  onValidToChange(index, did, event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      let roleDetails = this.state.rolesData;
      let cloneBackUp = _.cloneDeep(roleDetails);
      let specificRole = cloneBackUp[did];
      specificRole.roles[index]['validTo'] = value;
      roleDetails.splice(did, 1);
      roleDetails.splice(did, 0, specificRole);
      this.setState({loading: false, rolesData: roleDetails});
      this.sendRolesToParent();
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if ((this.props.userId !== nextProps.userId)) {
      const resp = this.findUserDepartments();
    }
  }

  rolesArrayCreate(departmentDetails, assignedRoles) {
    let emptyRoleBox = [{
      roleId: '',
      validFrom: '',
      validTo: '',
      isActive: '',
      clusterId: this.props.clusterId ? this.props.clusterId : "",
      chapterId: this.props.chapterId ? this.props.chapterId : "",
      subChapterId: this.props.subChapterId ? this.props.subChapterId : "",
      communityId: this.props.communityId ? this.props.communityId : "",
      hierarchyLevel: "",
      hierarchyCode: "",
      departmentId: '',
      departmentName: '',
      subDepartmentId: '',
      subDepartmentName: ''
    }];

    let mainAry = [];
    _.each(departmentDetails, function (item, value) {
      let json = {};
      json.departmentName = item.departmentName;
      json.subDepartmentName = item.subDepartmentName;
      json.departmentId = item.department;
      json.subDepartmentId = item.subDepartment;
      json.isAvailiable = item.isAvailiable;
      let ary = [];
      _.each(assignedRoles, function (say, val) {
        if (say.departmentId == item.department && say.subDepartmentId == item.subDepartment) {
          ary.push(say);
          json.roles = ary;
        }
      });
      mainAry.push(json)
    })

    _.each(mainAry, function (item, value) {
      if (!item.roles) {
        item.roles = emptyRoleBox
      }
    })
    this.setState({loading: false, rolesData: mainAry});
  }

  async findUserDepartments() {
    let userId = this.props.userId;
    let subChapterId = this.props.subChapterId;
    const response = await findUserDepartmentypeActionHandler(userId, subChapterId);
    let data = response ? response : []
    this.setState({roleForm: data});
    this.rolesArrayCreate(data, this.props.assignedRoles)
    const userDefaultObj = getAdminUserContext();
      if(userDefaultObj.hierarchyCode == 'PLATFORM')
        this.setState({hideIsChapterAdmin : true})
      else
        this.setState({hideIsChapterAdmin: false});
    if (this.props.assignedRoles && this.props.assignedRoles.length > 0) {
      this.setState({chapterAdmin: this.props.chapterAdmin})
    }
  }

  render() {
    let that = this
    // let userDepartments = that.state.roleForm || [];
    // let roleDetails = that.state.roleDetails;
    var yesterday = Datetime.moment().subtract(1, 'day');
    var validDate = function (current) {
      return current.isAfter(yesterday);
    }
    let clusterId = that.props.clusterId
    let chapterId = that.props.chapterId
    let subChapterId = that.props.subChapterId
    let communityId = ''

    let userDepartments = that.state.rolesData || [];
    let chapterAdmin = that.state.chapterAdmin;

    return (
      <div>
        {userDepartments.map(function (department, id) {
          let queryOptions = {
            options: {
              variables: {
                departmentId: department.departmentId,
                clusterId: that.props.clusterId,
                chapterId: that.props.chapterId,
                subChapterId: that.props.subChapterId,
                communityId: that.props.communityId
              }
            }
          };
          let query = gql`query($departmentId:String, $clusterId:String, $chapterId:String, $subChapterId:String){data:fetchRolesByDepSubDep(departmentId: $departmentId, clusterId: $clusterId, chapterId: $chapterId, subChapterId: $subChapterId) {value:_id, label:roleName}}`;
          return (
            <div className="panel panel-default" key={id}>
              <div className="panel-heading">Assign Role <img src="/images/add.png" className="pull-right"
                                                              onClick={that.addRoleComponent.bind(that, id)}/>
              </div>
              {department.isAvailiable ? (
                <div className="panel-body">
                  <div className="form-group">
                    <input type="text" placeholder="Department" className="form-control float-label" id="Dept"
                           value={department.departmentName} disabled/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Sub Department" className="form-control float-label" id="sDept"
                           value={department.subDepartmentName} disabled/>
                  </div>
                  {/*disabled*/}
                  {(department.departmentName == "operations" && (that.state.hideIsChapterAdmin)) ?
                    <div className="input_types"><input id="chapter_admin_check" type="checkbox" checked={chapterAdmin}
                                                        onChange={that.isChapterAdmin.bind(that, id)} /><label
                      htmlFor="chapter_admin_check"><span></span>Is ChapterAdmin</label></div> : <div></div>}

                  <br className="brclear"/>
                  <div className="">
                    <div className="">
                      {department.roles.map(function (details, idx) {
                          return (
                            <div className="form_inner_block" key={idx}>
                              <div className="form-group">
                                {details.roleName ? <input type="text" defaultValue={details.roleName}
                                                           className="form-control float-label"
                                                           disabled="true"/> :
                                  <MoolyaSelect multiSelect={false} className="form-control float-label"
                                                valueKey={'value'}
                                                labelKey={'label'} queryType={"graphql"} query={query}
                                                queryOptions={queryOptions} isDynamic={true}
                                                onSelect={that.optionsBySelectRole.bind(that, idx, id)}
                                                placeholder="Select Role"
                                                selectedValue={details.roleId}/>}
                              </div>
                              <div className="form-group left_al">
                                {/*{(details.roleName === "chapteradmin")?(subChapterId = 'all'):(subChapterId = that.props.subChapterId)}*/}
                                {(details.clusterId == clusterId && details.chapterId == chapterId && details.subChapterId == subChapterId) ?
                                  <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                            inputProps={{placeholder: "Valid From"}}
                                            isValidDate={validDate} closeOnSelect={true} value={details.validFrom}
                                            onChange={that.onValidFromChange.bind(that, idx, id)}/> :
                                  <input type="text" defaultValue={details.validTo}
                                         className="form-control float-label"
                                         disabled="true"/>}
                              </div>
                              <div className="form-group left_al">
                                {(details.clusterId == clusterId && details.chapterId == chapterId && details.subChapterId == subChapterId) ?
                                  <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                            inputProps={{placeholder: "Valid To"}}
                                            isValidDate={validDate} closeOnSelect={true} value={details.validTo}
                                            onChange={that.onValidToChange.bind(that, idx, id)}/> :
                                  <input type="text" defaultValue={details.validTo}
                                         className="form-control float-label"
                                         disabled="true"/>}
                              </div>
                              <div className="form-group switch_wrap">
                                <label>Status</label>
                                <label className="switch">
                                  {(details.clusterId == clusterId && details.chapterId == chapterId && details.subChapterId == subChapterId) ?
                                    <input type="checkbox" name={'status'} checked={details.isActive}
                                           onChange={that.onStatusChange.bind(that, idx, id)}/> :
                                    <input type="checkbox" name={'status'} checked={details.isActive} disabled
                                           onChange={that.onStatusChange.bind(that, idx, id)}/>}
                                  <div className="slider"></div>
                                </label>
                              </div>
                              <br className="brclear"/>
                            </div>
                          )
                        }
                      )}
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
//

