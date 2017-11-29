import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { findUserDepartmentypeActionHandler, checkDefaultRole } from '../actions/findUserDepartments';
import MoolyaSelect from '../../commons/components/MlAdminSelectWrapper';
import _ from 'lodash';
import Datetime from 'react-datetime';
import moment from 'moment';
import { getAdminUserContext } from '../../../commons/getAdminUserContext'
const FontAwesome = require('react-fontawesome');

// let initSwiper = () => {
//   new Swiper('.blocks_in_form', {
//     speed: 400,
//     spaceBetween: 25,
//     slidesPerView:2,
//     pagination: '.swiper-pagination',
//     paginationClickable: true
//   });
// }


export default class MlAssignBackednUserRoles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roleForm: [],
      roleDetails: [{
        roleId: null,
        validFrom: '',
        validTo: '',
        isActive: false,
        clusterId: this.props.clusterId ? this.props.clusterId : '',
        chapterId: this.props.chapterId ? this.props.chapterId : '',
        subChapterId: this.props.subChapterId ? this.props.subChapterId : '',
        communityId: this.props.communityId ? this.props.communityId : '',
        hierarchyLevel: -1,
        hierarchyCode: ''
      }],
      selectedRole: '',
      userRoleDetails: [],
      hierarchyLevel: -1
    }
    this.findUserDepartments.bind(this);
    return this;
    // this.getUserDepSubDep = this.getUserDepSubDep.bind(this);
  }

  componentDidMount() {
    $(() => {
      $('.float-label').jvFloat();
    });
    if (this.props.userId) {
      const resp = this.findUserDepartments();
    }
    this.statusCheck();
  }
  componentDidUpdate() {
    const isActive = this.props.isActive;
    if (!isActive) {
      $('input[type=text]').prop('disabled', true);
      $('input[type=checkbox]').prop('disabled', true);
    }
  }

  optionsBySelectRole(index, did, selectedValue, callback, selObject) {
    const roleDetails = this.state.rolesData;
    const cloneBackUp = _.cloneDeep(roleDetails);
    const specificRole = cloneBackUp[did];
    specificRole.roles[index].roleId = selectedValue;
    // specificRole.roles[index]['roleName'] = selObject.label;
    specificRole.roles[index].departmentId = this.state.roleForm[did].department;
    specificRole.roles[index].departmentName = this.state.roleForm[did].departmentName;
    specificRole.roles[index].subDepartmentId = this.state.roleForm[did].subDepartment;
    specificRole.roles[index].subDepartmentName = this.state.roleForm[did].subDepartmentName;
    specificRole.roles[index].isAnchor = selObject.isAnchor ? selObject.isAnchor : false;
    roleDetails.splice(did, 1);
    roleDetails.splice(did, 0, specificRole);
    this.setState({ rolesData: roleDetails });
    this.sendRolesToParent();
  }

  sendRolesToParent() {
    const value = this.state.rolesData;
    const rolesArrayFinal = [];
    const clusterId = this.props.clusterId
    _.each(value, (item, key) => {
      _.each(item.roles, (say, val) => {
        if (say.roleId && say.clusterId == clusterId) {
          rolesArrayFinal.push(say)
        }
      })
    })
    this.props.getAssignedRoles(rolesArrayFinal);
  }

  addRoleComponent(did) {
    if (this.props.isActive) {
      const emptyRoleBox = {
        roleId: '',
        validFrom: '',
        validTo: '',
        isActive: '',
        clusterId: this.props.clusterId ? this.props.clusterId : '',
        chapterId: this.props.chapterId ? this.props.chapterId : '',
        subChapterId: this.props.subChapterId ? this.props.subChapterId : '',
        communityId: this.props.communityId ? this.props.communityId : '',
        hierarchyLevel: -1,
        hierarchyCode: '',
        departmentId: '',
        departmentName: '',
        subDepartmentId: '',
        subDepartmentName: ''
      };

      const allData = this.state.rolesData
      const specificDepartment = allData[did];
      const rolesArray = specificDepartment.roles;
      rolesArray.push(emptyRoleBox);
      this.setState({ rolesData: allData }, function () {
        setTimeout(() => {
          this.context.scrollArea.refresh();
          this.context.scrollArea.scrollBottom();
        });
      });
    }
  }

  onStatusChange(index, did, event) {
    const value = event.target.checked
    const roleDetails = this.state.rolesData;
    const cloneBackUp = _.cloneDeep(roleDetails);
    const specificRole = cloneBackUp[did];
    if (!value) {
      const userData = this.state.userRoleDetails;
      if (userData.length > 0) {
        userData.map((profile) => {
          if (profile.clusterId === specificRole.roles[index].clusterId && profile.isDefault) {
            profile.isDefault && profile.userRoles.length > 1 ? toastr.error('User has multiple roles and if all are disabled login would not be possible') : toastr.error('User has a single role if disabled login would not be possible')
          }
        })
      }
    }
    specificRole.roles[index].isActive = value;
    roleDetails.splice(did, 1);
    roleDetails.splice(did, 0, specificRole);
    this.setState({ rolesData: roleDetails });
    this.sendRolesToParent();
  }

  async statusCheck() {
    const response = await checkDefaultRole(this.props.userId)
    this.setState({ userRoleDetails: response })
  }

  onValidFromChange(index, did, event) {
    if (event._d) {
      const value = moment(event._d).format('DD-MM-YYYY');
      const roleDetails = this.state.rolesData;
      const cloneBackUp = _.cloneDeep(roleDetails);
      const specificRole = cloneBackUp[did];
      specificRole.roles[index].validFrom = value;
      roleDetails.splice(did, 1);
      roleDetails.splice(did, 0, specificRole);
      this.setState({ rolesData: roleDetails });
      this.sendRolesToParent();
    }
  }

  onValidToChange(index, did, event) {
    if (event._d) {
      const value = moment(event._d).format('DD-MM-YYYY');
      const roleDetails = this.state.rolesData;
      const cloneBackUp = _.cloneDeep(roleDetails);
      const specificRole = cloneBackUp[did];
      specificRole.roles[index].validTo = value;
      roleDetails.splice(did, 1);
      roleDetails.splice(did, 0, specificRole);
      this.setState({ rolesData: roleDetails });
      this.sendRolesToParent();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.userId !== nextProps.userId)) {
      const resp = this.findUserDepartments();
    }
  }

  rolesArrayCreate(departmentDetails, assignedRoles) {
    const emptyRoleBox = [{
      roleId: '',
      validFrom: '',
      validTo: '',
      isActive: '',
      clusterId: this.props.clusterId ? this.props.clusterId : '',
      chapterId: this.props.chapterId ? this.props.chapterId : '',
      subChapterId: this.props.subChapterId ? this.props.subChapterId : '',
      communityId: this.props.communityId ? this.props.communityId : '',
      hierarchyLevel: -1,
      hierarchyCode: '',
      departmentId: '',
      departmentName: '',
      subDepartmentId: '',
      subDepartmentName: ''
    }];

    const mainAry = [];
    _.each(departmentDetails, (item, value) => {
      const json = {};
      json.departmentName = item.departmentName;
      json.subDepartmentName = item.subDepartmentName;
      json.departmentId = item.department;
      json.subDepartmentId = item.subDepartment;
      json.isAvailiable = item.isAvailiable;
      const ary = [];
      _.each(assignedRoles, (say, val) => {
        if (say.departmentId == item.department && say.subDepartmentId == item.subDepartment) {
          ary.push(say);
          json.roles = ary;
        }
      });
      mainAry.push(json)
    })

    _.each(mainAry, (item, value) => {
      if (!item.roles) {
        item.roles = emptyRoleBox
      }
    })
    this.setState({ rolesData: mainAry });
  }

  async findUserDepartments() {
    const hierarchyLevel = Meteor.user().profile.InternalUprofile.moolyaProfile.userProfiles[0].userRoles[0].hierarchyLevel;
    this.setState({ hierarchyLevel })
    const userId = this.props.userId;
    const clusterId = this.props.clusterId;
    const response = await findUserDepartmentypeActionHandler(userId, clusterId);
    const data = response || []
    this.setState({ roleForm: data });
    this.rolesArrayCreate(data, this.props.assignedRoles)
    if (this.props.assignedRoles && this.props.assignedRoles.length > 0) {
      // this.setState({roleDetails: this.props.assignedRoles})
    }
  }

  render() {
    const that = this

    const yesterday = Datetime.moment().subtract(1, 'day');
    const loggedInUser = getAdminUserContext()
    const validDate = function (current) {
      return current.isAfter(yesterday);
    }
    const clusterId = that.props.clusterId;
    const chapterId = that.props.chapterId
    const subChapterId = that.props.subChapterId
    const communityId = that.props.communityId

    const userDepartments = that.state.rolesData || [];
    return (
      <div>
        {userDepartments.map((department, id) => {
          const queryOptions = {
            options: {
              variables: {
                departmentId: department.departmentId,
                clusterId: that.props.clusterId,
                chapterId: that.props.chapterId || '',
                subChapterId: that.props.subChapterId || '',
                communityId: that.props.communityId || ''
              }
            }
          };
          const query = gql`query($departmentId:String, $clusterId:String, $chapterId:String, $subChapterId:String, $communityId:String){data:fetchRolesByDepSubDep(departmentId: $departmentId, clusterId: $clusterId, chapterId: $chapterId, subChapterId: $subChapterId, communityId:$communityId) {value:_id, label:roleName, isAnchor}}`;
          return (
            <div className="panel panel-default" key={id}>
              <div className="panel-heading">Assign Role <img
                src="/images/add.png" className="pull-right"
                onClick={that.addRoleComponent.bind(that, id)}/>
              </div>
              {department.isAvailiable ? (
                <div className="panel-body">
                  <div className="form-group">
                    <input
                      type="text" placeholder="Department" className="form-control float-label" id="Dept"
                      value={department.departmentName}/>
                  </div>
                  <div className="form-group">
                    <input
                      type="text" placeholder="Sub Department" className="form-control float-label" id="sDept"
                      value={department.subDepartmentName}/>
                  </div>
                  <div className="">
                    <div className="">
                      {department.roles.map((details, idx) => (
                        <div className="form_inner_block" key={idx}>
                          <div className="form-group">
                            {details.roleName ?
                              <input
                                type="text" defaultValue={details.roleName} className="form-control float-label"
                                disabled="true"/> :
                              <MoolyaSelect
                                multiSelect={false} className="form-control float-label"
                                valueKey={'value'}
                                labelKey={'label'} queryType={'graphql'} query={query}
                                queryOptions={queryOptions} isDynamic={true} placeholder="Select Role"
                                onSelect={that.optionsBySelectRole.bind(that, idx, id)}
                                selectedValue={details.roleId}/>}
                          </div>
                          <div className="form-group left_al">
                            {(details.clusterId == clusterId && loggedInUser.hierarchyLevel > details.hierarchyLevel) ?
                              <Datetime
                                dateFormat="DD-MM-YYYY" timeFormat={false}
                                inputProps={{ placeholder: 'Valid From', readOnly: true }}
                                isValidDate={validDate} closeOnSelect={true} value={details.validFrom}
                                onChange={that.onValidFromChange.bind(that, idx, id)}/> :
                              <input
                                type="text" defaultValue={details.validTo}
                                className="form-control float-label"
                                disabled="true"/>}
                          </div>
                          <div className="form-group left_al">
                            {(details.clusterId == clusterId && loggedInUser.hierarchyLevel > details.hierarchyLevel) ?
                              <Datetime
                                dateFormat="DD-MM-YYYY" timeFormat={false}
                                inputProps={{ placeholder: 'Valid To', readOnly: true }}
                                isValidDate={validDate} closeOnSelect={true} value={details.validTo}
                                onChange={that.onValidToChange.bind(that, idx, id)}/> :
                              <input
                                type="text" defaultValue={details.validTo}
                                className="form-control float-label"
                                disabled="true"/>}
                          </div>
                          <div className="form-group switch_wrap">
                            <label>Status</label>
                            <label className="switch">
                              {(details.clusterId == clusterId && loggedInUser.hierarchyLevel > details.hierarchyLevel) ?
                                <input
                                  type="checkbox" name={'status'} checked={details.isActive}
                                  onChange={that.onStatusChange.bind(that, idx, id)}/> :
                                <input
                                  type="checkbox" name={'status'} checked={details.isActive} disabled
                                  onChange={that.onStatusChange.bind(that, idx, id)}/>}
                              <div className="slider"></div>
                            </label>
                          </div>
                          <br className="brclear"/>
                        </div>
                      ))}
                    </div>
                    <br className="brclear"/>
                  </div>
                </div>
              ) :
                <div>
                  <div className="panel-body">
                    <div className="form-group">
                      <input
                        type="text" placeholder="Department" className="form-control float-label" id="Dept"
                        value={department.departmentName}/>
                    </div>
                    <div className="form-group">
                      <input
                        type="text" placeholder="Sub Department" className="form-control float-label" id="sDept"
                        value={department.subDepartmentName}/>
                    </div>
                    {department.roles.map((details, idx) => (
                      <div className="form_inner_block" key={idx}>
                        <div className="form-group">
                          <input
                            type="text" defaultValue={details.roleName} className="form-control float-label"
                            disabled="true"/>
                        </div>
                        <div className="form-group left_al">
                          <input
                            type="text" defaultValue={details.validTo}
                            className="form-control float-label"
                            disabled="true"/>
                        </div>
                        <div className="form-group left_al">
                          <input
                            type="text" defaultValue={details.validTo}
                            className="form-control float-label"
                            disabled="true"/>
                        </div>
                        <div className="form-group switch_wrap">
                          <label>Status</label>
                          <label className="switch">
                            <input
                              type="checkbox" name={'status'} checked={details.isActive} disabled
                              onChange={that.onStatusChange.bind(that, idx, id)}/>
                            <div className="slider"></div>
                          </label>
                        </div>
                        <br className="brclear"/>
                      </div>
                    ))}
                  </div>
                </div>
              }
            </div>
          )
        })}
      </div>
    )
  }
}

MlAssignBackednUserRoles.contextTypes = {
  scrollArea: React.PropTypes.object
};
