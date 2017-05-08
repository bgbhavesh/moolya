import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import StarRatings from '../../commons/components/starRatings';
import 'react-responsive-tabs/styles.css'
import {fetchIdeaActionHandler} from '../actions/IdeaActionHandler'

export default class MlAppIdeatorIdeas extends React.Component{
  constructor(props, context){
      super(props);
      this.state= {loading: false,userIdeas:[], initialSlide:1},
      this.fetchIdeas.bind(this)
      return this;
  }
  componentDidMount() {
  }
  componentDidUpdate(){
      let swiper = new Swiper('.ideas_swiper', {
          pagination: '.swiper-pagination',
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          initialSlide:this.state.initialSlide,
          slidesPerView: 'auto',
          coverflow: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows : true
          }
      });
      $('.idea_details .ideas_block').click(function(){
          GetIdeaId =  $(this).attr('name');
          $('.idea_details .portfolio-main-wrap .panel').slideUp();
          $('#'+GetIdeaId).slideDown();
      });
      $('#'+this.state.initialSlide).slideDown();
  }
  componentWillMount()
  {
      this.fetchIdeas();
  }

  AddIdea(e){
    FlowRouter.go("/app/portfolio/addIdea")
  }

  async fetchIdeas(){
      const response = await fetchIdeaActionHandler();
      if(response){
          this.setState({loading: false, userIdeas: response});
      }
  }

  viewIdea(portfolioId, community,e){
    FlowRouter.go("/app/portfolio/view/"+portfolioId+"/"+community);
  }

  editIdea(portfolioId, community,e){
    FlowRouter.go("/app/portfolio/edit/"+portfolioId+"/"+community);
  }

  render(){
    let that=this
      return (
          <div>
              <h2>Ideas</h2>
              <div className="main_wrap_scroll idea_details">
                  <ScrollArea
                    speed={0.8}
                    className="main_wrap_scroll"
                    smoothScrolling={true}
                    default={true}
                  >
                      <div className="col-md-2"></div>
                      <div className="col-md-8">
                          <div className="swiper-container ideas_swiper">
                              <div className="swiper-wrapper">
                                  {this.state.userIdeas.map(function (idea, idx) {
                                      let url = idea.imageUrl;
                                      return(
                                          <div className="swiper-slide ideas_block" name={idx}
                                             style={{'backgroundImage': 'url('+{url}+')'}} key={idx}>
                                              <h3 className="rating_xs"> {idea.title}<br/> <StarRatings/></h3>
                                          </div>
                                      )
                                  })}
                              </div>
                              <div className="swiper-pagination"></div>
                          </div>
                      </div>
                  <div className="col-md-2"></div>
                  <br/>
                   {(!this.state.userIdeas || this.state.userIdeas.length<1)?
                      <div className="col-lg-12 col-md-12 col-sm-12 portfolio-main-wrap">
                          <div className="panel panel-default" style={{'display':'block'}}>
                          <a href="/app/portfolio/addIdea" className="mlUpload_btn pull-left">Add New Idea</a>
                          </div>
                        </div>
                      :
                      <div className="col-lg-12 col-md-12 col-sm-12 portfolio-main-wrap">
                          {this.state.userIdeas.map(function (idea, idx) {
                              return (
                                  <div className="panel panel-default panel-form-view" id={idx} style={{'display':'none'}} key={idx}>
                                      <div className="panel-heading">{idea.title}</div>
                                      <div className="panel-body">
                                          <p>{idea.description}</p>
                                          <a className="mlUpload_btn pull-left" onClick={that.viewIdea.bind(that, idea.portfolioId, "Ideators")}>View</a>
                                          <a className="mlUpload_btn pull-left" onClick={that.editIdea.bind(that, idea.portfolioId, "Ideators")}>Edit</a>
                                          <a href="/app/portfolio/addIdea" className="mlUpload_btn pull-left" onClick={that.AddIdea.bind(that)}>Add New Idea</a>
                                      </div>
                                  </div>
                              )
                          })}
                      </div>
                   }
                   </ScrollArea>
              </div>
          </div>
      )
  }
};