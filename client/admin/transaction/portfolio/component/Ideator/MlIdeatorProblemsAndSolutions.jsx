import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {dataVisibilityHandler} from '../../../../utils/formElemUtil';

export default class MlIdeatorProblemsAndSolutions extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createProblemAndSolution.bind(this)
    return this;
  }

  async addEventHandler() {
    const resp=await this.createProblemAndSolution();
    console.log(resp);
    return resp;
  }

  async  createProblemAndSolution() {
    let details = {
      problems: this.refs.problems.value,
      solution: this.refs.solution.value
    }
    // const response = await addIndustryActionHandler(IndustryDetails)
    return details;
  }
  handleClick(event){
    const value = this.addEventHandler()
  }

  componentDidMount(){
    // $(function() {
    //   $('.float-label').jvFloat();
    // });
    //
    // $('.switch input').change(function() {
    //   if ($(this).is(':checked')) {
    //     $(this).parent('.switch').addClass('on');
    //   }else{
    //     $(this).parent('.switch').removeClass('on');
    //   }
    // });
    dataVisibilityHandler();
  }


  render(){
    return (
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
                <div className="col-lg-6">
                  <div className="panel panel-default panel-form">
                    <div className="panel-heading">
                      Problems
                    </div>
                    <div className="panel-body">
                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" ref="problems"></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" ref="pro"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="panel panel-default panel-form">
                    <div className="panel-heading">
                      Solutions
                    </div>
                    <div className="panel-body">
                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" ref="solution"></textarea>
                        <FontAwesome name='lock' className="input_icon req_textarea_icon un_lock" ref="sol"/>
                      </div>
                    </div>
                  </div>
                </div>
                <submit onClick={this.handleClick.bind(this)}>Click</submit>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
};
