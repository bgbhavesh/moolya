import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {addProfessionActionHandler} from '../actions/addProfessionTypeAction'
class MlAddProfession extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      selectedIndustry:''
    }
    this.addEventHandler.bind(this);
    this.createProfession.bind(this)
    this.onIndustrySelect.bind(this)
    return this;
  }

  async addEventHandler() {
    const resp = await this.createProfession();
    return resp;
  }

  onIndustrySelect(val) {
    this.setState({selectedIndustry: val})
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    FlowRouter.go("/admin/settings/professionList");
  };

  async  createProfession() {
    let ProfessionDetails = {
      professionName: this.refs.professionName.value,
      professionDisplayName: this.refs.professionDisplayName.value,
      industryId: this.state.selectedIndustry,
      industryName: '',
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }

    const response = await addProfessionActionHandler(ProfessionDetails)
    return response;
  }

  render() {
    let query = gql` query{
  data:fetchIndustries{label:industryName,value:_id}
}
`;

    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.createProfession.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Profession</h2>
          <div className="col-md-6">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="professionName" placeholder="Profession Name"
                       className="form-control float-label"/>
              </div>
              <div className="form-group">
                <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="professionDisplayName" placeholder="Display Name"
                       className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select Industry" className="form-control float-label" valueKey={'value'}
                              labelKey={'label'} queryType={"graphql"}
                              selectedValue={this.state.selectedIndustry}
                              query={query} isDynamic={true} onSelect={this.onIndustrySelect.bind(this)}/>
              </div>
              <div className="form-group switch_wrap">
                <label>Status</label><br/>
                <label className="switch">
                  <input type="checkbox" ref="isActive"/>
                  <div className="slider"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />
      </div>)}
    </div>
    )
  }
}
;

export default MlAddProfession = formHandler()(MlAddProfession);
