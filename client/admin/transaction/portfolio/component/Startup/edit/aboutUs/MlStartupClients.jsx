import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';


export default class MlStartupClients extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupClients:[],
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

  addClient(){

    this.setState({popoverOpen : !(this.state.popoverOpen)})
    if(this.state.startupClients){
      this.setState({index:this.state.startupClients.length})
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
    let startupClients = this.state.startupClients;
    startupClients[this.state.index] = data;
    this.setState({startupClients:startupClients}, function () {
      this.props.getStartupClients(startupClients)
    })
  }
  render(){
    return(
      <div>

        <h2>Assets</h2>
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
                  <a href="#" id="create_client" data-placement="right" data-class="large_popover" >
                    <div className="list_block notrans" onClick={this.addClient.bind(this)}>
                      <div className="hex_outer"><span className="ml ml-plus "></span></div>
                      <h3 onClick={this.addClient.bind(this)}>Add New Client</h3>
                    </div>
                  </a>
                </div>

                <div className="col-lg-2 col-md-3 col-sm-3">
                  <a href="#" >
                    <div className="list_block">
                      <FontAwesome name='lock'/>
                      <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                      <div className="hex_outer portfolio-font-icons"><FontAwesome name='laptop'/></div>
                      <h3>Laptop <span className="assets-list">50</span></h3>
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
                <div className="medium-popover"><div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="text" name="companyName" placeholder="Company Name" className="form-control float-label" id="" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"  onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>
                    </div>

                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">
                        <span>Upload Logo</span>
                        <input type="file" className="upload" />
                      </div>
                    </div>

                    <div className="form-group">
                      <input type="text" name="description" placeholder="About" className="form-control float-label" id="" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon" id="isDescriptionPrivate"  onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/>
                    </div>

                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Make Default</label></div>
                    </div>
                    <div className="ml_btn" style={{'textAlign': 'center'}}>
                      <a href="#" className="save_btn">Save</a>
                    </div>
                  </div>
                </div></div>
              </div>
            </PopoverContent>
          </Popover>





        </div>


      </div>
    )
  }
}
