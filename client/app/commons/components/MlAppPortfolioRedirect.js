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
      <div>
        <div className="panel panel-default panel-form-view">
          <div className="panel-heading">Portfolio Mode</div>
          <div className="panel-body">
            <a className="mlUpload_btn pull-left"
               onClick={this.viewPortfolio.bind(this)}>View Portfolio</a>
            <a className="mlUpload_btn pull-left"
               onClick={this.editPortfolio.bind(this)}>Edit Portfolio</a>
          </div>
        </div>
      </div>
    )
  }
}
