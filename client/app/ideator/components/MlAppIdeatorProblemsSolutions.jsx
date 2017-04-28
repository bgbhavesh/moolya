import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class MlAppIdeatorProblemsSolutions extends React.Component{
  componentDidMount()
  {
    var loadFile = function(event) {
      var reader = new FileReader();
      reader.onload = function(){
        var output = document.getElementById('output');
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    };
  }
  render(){
    return (
      <div>
        {/*<h2>Problems and Solutions</h2>*/}
        <div className="ml_tabs ml_tabs_large">
          <ul  className="nav nav-pills">
            <li className="active">
              <a  href="#1a" data-toggle="tab">Problems</a>
            </li>
            <li><a href="#2a" data-toggle="tab">Solutions</a>
            </li>
          </ul>

          <div className="tab-content clearfix requested_input">
            <div className="tab-pane active" id="1a">
              <div className="col-lg-12">
                <div className="row">
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
                        <input type="file" name="fileinput[]" id="fileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange="loadFile(event)" multiple />
                        <label htmlFor="fileinput">
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
                </div>
              </div>
            </div>
            <div className="tab-pane" id="2a">
              <div className="col-lg-12">
                <div className="row">
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
                        <input type="file" name="fileinput[]" id="fileinput1" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange="loadFile(event)" multiple />
                        <label htmlForfor="fileinput1">
                          <figure>
                            <i className="fa fa-upload" aria-hidden="true"></i>
                          </figure>
                        </label>
                      </div>
                      <div className="upload-image"><img id="output1"/></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>

      </div>

    )
  }
};
