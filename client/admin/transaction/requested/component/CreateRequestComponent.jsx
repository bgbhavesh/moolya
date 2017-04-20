import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import  Select from 'react-select';
export default class CreateRequestComponent extends Component {

  constructor(props){
    super(props);
    this.state={
      show:true
    };
    return this;
  }


  cancel(){
    //this.state.show = false
    FlowRouter.go("/admin/transactions/registrationApprovedList");/*/transactions/registrationRequested");*/
  }

  render() {

    return (
      <div>
        {this.state.show==true?

          /*  <div className="ml_assignrequest" style={{'display':'none'}}>*/
          <div className="panel panel-default-bottom col-md-12">
            <div className="mrgn-btm">
              <input type="text" placeholder="Search User" className="search-form-control" id="" />
              <input type="text" placeholder="Search User" className="search-form-control" id="" />
            </div>
            <div className="assign-popup">
              <a data-toggle="tooltip" title="Save" data-placement="top" href="" className="hex_btn hex_btn_in">
                <span className="ml ml-save"></span>
              </a>
              <a data-toggle="tooltip" title="Cancel" data-placement="top" href="" className="hex_btn hex_btn_in" onClick={this.cancel.bind(this)}>
                <span className="ml ml-delete"></span>
              </a>
            </div>


          </div>
          :<div></div>}
      </div>

    )
  }
}
