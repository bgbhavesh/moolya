import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import MlTaxTable from './MlTaxTable'

export default class MlAddTaxation extends React.Component{
  render(){
    return (

      <div className="admin_main_wrap">



        <div className="admin_padding_wrap">
          <h2>Taxation</h2>


          <div className="col-md-4 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Taxation Name" className="form-control float-label" id="cluster_name"/>

                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Valid from" className="form-control float-label" id="cluster_name"/>
                  <FontAwesome name='calendar' className="password_icon"/>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Valid to" className="form-control float-label" id="cluster_name"/>
                  <FontAwesome name='calendar' className="password_icon"/>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">

                  <textarea placeholder="About" className="form-control float-label" id="cl_about">
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
    </textarea>
                </div>
              </form>
            </div>
          </div>


          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>




                <div className="form-group switch_wrap">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <div className="slider"></div>
                  </label>
                </div>
              </form>
            </div>
          </div>


         < MlTaxTable/>
        </div>
      </div>


    )
  }
};
