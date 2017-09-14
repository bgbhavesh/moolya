/**
 * Created by vishwadeep on 12/9/17.
 */
import React from 'react';
import ScrollArea from 'react-scrollbar';
import { findSubChapterActionHandler } from '../../actions/findSubChapter'

export default class MlAnchorInfoView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      objective: [],
      contactDetails: [],
    };
  }

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

  async componentWillMount() {
    const { clusterId, chapterId, subChapterId } = this.props;
    const response = await findSubChapterActionHandler(clusterId, chapterId, subChapterId);
    const objective = response && response.objective && response.objective.map((ob) => ({
      description: ob.description,
      status: ob.status,
    }));
    const contactDetails = response.contactDetails && response.contactDetails.map((det) => _.omit(det, '__typename'))
    this.setState({
      objective: objective || [],
      contactDetails: contactDetails || []
    })
  }

  changePath(){
    console.log(this.props)
    var queryParams = this.props.queryParams && this.props.queryParams.viewMode
    queryParams = JSON.parse(queryParams)
    FlowRouter.go('/admin/dashboard/'+this.props.clusterId+'/'+this.props.chapterId+'/'+this.props.subChapterId+'/'+'communities?viewMode='+queryParams)
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
                    {
                      this.state.objective.map((ob, index) => {
                        const { status, description } = ob;
                        if (status) {
                          return <li key={`${description}index`}>{description}</li>;
                        }
                        return <span key={index}></span>
                      })
                    }
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
                {
                  this.state.contactDetails.map((cd, index) => {
                    const { emailId, buildingNumber, street, town, area, landmark, countryId, stateId, pincode, contactNumber } = cd;
                    return (
                      <p key={index}>
                        {buildingNumber}, {street}, {area}, {landmark}, {town}, {stateId}, {countryId}-{pincode}`
                        <br />
                        Tel: {contactNumber}
                        <br />
                        Email: {emailId}
                      </p>);
                  })
                }
              </ScrollArea>
            </div>
          </div>
          <div>
            <a onClick={this.changePath.bind(this)} href="">enter to subchapter</a>
          </div>

        </div>
      </div>
    )
  }
};
