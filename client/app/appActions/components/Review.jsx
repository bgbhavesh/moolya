import React from "react";
import {render} from "react-dom";

export default class Review extends React.Component {

  constructor(props) {
    super(props);
    //this.reviewActionHandler.bind(this);
    return this;
  }

  render() {

    return (
      <div>
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
      </div>

    );
  }

}
