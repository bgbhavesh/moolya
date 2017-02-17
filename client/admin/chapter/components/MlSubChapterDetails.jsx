import React from 'react';
import { render } from 'react-dom';
import MlActionComponent from '../../../commons/components/actions/ActionComponent'

export default class MlSubChapterDetails extends React.Component{
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
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.addEventHandler.bind(this), this.handleSuccess.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Subchapter details</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group ">
                  <input type="text" placeholder="Cluster Name" className="form-control float-label" id="cluster_name" defaultValue="India"/>

                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter Name" className="form-control float-label" id="chapter_name" defaultValue="Hyderabad"/>

                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subchapter Name" className="form-control float-label" id="chapter_name" defaultValue="Hyderabad"/>

                </div>
                <div className="form-group">
                  <input type="text" placeholder="Display Name" className="form-control float-label" id="displayname"/>

                </div>
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
                <div className="form-group">
                  <div className="fileUpload mlUpload_btn">
                    <span>Profile Pic</span>
                    <input type="file" className="upload" />
                  </div>
                  <div className="previewImg ProfileImg">
                    <img src="/images/ideator_01.png"/>
                  </div>
                </div><br />
                <div className="form-group">
                  <input type="text" placeholder="Chapter image" className="form-control float-label" id="ch_image"/>

                </div>
                <div className="form-group">
                  <input type="text" id="state" placeholder="State" className="form-control float-label" defaultValue="Telangana"/>

                </div>
                <div className="form-group">
                  <input type="text" id="email" placeholder="Chapter Email ID" className="form-control float-label"/>
                  <div className="email_notify">
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Notify</label></div>
                  </div>

                </div>
                <div className="form-group switch_wrap">
                  <label>Show on map</label><br/>
                  <label className="switch">
                    <input type="checkbox" />
                    <div className="slider"></div>
                  </label>
                </div>
                <div className="form-group switch_wrap">
                  <label>Status</label><br/>
                  <label className="switch">
                    <input type="checkbox" />
                    <div className="slider"></div>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>


      </div>
    )
  }
};
