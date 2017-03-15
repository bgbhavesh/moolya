import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import  Select from 'react-select'
export default class MlAssignComponent extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="panel panel-default-bottom col-md-12">
        <div className="mrgn-btm">
          <input type="text" placeholder="Search User" className="search-form-control" id="" />
        </div>
        <div className="col-md-6 nopadding-left">
          <div className="form-group">
            <Select name="form-field-name"value="select" className="float-label"/>
          </div>
          <div className="form-group">
            <Select name="form-field-name"value="select" className="float-label"disabled= {true} />
          </div>
          <div className="form-group">
            <Select name="form-field-name"value="select" className="float-label"disabled={true} />
          </div>

          <div className="form-group">
            <Select name="form-field-name"value="select" className="float-label"disabled={true} />
          </div>


        </div>

        <div className="col-md-6 nopadding-right">
          <div className="form-group">
            <Select name="form-field-name"value="select" className="float-label"/>
          </div>
          <div className="form-group">
            <Select name="form-field-name"value="select" className="float-label"disabled= {true} />
          </div>
          <div className="form-group">
            <Select name="form-field-name"value="select" className="float-label"disabled={true} />
          </div>


          <div className="form-group">
            <Select name="form-field-name"value="select" className="float-label"disabled={true} />
          </div>
        </div>

        <div className="assign-popup">
          <a data-toggle="tooltip" title="Save" data-placement="top" href="" className="hex_btn hex_btn_in">
            <span className="ml ml-save"></span>
          </a>
          <a data-toggle="tooltip" title="Cancel" data-placement="top" href="" className="hex_btn hex_btn_in">
            <span className="ml ml-delete"></span>
          </a>
        </div>


      </div>



    )
  }
}
