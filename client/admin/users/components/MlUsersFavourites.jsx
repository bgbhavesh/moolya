/**
 * Created by vishwadeep on 26/7/17.
 */
import React, {Component} from "react";
import {fetchFavouritesHandler}  from '../actions/findUsersFavouritesHandlers'

export default class MlUsersFavourites extends Component {
  constructor(props, context) {
    super(props);
    this.state = {data: []}
    return this;
  }

  componentWillMount() {
    const resp = this.getAllConnections()
    return resp
  }

  async getAllConnections() {
    let communityCode = this.props.communityCode
    let portfolioId = this.props.data.config.portfolioId
    var response = await fetchFavouritesHandler(portfolioId, communityCode)
    console.log(response)
    if (response && response.length > 0)
      this.setState({data: response})
    else
      toastr.error('No Favourites Available')
  }

  render() {
    let config = this.props
    const data = this.state.data && this.state.data.length > 0 ? this.state.data : []
    const list = data.map(function (prop, idx) {
      let icon;

      if (config.communityCode == "IDE") {
        icon = "ml ml-ideator";
      } else if (config.communityCode == "FUN") {
        icon = "ml ml-funder";
      } else if (config.communityCode == "SPS") {
        icon = "ml ml-users";
      } else if (config.communityCode == "STU") {
        icon = "ml ml-startup";
      } else if (config.communityCode == "INS") {
        icon = "ml ml-institutions";
      } else if (config.communityCode == "CMP") {
        icon = "ml ml-company";
      }
      return (
        <div className="col-lg-3 col-md-3 col-sm-3" key={idx}>
          <div className="subscriptions_block">
            <h3>{prop.firstName}&nbsp; {prop.lastName}</h3>
            <div className="sub_icon"><span className={icon}></span><br />{prop.chapterName}</div>
            <h4>{prop.displayName}</h4>
          </div>
        </div>
      )
    });

    return (
      <div className="row subscriptions">
        {list}
      </div>
    );
  }
}
