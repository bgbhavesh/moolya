/**
 * Created by pankaj on 20/6/17.
 */
import React from 'react';
const FontAwesome = require('react-fontawesome');
import { fetchAllOfficeMembers } from '../actions/fetchAllTeamMember';
const Select = require('react-select');
import { createInternalTaskActionHandler } from '../actions/createInternalTask'
import { multipartASyncFormHandler } from '../../../commons/MlMultipartFormAction';
import generateAbsolutePath from '../../../../lib/mlGenerateAbsolutePath';

export default class MlCreateDiscussInternalTask extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      showAdd: true,
      users: [],
      members: [],
      selectedUser: [],
      docs: [],
      modes: [
        { value: 'offline', label: 'Offline' },
        { value: 'online', label: 'Online' }
      ],
      mode: ''
    }
  }
  componentDidMount() {
    this.fetchAllOfficeMembers();
  }

  async submit() {
    if (!this.props.data.state.selected || !this.props.data.state.selected.resourceId) {
      toastr.error('Please select a user portfolio');
      return false;
    }
    if (!this.state.selectedUser.length) {
      toastr.error('Please select at least one user');
      return false;
    }
    const members = this.state.members;
    const dataToInsert = {
      name: this.props.config.actionName,
      stage: this.props.data.props.currentStage.stageId,
      attendees: this.state.selectedUser.map((userId) => {
        const user = members.find(user => user.userId == userId);
        return {
          userId,
          profileId: user.profileId
        }
      }),
      resourceId: this.props.data.state.selected.resourceId,
      community: {
        code: this.props.data.state.selected.portfolio.communityCode,
        name: this.props.data.state.selected.portfolio.communityName,
        type: this.props.data.state.selected.portfolio.communityType
      },
      docs: this.state.docs,
      note: this.refs.note.value,
      mode: this.state.mode
    };

    const response = await createInternalTaskActionHandler(dataToInsert);
    if (response.success) {
      toastr.success('Internal task created successful');
      this.props.toggle();
    } else {
      toastr.error(response.result);
    }
  }

  async fetchAllOfficeMembers() {
    const response = await fetchAllOfficeMembers();
    if (response) {
      console.log(response);
      const options = response.map(user => ({
        value: user.userId,
        label: user.name + (user.officeName ? (` - ${user.officeName}`) : '')
      }));
      this.setState({
        users: options,
        members: response
      });
    }
  }

  toggleAddUser() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }

  addUser(user) {
    const seletectUsers = this.state.selectedUser;
    const isAlready = seletectUsers.find(userId => userId == user.value);
    if (!isAlready) {
      seletectUsers.push(user.value);
      this.setState({
        selectedUser: seletectUsers
      });
    }
  }

  removeUser(userId) {
    const seletectUsers = this.state.selectedUser;
    seletectUsers.splice(seletectUsers.indexOf(userId), 1);
    this.setState({
      selectedUser: seletectUsers
    });
  }

  addMode(mode) {
    this.setState({
      mode: mode.value
    });
  }


  documentUpload(e) {
    const file = e.target.files[0];
    this.setState({ fileType: file.type, fileName: file.name });
    const fileType = file.type
    const typeShouldBe = _.compact(fileType.split('/'));
    if (file && typeShouldBe && typeShouldBe[1] === 'pdf') {
      const data = { moduleName: 'PROFILE', actionName: 'UPDATE' }
      const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, file.name));
    } else {
      toastr.error('Please select a document format')
    }
  }

  onFileUploadCallBack(fileName, resp) {
    if (resp) {
      const documents = this.state.docs || [];
      const link = $.parseJSON(resp).result;
      const documentAttributes = {
        fileName,
        fileUrl: link
      };
      documents.push(documentAttributes);
      this.setState({ docs: documents });
    }
  }

  deleteDocs(index) {
    const docs = this.state.docs || []
    docs.splice(index, 1)
    this.setState({ docs })
  }

  attachedDocuments() {
    const that = this;
    const documents = that.state.docs || []
    const documentsUploaded = documents.map((docsToView, index) => (
      <li><a><FontAwesome name='minus'onClick={that.deleteDocs.bind(that, index)}/></a><img src="/images/pdf.png"/></li>
    ))
    return documentsUploaded;
  }


  render() {
    const that = this;
    return (
      <div className="popover-lg">
        <h1>Attached Documents <div className="fileUpload upload_file_mask pull-right" id="create_client">
          <a href="javascript:void(0);">
            <input type="file" className="upload_file upload" onChange={that.documentUpload.bind(that)}/>Add</a></div></h1>
        <ul className="doc_upload">
          {this.attachedDocuments()}
        </ul>

        <div className="clearfix" />
        <h1>
          Set priority of attendes
          <a href="" className="pull-right attendes-btn" onClick={() => this.toggleAddUser()} style={ this.state.showAdd ? {} : { display: 'none' } }>Add</a>
          <a href="" className="pull-right close-btn" onClick={() => this.toggleAddUser()} style={ this.state.showAdd ? { display: 'none' } : {} }>Close</a>
        </h1>
        <div className="clearfix" />
        <div className="" style={ this.state.showAdd ? { display: 'none' } : {}}>
          <Select
            name="form-field-name"
            value=""
            className="float-label"
            options={that.state.users}
            onChange={value => that.addUser(value)}
          />
          <h2><span className="pull-left popover-search"><div className="form-group">

            {/* <input type="text" placeholder="Search here" className="form-control float-label" id=""></input> */}
          </div></span>
          </h2>
          <div className="clearfix" />
        </div>
        <div className="clearfix" />
        <div className="col-md-12">
          <ul className="img_upload">
            {that.state.selectedUser.map((userId, index) => {
              const user = that.state.members.find(user => userId == user.userId);
              return (
                <li key={index}>
                  <FontAwesome onClick={() => that.removeUser(userId)} name='minus'/><img src={user.profileImage ? generateAbsolutePath(user.profileImage) : '/images/def_profile.png'}/><span>{user.name} { user.officeName ? (` - ${user.officeName}`) : '' }</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="clearfix" />
        <hr/>
        <Select
          name="form-field-name"
          value={that.state.mode}
          placeholder="Select Mode"
          className="float-label"
          options={that.state.modes}
          onChange={value => that.addMode(value)}
        />
        <div className="clearfix" />
        <div className="form-group">
          <textarea ref="note" placeholder="Notes / Remarks" className="form-control float-label" id=""></textarea>
        </div>
        <div className="clearfix" />
        <a href="" onClick={() => that.submit()} className="save_btn">Assign</a>
      </div>
    )
  }
}
