/**
 * Created by vishwadeep on 11/7/17.
 */
import React from "react";
export default class MlAppPortfolioRedirect extends React.Component {
  constructor(props, context) {
    super(props);
    return this;
  }

  /**
   * redirecting to view mode of user portfolio
   * */
  viewPortfolio(e) {
    let portfolioId = this.props.config
    let community = this.props.communityType
    FlowRouter.go("/app/portfolio/view/" + portfolioId + "/" + community);
  }

  /**
   * redirecting to edit mode of user portfolio
   * */
  editPortfolio(e) {
    let portfolioId = this.props.config
    let community = this.props.communityType
    FlowRouter.go("/app/portfolio/edit/" + portfolioId + "/" + community);
  }

  /**
   * this is the temparary UI need to get the exact UI
   * */
  render() {
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-2"/>
          <div className="col-md-4">
            <div className="portfolio_main view">
              <img src="/images/portfolio_view.png"/>
              <p>View your portfolio here<br />
                <a href="" onClick={this.viewPortfolio.bind(this)}>View Here</a>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="portfolio_main edit">
              <img src="/images/portfolio_edit.png"/>
              <p>Edit your portfolio here<br />
                <a href="" onClick={this.editPortfolio.bind(this)}>Edit Here</a>
              </p>
            </div>
          </div>
          <div className="col-md-2"/>
        </div>
      </div>
    )
  }
}
