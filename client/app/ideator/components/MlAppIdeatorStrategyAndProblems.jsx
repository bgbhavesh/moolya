import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class MlAppIdeatorStrategyAndProblems extends React.Component{
  componentDidMount(){}
  render(){
    return (


      <div className="requested_input">
        <div className="col-lg-12">
          <div className="row">
            <h2>
              Startergy and Problems
            </h2>
            <div className="panel panel-default panel-form">

              <div className="panel-body">
                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." className="form-control" id="cl_about"></textarea>
                  <FontAwesome name='lock' className="input_icon req_textarea_icon"/>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Add Images</div>
              <div className="panel-body nopadding">
                <div className="upload-file-wrap">
                  <input type="file" name="fileinput[]" id="fileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onchange="loadFile(event)" multiple />
                  <label for="fileinput">
                    <figure>
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </figure>
                  </label>
                </div>
                <div className="upload-image"><img id="output"/></div>
                <div className="upload-image"></div>
                <div className="upload-image"></div>
              </div>
            </div>

          </div> </div>
      </div>

    )
  }
};
