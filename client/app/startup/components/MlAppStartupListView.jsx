/**
 * import of libs and routes
 * */
import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {fetchPortfolioActionHandler} from '../../ideators/actions/ideatorActionHandler'
import CDNImage from '../../../commons/components/CDNImage/CDNImage'

export default class MlAppStartupListView extends Component {
  componentDidMount(){
    $('.pie-passion').pieChart({
      barColor: '#ef4647',
      trackColor: '#192430',
      lineCap: 'round',
      lineWidth: 5,
      onStep: function (from, to, percent) {
        $(this.element).find('.pie-value').text(Math.round(percent));
      }
    });
    $('.pie-rating').pieChart({
      barColor: '#ffe144',
      trackColor: '#192430',
      lineCap: 'round',
      lineWidth: 5,
      onStep: function (from, to, percent) {
        $(this.element).find('.pie-value').text(Math.round(percent));
      }
    });
    $('.pie-like').pieChart({
      barColor: '#B9C5CC',
      trackColor: '#192430',
      lineCap: 'round',
      lineWidth: 5,
      onStep: function (from, to, percent) {
        $(this.element).find('.pie-value').text(Math.round(percent));
      }
    });
  }
  /**
   * @props isExplore
   * Note: routes [deciding] based on isExplore
   * cheking [permissions to view the portfolio]
   * */
  async viewDetails(portfolioId, e) {
    const response = await fetchPortfolioActionHandler(portfolioId);
    if (this.props.config.isExplore && response && response.canAccess)
      FlowRouter.go('/app/explore/startup/' + portfolioId)
    else if (response && response.canAccess)
      FlowRouter.go('/app/startup/' + portfolioId)
    else if(response && !response.canAccess)
      toastr.error('Portfolio not available for view')
  }

  render(){
    let that = this
    const data=this.props.data||[];
    const list=  data.map((startup, idx) =>
      <div className="col-md-4 col-sm-4 col-lg-3" key={idx}>
        <a href='' onClick={that.viewDetails.bind(that, startup.portfolioDetailsId)}>
          <div className="company_block">
            <div className="regular"><span>{startup.accountType}</span></div>
           <div className="company_header">
             {startup.aboutUs && startup.aboutUs.logo && startup.aboutUs.logo.length ?
               <CDNImage src={startup.aboutUs.logo[0].fileUrl} className="c_image"/> :
               <CDNImage src="/images/no_image.png" />}
            </div>
            <h3>{startup.firstName}<br/><span>{startup.chapterName}</span></h3>
            <div className="row nomargin">
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                <div className="pie-title-center pie-passion" data-percent={startup.views}> <span className="pie-value"></span> </div><br/>
                views
              </div>
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                <div className="pie-title-center pie-rating" data-percent={startup.followings}> <span className="pie-value"></span> </div><br/>
                followings
              </div>
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                <div className="pie-title-center pie-like" data-percent={startup.likes}> <span className="pie-value"></span> </div><br/>
                Likes
              </div>
            </div>
            <div className="row nomargin footer">
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                <span>0</span><br />
                Favourites
              </div>
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                <span>0</span><br />
                Projects
              </div>
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                <span>{startup.connections}</span><br />
                Connect
              </div>
            </div>
          </div>
        </a>
      </div>
    );

    return (<div className="ideators_list">
      <div className="col-md-12"> <h2>Startup</h2></div>
      {data && !data.length?(
        <div className="alert alert-info col-md-8 col-md-offset-2 text-center" style={{'marginTop':'40px'}}>
          There are no registrations to be shown here.
        </div>
      ):(<div>{list}</div>)
      }
    </div>);

  }

}

