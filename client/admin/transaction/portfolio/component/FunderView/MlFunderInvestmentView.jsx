import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {fetchfunderPortfolioInvestor} from "../../actions/findPortfolioFunderDetails";
import {initializeMlAnnotator} from "../../../../../commons/annotator/mlAnnotator";
import {createAnnotationActionHandler} from "../../actions/updatePortfolioDetails";
import {findAnnotations} from "../../../../../commons/annotator/findAnnotations";

export default class MlFunderInvestmentView extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      annotations: [],
      content: {},
      tabIndex: null
    }
    this.fetchPortfolioDetails.bind(this);
    this.viewDetails.bind(this)
    this.showDetails.bind(this)
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    return this;
  }

  initalizeAnnotaor() {
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery("#psContent").annotator();
    this.state.content.annotator('addPlugin', 'MyPlugin', {
      pluginInit: function () {
      }
    });
  }


  annotatorEvents(event, annotation, editor) {
    if (!annotation)
      return;
    switch (event) {
      case 'create': {
        let response = this.createAnnotations(annotation);
        return response
      }
        break;
      case 'update': {
      }
        break;
      case 'annotationViewer': {
        if (annotation[0].id) {
          this.props.getSelectedAnnotations(annotation[0]);
        } else {
          this.props.getSelectedAnnotations(annotation[1]);
        }

      }
        break;
    }
  }

  async createAnnotations(annotation) {
    let details = {
      portfolioId: this.props.portfolioDetailsId,
      docId: "funderInvestment" + this.state.tabIndex,
      quote: JSON.stringify(annotation)
    }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(this.state.tabIndex);
    }
    return response;
  }


  async fetchAnnotations(id, isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, "funderInvestment" + id);
    this.setState({annotations: JSON.parse(response.result)})

    let quotes = [];
    _.each(this.state.annotations, function (value) {
      quotes.push({
        "id": value.annotatorId,
        "text": value.quote.text,
        "quote": value.quote.quote,
        "ranges": value.quote.ranges,
        "userName": value.userName,
        "createdAt": value.createdAt
      })
    })
    this.state.content.annotator('loadAnnotations', quotes);
    return response;
  }
  
  showDetails(id) {
    $("#details-div").show();
    var $frame = $('#forcecentered');
    var $wrap = $frame.parent();

    // Call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 0,
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 1,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

    });
    $("#show").hide();
    this.viewDetails(id)
  }

  componentWillMount() {
    this.fetchPortfolioDetails();
  }

  async fetchPortfolioDetails() {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const response = await fetchfunderPortfolioInvestor(portfolioDetailsId);
    if (response) {
      this.setState({loading: false, funderInvestmentList: response});
    }
  }

  viewDetails(id, e) {
    this.setState({loading: true})
    let data = this.state.funderInvestmentList;
    let getData = data[id];
    let ary = []
    ary.push(getData)
    if (this.state.content && this.state.content.annotator) {
      this.state.content.unbind();
      this.state.content.annotator('destroy');
    }
    this.state.content = null;
    this.initalizeAnnotaor();
    this.state.annotations = [];
    this.setState({loading: false, viewCurDetail: ary, tabIndex: id});
    this.fetchAnnotations(id);
    $('.investement-view-content .funding-investers').slideUp();
    $('#funding_show').slideDown()
  }

  render() {
    let that = this;
    const showLoader = that.state.loading;
    let investmentArray = that.state.funderInvestmentList || [];
    const detailData = this.state.viewCurDetail && this.state.viewCurDetail.length > 0 ? this.state.viewCurDetail : [];
    const detailView = detailData.map(function (say, value) {
      return (
        <div key={value}>
          <h3>{say.dateOfInvestment ? say.dateOfInvestment : 'Date :'}</h3>
          <p>Date
            - {say.dateOfInvestment}<br/>
            Company - {say.companyName}<br/>

            Amount - {say.investmentAmount}<br/>
            Funding Type
            - {say.typeOfFundingName}
          </p>
          <p>{say.aboutInvestment ? say.aboutInvestment : '--'}</p>
        </div>
      )
    })
    return (
      <div>
        <h2>Investments</h2>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
          <div>
            <div className="requested_input main_wrap_scroll" id="show">

              <ScrollArea
                speed={0.8}
                className="main_wrap_scroll"
                smoothScrolling={true}
                default={true}
              >
                <div className="col-lg-12 nopadding">
                  <div className="row">
                    {investmentArray && investmentArray.map(function (details, idx) {
                      return (
                        <div className="col-lg-2 col-md-4 col-sm-4" onClick={that.showDetails.bind(that, idx)}
                             key={idx}>
                          <div className="list_block notrans funding_list">
                            <div><p>{details.companyName}</p><p className="fund">{details.investmentAmount}</p>
                              <p>{details.typeOfFundingName}</p></div>
                            <h3>{details.dateOfInvestment ? details.dateOfInvestment : "Date :"}</h3>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollArea>
            </div>
            < div id="details-div" style={{'display': 'none'}}>
              <div className="col-lg-12">
                <div className="row">
                  <div className="top_block_scroller" id="forcecentered">
                    <ul>
                      {/*view listing*/}
                      {investmentArray && investmentArray.map(function (details, idx) {
                        return (
                          <li key={idx}>
                            <div className="team-block" onClick={that.viewDetails.bind(that, idx)}>
                              <h2>{details.dateOfInvestment ? details.dateOfInvestment : "Date :"}</h2>
                              <h3>
                                <p>{details.companyName}</p><p className="fund">{details.investmentAmount}</p>
                                <p>{details.typeOfFundingName}</p>
                              </h3>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="main_wrap_scroll">
                <ScrollArea
                  speed={0.8}
                  className="main_wrap_scroll"
                  smoothScrolling={true}
                  default={true}
                >
                  <div className="col-lg-12" id="psContent">
                    <div className="row">
                      <div className="investement-view-content">

                        <div className="funding-investers" id="funding_show">
                          {detailView}
                        </div>

                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>)}
      </div>
    )
  }
};
