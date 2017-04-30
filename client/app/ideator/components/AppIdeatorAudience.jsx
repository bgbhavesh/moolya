import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class AppIdeatorAudience extends React.Component{
  componentDidMount(){}
  render(){
    return (

      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Audience</h2>
          <div className="panel panel-default panel-form-view">

            <div className="panel-body">
              <p>The market for targeted health and wellness foods and beverages is a dynamic and promising one, driven largely by the growing recognition—among scientists, government, practitioners, and consumers alike—of the instrumental role diet plays in a wide range of health conditions. In fact, diseases that are linked to eating habits, including heart disease, high blood pressure, stroke, some types of cancer, and diabetes, are among the leading causes of death.</p>

              <p>Nearly half of shoppers in Packaged Facts’ survey say doctors are one of their key sources of information about nutrients in food, and about one-quarter cite other medical professionals. Furthermore, one-quarter of shoppers say a recommendation by a health professional is an important factor when buying grocery products targeting a specific health concern. Therefore, marketing to healthcare practitioners can be a rewarding strategy, despite challenges.</p>

              <p>Shoppers are proactive about conducting research to educate themselves about diet, as just over half of Packaged Facts respondents consider health, nutrition, and wellness websites to be among the most valuable sources of information about nutrients in food.</p>
            </div>
          </div>
        </div>
      </div>

    )
  }
};
