import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var options = [
  {value: 'Type of Funding', label: 'Type of Funding'},
  {value: '2', label: '2'}
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlFunderInvestmentView extends React.Component {
  componentDidMount() {
    $("#show").click(function () {
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
    });
    $(function () {
      $('.float-label').jvFloat();
    });
    $('#details-div .team-block').click(function () {
      GetIdeaId = $(this).attr('name');
      $('.investement-view-content .funding-investers').slideUp();
      $('#' + GetIdeaId).slideDown();
    });
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">

          <h2>Investments</h2>
          <div className="requested_input main_wrap_scroll" id="show">

            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-lg-12 nopadding">
                <div className="row">

                  <div className="col-lg-2 col-md-4 col-sm-4">

                    <div className="list_block notrans funding_list">
                      <div><p>DoneThing</p><p className="fund">$300k</p><p>Seed</p></div>
                      <h3>March, 2017</h3>
                    </div>

                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">

                    <div className="list_block notrans funding_list">
                      <div><p>NeoStencil</p><p className="fund">$1M</p><p>Venture</p></div>
                      <h3>February, 2017</h3>
                    </div>

                  </div>

                  <div className="col-lg-2 col-md-4 col-sm-4">

                    <div className="list_block notrans funding_list">
                      <div><p>1World Online</p><p className="fund">$4.9M</p><p>Series B</p></div>
                      <h3>December, 2016</h3>
                    </div>

                  </div>

                  <div className="col-lg-2 col-md-4 col-sm-4">

                    <div className="list_block notrans funding_list">
                      <div><p>Postmates</p><p className="fund">$750,000</p><p>Seed</p></div>
                      <h3>January, 2017</h3>
                    </div>

                  </div>

                  <div className="col-lg-2 col-md-4 col-sm-4">

                    <div className="list_block notrans funding_list">
                      <div><p>A Thinking Ape</p><p className="fund">$150,000</p><p>Series A</p></div>
                      <h3>December, 2016</h3>
                    </div>

                  </div>

                  <div className="col-lg-2 col-md-4 col-sm-4">

                    <div className="list_block notrans funding_list">
                      <div><p>Change.org</p><p className="fund">$ 50,000</p><p>Series B</p></div>
                      <h3>August, 2016</h3>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
          <div id="details-div" style={{'display': 'none'}}>

            <div className="col-lg-12">
              <div className="row">

                <div className="top_block_scroller" id="forcecentered">
                  <ul>
                    <li>

                      <div className="team-block" name="funding_01">
                        <h2>March, 2017</h2>
                        <h3>
                          <p>DoneThing</p><p className="fund">$300k</p><p>Seed</p>
                        </h3>
                      </div>
                    </li>
                    <li>

                      <div className="team-block" name="funding_02">
                        <h2>February, 2017</h2>
                        <h3>
                          <p>Naval Ravikant</p><p className="fund">$1M</p><p>Venture</p>
                        </h3>
                      </div>
                    </li>
                    <li>
                      <div className="team-block" name="funding_03">
                        <h2>December, 2016</h2>
                        <h3>
                          <p>Sanjay Jesrani</p><p className="fund">$4.9M</p><p>Series B</p>
                        </h3>
                      </div>
                    </li>
                    <li>
                      <div className="team-block" name="funding_04">
                        <h2>January, 2017</h2>
                        <h3>
                          <p>500 Startups</p><p className="fund">$750,000</p><p>Seed</p>
                        </h3>
                      </div>
                    </li>
                    <li>
                      <div className="team-block">
                        <h2>December, 2016</h2>
                        <h3>
                          <p>A Thinking Ape</p><p className="fund">$150,000</p><p>Series A</p>
                        </h3>
                      </div>
                    </li>
                    <li>
                      <div className="team-block">
                        <h2>August, 2016</h2>
                        <h3>
                          <p>Change.org</p><p className="fund">$ 50,000</p><p>Series B</p>
                        </h3>
                      </div>
                    </li>

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


                      <div className="funding-investers" id="funding_01" style={{'display': 'block'}}>


                        <h3>March, 2017</h3>

                        <p>Date - March, 2017<br/>
                          Company - DoneThing<br/>
                          Amount - $300k<br/>
                          Funding Type - Seed</p>
                        <p>DoneThing is an on-demand task management solution. Provide real time personal assistance
                          enabling customers to fulfill their tangible/intangible needs wants and desires, through use
                          of a combination of technology and logistics.</p>
                        <p>DoneThing aims to introduce concierge service to the fast growing Indian middle class
                          population. The solution is empowering brick and mortar local businesses in the e-commerce age
                          while offering affordable convenience to our customers.</p>
                        <p>The team includes MBA graduates and Chartered Accountants handling business operations and
                          IIT graduates handling the technology operations. The overall team size now stands at 78.</p>
                        <h3>February, 2017</h3>

                        <p>Date - February, 2017<br/>
                          Company - NeoStencil<br/>
                          Amount - $1M<br/>
                          Funding Type - Venture</p>


                        <p>NeoStencil is India’s only Ed Tech Company that provides live online classrooms from top
                          teachers. With a mission statement of Choose Your Classroom, it aims to revolutionize test
                          preparation in India by connecting teachers and students seamlessly. </p>

                        <h3>December, 2016</h3>

                        <p>Date - December, 2016<br/>
                          Company - 1World Online<br/>
                          Amount - $4.9M<br/>
                          Funding Type - Series B</p>


                        <p>1World Online is a Silicon Valley-based startup providing Consumer Intelligence Platform. It
                          serves the entire web publishing enterprise. Websites will enjoy higher metrics of engagement
                          and new revenue; business teams will be able to better understand, profile, and monetize the
                          audience; editors and journalists gain access to timely news content and can better target
                          their stories, improving reader relationships.</p>
                      </div>

                      <div className="funding-investers" id="funding_02">


                        <h3>January, 2017</h3>

                        <p>Date - January, 2017<br/>
                          Company - Postmates<br/>
                          Amount - $750,000<br/>
                          Funding Type - Seed</p>

                        <p>Postmates is transforming the way local goods move around a city by enabling anyone to get
                          any product delivered in under one hour. Postmates' revolutionary urban logistics & on-demand
                          delivery platform connects customers with local couriers, who purchase and deliver goods from
                          any restaurant or store in a city.</p>

                        <h3>December, 2016</h3>

                        <p>Date - December, 2016<br/>
                          Company - A Thinking Ape<br/>
                          Amount - $150,000<br/>
                          Funding Type - Series A</p>

                        <p>A Thinking Ape builds seriously addictive mobile apps, and is one of the top grossing
                          developers on the Apple App Store worldwide. We are a small group of ambitious software
                          engineers who value ownership, creative freedom, data driven decisions and meritocracy over
                          hierarchy. We get to work on products that millions of people use every day and have built
                          some of the strongest online mobile game communities.</p>

                        <h3>August, 2016</h3>

                        <p>Date - August, 2016<br/>
                          Company - Change.org<br/>
                          Amount - $ 50,000<br/>
                          Funding Type - Series B</p>

                        <p>Change.org is the world's largest technology platform for social change. Our goal is to
                          empower people everywhere to start campaigns around the issues they care about, mobilize
                          others, and work with decision makers to drive solutions.</p>

                        <p>We’re also an innovative business – a "social enterprise” and a certified B Corporation, with
                          a business model designed to support positive social impact (more about B Corps:
                          www.bcorporation.net).</p>

                        <p>Over 130 million people have started and signed petitions, and our users win nearly one
                          victory per hour, including strengthening hate crime legislation in South Africa; fighting
                          corruption in Indonesia, Italy, and Brazil; ending the ban on gay Boy Scouts in the United
                          States, and big wins for women’s rights in India. And we’re just getting started.</p>


                      </div>
                      <div className="funding-investers" id="funding_03">
                        <h3>Date - August, 2015</h3>
                        <p>Company - Flatpebble<br/>
                          Amount - $ 600K<br/>
                          Funding Type - Seed</p>

                        <p>Flatpebble.com is the Best Place in the world to hire a wedding photographer.</p>
                        <p>Customers place requests through a simple form and receive detailed templatized quotes along
                          with photographer portfolios allowing them to make decisions from their living room.</p>

                        <p>On Flatpebble, photographers view detailed requirements, budgets and verified customer info
                          before deciding to quote on a lead. It also helps that Wedding photography is in their TAM a
                          450-500 mn $ market, completely disorganized and crying out for high quality organisation.</p>

                        <p>Flatpebble is getting great customer and photographer feedback. They have grown to over 500 +
                          portfolios across 80+ Indian cities and 5+ countries as on date.</p>
                      </div>

                      <div className="funding-investers" id="funding_04">
                        <h3>April, 2017</h3>

                        <p>Date - April, 2017<br/>
                          Company - Oddup<br/>

                          Amount - $ 6M<br/>
                          Funding Type - Series A</p>

                        <p>Oddup is a data driven research platform that gives you analytical information on startups.
                          We give ratings and a curated view on the potential success of a startup.</p>
                      </div>


                    </div>

                  </div>
                </div>


              </ScrollArea>


            </div>
          </div>


        </div>
      </div>
    )
  }
};
