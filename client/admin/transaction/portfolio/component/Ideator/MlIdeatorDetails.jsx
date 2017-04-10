import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler} from '../../../../utils/formElemUtil';
/*import MlIdeatorPortfolioAbout from './MlIdeatorPortfolioAbout'*/

var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class MlIdeatorDetails extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isfirstNamePublic:true,
      islastNamePublic:true,
    }
    this.onClick.bind(this);
  }

  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
      // FlowRouter.go('/admin/portfolio/about')
      // return (
      //     <MlIdeatorPortfolioAbout />
      // )
    });
    dataVisibilityHandler();
  }

  onClick(field,e){
      let status = e.currentTarget.checked;
      if(field == "firstName"){
        this.setState({isfirstNamePublic:status});
      }
      this.props.getIdeatorDetails(this.state)
  }

  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Ideator</h2>

          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <div className="form_bg">
                  <form>

                    <div className="form-group">
                      <input type="text" placeholder="First Name" ref="firstName" className="form-control float-label" id="cluster_name" defaultValue="Ravi"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" onClick={this.onClick.bind(this, "firstName")}/><input type="checkbox" id="makePrivate"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" ref="lastName" className="form-control float-label" id="cluster_name" defaultValue="Kapoor"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" onClick={this.onClick.bind(this, "firstName")}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Gender" ref="gender" className="form-control float-label" id="cluster_name" defaultValue="Male"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" onClick={this.onClick.bind(this, "firstName")}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="DOB" ref="dob" className="form-control float-label" id="cluster_name" defaultValue="26-06-1980"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" onClick={this.onClick.bind(this, "firstName")}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Education" ref="education" className="form-control float-label" id="cluster_name" defaultValue="MSC, Mcom, Bcom"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" onClick={this.onClick.bind(this, "firstName")}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Employment Status" ref="employmentStatus" className="form-control float-label" id="cluster_name" defaultValue="Employeed"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" onClick={this.onClick.bind(this, "firstName")}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Sector" ref="sector" className="form-control float-label" id="cluster_name" defaultValue="IT"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" onClick={this.onClick.bind(this, "firstName")}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Employer Name" ref="employerName" className="form-control float-label" id="cluster_name" defaultValue="Mobiletech Solutions"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" onClick={this.onClick.bind(this, "firstName")}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Years of Experience" ref="e" className="form-control float-label" id="cluster_name" defaultValue="12"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" onClick={this.onClick.bind(this, "firstName")}/>
                    </div>
                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="col-md-6 nopadding-right">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <div className="form_bg">
                  <form>

                    <div className="form-group steps_pic_upload">
                      <div className="previewImg ProfileImg">
                        <img src="/images/ideator_01.png"/>
                      </div>
                    </div>
                    <br className="brclear"/>

                    <div className="form-group">
                      <input type="text" placeholder="Phone No" className="form-control float-label" id="cluster_name" defaultValue="9028728282"/>
                      <FontAwesome name='unlock' className="input_icon un_lock"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Email Id" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Fcebook Id" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Linkedin Id" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Twitter Id" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Googleplus Id" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock"/>
                    </div>


                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>




        </div>


      </div>
    )
  }
};
