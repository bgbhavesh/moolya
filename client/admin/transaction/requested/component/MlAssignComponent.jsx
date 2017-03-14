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
              <input type="text" placeholder="Search User" className="form-control" id=""/>
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

            <div className="mrgn-btm"> <a href="#" className="mlUpload_btn">Save</a> <a href="#" className="mlUpload_btn">Cancel</a> </div>

          </div>

    )
  }
}
