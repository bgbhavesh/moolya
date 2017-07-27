/**
 * Created by vishwadeep on 25/7/17.
 */
import React, {Component} from "react";

export default class MlUsersCluster extends Component {
  constructor(props, context) {
    super(props);
    this.viewDetails.bind(this)
    return this;
  }

  viewDetails(event, portfolioId) {
    FlowRouter.go('/admin/users/' + portfolioId + '/aboutuser')
    console.log(portfolioId)
  }

  render() {
    let that = this
    const data = this.props.data || [];
    const list = data.map(function (prop, idx) {
      let icon;

      if (prop.communityCode == "IDE") {
        icon = "ml ml-ideator";
      } else if (prop.communityCode == "FUN") {
        icon = "ml ml-funder";
      } else if (prop.communityCode == "SPS") {
        icon = "ml ml-users";
      } else if (prop.communityCode == "STU") {
        icon = "ml ml-startup";
      } else if (prop.communityCode == "INS") {
        icon = "ml ml-institutions";
      } else if (prop.communityCode == "CMP") {
        icon = "ml ml-company";
      }
      return (
        <div className="col-lg-3 col-md-3 col-sm-3" key={idx}>
          <a href="" onClick={(event) => that.viewDetails(event, prop.portfolioId)}>
            <div className="subscriptions_block">
              <div className="premium"><span>{prop.accountType}</span></div>
              <h3>&nbsp;</h3>
              <div className="sub_icon"><span className={icon}></span><br />{prop.chapterName}</div>
              <h4>{prop.portfolioUserName}</h4>
            </div>
          </a>
        </div>
      )
    });

    return (
      <div className="row subscriptions">
        <h2> Users </h2>
        {list}
      </div>
    );
  }
}
