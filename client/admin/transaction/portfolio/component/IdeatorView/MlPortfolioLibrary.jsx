import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import PortfolioLibrary from '../../../../../app/ideators/components/MlAppIdeatorLibrary';

export default class MlPortfolioIdeatorLibraryView extends React.Component{
  componentDidMount()
  {

  }
  render(){
    return (
      <div className="app_main_wrap">
        <div className="col-md-12 mart20">
          <ul className="users_list well well-sm">
            <li>
              <a href="#">
                <span></span>
                <img src="/images/p_5.jpg" /><br />
                <div className="tooltiprefer">
                  <span>Shiva</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="green"></span>
                <img src="/images/p_7.jpg" /><br />
                <div className="tooltiprefer">
                  <span>Pavani</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <span></span>
                <img src="/images/p_2.jpg" /><br />
                <div className="tooltiprefer">
                  <span>Sirisha</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="green"></span>
                <img src="/images/p_8.jpg" /><br />
                <div className="tooltiprefer">
                  <span>Sameeran</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-12"><PortfolioLibrary/></div>
      </div>
    )
  }
};
