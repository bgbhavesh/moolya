/**
 * created by vishwadeep
 * */
/**
 * import of the files to be used
 * */
import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {fetchPortfolioActionHandler} from '../actions/ideatorActionHandler'

/**
 * export of the default component
 * */
export default class MlAppIdeatorListView extends Component {
  /**
   * redirect to get the details of the portfolio
   * Note: routes [deciding] based on isExplore
   * cheking [permissions to view the portfolio]
   * */
  async viewDetails(portfolioId, e) {
    const response = await fetchPortfolioActionHandler(portfolioId);
    if (this.props.config.isExplore && response && response.canAccess)
      FlowRouter.go('/app/explore/ideator/' + portfolioId)
    else if (response && response.canAccess)
      FlowRouter.go('/app/ideator/' + portfolioId)
    else if(response && !response.canAccess)
      toastr.error('Portfolio not available for view')
  }

  /**
   * UI to be render where getting the data through the props from th3e config file
   * */
  render() {
    let that = this
    const data = this.props.data || [];
    return (
      <div>
        <div className="app_padding_wrap">
          <div className="col-md-12 ideators_list">
            <div className="row">
              <h2>Ideators</h2>
              {data.map(function (ideator, idx) {
                return (
                  <div className="col-md-3 col-sm-4 col-lg-2" key={idx}>
                    <a href='' onClick={that.viewDetails.bind(that, ideator.ideas[0].portfolioId)}>
                      <div className="ideators_list_block">
                        <div className="premium">
                          <span>{ideator.accountType}</span>
                        </div>
                        <h3>{ideator.name}</h3>
                        <div className="list_icon"><span className="ml my-ml-Ideator"></span></div>
                        <p>{ideator.ideas[0].title}</p>
                        <div className="block_footer">
                          <span>{ideator.chapterName}</span>
                        </div>
                      </div>
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // render(){
  //   let that = this
  //   const data=this.props.data||[];
  //   const list=  data.map((provider, idx) =>
  //     <div className="col-md-4 col-sm-4 col-lg-3" key={idx}>
  //       {/*<a href={funderListRoutes.funderDetailsRoute("funder",funder.portfolioDetailsId)}>*/}
  //       <a href='' onClick={that.viewDetails.bind(that, provider.portfolioDetailsId)}>
  //         <div className="funders_list_block">
  //           {/*<div className="premium"><span>Starter</span></div>*/}
  //           <h3>{provider.about&&provider.about.aboutTitle?provider.about.aboutTitle:""}</h3>
  //           <div className="list_icon"><span className="ml ml-provider"></span></div>
  //           <div className="block_footer">
  //             <span>New York</span>
  //           </div>
  //         </div>
  //       </a>
  //     </div>
  //   );
  //
  //   return (<div className="row funders_list">{list}</div>);
  //
  // }

}

