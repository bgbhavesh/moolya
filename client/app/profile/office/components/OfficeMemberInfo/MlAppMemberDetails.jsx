/**
 * Created by pankaj on 8/6/17.
 */

import React from 'react';

export default class MlAppMemberDetails extends React.Component{
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
      <div>

        <div className="investement-view-content">


          <div className="row">
            <div className="col-md-6">
              <div className="form_bg">
                <form>

                  <div className="form-group">
                    <input type="text" placeholder="Name" value="Mohan.K" className="form-control float-label" id="cluster_name" />
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Phone Number" value="95403 54646" className="form-control float-label" id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Joining Date" value="23/10/2016 08:50:42" className="form-control float-label" id="cluster_name"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Email-ID" value="mohank@gmail.com" className="form-control float-label" id="cluster_name" />
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Role" value="Service Provider" className="form-control float-label" id="cluster_name" />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Status" value="Active" className="form-control float-label" id="cluster_name" />
                  </div>

                </form>
              </div>
            </div>
            <div className="col-md-6">

              <div className="text-center"><img src="/images/ideator_01.png"/></div>
              <br />
              <div className="clearfix"></div>
              <div className="form-group switch_wrap inline_switch">
                <label>Show Independent</label>
                <label className="switch">
                  <input type="checkbox" />
                  <div className="slider"></div>
                </label>
              </div>



              <div className="clearfix"></div>
              <div className="form_bg">
                <form>
                  <div className="panel panel-default">
                    <div className="panel-heading"> Interaction with </div>

                    <div className="panel-body">
                      <div className="input_types">
                        <input id="radio1" type="radio" name="radio" checked="checked" value="1"/><label htmlFor="radio1"><span><span></span></span>Internal Users</label>
                      </div>
                      <div className="input_types">
                        <input id="radio2" type="radio" name="radio" value="2"/><label htmlFor="radio2"><span><span></span></span>External Users</label>
                      </div>
                    </div>
                  </div>

                </form>
              </div>

            </div>
          </div>



        </div>

        <div className="col-md-12 text-right well padding10">
          <a href="#" className="mlUpload_btn">Freeze</a>
          <a href="#" className="mlUpload_btn">Make Principal</a>
          <a href="#" className="mlUpload_btn">Retire</a>
        </div>


      </div>
    )
  }
};
