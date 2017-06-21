import React from "react";
import {render} from "react-dom";
import StarRatings from '../../../app/commons/components/StarRatings';
import {reviewActionHandler} from "../actions/reviewActionHandler";
export default class Review extends React.Component {

  constructor(props) {
    super(props);
    this.reviewHandler.bind(this);
    return this;
  }

  async reviewHandler(){
    var resourceDetails=this.props.data||{};
    var message=this.refs.message.value&&this.refs.message.value.trim()!==""?this.refs.message.value.trim():null;
    var response=await reviewActionHandler({'resourceId':resourceDetails.resourceId,'resourceType':resourceDetails.resourceType,'message':message});

    if(response){
      toastr.success("review send successfully");
    }else{
      toastr.error("Failed to send the review");
    }
    this.props.toggle();
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
                <h4 className="media-heading">Media Top <span>16/06/2017, 08:10:15</span></h4>
                <StarRatings/>
                <p>Work in Progress..</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

    );
  }

}
