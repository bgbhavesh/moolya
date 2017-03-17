import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'
import  Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import  ContactDetails from './contactDetails';

export default class Step3 extends React.Component{

  constructor(props){
    super(props);
    this.state={
      selectedValue : null,
      contactNumber:[{numberType: '',countryCode:'',contactNumber:''},{numberType: 'Test',countryCode:'',contactNumber:''}]
    }
    return this;
  }
  componentWillMount(){

    this.setState({contactNumber:[{numberType: '',countryCode:'',contactNumber:''},{numberType: 'Test',countryCode:'',contactNumber:''}]})
  }
  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));

  }
/*  optionsBySelectNumberType(value){
    console.log("-----------------------------");
    console.log(this);
    console.log(this.refs);
    console.log(this.refs.numberType.label)
    this.setState({numberTypeName: value,countryCode:'',contactNumber:''})
  }*/
  render(){
    /*let that=this;
    let numberTypeQuery=gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
        label
        value
      }
    }
    `;

    let numberTypeOption={options: { variables: {type : "CONTACTTYPE",hierarchyRefId:"vsraSG7GeWZRdXkF9"}}};*/
    return (
      <div className="step_form_wrap step3">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >




          <div className="col-lg-6 nopadding-left">
            <div className="panel panel-default new_profile_tabs">
              <div className="panel-heading">
                Contact Number
              </div>

              <ContactDetails/>


            </div>



            <div className="panel panel-default new_profile_tabs">
              <div className="panel-heading">
                Email ID
              </div>
              <div className="panel-body">


                <div className="ml_tabs">
                  <ul  className="nav nav-pills">
                    <li className="active">
                      <a  href="#3a" data-toggle="tab">Home&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                    </li>
                    <li>
                      <a href="#4a" data-toggle="tab">Office&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                    </li>
                    <li>
                      <a href="#" className="add-contact"><FontAwesome name='plus-square'/> Add Email</a>
                    </li>
                  </ul>

                  <div className="tab-content clearfix">
                    <div className="tab-pane active" id="1a">
                      <div className="form-group">
                        <select className="form-control">
                          <option>Email Id Type</option>
                          <option>test</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Email Id" className="form-control float-label" id="" />
                      </div>
                      <div className="ml_btn">
                        <a href="#" className="save_btn">Save</a>
                        <a href="#" className="cancel_btn">Cancel</a>
                      </div>
                    </div>
                    <div className="tab-pane" id="2a">
                      <div className="form-group">
                        <select className="form-control">
                          <option>Email Id Type</option>
                          <option>test</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Email Id" className="form-control float-label" id="" />
                      </div>
                      <div className="ml_btn">
                        <a href="#" className="save_btn">Save</a>
                        <a href="#" className="cancel_btn">Cancel</a>
                      </div>
                    </div>


                  </div>

                </div>
              </div>
            </div>
          </div>


          <div className="col-lg-6 nopadding-right">
            <div className="panel panel-default new_profile_tabs">
              <div className="panel-heading">
                Address
              </div>
              <div className="panel-body">


                <div className="ml_tabs">
                  <ul  className="nav nav-pills">
                    <li className="active">
                      <a  href="#5a" data-toggle="tab">Home&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                    </li>
                    <li>
                      <a href="#6a" data-toggle="tab">Office&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                    </li>
                    <li>
                      <a href="#" className="add-contact"><FontAwesome name='plus-square'/> Add Address</a>
                    </li>
                  </ul>

                  <div className="tab-content clearfix">
                    <div className="tab-pane active" id="1a">
                      <div className="form-group">
                        <select className="form-control">
                          <option>Address Type</option>
                          <option>test</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Name" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Phone Number" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Flat/House/Floor/Bulding No" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Colony/Street/Loculaty" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Landmark" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Area" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Town/City" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="State" className="form-control float-label" id="" />
                      </div>
                      <div className="ml_btn">
                        <a href="#" className="save_btn">Save</a>
                        <a href="#" className="cancel_btn">Cancel</a>
                      </div>
                    </div>
                    <div className="tab-pane" id="2a">
                      <div className="form-group">
                        <select className="form-control">
                          <option>Address Type</option>
                          <option>test</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Name" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Phone Number" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Flat/House/Floor/Bulding No" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Colony/Street/Loculaty" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Landmark" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Area" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Town/City" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="State" className="form-control float-label" id="" />
                      </div>
                      <div className="ml_btn">
                        <a href="#" className="save_btn">Save</a>
                        <a href="#" className="cancel_btn">Cancel</a>
                      </div>
                    </div>


                  </div>

                </div>
              </div>
            </div>
          </div>



        </ScrollArea>
      </div>
    )
  }
};
