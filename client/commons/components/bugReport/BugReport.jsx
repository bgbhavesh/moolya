import React from 'react';
import {render} from 'react-dom';
var FontAwesome = require('react-fontawesome');


export default class BugReport extends React.Component{
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.bug_button').click(function(){
      $('.bugReport').toggleClass('open');
    });


  }


  createHandler(){
    var createBugHandler=this.props.createBugHandler||null;
    var desc=this.refs.description.value||null;
    if(createBugHandler){
      createBugHandler(desc);
    }
  }


  render(){
    return (
      <div>



        <div className="bugReport">
          <div className="bug_body">
            <textarea className="form-control" ref="description" placeholder="Please enter as many details of the bug/suggestion as possible"></textarea>
            <h3 style={{'display':'none'}}>We appreciate your help / suggestion.<br /> We may revert to you for any additional details.</h3>
            <div className="ml_btn">
              <a href="#" className="save_btn">Send</a>
            </div>
          </div>
          <a href="#" className="bug_button">
            <FontAwesome name='bug'/>
          </a>
        </div>





      </div>
    )
  }
};

