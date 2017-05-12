/**
 * Created by viswadeep on 12/5/17.
 */

import React from "react";
import {render} from "react-dom";
// import MapView from '../../components/mapView';
export default class MlAppMyOffice extends React.Component {
  componentDidMount() {
    $('.view_switch').click(function () {
      if ($(this).hasClass('map_view')) {
        $(this).removeClass('map_view').addClass('list_view');
        $('.map_view_block').hide();
        $('.list_view_block').show();
        $('.admin_padding_wrap').removeClass('no_padding');
      } else {
        $(this).removeClass('list_view').addClass('map_view');
        $('.map_view_block').show();
        $('.list_view_block').hide();
        $('.admin_padding_wrap').addClass('no_padding');
      }
    });
  }

  addNewOffice(){
    FlowRouter.go("/app/addOffice")
  }

  render() {
    //style={{display: 'none'}}
    {/*<div className="map_view_block">*/
    }
    {/*<MapView/>*/
    }
    {/*</div>*/
    }
    return (
      <div className="app_main_wrap">

        {/*<div className="view_switch map_view"/>*/}

        <div className="app_padding_wrap no_padding">
          <div className="list_view_block">
            <div className="col-md-8 col-md-offset-4">
              <div className="profile_container my-office-main">
                <div className="profile_accounts">
                  <span className="ml flaticon-ml-building"></span>
                  <br />
                  <h2>Add Office</h2>
                  <h3></h3>
                </div>
              </div>
            </div>


            <div className="col-md-12 text-center well mart100">
              <div className="col-md-4">
                <a className="fileUpload mlUpload_btn" onClick={this.addNewOffice.bind(this)}>Add New Office</a>
              </div>
              <div className="col-md-4">
                <a href="#" className="fileUpload mlUpload_btn disabled">Enter into Office</a>
              </div>
              <div className="col-md-4">
                <a href="#" className="fileUpload mlUpload_btn disabled">Deactivate Office</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
