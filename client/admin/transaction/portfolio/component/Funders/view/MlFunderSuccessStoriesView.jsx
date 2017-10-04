import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {fetchfunderPortfolioSuccess} from "../../../actions/findPortfolioFunderDetails";
import NoData from '../../../../../../commons/components/noData/noData'

export default class MlFunderSuccessStoriesView extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false
    }
    this.fetchPortfolioDetails.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  async fetchPortfolioDetails() {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const response = await fetchfunderPortfolioSuccess(portfolioDetailsId);
    if (response) {
      this.setState({loading: false, funderSuccessList: response});
    }
  }

  render() {
    const showLoader = this.state.loading;
    let funderSuccessList = this.state.funderSuccessList || [];
    if(_.isEmpty(funderSuccessList)) {
      return (
        showLoader === true ? (<MlLoader/>) :
          <div className="portfolio-main-wrap">
            <NoData tabName={this.props.tabName}/>
          </div>
      )
    } else {
      return (
        <div className="admin_main_wrap">
          <div className="admin_padding_wrap">
            <h2>Success Stories</h2>
            <div className="main_wrap_scroll">
              <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
                <div className="col-lg-12">
                  <div className="row">
                    {funderSuccessList.map(function (details, idx) {
                      return (
                        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                          <div className="list_block notrans funding_list">
                            <img src={details.logo ? details.logo.fileUrl : "/images/def_profile.png"}/>
                            <div><p>{details.storyTitle}</p><p>{details.description}</p></div>
                            <h3>{details.date ? details.date : 'Date :'}</h3>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )
    }
  }
};
