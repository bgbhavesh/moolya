import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class AppStartupAwards extends React.Component{
  componentDidMount()
  {  }
  render(){
    return (
      <div className="col-lg-12 nopadding">
        <h2>Awards</h2>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-awards"></span>
                <h3>
                  Grammy <br /><b>Award</b>
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-awards"></span>
                <h3>
                  Emmy Here <br /><b>Award</b>
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-awards"></span>
                <h3>
                  Tony <br /><b>Award</b>
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-awards"></span>
                <h3>
                  Golden Globe <br /><b>Award</b>
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-awards"></span>
                <h3>
                  Pultizer <br /><b>Prize</b>
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-awards"></span>
                <h3>
                  Teen Choice <br /><b>Award</b>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
