import React from 'react';
import { render } from 'react-dom';
const FontAwesome = require('react-fontawesome');
const Select = require('react-select');
import Datetime from 'react-datetime';
import { getMoolyaAdminsActionHandler, getTeamUsersActionHandler, fetchOfficeActionHandler } from '../../../calendar/myCalendar/components/myTaskAppointments/actions/MlAppointmentActionHandler';
import moment from 'moment';
import { fetchConnections } from '../actions/fetchConnectionsForCalendar'
import { storeSharedDetailsHandler } from '../actions/mlSharedCalendarActionHandler'
import generateAbsolutePath from '../../../../../lib/mlGenerateAbsolutePath'


export default class CalendarSharePopOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSessionExpand: true }
    this.toggle = this.toggle.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.getMoolyaAdmins.bind(this);
    this.state = {
      popoverOpen: false,
      popoverTwoOpen: false,
      selectedDatasToShare: props.Details ? props.Details : [],
      startDate: '',
      endDate: '',
      isDownloadable: false,
      searchActivated: false
    };
  }

  componentWillMount() {
    this.fetchOffice()
  }


  async fetchOffice(resourceId) {
    this.setState({ resourceId })
    const that = this;
    const resp = await fetchOfficeActionHandler()
    this.setState({ resp })
  }

  getOffice() {
    const resp = this.state.resp || [];
    const temp = [];
    resp.map((data) => {
      temp.push({ value: data._id, label: `${data.branchType}-${data.officeName}` })
    });
    temp.push({ value: 'moolyaAdmin', label: 'MoolyaAdmin' }, { value: 'myConnections', label: 'My Connections' });
    return temp
  }

  async getUsers(resourceId) {
    const tempArray = [];
    const resp = await getTeamUsersActionHandler(resourceId);
    resp.map((user) => {
      const userInfo = {
        name: user.name,
        profileId: user.profileId,
        profileImage: user.profileImage,
        userId: user.userId
      };
      tempArray.push(userInfo)
    });
    this.setState({ teamData: tempArray })
    return tempArray;
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  toggleButton() {
    this.setState({
      popoverTwoOpen: !this.state.popoverTwoOpen
    });
  }

  selectUserType(selectedUserType) {
    const that = this;
    that.setState({ userType: selectedUserType }, () => {
      if (selectedUserType.value == 'myConnections') {
        that.getMyConnections();
      } else if (selectedUserType.value == 'moolyaAdmin') {
        that.getMoolyaAdmins();
      } else {
        that.getUsers(selectedUserType.value)
      }
    })
  }

  async getMyConnections() {
    const resp = await fetchConnections();
    const users = resp.map((user) => {
      const userInfo = {
        name: user.displayName,
        profileId: user.profileId,
        profileImage: user.profileImage,
        userId: user.userId
      };
      return userInfo;
    });
    this.setState({ teamData: users });
  }

  async getMoolyaAdmins() {
    const resp = await getMoolyaAdminsActionHandler('', '');
    const users = resp.map((user) => {
      const userInfo = {
        name: user.displayName,
        profileImage: user.profileImage ? user.profileImage : '/images/def_profile.png',
        userId: user._id
      };
      return userInfo;
    });
    this.setState({ teamData: users });
  }

  validDate(current) {
    const yesterday = Datetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  validTillToggle(type) {
    if (type == 'start') {
      $('#start-time').toggleClass('rdtOpen');
      $('#end-time').removeClass('rdtOpen');
    } else {
      $('#start-time').removeClass('rdtOpen');
      $('#end-time').toggleClass('rdtOpen');
    }
  }

  isDownloadable(e) {
    this.setState({ downloadable: e.target.checked })
  }

  sharedStartDate(event) {
    if (event._d) {
      const value = moment(event._d);// .format('DD-MM-YYYY');
      this.setState({ startDate: value })
    }
  }
  sharedEndDate(event) {
    if (event._d) {
      const value = moment(event._d);// .format('DD-MM-YYYY');
      this.setState({ endDate: value })
    }
  }

  deleteSelectedDate(index) {
    const data = this.state.selectedDatasToShare || [];
    data.splice(index, 1);
    this.setState({ selectedDatasToShare: data })
    // this.props.deletedData(data)
  }

  deleteTeamMembers(index) {
    const teamMembers = this.state.teamData || [];
    teamMembers[index].isAdded = false
    this.setState({ teamData: teamMembers })
  }
  addTeamMembers(index) {
    const teamMembers = this.state.teamData || [];
    teamMembers[index].isAdded = true
    this.setState({ teamData: teamMembers })
  }

  selectedData() {
    const that = this;
    const data = that.state.selectedDatasToShare || [];
    const datas = data.map((value, index) => (
      <ul className="doc_upload" key={index}>
        <li>{<FontAwesome name='minus' onClick={() => that.deleteSelectedDate(index)}/>}<img src={generateAbsolutePath(value.fileUrl)}/></li>
      </ul>
    ))
    return datas;
  }

  teamMembersData() {
    const that = this;
    const data = that.state.teamData || [];
    const datas = data.map((value, index) => (
      <ul className="img_upload ul-hide" key={index}>
        <li >{value && value.isAdded ? <FontAwesome name='check' onClick={that.deleteTeamMembers.bind(that, index)}/> : <FontAwesome name='plus' onClick={that.addTeamMembers.bind(that, index)}/>}<img src={value.profileImage ? generateAbsolutePath(value.profileImage) : ''}/><span>{value.name}</span></li>
      </ul>
    ))
    return datas;
  }

  saveDetails() {
    const that = this;
    const teamMembers = that.state.teamData || [];
    const user = [];
    teamMembers.map((team) => {
      if (team.isAdded) {
        const userDetails = {
          userId: team.userId ? team.userId : 'userId',
          profileId: team.profileId ? team.profileId : ''
        };
        user.push(userDetails)
      }
    });
    const Details = {
      users: user
    }
    if (this.state.startDate) {
      Details.sharedStartDate = this.state.startDate.format('MM-DD-YYYY hh:mm:ss');
    }

    if (this.state.endDate) {
      Details.sharedEndDate = this.state.endDate.format('MM-DD-YYYY hh:mm:ss');
    }
    if (this.state.startDate < this.state.endDate) {
      this.saveInfo(Details);
    } else {
      toastr.error('End date should be after the start date')
    }
  }

  async saveInfo(Details) {
    const response = await storeSharedDetailsHandler(Details)
    if (response.success) {
      toastr.success(response.result);
      this.props.toggle();
    } else {
      toastr.error(response.result);
    }
  }

  searchFunctionality(e) {
    console.log('e.target.value', e.target.value);
    const value = e.target.value;
    this.setState({ searchValue: value });
    if (value) {
      this.setState({ searchActivated: true })
    } else {
      this.setState({ searchActivated: false })
    }
    this.searchedMembers()
  }

  searchedMembers() {
    const that = this;
    const search = this.state.searchValue
    const data = this.state.teamData || [];
    const datas = data.map((value, index) => {
      if (value.name.match(search)) {
        return (
          <ul className="img_upload ul-hide" key={index}>
            <li >{value && value.isAdded ? <FontAwesome name='check' onClick={that.deleteTeamMembers.bind(that, index, 'delete')} /> : <FontAwesome name='plus' onClick={that.addTeamMembers.bind(that, index)}/>}<img src={ value.profileImage ? generateAbsolutePath(value.profileImage) : '/images/ideator_01.png'}/><span>{value.name}</span></li>
          </ul>
        )
      }
    })
    return datas;
  }


  render() {
    return (
      <div className="popover-lg">
        {this.selectedData()}
        <div className="clearfix" />
        <div className="form-group">
          <Select
            className="form-field-name"
            options={this.getOffice()}
            value={this.state.userType}
            onChange={this.selectUserType.bind(this)}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Search here" className="form-control float-label" id="" onChange={this.searchFunctionality.bind(this)}></input>
        </div>
        {this.state.searchActivated ? this.searchedMembers() : this.teamMembersData()}
        <div className="clearfix" />
        <div className="col-md-6 nopadding-left">
          <div className="form-group" id="start-time">
            <Datetime
              dateFormat={'DD-MM-YYYY'}
              timeFormat={false}
              inputProps={{ placeholder: 'Shared Start Date', readOnly: true }}
              closeOnSelect={true}
              isValidDate={current => this.validDate(current)}
              onChange={event => this.sharedStartDate(event)}
            />
            <FontAwesome
              name="calendar"
              className="password_icon"
              onClick={this.validTillToggle.bind(this, 'start')}
            />
          </div>
        </div>
        <div className="col-md-6 nopadding-right">
          <div className="form-group" id="end-time">
            <Datetime
              dateFormat={'DD-MM-YYYY'}
              timeFormat={false}
              inputProps={{ placeholder: 'Shared End Date', readOnly: true }}
              closeOnSelect={true}
              isValidDate={current => this.validDate(current)}

              onChange={event => this.sharedEndDate(event)}
              disabled={this.props.viewMode}/>
            <FontAwesome
              name="calendar"
              className="password_icon"
              onClick={this.validTillToggle.bind(this, 'end-time')}
            />
          </div>
        </div>
        <br className="brclear" />
        <div className="ml_btn">
          <a href="" className="save_btn" onClick={this.saveDetails.bind(this)}>Share</a>
          <a href="" className="cancel_btn" onClick={this.props.toggle.bind(this)} >Cancel</a>
        </div>
      </div>
    )
  }
}
