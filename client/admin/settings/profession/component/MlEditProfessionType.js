import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findProfessionActionHandler} from '../actions/findProfessionTypeAction'
import {updateProfessionTypeActionHandler} from '../actions/updateProfessionTypeAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlEditProfessionType extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.updateProfessionType.bind(this)
    this.findProfessionType.bind(this);
    this.onIndustrySelect.bind(this);
    return this;
  }

  componentWillMount() {
    const resp=this.findProfessionType();
    return resp;
  }
  componentDidMount(){
    /*if(this.state.data.isActive){
     $('#status').prop('checked', true);
     }*/
  }
  componentDidUpdate()
  {
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }
  onIndustrySelect(val) {
    if(val){
      this.setState({selectedIndustry: val})
    }else {
      this.setState({selectedIndustry: this.state.data.industryId})
    }
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/professionList");
      else
        toastr.error(response.result);
    }
  };

  async findProfessionType(){
    let ProfessionTypeId=this.props.config
    const response = await findProfessionActionHandler(ProfessionTypeId);
    this.setState({loading:false,data:response});
    this.onIndustrySelect();
  }
  async  updateProfessionType() {
    let ProfessionType = {
      id: this.refs.id.value,
      professionName: this.refs.professionName.value,
      professionDisplayName: this.refs.professionDisplayName.value,
      industryId: this.state.selectedIndustry,
      industryName: '',
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }
    const response = await updateProfessionTypeActionHandler(ProfessionType)
    return response;

  }

  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"isActive":true}});
    }else{
      this.setState({"data":{"isActive":false}});
    }
  }

  render(){
    let query = gql` query{
  data:fetchIndustries{label:industryName,value:_id}
}
`;

    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateProfessionType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      // {
      //   showAction: true,
      //   actionName: 'add',
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ];

    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(

            <div className="admin_padding_wrap">
              <h2>Edit Profession</h2>
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="id" defaultValue={this.state.data&&this.state.data.id} hidden="true"/>
                    <input type="text" ref="professionName" placeholder="Profession Name" defaultValue={this.state.data&&this.state.data.professionName}
                           className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <textarea ref="about" placeholder="About" defaultValue={this.state.data&&this.state.data.about} className="form-control float-label"></textarea>
                  </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="professionDisplayName" placeholder="Display Name"
                           className="form-control float-label" defaultValue={this.state.data&&this.state.data.professionDisplayName}/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Select Industry" className="form-control float-label" valueKey={'value'}
                                  labelKey={'label'} queryType={"graphql"}
                                  selectedValue={this.state.selectedIndustry}
                                  query={query} isDynamic={true} onSelect={this.onIndustrySelect.bind(this)}/>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                      <div className="slider"></div>
                    </label>
                  </div>
                  </form>
                </div>
              </div>

            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
            />
          </div>)}
      </div>

    )
  }
};

export default MlEditProfessionType = formHandler()(MlEditProfessionType);
