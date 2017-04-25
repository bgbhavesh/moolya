import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class MlStartupPortfolioViewLandingPage extends React.Component{
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
        <div className="admin_padding_wrap">
          <h2>About</h2>
          <div className="main_wrap_scroll">
            <ScrollArea speed={0.8} className="main_wrap_scroll"smoothScrolling={true} default={true} >
              <div className="col-lg-12 col-sm-12">
                <div className="row">

                  <div className="panel panel-default panel-form-view">

                    <div className="panel-body">
                      <h4>About us</h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                      <h4>Rating</h4>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections .</p>
                      <h4>Clients</h4>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections .</p>
                      <h4>Service & Products</h4>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections .</p>
                      <h4>Information</h4>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections .</p>


                    </div>
                  </div>

                </div>    </div>
            </ScrollArea>
          </div>
          <span className="actions_switch"></span>
          <div className="bottom_actions_block">
            <div className="hex_btn"><a data-toggle="tooltip" title="Edit" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-edit"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Make Public" data-placement="top" href="#" className="hex_btn hex_btn_in"> <FontAwesome name='bullhorn'/></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Timeline" data-placement="top" href="#" className="hex_btn hex_btn_in"> <FontAwesome name='list-ul'/></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Cancel" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-delete"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Save" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-save"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Assign" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-assign"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Annotate" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-annotate"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Go Live" data-placement="top" href="#" className="hex_btn hex_btn_in"> <FontAwesome name='rocket'/></a></div>
          </div>
        </div>


      </div>
    )
  }
};
