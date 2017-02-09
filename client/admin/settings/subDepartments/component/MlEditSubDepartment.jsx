import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
class MlEditSubDepartment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      subDepartmentName: '',
      displayName: '',
      about: '',
      selectCluster: '',
      email: '',
      status: false
    };
    this.addEventHandler.bind(this);
    this.editSubDepartment.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.status){
      $('#status').prop('checked', true);
    }
  }

  componentWillMount() {
    this.setState ({
      subDepartmentName: 'kjahsdjha',
      displayName: 'jkahskjdhkjh khkh kh',
      about: 'lkjhaslkjl asj lkljlk a',
      selectCluster: 'select cluster',
      email: 'hakjs dkjhsah@hsadkha sjkahs k',
      status: true
    })
  }

  async addEventHandler() {
    const resp=await this.editSubDepartment();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/cluster");
  };

  async  editSubDepartment() {
    let SubDepartmentDetails = {
      subDepartmentName: this.refs.subDepartmentName.value,
      displayName: this.refs.displayName.value,
      about: this.refs.about.value,
      selectCluster: this.refs.selectCluster.value,
      email: this.refs.email.value,
      status: this.refs.status.checked
    }
    console.log(SubDepartmentDetails)

    //const response = await createClusterActionHandler(clusterDetails)
    return SubDepartmentDetails;

  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.editSubDepartment.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Edit Sub Department</h2>
          <div className="col-md-6">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="subDepartmentName" defaultValue={this.state.subDepartmentName} placeholder="Sub Department Name" className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <textarea ref="about" defaultValue={this.state.about} placeholder="About" className="form-control float-label" id=""></textarea>

                </div>
                <div className="form-group">
                  <input type="text" ref="email" defaultValue={this.state.email} placeholder="Sub Department Email ID" className="form-control float-label" id=""/>

                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="displayName" defaultValue={this.state.displayName} placeholder="Display Name" className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <select placeholder="Select Cluster" ref="selectCluster" defaultValue={this.state.selectCluster} className="form-control float-label">
                    <option>Select Cluster</option>
                  </select>
                </div>

                <div className="form-group switch_wrap">
                  <label>Status</label><br/>
                  <label className="switch">
                    <input type="checkbox" ref="status" id="status" defaultValue={this.state.status}/>
                    <div className="slider"></div>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
          />
        </div>


      </div>
    )
  }
};

export default MoolyaEditSubDepartment = formHandler()(MlEditSubDepartment);
