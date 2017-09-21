/**
 * import of libs and routes
 * */
import React, {Component, PropTypes} from "react";
import {fetchPortfolioActionHandler} from '../../../ideators/actions/ideatorActionHandler'
import CDNImage from '../../../../commons/components/CDNImage/CDNImage'

export default class MlAppCompanyListView extends Component {

  /**
   * @props isExplore
   * Note: routes [deciding] based on isExplore
   * cheking [permissions to view the portfolio]
   * */
  componentDidUpdate  (){
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
  async viewDetails(portfolioId, e) {
    const response = await fetchPortfolioActionHandler(portfolioId);
    if (this.props.config.isExplore && response && response.canAccess)
      FlowRouter.go('/app/explore/company/' + portfolioId)
    else if (response && response.canAccess)
      FlowRouter.go('/app/company/' + portfolioId)
    else if(response && !response.canAccess)
      toastr.error('Portfolio not available for view')
  }

  render(){
    let that = this
    const data=this.props.data||[];
    const list=  data.map((company, idx) =>
      <div className="col-md-4 col-sm-4 col-lg-3" key={idx}>
        <a href='' onClick={that.viewDetails.bind(that, company.portfolioDetailsId)}>
          <div className="company_block">
            <div className="regular"><span>{company.accountType}</span></div>
            <div className="company_header">
              {company.profileImage && company.profileImage ?
                <CDNImage src={company.profileImage} className="c_image"/> :
                <CDNImage src="/images/no_image.png" />}
            </div>
            <h3>{company.firstName}<br/>
              <span>{company.chapterName}{!company.isDefaultSubChapter?"-" +company.subChapterName:""}</span>
            </h3>
            <div className="row nomargin">
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                <div className="pie-title-center pie-passion" data-percent={company.views}> <span className="pie-value"></span> </div><br/>
                Views
              </div>
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                <div className="pie-title-center pie-rating" data-percent={company.followings}> <span className="pie-value"></span> </div><br/>
                Followings
              </div>
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                <div className="pie-title-center pie-like" data-percent={company.likes}> <span className="pie-value"></span> </div><br/>
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
                <span>{company.connections}</span><br />
                Connects
              </div>
            </div>
          </div>
        </a>
      </div>
    );

    // const list=  data.map((company, idx) =>
    //   <div className="col-md-3 col-sm-4 col-lg-2" key={idx}>
    //     <a href='' onClick={that.viewDetails.bind(that, company.portfolioDetailsId)}>
    //       <div className="ideators_list_block">
    //         {/*<div className="premium"><span>Starter</span></div>*/}
    //         {/*<h3>{company.aboutUs&&company.aboutUs.companyDescription?company.aboutUs.companyDescription:""}</h3>*/}
    //         <div className="premium">
    //           <span>{company.accountType}</span>
    //         </div>
    //         <h3>{company.firstName}</h3>
    //         <div className="list_icon"><span className="ml my-ml-Company"></span></div>
    //         <div className="block_footer">
    //           <span>{company.chapterName} - {company.communityType}</span>
    //         </div>
    //       </div>
    //     </a>
    //   </div>
    // );

    return (<div className="ideators_list">
      <div className="col-md-12"><h2>Companies</h2></div>
      {list}</div>);

  }
}
