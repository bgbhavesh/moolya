import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');


export default class MlFunderSuccessStoriesView extends React.Component{
  componentDidMount()
  {

  }
  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
        <h2>Success Stories</h2>
        <div className="main_wrap_scroll">
          <ScrollArea speed={0.8} className="main_wrap_scroll"smoothScrolling={true} default={true} >
            <div className="col-lg-12">
              <div className="row">

                <div className="col-lg-2 col-md-4 col-sm-4">
                  <a href="" >
                    <div className="list_block notrans funding_list">
                      <img src="../images/p_29.jpg"/>
                      <div><p>Best Funder of the Year</p></div>
                      <h3>17 Jan 2017</h3>
                    </div>
                  </a>
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
