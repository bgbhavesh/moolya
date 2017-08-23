/**
 * Created by Birendra on 21/8/17.
 */
import React, {Component}  from "react";
import {render} from 'react-dom';
var Rating = require('react-rating');

export default class MlCompanyViewRating extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      privateKey: {}
    }
  }

  render() {
    console.log(this.props)
    let rating = parseInt(this.props.ratingDetails && this.props.ratingDetails.rating ? this.props.ratingDetails.rating : 0);
    return (
      <div className="requested_input">
        <div className="col-lg-12">
          <div className="row">
            <h2>Add Rating</h2>
            <div className="panel panel-default panel-form">
              <div className="panel-body">
                <div className="form-group nomargin-bottom">
                  <div className="star_ratings">
                    <Rating
                      empty="fa fa-star-o empty"
                      full="fa fa-star fill"
                      fractions={2}
                      initialRate={rating}
                      readonly={true}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
