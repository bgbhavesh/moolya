import React from "react";
import {render} from "react-dom";
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
var FontAwesome = require('react-fontawesome');
import StarRatings from '../components/starRatings';


export default class AppActionButtons extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle(e) {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  componentDidMount() {
    /*$(".footer-action").click(function(){
     $(".footer-action-buttons").toggleClass("displayblock");
     });*/
    /*$('.actions-button').click(function(){
     $(this).parent().css({'bottom':'57px'});
     $('.action-buttons').toggle();
     $('.related-buttons').hide();

     });*/
    $('.actions-button').click(function () {
      $(this).toggleClass('open');
      $('.action-buttons').toggle();
      $('.related-buttons').hide();
    });
    $('.related-button').click(function () {
      $(this).toggleClass('open');
      $('.action-buttons').hide(200);
      $('.related-buttons').toggle();
    });


    //$("[data-toggle~=collapse]").click(function(){
    //$(".bottom-buttons .opacity").toggle();
    //});


  }

  render() {
    return (
      <div>


        <div className="opacity"></div>
        <div className="panel-group bottom-buttons" id="accordion">
          <div className="panel">
            <div className="panel-heading clearfix">
              <h4 className="panel-title text-left">
                <a className="re-btn" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Related</a>
                <a className="act-btn" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Action</a>
              </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse" style={{'background': '#273545'}}>

              <div className="related_buttons">
                <ul>
                  <li><a href="#"><span className="ml flaticon-ml-handshake"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
                </ul>
              </div>

            </div>
            <div id="collapseTwo" className="panel-collapse collapse" style={{'background': '#ef4647'}}>

              <div className="action_buttons">
                <ul>
                  <li><a href="#" id="pop_connect" onClick={this.toggle.bind(this)}><span
                    className="ml flaticon-ml-handshake"></span><br />Connect</a></li>
                  <li><a href="#"><span className="ml flaticon-ml-shapes"></span><br />Favourits</a></li>
                  <li><a href="#" id="pop_inquiry" onClick={this.toggle.bind(this)}><span
                    className="ml flaticon-ml-support"></span><br />Inquiry</a></li>
                  <li><a href="#" id="pop_review" onClick={this.toggle.bind(this)}><span
                    className="ml flaticon-ml-note"></span><br />Review</a></li>
                  <li><a href="#"><span className="ml flaticon-ml-interface"></span><br />Wishlist</a></li>
                  <li><a href="#"><span className="ml flaticon-ml-cloud-computing"></span><br />Upload</a></li>
                  <li><a href="#"><span className="ml flaticon-ml-cloud-computing-1"></span><br />Download</a></li>
                  <li><a href="#"><span className="ml flaticon-ml-share-arrow"></span><br />Share</a></li>
                  <li><a href="#"><span className="ml flaticon-ml-share-files"></span><br />Compare</a></li>
                  <li><a href="#" id="pop_conersation" onClick={this.toggle.bind(this)}><span
                    className="ml flaticon-ml-chat"></span><br />Conersation</a></li>
                  <li><a href="#" id="pop_collaborate" onClick={this.toggle.bind(this)}><span
                    className="ml flaticon-ml-networking"></span><br />collaborate</a></li>
                  <li><a href="#"><span className="ml flaticon-ml-note-1"></span><br />Feedback</a></li>
                </ul>

              </div>

            </div>
          </div>
        </div>


        <Popover placement="top" className="footer_popover" isOpen={this.state.popoverOpen} target="pop_collaborate"
                 toggle={this.toggle.bind(this)}>
          <PopoverTitle>Collaborate</PopoverTitle>
          <PopoverContent>Do you want to collaborate ?
            <div className="ml_btn">
              <a href="#" className="save_btn">Yes</a>
              <a href="#" className="cancel_btn">No</a>
            </div>
          </PopoverContent>
        </Popover>

        <Popover placement="top" className="footer_popover" isOpen={this.state.popoverOpen} target="pop_review"
                 toggle={this.toggle.bind(this)}>
          <PopoverTitle>Reviews</PopoverTitle>
          <PopoverContent>

            <ul className="review_pop">
              <li>
                <div className="media">
                  <div className="media-left media-top">
                    <img src="/images/p_6.jpg" className="media-object"/>
                  </div>
                  <div className="media-body rating_xs">
                    <h4 className="media-heading">Media Top <span>27/03/2017, 08:10:15</span></h4>
                    <StarRatings/>
                    <p>Lorem ipsum...</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="media">
                  <div className="media-left media-top">
                    <img src="/images/p_6.jpg" className="media-object"/>
                  </div>
                  <div className="media-body rating_xs">
                    <h4 className="media-heading">Media Top <span>27/03/2017, 08:10:15</span></h4>
                    <StarRatings/>
                    <p>Lorem ipsum...</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="media">
                  <div className="media-left media-top">
                    <img src="/images/p_6.jpg" className="media-object"/>
                  </div>
                  <div className="media-body rating_xs">
                    <h4 className="media-heading">Media Top <span>27/03/2017, 08:10:15</span></h4>
                    <StarRatings/>
                    <p>Lorem ipsum...</p>
                  </div>
                </div>
              </li>
            </ul>


          </PopoverContent>
        </Popover>

        <Popover placement="top" className="footer_popover" isOpen={this.state.popoverOpen} target="pop_connect"
                 toggle={this.toggle.bind(this)}>
          <PopoverTitle>Connect</PopoverTitle>
          <PopoverContent>
            Do you want to connect ?
            <div className="ml_btn">
              <a href="#" className="save_btn">Connect</a>
              <a href="#" className="cancel_btn">Cancel</a>
            </div>
          </PopoverContent>
        </Popover>

        <Popover placement="top" className="footer_popover" isOpen={this.state.popoverOpen} target="pop_conersation"
                 toggle={this.toggle.bind(this)}>
          <PopoverTitle>Connect</PopoverTitle>
          <PopoverContent>
            <ul className="list_style">
              <li>
                <a href="#">
                  <FontAwesome name='envelope-o'/><br />
                  Mail
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesome name='comment-o'/><br />
                  Chat
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesome name='video-camera'/><br />
                  Video
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesome name='volume-up'/><br />
                  Audio
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesome name='mobile'/><br />
                  SMS
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesome name='phone'/><br />
                  Call
                </a>
              </li>
            </ul>
          </PopoverContent>
        </Popover>


        <Popover placement="top" className="footer_popover" isOpen={this.state.popoverOpen} target="pop_inquiry"
                 toggle={this.toggle.bind(this)}>
          <PopoverTitle>Inquiry</PopoverTitle>
          <PopoverContent>
            <div className="form-group">
              <input type="text" placeholder="To" defaultValue="example@example.com"
                     className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" defaultValue="Inquiry" className="form-control float-label"
                     id=""/>
            </div>
            <div className="form-group">
              <textarea placeholder="Subject" defaultValue="Inquiry" className="form-control float-label"
                        id=""></textarea>
            </div>
            <div className="ml_btn">
              <a href="#" className="save_btn">Send</a>
              <a href="#" className="cancel_btn">Cancel</a>
            </div>
          </PopoverContent>
        </Popover>


        {/*<div className="app_bottom_actions">
         <img src="/images/related-button.png" className="related-button"/>
         <img src="/images/action-button.png" className="actions-button"/>
         </div>
         <div className="related-buttons">
         <ul>
         <li><a href="#"><span className="ml flaticon-ml-handshake"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml ml-calls"></span><br />Connect</a></li>
         </ul>
         </div>

         <div className="action-buttons">
         <ul>
         <li><a href="#" id="pop_connect" onClick={this.toggle}><span className="ml flaticon-ml-handshake"></span><br />Connect</a></li>
         <li><a href="#"><span className="ml flaticon-ml-shapes"></span><br />Favourits</a></li>
         <li><a href="#" id="pop_inquiry" onClick={this.toggle}><span className="ml flaticon-ml-support"></span><br />Inquiry</a></li>
         <li><a href="#" id="pop_review" onClick={this.toggle}><span className="ml flaticon-ml-note"></span><br />Review</a></li>
         <li><a href="#"><span className="ml flaticon-ml-interface"></span><br />Wishlist</a></li>
         <li><a href="#"><span className="ml flaticon-ml-cloud-computing"></span><br />Upload</a></li>
         <li><a href="#"><span className="ml flaticon-ml-cloud-computing-1"></span><br />Download</a></li>
         <li><a href="#"><span className="ml flaticon-ml-share-arrow"></span><br />Share</a></li>
         <li><a href="#"><span className="ml flaticon-ml-share-files"></span><br />Compare</a></li>
         <li><a href="#" id="pop_conersation" onClick={this.toggle}><span className="ml flaticon-ml-chat"></span><br />Conersation</a></li>
         <li><a href="#"  id="pop_collaborate" onClick={this.toggle}><span className="ml flaticon-ml-networking"></span><br />collaborate</a></li>
         <li><a href="#"><span className="ml flaticon-ml-note-1"></span><br />Feedback</a></li>
         </ul>

         </div>*/}
      </div>
    )
  }
};
