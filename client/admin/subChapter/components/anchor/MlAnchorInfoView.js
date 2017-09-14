/**
 * Created by vishwadeep on 12/9/17.
 */
import React from 'react';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';

export default class MlAnchorInfoView extends React.Component {
  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }
  changePath(){
    // FlowRouter.go('')
    console.log('change path')
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <div className="panel panel-default">
            <div className="panel-heading">RakSan Subchapter</div>
            <div className="panel-body nopadding">
              <div className="col-md-2 text-center">
                <img src="/images/startup_default.png" className="margintop"/>
              </div>
              <div className="col-md-10 nopadding att_members">
                <ul className="users_list">
                  <li>
                    <a href="#">
                      <span className="icon_bg"> <span className="icon_lg ml ml-ideator"></span></span><br />
                      <div className="tooltiprefer">
                        <span>Ideator <b>20k</b></span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon_bg"> <span className="icon_lg ml ml-startup"></span></span><br />
                      <div className="tooltiprefer">
                        <span>Startup <b>20k</b></span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon_bg"> <span className="icon_lg ml ml-company"></span></span><br />
                      <div className="tooltiprefer">
                        <span>Company <b>20k</b></span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon_bg"> <span className="icon_lg ml ml-funder"></span></span><br />
                      <div className="tooltiprefer">
                        <span>Funder <b>20k</b></span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon_bg"> <span className="icon_lg ml ml-users"></span></span><br />
                      <div className="tooltiprefer">
                        <span>SP <b>20k</b></span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lx-4 col-sm-4 col-md-4 nopadding-left">
            <div className="row">
              {/*<h3>Users List</h3>*/}
              <div className="left_wrap left_user_blocks">

                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                >

                  <div className="col-md-6 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"></div>
                      <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                             src="/images/p_1.jpg"/>
                      </div>
                      <h3>User Name1</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"></div>
                      <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                             src="/images/p_2.jpg"/>
                      </div>
                      <h3>User Name2</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"></div>
                      <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                             src="/images/p_3.jpg"/>
                      </div>
                      <h3>User Name3</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"></div>
                      <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                             src="/images/p_4.jpg"/>
                      </div>
                      <h3>User Name4</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"></div>
                      <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                             src="/images/p_5.jpg"/>
                      </div>
                      <h3>User Name5</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"></div>
                      <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                             src="/images/p_6.jpg"/>
                      </div>
                      <h3>user Name6</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"></div>
                      <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                             src="/images/p_7.jpg"/>
                      </div>
                      <h3>User Name7</h3>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className="col-lx-4 col-sm-4 col-md-4">
            <div className="row">
              {/*<h3>Users List</h3>*/}
              <div className="left_wrap left_user_blocks">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                >
                  <h3>Objectives :</h3>
                  <ul className="list-info">
                    <li>Zomato Internet Private Limited is a Private incorporated on 08 October 2015. It is classified
                      as Non-govt company and is registered at Registrar of Companies, Delhi. Its authorized share
                      capital is Rs. 100,000 and its paid up capital is Rs. 100,000.It is inolved in Business activities
                      n.e.c.
                    </li>
                    <li>Zomato Internet Private Limited's Annual General Meeting (AGM) was last held on 14 June 2016 and
                      as per records from Ministry of Corporate Affairs (MCA), its balance sheet was last filed on 31
                      March 2016.
                    </li>
                    <li>Zomato acquired Seattle-based food portal Urbanspoon for an undisclosed sum in January 2015.
                    </li>
                    <li>Zomato acquired Delhi based startup MapleGraph that built MaplePOS.</li>
                  </ul>
                </ScrollArea>
              </div>
            </div>
          </div>

          <div className="col-lx-4 col-sm-4 col-md-4 nopadding-right">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
              >
                <h3>Contact Us:</h3>
                <p>
                  raksan consulting private limited
                  #1002, 10th floor, the platina, gachibowli, hyderabad, telangana, india - 500032
                  <br />
                  Tel : +91 40 95518300
                  <br />
                  Email : raksan@mymoolya.com
                </p>
              </ScrollArea>
            </div>
          </div>
          <a onClick={this.changePath.bind(this)}>enter to subchapter</a>
        </div>
      </div>
    )
  }
};
