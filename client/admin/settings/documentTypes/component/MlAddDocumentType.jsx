import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {addDocumentTypeActionHandler} from '../actions/addDocumentTypeAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';

class MlAddDocumentType extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createDocumentType.bind(this)
    return this;
  }

  componentDidMount() {

  }

  async addEventHandler() {
    const resp=await this.createDocumentType();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/documentTypeList");
  };

  async  createDocumentType() {
    let DocTypeDetails = {
      docTypeName: this.refs.docTypeName.value,
      docTypeDisplayName: this.refs.displayName.value,
      about: this.refs.about.value,
      isActive: this.refs.documentTypeStatus.checked,
    }
    console.log(DocTypeDetails)

    const response = await addDocumentTypeActionHandler(DocTypeDetails);
    return response;

  }

  // getSubDepartmentAvailability(details){
  //   console.log("details->"+details);
  //   this.setState({'subdepartmentAvailability':details})
  // }

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
        handler: async(event) => this.props.handler(this.createDocumentType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Create Document Type</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="docTypeName" placeholder="Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <form>
                  <div className="form-group">
                    <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="documentTypeStatus" />
                      <div className="slider"></div>
                    </label>
                  </div>
                  <br className="brclear"/>
                </form>
              </ScrollArea>
            </div>
          </div>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>
      </div>
    )
  }
};

export default MlAddDocumentType = formHandler()(MlAddDocumentType);
