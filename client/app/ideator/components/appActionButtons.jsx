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

  toggle(index,e) {
    this.setState({
      selectedActionButton:index,
      popoverOpen: !this.state.popoverOpen
    });
  }


  componentDidMount() {
    // $('.actions-button').click(function () {
    //   $(this).toggleClass('open');
    //   $('.action-buttons').toggle();
    //   $('.related-buttons').hide();
    // });
    // $('.related-button').click(function () {
    //   $(this).toggleClass('open');
    //   $('.action-buttons').hide(200);
    //   $('.related-buttons').toggle();
    // });
  }
  componentWillMount(){
    actionButtonsList=[
      {
        liTitle: "Connect",
        icon:"flaticon-ml-handshake"
      },
      {
        liTitle:"Favorites",
        icon:"flaticon-ml-shapes"
      },
      {
        liTitle:"Inquiry",
        icon:"flaticon-ml-support"
      },
      {
          liTitle:"Review",
          icon:"flaticon-ml-note",
      },
      {
          liTitle:"Wishlist",
          icon:"flaticon-ml-interface"
      },
      {
          liTitle:"Upload",
          icon:"flaticon-ml-cloud-computing",
      },
      {
          liTitle:"Download",
          icon:"flaticon-ml-cloud-computing-1"
      },
      {
        liTitle:"Share",
          icon:"flaticon-ml-share-arrow"
      },
      {
        liTitle:"Compare",
          icon:"flaticon-ml-share-files",
      },
      {
        liTitle:"Conversation",
        icon:"flaticon-ml-chat"
      },
      {
        liTitle:"Collaborate",
          icon:"flaticon-ml-networking"
      },
      {
        liTitle:"Feedback",
        icon:"flaticon-ml-note-1"

      }

    ]
    this.setState({actionButtons:actionButtonsList})
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
                  {this.state.actionButtons.map(function (button,idx) {
                   return (
                     <li><a href="#" id={"pop_connect"+idx} onClick={this.toggle.bind(this, idx)}><span
                       className={`ml ${button.icon}`}></span><br />{button.liTitle}</a></li>
                   )
                  })}
                </ul>

              </div>

            </div>
          </div>
        </div>

        <Popover placement="top" className="footer_popover" isOpen={this.state.popoverOpen} target={"pop_collaborate"+this.state.selectedActionButton}
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
              <input type="text" placeholder="To" defaultValue="admin@moolya.in"
                     className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" defaultValue="Inquiry" className="form-control float-label"/>
            </div>
            <div className="form-group">
              <textarea placeholder="Subject" defaultValue="Inquiry" className="form-control float-label"></textarea>
            </div>
            <div className="ml_btn">
              <a href="#" className="save_btn">Send</a>
              <a href="#" className="cancel_btn">Cancel</a>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
};
