import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class AppStartupLookingFor extends React.Component{
  componentDidMount()
  {  }
  render(){
    return (
      <div><h2>Looking For</h2>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-funder"></span>
                <h3>
                  Funding
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-funder"></span>
                <h3>
                  Funding
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-funder"></span>
                <h3>
                  Funding
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-funder"></span>
                <h3>
                  Funding
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-funder"></span>
                <h3>
                  Funding
                </h3>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="team-block">
                <span className="ml ml-funder"></span>
                <h3>
                  Funding
                </h3>
              </div>
            </div>
          </div>
        </div></div>
    )
  }
};
