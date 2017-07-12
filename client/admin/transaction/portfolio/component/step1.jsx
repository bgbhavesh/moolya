import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import ScrollArea from 'react-scrollbar';
import Moolyaselect from '../../../commons/components/MlAdminSelectWrapper'

export default class Step1 extends React.Component{

  constructor(props){
    super(props);
    this.state={
      // loading:true,
      cluster:'',
      chapter:'',
      subChapter:'',
      community:''
    }
    return this;
  }

  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));

    var mySwiper = new Swiper('.swiper-container', {
      speed: 400,
      spaceBetween: 10,
      slidesPerView:4
    });

  }
  optionsBySelectCluster(value){
    this.setState({cluster:value})
  }
  optionsBySelectChapter(value){
    this.setState({chapter:value})
  }
  optionsBySelectSubChapter(value){
    this.setState({subChapter:value})
  }
  optionsBySelectCommunity(value){
    this.setState({community:value})
  }

  render(){
    let clusterQuery=gql` query{
      data:fetchActiveClusters{label:countryName,value:_id}
    }
    `;
    let chapterQuery=gql`query($id:String){  
      data:fetchChapters(id:$id) {
        value:_id
        label:chapterName
      }  
    }`;
    let subChapterQuery=gql`query($id:String){  
      data:fetchSubChaptersSelect(id:$id) {
        value:_id
        label:subChapterName
      }  
    }`;
    let communityQuery=gql`query($clusterId:String, $chapterId:String, $subChapterId:String){  
      data:fetchCommunitiesSelect(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId) {
          value:code    
          label:name
      }  
    }`;

    let chapterOption={options: { variables: {id:this.state.cluster}}};
    let subChapterOption={options: { variables: {id:this.state.chapter}}};
    let communityOption={options: { variables: {clusterId:this.state.cluster, chapterId:this.state.chapter, subChapterId:this.state.subChapter}}};
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  {/*<Select name="form-field-name"value="select"options={options} className="float-label"/>*/}
                  <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.cluster} queryType={"graphql"} query={clusterQuery} isDynamic={true}  onSelect={this.optionsBySelectCluster.bind(this)} />
                </div>
                <div className="form-group">
                  {/*<Select name="form-field-name"value="select"options={options5} className="float-label"/>*/}
                  <Moolyaselect multiSelect={false} placeholder="Select Sub Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapter} queryType={"graphql"} query={subChapterQuery} reExecuteQuery={true} queryOptions={subChapterOption} isDynamic={true} onSelect={this.optionsBySelectSubChapter.bind(this)}/>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapter} queryType={"graphql"} query={chapterQuery} reExecuteQuery={true} queryOptions={chapterOption}  isDynamic={true}  onSelect={this.optionsBySelectChapter.bind(this)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={false} placeholder="Select Community" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.community} queryType={"graphql"} query={communityQuery} reExecuteQuery={true} queryOptions={communityOption} isDynamic={true} onSelect={this.optionsBySelectCommunity.bind(this)}/>
                </div>
              </form>
            </div>
          </div>
          <input type="text" name="search" className="search_field" placeholder="Search.."/>
          <div className="col-md-12 subscriptions nopadding">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Starter</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Regular</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Premium</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Regular</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Regular</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Regular</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Regular</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Regular</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Regular</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Regular</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="#">
                    <div className="subscriptions_block">
                      <div className="regular"><span>Regular</span></div>
                      <h3>Individual</h3>
                      <div className="sub_icon"><span className="ml ml-funder"></span><br />funder</div>
                      <h4>Banglore / India</h4>

                    </div>
                  </a>
                </div>
              </div>

              <div className="swiper-scrollbar"></div>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
