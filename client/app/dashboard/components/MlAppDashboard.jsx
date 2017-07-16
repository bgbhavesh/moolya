import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MapView from './MlMapView';
// import {fetchPendingRegistration} from '../../registrations/actions/findRegistration'
var FontAwesome = require('react-fontawesome');
export default class MlAppDashboard extends React.Component{
  constructor(props){
    super(props);
    // this.fetchPendingReg.bind(this)
  }
  componentDidMount()
  {
    $('.view_switch').click(function(){
      if($(this).hasClass('map_view')){
        $(this).removeClass('map_view').addClass('list_view');
        $('.map_view_block').hide();
        $('.list_view_block').show();
        $('.admin_padding_wrap').removeClass('no_padding');
      }else{
        $(this).removeClass('list_view').addClass('map_view');
        $('.map_view_block').show();
        $('.list_view_block').hide();
        $('.admin_padding_wrap').addClass('no_padding');
      }
    });
    $(".community_icons a").click(function(){
      $('.community_icons a').removeClass('active_community');
      $(this).addClass('active_community');
      var value = $(this).attr('data-filter');
      if(value == "all")
      {
        $('.filter-block').show('1000');
      }
      else
      {
        $(".filter-block").not('.'+value).hide('3000');
        $('.filter-block').filter('.'+value).show('3000');

      }
    });
  }

  /**registration mounting for the first login only*/
  // componentWillMount(){
  //   const resp = this.fetchPendingReg()
  //   return resp
  // }
  //
  // async fetchPendingReg() {
  //   const response = await fetchPendingRegistration();
  //   if(response && response.length>0){
  //     FlowRouter.go('/app/register/'+response[0].registrationId)
  //   }
  // }

  render(){
    return (
      <div className="app_main_wrap">
        <div className="community_icons">
          <a data-toggle="tooltip" title="All" data-placement="bottom" className="active_community" href="#" data-filter="all"><span className="ml ml-select-all"></span>{/*<FontAwesome className="ml" name='th'/>*/}</a>
          <a data-toggle="tooltip" title="Ideators" data-placement="bottom" className="" href="#" data-filter="ideator"><span className="ml ml-ideator"></span></a>
          <a data-toggle="tooltip" title="Funders" data-placement="bottom" href="#" data-filter="funder"><span className="ml ml-funder"></span></a>
          <a data-toggle="tooltip" title="Start Ups" data-placement="bottom" href="#" data-filter="startup"><span className="ml ml-startup"></span></a>
          <a data-toggle="tooltip" title="Providers" data-placement="bottom" href="#" data-filter="provider"><span className="ml ml-users"></span></a>
          <a data-toggle="tooltip" title="Browsers" data-placement="bottom" href="#" data-filter="browser"><span className="ml ml-browser"></span></a>
          <a data-toggle="tooltip" title="Company" data-placement="bottom" href="#" data-filter="company"><span className="ml ml-company"></span></a>
        </div>
        <div className="view_switch map_view" />
        <div className="map_view_block">
          <MapView/>
        </div>
        <div className="app_padding_wrap no_padding">
          <div className="list_view_block" style={{display: 'none'}}>
            <div className="filter cus_filter"> <img src="/images/filter_icon.png" /> </div>

            <div className="col-md-12">
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block ideator">
                  <div className="list_block ideator_block">
                    <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                    <div className="ideator_mask">
                      <img src="/images/p_9.jpg" />
                    </div>
                    <h3>Ideator Name <br />
                      UAE</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block provider">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                    <div className="provider_mask">
                      <img src="/images/provider_bg.png" />
                      <img className="user_pic" src="/images/p_10.jpg" />
                    </div>
                    <h3>Provider Name <br />
                      USA</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block internalUser">
                  <div className="list_block provider_block">
                    <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                    <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_11.jpg" />
                    </div>
                    <h3>Internal User Name <br />
                      USA</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block ideator">
                  <div className="list_block ideator_block">
                    <div className="cluster_status add_cl"><FontAwesome name='plus'/></div>
                    <div className="ideator_mask">
                      <img src="/images/p_12.jpg" />
                    </div>
                    <h3>Ideator Name <br />
                      UAE</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block provider">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                    <div className="provider_mask">
                      <img src="/images/provider_bg.png" />
                      <img className="user_pic" src="/images/p_1.jpg" />
                    </div>
                    <h3>Provider Name <br />
                      USA</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block funder">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_2.jpg" />
                    </div>
                    <h3>Funder Name <br />
                      USA</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block startup">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                    <div className="provider_mask">
                      <img src="/images/provider_bg.png" />
                      <img className="user_pic" src="/images/p_3.jpg" />
                    </div>
                    <h3>Startup Name <br />
                      India</h3>
                  </div>
                </div>

                <div className="col-lg-2 col-md-3 col-sm-3 filter-block startup">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"><FontAwesome name='plus'/></div>
                    <div className="provider_mask">
                      <img src="/images/provider_bg.png" />
                      <img className="user_pic" src="/images/p_4.jpg" />
                    </div>
                    <h3>Startup Name <br />
                      India</h3>
                  </div>
                </div>

                <div className="col-lg-2 col-md-3 col-sm-3 filter-block ideator">
                  <a href="/admin/internalUserDetails">
                    <div className="list_block ideator_block">
                      <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                      <div className="ideator_mask">
                        <img src="/images/p_5.jpg" />
                      </div>
                      <h3>Ideator Name <br />
                        UAE</h3>
                    </div>
                  </a>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block provider">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                    <div className="provider_mask">
                      <img src="/images/provider_bg.png" />
                      <img className="user_pic" src="/images/p_6.jpg" />
                    </div>
                    <h3>Provider Name <br />
                      USA</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block funder">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_7.jpg" />
                    </div>
                    <h3>Funder Name <br />
                      USA</h3>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 filter-block ideator">
                  <a href="/admin/internalUserDetails">
                    <div className="list_block ideator_block">
                      <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                      <div className="ideator_mask">
                        <img src="/images/p_8.jpg" />
                      </div>
                      <h3>Ideator Name <br />
                        UAE</h3>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
