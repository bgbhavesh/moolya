import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import startupListRoutes from '../actions/startupListRoutes'

export default class MlAppStartupLanding extends React.Component{
  constructor(props){
    super(props);
    this.state={
      startup:[],
    }
  }
  componentDidMount()
  {
    $('.pie-passion').pieChart({
      barColor: '#ef4647',
      trackColor: '#192430',
      lineCap: 'round',
      lineWidth: 5,
      onStep: function (from, to, percent) {
        $(this.element).find('.pie-value').text(Math.round(percent) + '%');
      }
    });
    $('.pie-rating').pieChart({
      barColor: '#ffe144',
      trackColor: '#192430',
      lineCap: 'round',
      lineWidth: 5,
      onStep: function (from, to, percent) {
        $(this.element).find('.pie-value').text(Math.round(percent) + '%');
      }
    });
    $('.pie-like').pieChart({
      barColor: '#B9C5CC',
      trackColor: '#192430',
      lineCap: 'round',
      lineWidth: 5,
      onStep: function (from, to, percent) {
        $(this.element).find('.pie-value').text(Math.round(percent) + '%');
      }
    });
  }

  componentWillMount(){
    let startup = [
      {
        _id:"dvdsvdsvdsvdsvds",
        companyName:"Haptik",
        accountType:"Starter",
        logo:"/images/startup_01.png",
        city:"Mumbai"
      },
      {
        _id:"htrhtgngnmghn",
        companyName:"Zomato",
        accountType:"Premium",
        logo:"/images/startup_02.png",
        city:"New Delhi"
      },
      {
        _id:"dfbdfbfdjytkiuk",
        companyName:"Cuemath",
        accountType:"Starter",
        logo:"/images/startup_03.png",
        city:"Banglore"
      },
      {
        _id:"gfntgrfjmuhkijlu",
        companyName:"LeadSquared",
        accountType:"Starter",
        logo:"/images/startup_04.png",
        city:"Banglore"
      },
    ]
    this.setState({startup:startup})
  }
  render(){
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12">
            <div className="row">
              {this.state.startup.map(function (startup, idx) {
                return(<div className="col-md-4 col-sm-4 col-lg-3" key={idx}>
                  <a href={startupListRoutes.startupDetailsRoute(startup._id, "startup")}>
                    <div className="company_block">
                      <div className="premium"><span>premium</span></div>
                      <div className="company_header">
                        <img src={startup.logo} />
                      </div>
                      <h3>{startup.companyName}<br/><span>{startup.city}</span></h3>
                      <div className="row nomargin">
                        <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                          <div className="pie-title-center pie-passion" data-percent="90"> <span className="pie-value"></span> </div>
                          Passion
                        </div>
                        <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                          <div className="pie-title-center pie-rating" data-percent="25"> <span className="pie-value"></span> </div>
                          Rating
                        </div>
                        <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                          <div className="pie-title-center pie-like" data-percent="40"> <span className="pie-value"></span> </div>
                          Likes
                        </div>
                      </div>
                      <div className="row nomargin footer">
                        <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                          <span>25%</span><br />
                          Favorites
                        </div>
                        <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                          <span>25%</span><br />
                          Projects
                        </div>
                        <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                          <span>25%</span><br />
                          Connect
                        </div>
                      </div>
                    </div>
                  </a>
                </div>)
              })}
            </div>
          </div>
          <br className="brclear"/>
        </div>
      </div>
    )
  }
};
