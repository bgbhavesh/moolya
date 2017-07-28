import React, {Component, PropTypes} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import gql from "graphql-tag";
import ScrollArea from "react-scrollbar";
import {fetchCommunitiesHandler} from '../actions/officePackageHandler'
import MlActionComponent from "../../../../commons/components/actions/ActionComponent";
import MoolyaSelect from '../../../commons/components/MlAdminSelectWrapper'

import _ from 'lodash'

export default class MlAddOfficePackage extends Component{
    constructor(props){
      super(props)
      this.state = {officePackage:{isActive:false}, clusters:[], chapters:[], subChapters:[], communities:[]}
    }

    componentDidMount(){
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

      var mySwiper = new Swiper('.blocks_in_form', {
        speed: 400,
        spaceBetween: 25,
        slidesPerView:3,
        pagination: '.swiper-pagination',
        paginationClickable: true
      });
    }

    async createOfficePackage(){
    }

    optionsBySelectCommunity(Idx, calback, selObject){
      this.setState({communities:selObject});
    }

    optionsBySelectClusters(Idx, calback, selObject){
        this.setState({clusters:selObject});
    }

    optionsBySelectChapters(Idx, calback, selObject){
        this.setState({clusters:selObject});
    }

    optionsBySelectSubChapters(Idx, calback, selObject){

    }

    onStatusChange(e){
      let status = this.refs.isActive.checked
      var officePackage = this.state.officePackage
      officePackage.isActive = status;
      this.setState({officePackage:officePackage})
    }

    render(){
      let communityQuery = gql`query{data:fetchCommunitiesDef {value:_id, label:name}}`;

      let clusterquery = gql` query{data:fetchClustersForMap{label:displayName,value:_id}}`;
      let chapterOption = this.state.clusters.length>0?{options: {variables: {clusters: this.state.clusters}}}:{options: {variables: {clusters: []}}};
      let chapterquery = gql`query($clusters:[String]){  
        data:fetchActiveClusterChapters(clusters:$clusters) {
          value:_id
          label:chapterName
        }  
      }`;
      let subChapterOption = this.state.chapters.length>0&&this.state.clusters.length>0?{options: {variables: {chapters: this.state.chapters,clusters: this.state.clusters}}}:{options: {variables: {chapters: [],clusters: []}}};
      let subChapterquery = gql`query($chapters:[String],$clusters:[String]){  
          data:fetchActiveChaptersSubChapters(chapters:$chapters,clusters:$clusters) {
            value:_id
            label:subChapterName
          }  
      }`;

      let MlActionConfig = [
        {
          actionName: 'save',
          showAction: true,
          handler: async(event) => (this.createOfficePackage.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
        },
        {
          showAction: true,
          actionName: 'cancel',
          handler: async(event) => {
            let clusterId = this.props.clusterId;
            let chapterId = this.props.chapterId;
            FlowRouter.go('/admin/chapters/' + clusterId + '/' + chapterId + '/' + 'subChapters');
          }
        }
      ]
      return(
        <div className="admin_main_wrap">
          <div className="admin_padding_wrap step5">
            <h2>Office Purchase</h2>
            <div className="col-lx-6 col-sm-6 col-md-6 nopadding-left">
              <div className="left_wrap left_user_blocks">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                >
                  <div className="form-group">
                    <input type="text" placeholder="Name" className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Display Name" className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <select className="form-control float-label"><option>Card Type</option></select>
                  </div>
                  <div className="form-group">
                    <select className="form-control float-label"><option>Frequency Type</option></select>
                  </div>
                  <div className="form-group">
                    <tetxtarea className="form-control float-label"></tetxtarea>
                  </div>
                  <div className="panel panel-default uploaded_files">
                    <div className="panel-heading">
                      Terms & Conductions
                      <div className="pull-right block_action">
                        <div className="fileUpload upload_file_mask">
                          <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                            <input type="file" className="upload_file upload" name="file_source" /></a>
                        </div>
                      </div>

                    </div>
                    <div className="panel-body uploaded_files_swiper">
                      <ul className="swiper-wrapper">
                        <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
                      </ul>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="form-group">
                    <select className="form-control float-label"><option>Acount Type</option></select>
                  </div>
                  <div className="form-group">
                    <div className="fileUpload mlUpload_btn">
                      <span>Profile Pic</span>
                      <input type="file" className="upload" />
                    </div>
                    <div className="previewImg ProfileImg">
                      <img src="/images/ideator_01.png"/>
                    </div>
                  </div>
                  <div className="clearfix"/>
                  <div className="form-group">
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Moolya</label></div>
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Others</label></div>
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Both</label></div>
                  </div>
                  <br className="brclear"/>
                  <div className="form-group switch_wrap inline_switch">
                    <label className="">Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.officePackage.isActive} onChange={this.onStatusChange.bind(this)}/>
                      <div className="slider"></div>
                    </label>
                  </div>
                </ScrollArea>
              </div>
            </div>
            <div className="col-lx-6 col-sm-6 col-md-6 nopadding-right">
              <br className="brclear"/>
              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                >
                  <form>
                    <div className="form-group">
                      <MoolyaSelect multiSelect={true} className="form-control float-label" valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={communityQuery} isDynamic={true}
                                    onSelect={this.optionsBySelectCommunity.bind(this)} placeholder="Applicable Community" selectedValue={this.state.communities}/>
                    </div>
                    <div className="form-group">
                      <input type="Number" placeholder="Total number users" className="form-control float-label"/>
                    </div>
                    <div className="form-group">
                      <input type="Number" placeholder="Number of principal" className="form-control float-label"/>
                    </div>
                    <div className="form-group">
                      <input type="Number" placeholder="Number of Team members" className="form-control float-label"/>
                    </div>
                    <div className="form-group">
                      <select className="form-control float-label"><option>Select Community</option></select>
                    </div>
                    <div className="swiper-container blocks_in_form">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide"><div className="team-block marb0">
                          <span className="ml ml-ideator"></span>
                          <h3>
                            ideator
                          </h3>
                        </div><div className="form-group mart20">
                          <input type="number" placeholder="no of users" className="form-control float-label" id="cluster_name"/>
                        </div></div>
                        <div className="swiper-slide"><div className="team-block marb0">
                          <span className="ml ml-startup"></span>
                          <h3>
                            Startup
                          </h3>
                        </div><div className="form-group mart20">
                          <input type="number" placeholder="no of users" className="form-control float-label" id="cluster_name"/>
                        </div></div>
                        <div className="swiper-slide"><div className="team-block marb0">
                          <span className="ml ml-company"></span>
                          <h3>
                            Company
                          </h3>
                        </div><div className="form-group mart20">
                          <input type="number" placeholder="no of users" className="form-control float-label" id="cluster_name"/>
                        </div></div>
                        <div className="swiper-slide"><div className="team-block marb0">
                          <span className="ml ml-users"></span>
                          <h3>
                            Service Provider
                          </h3>
                        </div><div className="form-group mart20">
                          <input type="number" placeholder="no of users" className="form-control float-label" id="cluster_name"/>
                        </div></div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="form-group">
                      <MoolyaSelect multiSelect={true} placeholder={"Cluster"} className="form-control float-label"
                          valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters}
                          queryType={"graphql"} query={clusterquery} isDynamic={true} id={'clusterquery'}
                          onSelect={this.optionsBySelectClusters.bind(this)}/>
                    </div>
                    <div className="form-group">
                      <MoolyaSelect multiSelect={true} placeholder={"Chapter"} className="form-control float-label" valueKey={'value'} labelKey={'label'}
                          selectedValue={this.state.chapters} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption}isDynamic={true}
                          id={'query'} onSelect={this.optionsBySelectChapters.bind(this)}/>
                    </div>
                    <div className="form-group">
                      <MoolyaSelect multiSelect={true} placeholder={"Sub Chapter"} className="form-control float-label"
                        valueKey={'value'} labelKey={'label'} selectedValue={this.state.subchapters}
                        queryType={"graphql"} query={subChapterquery} queryOptions={subChapterOption}
                        isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)}/>
                    </div>
                  </form>
                </ScrollArea>
              </div>
            </div>
          </div>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>
      )
    }
}
