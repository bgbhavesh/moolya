import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler} from '../../../../utils/formElemUtil';
var Select = require('react-select');
import {findIdeatorIntellectualPlanningTrademarkActionHandler} from '../../actions/findPortfolioIdeatorDetails'

export default class MlIdeatorIntellectualPlanningAndTrademark extends React.Component{
   constructor(props) {
     super(props);
     this.state =  {loading:true,data:{}};
     this.fetchPortfolioDetails.bind(this);
     return this;
   }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  componentDidMount(){
    dataVisibilityHandler();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await findIdeatorIntellectualPlanningTrademarkActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false, data: response});
    }
  }

  onInputChange(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
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

  sendDataToParent() {
    this.props.getIntellectualPlanning(this.state.data);
  }

  render(){
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="row requested_input">
                <div className="col-lg-12">

                  <div className="panel panel-default panel-form">
                    <div className="panel-heading">
                      Intellectual Training and Trademark
                    </div>
                    <div className="panel-body">

                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={this.state.data.description} onBlur={this.onInputChange.bind(this)} name="description"></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIntellectualPrivate" onLockChange={this.onLockChange.bind(this, "isIntellectualPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isIntellectualPrivate}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>)}
      </div>
    )
  }
};
