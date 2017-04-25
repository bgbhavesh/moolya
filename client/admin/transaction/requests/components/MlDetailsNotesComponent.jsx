import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {findBackendUserActionHandler} from '../actions/findUserAction'
export default class MlDetailsNotesComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      role:'',
      departmentName:'',
      subDepartmentName:'',
      profileImage:''
    }
    return this;
  }
  componentWillReceiveProps(newProps){
    let userId=newProps.transaction.userId
    if(userId){
      const resp=this.findBackendUser()
      return resp;
    }
  }
  async findBackendUser() {
    let userTypeId = this.props.transaction.userId
    const response = await findBackendUserActionHandler(userTypeId);
    if(response){
      this.setState({userDetais:response})
        let userDetails=this.state.userDetais
      if(userDetails.profile.isInternaluser){
          let userInternalProfile=userDetails.profile.InternalUprofile.moolyaProfile.userProfiles
        if(userInternalProfile){
          let roleIds=[]
          let hirarichyLevel=[]
          userInternalProfile.map(function (doc,index) {
            if(doc.isDefault) {
              let userRoles = doc && doc.userRoles ? doc.userRoles : [];
              userRoles.map(function (doc, index) {
                hirarichyLevel.push(doc.hierarchyLevel)

              });
              hirarichyLevel.sort(function (a, b) {
                return b - a
              });
              for (let i = 0; i < userRoles.length; i++) {
                if (userRoles[i].hierarchyLevel == hirarichyLevel[0]) {
                  roleIds.push(userRoles[i]);
                  break
                }
              }
            }
          });

          if(roleIds.length==1){
            this.setState({"role":roleIds[0].roleName})
            this.setState({"departmentName":roleIds[0].departmentName})
            this.setState({"subDepartmentName":roleIds[0].subDepartmentName})
          }

        }
        this.setState({profileImage:userDetails.profile.profileImage})
      }
    }
  }
  render() {
    let that=this;
    return (
      <div className="ml_tabs">
        <ul  className="nav nav-pills">
          <li className="active">
            <a  href={`#details${that.props.id}`} data-toggle="tab">Details</a>
          </li>
          <li><a href={`#notes${that.props.id}`} data-toggle="tab">Notes</a>
          </li>
        </ul>

        <div className="tab-content clearfix">
          <div className="tab-pane active" id={`details${that.props.id}`}>
            <div className="row">
              <div className="col-md-9 nopadding">
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" placeholder="Approval for" defaultValue={that.props.transaction.requestTypeName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group col-md-6 nopadding-left">
                    <input type="text" placeholder="Department" value={that.state.departmentName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group col-md-6 nopadding-right">
                    <input type="text" placeholder="Sub-Department" value={that.state.subDepartmentName} className="form-control float-label" id=""/>
                  </div>
                  <div className="clearfix"></div>
                  <div className="form-group">
                    <input type="text" placeholder="Role" value={that.state.role} className="form-control float-label" id=""/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" placeholder="Device name" defaultValue="" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Device ID" defaultValue="" className="form-control float-label" id=""/>
                  </div>
                  <div className="ml_btn">
                    {/*<a href="#" className="save_btn">View</a>*/}
                    <a href="#" className="cancel_btn">Actions</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="profile_block">
                  <img src={that.state.profileImage} />
                  <span>
                  Miland<br />Hyderabad,India
                </span>
                </div>
              </div>

            </div>
          </div>
          <div className="tab-pane" id={`notes${that.props.id}`}>
            <div className="row">
              <div className="col-md-9">
                <div className="form-group">
                  <textarea placeholder="Notes" defaultValue={that.props.transaction.requestDescription} className="form-control float-label" id=""></textarea>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="profile_block">
                  <img src={that.state.profileImage} />
                  <span>
                  Miland<br />Hyderabad,India
                </span>
                </div>
              </div>



            </div>
          </div>


        </div>

      </div>

    );
  }
}
