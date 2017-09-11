import React, {Component, PropTypes} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import gql from "graphql-tag";
import ScrollArea from "react-scrollbar";
import formHandler from "../../../../commons/containers/MlFormHandler";
import MlActionComponent from "../../../../commons/components/actions/ActionComponent";
import MoolyaSelect from '../../../commons/components/MlAdminSelectWrapper'
import {createOfficePackageHandler} from '../actions/officePackageHandler'

import _ from 'lodash'
import CDNImage from "../../../../commons/components/CDNImage/CDNImage";
class MlAddOfficePackage extends Component{
    constructor(props){
      super(props)
      this.state = {
        isActive:false,
        isMoolya:false,
        isOthers:false,
        clusters:[],
        clusterIds:[],
        chapters:[],
        chapterIds:[],
        subChapters:[],
        applicableCommunities:[],
        communities:[],
        account:"",
        accounts:{},
        serviceCard:"",
        serviceCardType:{},
        frequency:"",
        frequencyType:{}
      }
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
    }

    componentDidUpdate(){
      var mySwiper = new Swiper('.blocks_in_form', {
        speed: 400,
        spaceBetween: 25,
        slidesPerView:3,
        pagination: '.swiper-pagination',
        paginationClickable: true
      });
    }

    async createOfficePackage(){
        var communities = _.uniqBy(this.state.communities, 'communityId');
        communities = communities.filter(function (data) {
            return typeof data.userCount !== undefined && data.userCount !== 0;
        });

        var officePackage = {
            serviceCardName : this.refs.officeName.value,
            displayName:this.refs.displayName.value,
            cardType:this.state.serviceCardType.value,
            frequencyType:this.state.frequencyType.value,
            // officeAbout:this.refs.about.value,
            accountType:this.state.accounts.value,
            isMoolya:this.state.isMoolya,
            isOthers:this.state.isOthers,
            isActive:this.state.isActive,
            applicableCommunity:this.state.applicableCommunities,
            availableCommunities:communities,
            clusters:this.state.clusters,
            chapters:this.state.chapters,
            subChapters:this.state.subChapters,
            totalCount:this.refs.totalCount.value,
            principalUserCount:this.refs.principalCount.value,
            teamUserCount:this.refs.teamUserCount.value
        };
        console.log(officePackage)
        var response = await createOfficePackageHandler(officePackage);
        if(response && response.success){
            FlowRouter.go("/admin/packages/officeList");
        }
        else if(response && !response.success){
          toastr.error(response.result);
        }else{
          toastr.error("Error In Creating Office Package");
        }
    }

    async handleSuccess(response) {

    }

    async handleError(response) {

    }

    optionsBySelectApplicableCommunity(Idx, calback, selObject){
      var communities = [];
      _.each(selObject, function (community) {
        communities.push({communityName:community.communityName, communityId:community.communityId})
      })
      this.setState({applicableCommunities:communities});
    }

    optionsBySelectCommunity(Idx, calback, selObject)
    {
      var communities = [];
      _.each(selObject, function (community) {
          communities.push({communityName:community.communityName, communityId:community.communityId})
      })
      this.setState({communities:communities});
    }

    optionsBySelectClusters(Idx, calback, selObject){
        var clusterIds = []
        var clusters = [];
        _.each(selObject, function (cluster) {
          clusters.push(_.omit(cluster, ['__typename']));
          clusterIds.push(cluster.clusterId)
        })

        this.setState({clusters:clusters});
        this.setState({clusterIds:clusterIds})
    }

    optionsBySelectChapters(Idx, calback, selObject){
        var chapterIds = []
        var chapters = []
        _.each(selObject, function (chapter) {
          chapters.push(_.omit(chapter, ['__typename']));
          chapterIds.push(chapter.chapterId)
        })

        this.setState({chapters:chapters});
        this.setState({chapterIds:chapterIds})
    }

    optionsBySelectSubChapters(Idx, calback, selObject){
        var subChapters = [];
        _.each(selObject, function (subChapter) {
          subChapters.push(_.omit(subChapter, ['__typename']));
        })
        this.setState({subChapters:subChapters});
    }

    optionsBySelectAccountTypes(Idx, calback, selObject){
        this.setState({account:Idx});
        this.setState({accounts:selObject});
    }

    optionsBySelectServiceCardTypes(Idx, calback, selObject){
      this.setState({serviceCard:Idx});
      this.setState({serviceCardType:selObject});
    }

    optionsBySelectFrequencyTypes(Idx, calback, selObject){
      var frequencyType = selObject
      this.setState({frequency:Idx});
      this.setState({frequencyType:frequencyType});
    }

    onStatusChange(e){
      let status = this.refs.isActive.checked
      this.setState({isActive:status})
    }

    onAvailabilityChange(e)
    {
      if(this.refs.isMoolya.checked){
        this.setState({isMoolya:this.refs.isMoolya.checked})
      }

      if(this.refs.isMoolya.others){
        this.setState({isOthers:this.refs.isOthers.checked})
      }
    }

    onTextChange(e){
      this.setState({about:e.target.value})
    }

    handleBlur(id, e){
        let data            =   this.state.communities;
        data[id].userCount  = Number(e.target.value)
        this.setState({communities: data})
    }

    render(){
      let that = this;
      let serviceTypeQuery = gql `query{data:fetchServicecardTypes {label:displayName, value: _id}}`;
      let frequencyTypeQuery = gql `query{data:fetchFrequencyTypes {label:displayName, value: _id}}`;
      let accountsquery = gql `query{data: FetchAccount {label:accountName,value: _id}}`;
      let communityQuery = gql`query{data:fetchCommunitiesDef {communityId:_id, communityName:name}}`;
      let clusterquery = gql` query{data:fetchClustersForMap{clusterName:displayName,clusterId:_id}}`;
      let chapterOption = this.state.clusters.length>0?{options: {variables: {clusters: this.state.clusterIds}}}:{options: {variables: {clusters: []}}};
      let chapterquery = gql`query($clusters:[String]){  
        data:fetchActiveClusterChapters(clusters:$clusters) {chapterId:_id, chapterName:chapterName}  
      }`;
      let subChapterOption = this.state.chapterIds.length>0&&this.state.clusterIds.length>0?{options: {variables: {chapters: this.state.chapterIds,clusters: this.state.clusterIds}}}:{options: {variables: {chapters: [],clusters: []}}};
      let subChapterquery = gql`query($chapters:[String],$clusters:[String]){  
          data:fetchActiveChaptersSubChapters(chapters:$chapters,clusters:$clusters) {subChapterId:_id, subChapterName:subChapterName}  
      }`;

      let frequency = this.state.frequency;

      let MlActionConfig = [
        {
          actionName: 'save',
          showAction: true,
          handler: async(event) => this.props.handler(this.createOfficePackage.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
        },
        {
          showAction: true,
          actionName: 'cancel',
          handler: async(event) => {
            FlowRouter.go("/admin/packages/officeList");
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
                    <input type="text" placeholder="Name" className="form-control float-label" ref="officeName"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Display Name" className="form-control float-label" ref="displayName"/>
                  </div>
                  <div className="form-group">
                    <MoolyaSelect multiSelect={false} placeholder={"Service Card Type"} className="form-control float-label"
                      valueKey={'value'} labelKey={'label'} selectedValue={this.state.serviceCard} queryType={"graphql"}
                      query={serviceTypeQuery} isDynamic={true} id={'query'} onSelect={this.optionsBySelectServiceCardTypes.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    {/*<MoolyaSelect multiSelect={false} placeholder={"Frequency Type"} className="form-control float-label"*/}
                      {/*valueKey={'value'} labelKey={'label'} selectedValue={frequency} queryType={"graphql"}*/}
                      {/*query={frequencyTypeQuery} isDynamic={true} id={'query'} onSelect={this.optionsBySelectFrequencyTypes.bind(this)}*/}
                    {/*/>*/}
                    <MoolyaSelect multiSelect={false} className="form-field-name" valueKey={'value'}
                                  labelKey={'label'} queryType={"graphql"} query={frequencyTypeQuery}
                                  isDynamic={true} placeholder="Frequency Type"
                                  onSelect={this.optionsBySelectFrequencyTypes.bind(this)}
                                  selectedValue={frequency}/>
                  </div>
                  <div className="form-group">
                    <tetxtarea className="form-control float-label" type='text' value={this.state.about} onChange={this.onTextChange.bind(this)}></tetxtarea>
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
                        <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><CDNImage src="/images/sub_default.jpg"/></li>
                      </ul>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="form-group">
                    <MoolyaSelect multiSelect={false} placeholder={"Account Type"} className="form-control float-label"
                      valueKey={'value'} labelKey={'label'} selectedValue={this.state.account} queryType={"graphql"}
                      query={accountsquery} isDynamic={true} id={'query'} onSelect={this.optionsBySelectAccountTypes.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <div className="fileUpload mlUpload_btn">
                      <span>Profile Pic</span>
                      <input type="file" className="upload" />
                    </div>
                    <div className="previewImg ProfileImg">
                      <CDNImage src="/images/ideator_01.png"/>
                    </div>
                  </div>
                  <div className="clearfix"/>
                  <div className="form-group">
                    <div className="input_types"><input type="checkbox" name="moolya" ref="isMoolya" onChange={this.onAvailabilityChange.bind(this)} /><label htmlFor="checkbox1"><span></span>Moolya</label></div>
                    <div className="input_types"><input type="checkbox" name="others" ref="isOthers" onChange={this.onAvailabilityChange.bind(this)}/><label htmlFor="checkbox1"><span></span>Others</label></div>
                    {/*<div className="input_types"><input type="checkbox" name="both" ref="isBoth" value="both" onChange={this.onAvailabilityChange.bind(this)}/><label htmlFor="checkbox1"><span></span>Both</label></div>*/}
                  </div>
                  <br className="brclear"/>
                  <div className="form-group switch_wrap inline_switch">
                    <label className="">Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.isActive} onChange={this.onStatusChange.bind(this)}/>
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
                      <MoolyaSelect multiSelect={true} className="form-control float-label" valueKey={'communityId'} labelKey={'communityName'} queryType={"graphql"} query={communityQuery} isDynamic={true}
                                    onSelect={this.optionsBySelectApplicableCommunity.bind(this)} placeholder="Applicable Community" selectedValue={this.state.applicableCommunities}/>
                    </div>
                    <div className="form-group">
                      <input type="Number" placeholder="Total number users" className="form-control float-label" ref="totalCount"/>
                    </div>
                    <div className="form-group">
                      <input type="Number" placeholder="Number of principal" className="form-control float-label" ref="principalCount"/>
                    </div>
                    <div className="form-group">
                      <input type="Number" placeholder="Number of Team members" className="form-control float-label" ref="teamUserCount"/>
                    </div>
                    <div className="form-group">
                      <MoolyaSelect multiSelect={true} className="form-control float-label" valueKey={'communityId'} labelKey={'communityName'} queryType={"graphql"} query={communityQuery} isDynamic={true}
                         onSelect={this.optionsBySelectCommunity.bind(this)} placeholder="Select Community" selectedValue={this.state.communities}/>
                    </div>
                    <div className="swiper-container blocks_in_form">
                      <div className="swiper-wrapper">
                        {this.state.communities.map(function (options, id) {
                          var classname = "ml ml-"+options.communityName
                          return(
                            <div className="swiper-slide" key={id}>
                              <div className="team-block marb0">
                                <span className="ml ml-ideator"></span>
                                <h3>{options.communityName}</h3>
                              </div>
                              <div className="form-group mart20">
                                <input type="Number" defaultValue={options.userCount} placeholder="No of Users" className="form-control float-label" onBlur={that.handleBlur.bind(that, id)}/>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="form-group">
                      <MoolyaSelect multiSelect={true} placeholder={"Cluster"} className="form-control float-label"
                          valueKey={'clusterId'} labelKey={'clusterName'} selectedValue={this.state.clusters}
                          queryType={"graphql"} query={clusterquery} isDynamic={true} id={'clusterquery'}
                          onSelect={this.optionsBySelectClusters.bind(this)}/>
                    </div>
                    <div className="form-group">
                      <MoolyaSelect multiSelect={true} placeholder={"Chapter"} className="form-control float-label" valueKey={'chapterId'} labelKey={'chapterName'}
                          selectedValue={this.state.chapters} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption}isDynamic={true}
                          id={'query'} onSelect={this.optionsBySelectChapters.bind(this)}/>
                    </div>
                    <div className="form-group">
                      <MoolyaSelect multiSelect={true} placeholder={"Sub Chapter"} className="form-control float-label"
                        valueKey={'subChapterId'} labelKey={'subChapterName'} selectedValue={this.state.subChapters}
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


export default MlAddOfficePackage = formHandler()(MlAddOfficePackage);
