import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {fetchfunderPortfolioAreaInterest} from "../../actions/findPortfolioFunderDetails";


export default class MlFunderAreaOfInterestView extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
    }
    this.fetchPortfolioDetails.bind(this);
    this.viewDetails.bind(this)
    this.showDetails.bind(this)
    return this;
  }

  viewDetails(id, e) {
      this.setState({loading: true})
      let data = this.state.funderAreaOfInterestList;
      let getData = data[id];
      let subDomain =getData.subDomainName
      this.setState({loading: false, viewCurDetail: subDomain});
  }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });
  }

  showDetails(id){
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
    const response = await fetchfunderPortfolioAreaInterest(portfolioDetailsId);
    if (response) {
      this.setState({loading: false, funderAreaOfInterestList: response});
    }
  }

  render() {
    let that = this;
    const showLoader = that.state.loading;
    let areaOfInterestArray = that.state.funderAreaOfInterestList || [];
    return (
      <div>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
        <div className="admin_padding_wrap">
          <h2>Area of Interest</h2>
          <div className="requested_input main_wrap_scroll">

            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-lg-12" id="show">
                <div className="row">

                  {areaOfInterestArray && areaOfInterestArray.map(function (say, value) {
                    return (<div className="col-lg-2 col-md-4 col-sm-4" key={value} onClick={that.showDetails.bind(that,value)}>
                      <div className="list_block list_block_intrests notrans">
                        <div className="hex_outer"><img src="/images/def_profile.png"/></div>
                        <h3>{say.industryTypeName}</h3>
                      </div>
                    </div>)
                  })}
                </div>
              </div>

            </ScrollArea>

          </div>
          <div id="details-div" style={{display: 'none'}}>
            <div className="col-lg-12">
              <div className="row">

                <div className="top_block_scroller" id="forcecentered">
                  <ul className="topscroll_listblock">
                    {areaOfInterestArray && areaOfInterestArray.map(function (say, value) {
                      return (<li key={value} className="active">
                        <div className="list_block list_block_intrests notrans"
                             onClick={that.viewDetails.bind(that, value)}>
                          <div className="hex_outer"><img src="/images/def_profile.png"/></div>
                          <h3>{say.industryTypeName}</h3>
                        </div>
                      </li>)
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

                <div className="col-lg-12">
                  <div className="row">
                    <div className="investement-view-content">
                      <div className="panel panel-default panel-form-view">
                        <div className="panel-body">
                          <p>Domain : {this.state.viewCurDetail}</p>
                        </div>
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
