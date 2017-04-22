import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' }
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlStartupBranches extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupBranches:[],
      popoverOpen:false,
      index:"",
    }
    this.handleBlur.bind(this);
    return this;
  }
  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }
  addBranch(){

    this.setState({popoverOpen : !(this.state.popoverOpen)})
    if(this.state.startupBranches){
      this.setState({index:this.state.startupBranches.length})
    }else{
      this.setState({index:0})
    }
  }

  onLockChange(field, e){
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
    }else{
      details=_.extend(details,{[key]:false});
    }
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }

  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    let startupBranches = this.state.startupBranches;
    startupBranches[this.state.index] = data;
    this.setState({startupBranches:startupBranches}, function () {
      this.props.getStartupBranches(startupBranches)
    })
  }
  render(){
    return (
      <div>
        <h2>Branches</h2>
        <div className="requested_input main_wrap_scroll">

          <ScrollArea
            speed={0.8}
            className="main_wrap_scroll"
            smoothScrolling={true}
            default={true}
          >
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-3">
                  <a href="#" id="create_client" data-placement="top" data-class="large_popover" >
                    <div className="list_block notrans" onClick={this.addBranch.bind(this)}>
                      <div className="hex_outer"><span className="ml ml-plus "></span></div>
                      <h3 onClick={this.addBranch.bind(this)}>Add New Branch</h3>
                    </div>
                  </a>
                </div>

                <div className="col-lg-2 col-md-3 col-sm-3">
                  <a href="#" >
                    <div className="list_block">
                      <FontAwesome name='lock'/>
                      <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                      <div className="hex_outer portfolio-font-icons"><FontAwesome name='building'/></div>
                      <h3>Headquarter</h3>
                    </div>
                  </a>
                </div>

              </div>
            </div>

          </ScrollArea>
          <Popover placement="right" isOpen={this.state.popoverOpen} target="create_client" toggle={this.toggle}>
            {/* <PopoverTitle>Add Asset</PopoverTitle>*/}
            <PopoverContent>
              <div className="ml_create_client">
                <div className="medium-popover scrollbar-wrap">
                  <ScrollArea
                    speed={0.8}
                    className="scrollbar-wrap"
                    smoothScrolling={true}
                    default={true}
                  >
                    <div className="row">
                      <div className="col-md-12">


                        <div className="form-group">
                          <Select
                            name="form-field-name"
                            options={options}
                            value='Address Type'
                            onChange={logChange}
                          />
                        </div>

                        <div className="form-group">
                          <input type="text" name="name" placeholder="Name" className="form-control float-label" id=""  onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isNamePrivate" onClick={this.onLockChange.bind(this, "isNamePrivate")}/>
                        </div>

                        <div className="form-group">
                          <input type="text" name="phoneNumber" placeholder="Phone Number" className="form-control float-label" id=""  onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isPhoneNumberPrivate" onClick={this.onLockChange.bind(this, "isNamePrivate")}/>
                        </div>

                        <div className="form-group">
                          <input type="text" name="address1" placeholder="Flat/House/Floor/Building" className="form-control float-label" id=""  onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAddressOnePrivate" onClick={this.onLockChange.bind(this, "isAddressOnePrivate")}/>
                        </div>


                        <div className="form-group">
                          <input type="text" name="address2" placeholder="Colony/Street/Locality" className="form-control float-label" id="" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAddressTwoPrivate" onClick={this.onLockChange.bind(this, "isAddressTwoPrivate")}/>
                        </div>

                        <div className="form-group">
                          <input type="text" name="landmark" placeholder="Landmark" className="form-control float-label" id=""  onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isLandmarkPrivate" onClick={this.onLockChange.bind(this, "isLandmarkPrivate")}/>
                        </div>

                        <div className="form-group">
                          <input type="text" name="area" placeholder="Area" className="form-control float-label" id="" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAreaPrivate" onClick={this.onLockChange.bind(this, "isAreaPrivate")}/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="city" placeholder="Town/City" className="form-control float-label" id="" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isCityPrivate" onClick={this.onLockChange.bind(this, "isCityPrivate")}/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="state" placeholder="State" className="form-control float-label" id="" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isStatePrivate" onClick={this.onLockChange.bind(this, "isStatePrivate")}/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="country" placeholder="Country" className="form-control float-label" id="" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isCountryPrivate" onClick={this.onLockChange.bind(this, "isCountryPrivate")}/>
                        </div>
                        <div className="form-group">
                          <div className="fileUpload mlUpload_btn">
                            <span>Upload Logo</span>
                            <input type="file" className="upload" />
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                          <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                        </div>
                        <div className="ml_btn" style={{'textAlign': 'center'}}>
                          <a href="#" className="save_btn">Save</a>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>


              </div>
            </PopoverContent>
          </Popover>





        </div>


      </div>
    )
  }
}
