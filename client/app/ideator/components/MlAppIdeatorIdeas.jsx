import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class MlAppIdeatorIdeas extends React.Component{
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
      <div className="requested_input">
        <h2>Ideas</h2>

        <div className="panel panel-default panel-form">
          <div className="panel-heading">

            <div className="form-group nomargin-bottom">
              <input type="text" placeholder="Title Here..." className="form-control" id=""/>
              <FontAwesome name='unlock-alt' className="input_icon req_input_icon"/>
            </div>

          </div>
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
    )
  }
};
