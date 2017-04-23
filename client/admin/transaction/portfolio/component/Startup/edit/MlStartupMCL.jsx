import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');


export default class MlStartupMCL extends React.Component{
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });


  }
  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap portfolio-main-wrap">
          <h2>MCL</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-md-6 col-sm-6 nopadding-left">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Membership </div>
                  <div className="panel-body ">

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage</p>
                  </div>
                </div>
                <div className="clearfix"></div>


              </div>
              <div className="col-md-6 col-sm-6 nopadding-right">


                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Compliances</div>
                  <div className="panel-body ">

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>

                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Licenses </div>
                  <div className="panel-body ">

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                  </div>
                </div>


              </div>
            </ScrollArea>
          </div>
        </div>


      </div>
    )
  }
};
