/**
 * Created by vishwadeep on 12/9/17.
 */

import React from 'react';
import ScrollArea from 'react-scrollbar';
import { findSubChapterActionHandler } from '../../actions/findSubChapter';

export default class MlAnchorContact extends React.Component {

  constructor(props) {
    super(props);
    this.sendDataToParent = this.sendDataToParent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.selectUser = this.selectContact.bind(this);
    this.resetFormData = this.resetFormData.bind(this);
  }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });

    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight - (150 + $('.admin_header').outerHeight(true)));
  }

  sendDataToParent(data) {
    this.props.getContactDetails(data);
  }

  selectContact(index) {
    // this.setState({ formData: this.state.contactDetails[index], selectedContact: index });
    this.sendDataToParent({ selectedIndex: index, formData: this.props.contactDetails[index] });
  }

  resetFormData() {
    const data = {
      selectedIndex: -1,
      formData: {
        contactPersonRole: '',
        addressType: '',
        contactNumber: '',
        emailId: '',
        buildingNumber: '',
        street: '',
        landmark: '',
        area: '',
        town: '',
        stateId: '',
        countryId: '',
        pincode: '',
        latitude: '',
        longitude: '',
        status: false,
      },
    };
    this.sendDataToParent(data);
  }

  onChange(field, value) {
    this.props.onContactChange(field, value);
  }

  render() {
    return (
      <div className="main_wrap_scroll">
        <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
          <div className="col-lx-6 col-sm-6 col-md-6 nopadding-left">
            <div className="row">
              { /* <h3>Users List</h3> */}
              <div className="left_user_blocks">

                <div className="col-md-4 col-sm-6" onClick={this.resetFormData}>
                  <div className="list_block provider_block">
                    <div className="provider_mask"><img src="/images/funder_bg.png" /> <span
                      className="ml ml-plus "></span></div>
                    <h3>Add New</h3>
                  </div>
                </div>
                {
                  this.props.contactDetails && this.props.contactDetails.map((user, index) => (
                    <div key={index} onClick={this.selectContact.bind(this, index)} className="col-md-4 col-sm-6">
                      <div className="list_block provider_block">
                        <div className="cluster_status active_cl"></div>
                        <div className="provider_mask"><img src="/images/funder_bg.png" />
                          <img className="user_pic"
                            src={user.picURL || "/images/p_1.jpg"} /></div>
                        <h3>{user.name || "Name not provided"}</h3>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="col-lx-6 col-sm-6 col-md-6 nopadding-right">

            { /* <h3>User Details</h3> */}
            <div>

              <form>


                <div className="form-group">
                  <select placeholder="Contact person role" className="form-control float-label"
                    value={this.props.formData.contactPersonRole}
                    onChange={event => this.onChange('contactPersonRole', event.target.value)}>
                    <option>Role one</option>
                    <option>Role Two</option>
                  </select>
                </div>
                <div className="form-group">
                  <select placeholder="Address Type" className="form-control float-label"
                    value={this.props.formData.addressType}
                    onChange={event => this.onChange('addressType', event.target.value)}>
                    <option>Type one</option>
                    <option>Type Two</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Contact Number"
                    value={this.props.formData.contactNumber}
                    className="form-control float-label"
                    onChange={event => this.onChange('contactNumber', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email Id" className="form-control float-label"
                    value={this.props.formData.emailId}
                    onChange={event => this.onChange('emailId', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Flat/House/floor/Building No"
                    className="form-control float-label"
                    value={this.props.formData.buildingNumber}
                    onChange={event => this.onChange('buildingNumber', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Colony/Street/Locality "
                    className="form-control float-label"
                    value={this.props.formData.street}
                    onChange={event => this.onChange('street', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Landmark" className="form-control float-label"
                    value={this.props.formData.landmark}
                    onChange={event => this.onChange('landmark', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Area" className="form-control float-label"
                    value={this.props.formData.area}
                    onChange={event => this.onChange('area', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Town ,city" className="form-control float-label"
                    value={this.props.formData.town}
                    onChange={event => this.onChange('town', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="State" className="form-control float-label"
                    value={this.props.formData.stateId}
                    onChange={event => this.onChange('stateId', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Country" className="form-control float-label"
                    value={this.props.formData.countryId}
                    onChange={event => this.onChange('countryId', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="number" placeholder="Pincode" className="form-control float-label"
                         value={this.state.formData.pincode}
                         onChange={event => this.onChange('pincode', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Lattitude" className="form-control float-label"
                    value={this.props.formData.latitude}
                    onChange={event => this.onChange('latitude', event.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Longitude" className="form-control float-label"
                    value={this.props.formData.longitude}
                    onChange={event => this.onChange('longitude', event.target.value)} />
                </div>

                <br className="brclear" />
                <div className="form-group switch_wrap inline_switch">
                  <label className="">Status</label>
                  <label className="switch">
                    <input type="checkbox"
                      checked={this.props.formData.status}
                      onChange={event => this.onChange('status', event.target.checked)} />
                    <div className="slider"></div>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }
}


MlAnchorContact.propTypes = {
  contactDetails: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  formData: React.PropTypes.any,
  onContactChange: React.PropTypes.func,
  getContactDetails: React.PropTypes.func,
};
