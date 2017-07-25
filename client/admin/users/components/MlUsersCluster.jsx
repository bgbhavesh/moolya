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
        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
          <div className="list_block">
            <a href='' onClick={(event) => that.viewDetails(event, prop.portfolioId)}>
              <div className="ideators_list_block">
                <div className="premium">
                  <span>{prop.accountType}</span>
                </div>
                {/*<h3>{prop.portfolioUserName}</h3>*/}
                <div className="list_icon"><span className={icon}></span></div>
                <div className="block_footer">
                  <span>{prop.chapterName}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <h2> Users </h2>
        {list}
      </div>
    );
  }
}
