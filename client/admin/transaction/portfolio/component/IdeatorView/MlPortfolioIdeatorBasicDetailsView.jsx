import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorDetailsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';



export default class MlPortfolioIdeatorBasicDetailsView extends React.Component{
  constructor(props){
    super(props);

    this.state={
      portfolioIdeatorInfo: {}
    }
    this.fetchPortfolioInfo.bind(this);

  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    this.fetchPortfolioInfo();
    initalizeFloatLabel();
  }

  async fetchPortfolioInfo(){
    console.log("//////////////////////////");
    const response = await findIdeatorDetailsActionHandler(this.props.portfolioDetailsId);
    console.log("--------------------------------------------");
    console.log(response);
    this.setState({portfolioIdeatorInfo : response});
  }


  render(){
    console.log(this.state.portfolioIdeatorInfo.firstName);
    return (

      <div>
        <h2>Ideator Details</h2>
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
                    <input type="text" placeholder="First Name" className="form-control float-label" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.firstName}/>
                    <FontAwesome name='unlock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Last Name" className="form-control float-label"  defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.lastName}/>
                    <FontAwesome name='unlock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Gender" className="form-control float-label"  defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.gender}/>
                    <FontAwesome name='unlock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="DOB" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.dateOfBirth}/>
                    <FontAwesome name='unlock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Education" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.qualification}/>
                    <FontAwesome name='unlock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Employment Status" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.employmentStatus}/>
                    <FontAwesome name='unlock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Sector" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.industry}/>
                    <FontAwesome name='unlock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Employer Name" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.employerName}/>
                    <FontAwesome name='lock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Years of Experience" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.yearsofExperience}/>
                    <FontAwesome name='unlock' className="password_icon"/>
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
                      <img src="/images/p_6.jpg"/>
                    </div>
                  </div>
                  <br className="brclear"/>

                  <div className="form-group">
                    <input type="text" placeholder="Phone No" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.mobileNumber}/>
                    <FontAwesome name='lock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Email Id" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.emailId}/>
                    <FontAwesome name='lock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Fcebook Id" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.facebookId}/>
                    <FontAwesome name='lock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Linkedin Id" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.linkedInId}/>
                    <FontAwesome name='lock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Twitter Id" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.twitterId}/>
                    <FontAwesome name='lock' className="password_icon"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Googleplus Id" className="form-control float-label" id="cluster_name" defaultValue={this.state.portfolioIdeatorInfo&&this.state.portfolioIdeatorInfo.gplusId}/>
                    <FontAwesome name='lock' className="password_icon"/>
                  </div>


                </form>
              </div>
            </ScrollArea>
          </div>
        </div>

      </div>


    )
  }
}
