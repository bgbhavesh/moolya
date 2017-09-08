import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import _ from "lodash";
var FontAwesome = require('react-fontawesome');
var BarTooltip = require('react-d3-tooltip').BarTooltip;
var BarGroupTooltip = require('react-d3-tooltip').BarGroupTooltip;
var LineTooltip = require('react-d3-tooltip').LineTooltip;
var PieTooltip = require('react-d3-tooltip').PieTooltip;
import MlBarChart from '../../../../../../../commons/components/d3/MlBarChart'
import MlBarGroupChart from '../../../../../../../commons/components/d3/MlBarGroupChart'
import MlLineChart from '../../../../../../../commons/components/d3/MlLineChart'
import MlPieChart from '../../../../../../../commons/components/d3/MlPieChart'
//import MlStartupChartSubTabs from '../MlStartupCharts/MlStartupChartSubTabs'
import MlChartSubTabs from '../../../../../../../commons/charts/MlChartsSubTabs'
import {fetchDetailsStartupChartsActionHandler} from '../../../../actions/findPortfolioStartupDetails'
import MlStartupChartConfig from '../MlStartupCharts/MlStartupChartConfig'

export default class MlStartupCharts extends React.Component{
  constructor(props, context){
    super(props)
    this.state = {employmentData:[], prlData:[], reviewData:[], empBreakUpData:[],graphSelected:false, startupPortfolio:{},
      startupCharts:[],startupChartsList:[]}
    this.fetchPortfolioStartupChartDetails.bind(this)
    this.getEmploymentOfCompany.bind(this)
    this.getProfitRevenueLiability.bind(this)
    this.getReviewOfCompany.bind(this)
    this.getEmployeeBreakUpDepartment.bind(this)

  }

  componentDidMount(){
    this.fetchPortfolioStartupChartDetails();
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
  }

  async fetchPortfolioStartupChartDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchDetailsStartupChartsActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false, startupCharts: response, startupChartsList: response});
      this.getEmploymentOfCompany(response);
      this.getProfitRevenueLiability(response);
      this.getReviewOfCompany(response);
      this.getEmployeeBreakUpDepartment(response);
    }

  }


  getEmploymentOfCompany(response){
    let emplymentData = response&&response.employmentOfCompanyChart?response.employmentOfCompanyChart:[]
    var actualData = emplymentData&&emplymentData.length>0?emplymentData:[]
    var barChartData = [];
    actualData.map(function (data) {
      var cData = {}
      let fromYear = data&&data.eofFromYear?data.eofFromYear:0
      let toYear = data&&data.eofToYear?data.eofToYear:0
      cData['year'] = Number(fromYear)+'-'+Number(toYear)
      cData['number'] = data.eofNumberOfEmployment?data.eofNumberOfEmployment:0;
      barChartData.push(cData)
    })

    this.setState({employmentData:barChartData})
  }

  getProfitRevenueLiability(response){
    let revenueData = response&&response.profitRevenueLiabilityChart?response.profitRevenueLiabilityChart:[]
    var actualData = revenueData&&revenueData.length>0?revenueData:[]
  /*  var actualData = [
      {
        entity:"Profit",
        fromYear:2012,
        fromMonth:"March",
        toMonth:"April",
        toYear:2013,
        valueType:"Percentage",
        value:15
      },
      {
        entity:"Revenue",
        fromYear:2012,
        fromMonth:"March",
        toMonth:"April",
        toYear:2013,
        valueType:"Percentage",
        value:45
      },
      {
        entity:"Liablity",
        fromYear:2012,
        fromMonth:"March",
        toMonth:"April",
        toYear:2013,
        valueType:"Percentage",
        value:65
      },
      {
        entity:"Profit",
        fromYear:2013,
        fromMonth:"March",
        toMonth:"April",
        toYear:2014,
        valueType:"Percentage",
        value:85
      },
      {
        entity:"Revenue",
        fromYear:2013,
        fromMonth:"March",
        toMonth:"April",
        toYear:2014,
        valueType:"Percentage",
        value:75
      },
      {
        entity:"Liablity",
        fromYear:2013,
        fromMonth:"March",
        toMonth:"April",
        toYear:2014,
        valueType:"Percentage",
        value:50
      },

      {
        entity:"Profit",
        fromYear:2014,
        fromMonth:"March",
        toMonth:"April",
        toYear:2015,
        valueType:"Percentage",
        value:85
      },
      {
        entity:"Revenue",
        fromYear:2014,
        fromMonth:"March",
        toMonth:"April",
        toYear:2015,
        valueType:"Percentage",
        value:75
      },
      {
        entity:"Liablity",
        fromYear:2014,
        fromMonth:"March",
        toMonth:"April",
        toYear:2015,
        valueType:"Percentage",
        value:50
      }
    ]*/

    var barChartData = [];
    actualData.map(function (data) {
      var cData = {}
      cData['value'] = data.prlValue?data.prlValue:null
      cData[data.prlEntityType] = data.prlValue
      let fromYear = data&&data.prlFromYear?data.prlFromYear:0
      let toYear = data&&data.prlToYear?data.prlToYear:0
      cData['year'] = Number(fromYear)+'-'+Number(toYear)
      barChartData.push(cData)
    })
    this.setState({prlData:barChartData})
  }

  getReviewOfCompany(response){
    /*var actualData = [
      {
        year:"2012",
        rating:2.0
      },
      {
        year:"2013",
        rating:4.5
      },
      {
        year:"2014",
        rating:5.3
      },
      {
        year:"2015",
        rating:6.2
      },
      {
        year:"2018",
        rating:6.5
      }
    ]*/

    let reviewData = response&&response.reviewOfCompanyChart?response.reviewOfCompanyChart:[]
    var actualData = reviewData&&reviewData.length>0?reviewData:[]

    var barChartData = [];
    actualData.map(function (data) {
      var cData = {}
      cData['rating'] = data.rofValue
      cData['year'] = data.rofYear
      barChartData.push(cData)
    })
    this.setState({reviewData:barChartData})
  }

  getEmployeeBreakUpDepartment(response){
    /*var actualData = [
      {
        department:"Management",
        fromYear:2012,
        fromMonth:"March",
        toYear:2013,
        toMonth:"April",
        employmentNumber:100
      },
      {
        department:"Finance",
        fromYear:2016,
        fromMonth:"March",
        toYear:2017,
        toMonth:"April",
        employmentNumber:200
      },
      {
        department:"Development",
        fromYear:2014,
        fromMonth:"March",
        toYear:2015,
        toMonth:"April",
        employmentNumber:300
      },
      {
        department:"Support",
        fromYear:2013,
        fromMonth:"March",
        toYear:2014,
        toMonth:"April",
        employmentNumber:400
      }
    ]
*/
    let companyData = response&&response.employeeBreakupDepartmentChart?response.employeeBreakupDepartmentChart:[]
    var actualData = companyData&&companyData.length>0?companyData:[]
    var barChartData = [];
    actualData.map(function (data) {
      var cData = {}
      cData['department'] = data&&data.ebdDepartmentName?data.ebdDepartmentName:""
      cData['employmentNumber'] = data&&data.ebdNumberOfEmployment?data.ebdNumberOfEmployment:""
      barChartData.push(cData)
    })
    this.setState({empBreakUpData:barChartData})
  }

  selectedGraph(){
    this.setState({"graphSelected" :  true})
    $('.last-item').removeClass('menunone');
    //this.props.backClickHandler()
  }

  getPortfolioStartupChartDetails(details,tabName){
    let data = this.state.startupPortfolio;
    data[tabName] = details;
    this.props.getChartDetails(details,tabName);
  }



  render(){
    var width = 450,
      height = 400,
      margins = {left: 100, right: 100, top: 50, bottom: 50},
      employmentDataTitle = "Bar Chart with tooltip",
      showXAxis = true,
      showYAxis = true,
      employmentDataChartSeries = [
        {
          field: 'number',
          name: 'Employment Of Company',


        }
      ],
      employmentDataX = function(d) {
        return d.year;
      },

      prlTitle = "Bar Group Chart with Tooltip",
      prlChartSeries = [
        {
          field:"Profit",
          name:"Profit"
        },
        {
          field:"Revenue",
          name:"Revenue"
        },
        {
            field:"Liablity",
            name:"Liablity"
        }
      ],
      prlX = function(d) {
        return d.year;
      },
        prlY = function(d) {
          return d;
        },

      xScale = 'ordinal',
      //yTicks = [1, "%"],
      prlXLabel = "Profit, Revenue & Liablity",
      prlYLabel = "Value",

      reviewTitle = "Review of Company",
      reviewChartSeries = [
        {
          field: 'rating',
          name: 'Review of the company',
          color: '#ff7f0e'
        }
      ],
      reviewX = function(d) {
        return d.year;
      },
      reviewY = function(d) {
        return d;
      },

      title = "Pie Chart With Tooltip",
      // value accessor
      value = function(d) {
        return d && +d.employmentNumber;
      },
      // name accessor
      name = function(d) {
        return d && d.department;
      };
    let chartSeries = []
      _.map(this.state.empBreakUpData, function (details,idx) {
        chartSeries.push({"field" : details.department, "name":details.department})
    });

     /* chartSeries = [
        {
          "field":"Management",
          "name":"Management"
        },
        {
          "field":"Finance",
          "name":"Finance"
        },
        {
          "field":"Development",
          "name":"Development"
        },
        {
          "field":"Support",
          "name":"Support"
        }
      ]*/
    return(
      <div>

        {this.state.graphSelected===false?(<div>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
{/*
            <div className="ml_btn">
              <a className="save_btn" onClick={this.selectedGraph.bind(this)}>Edit</a>
            </div>
*/}

            <div className="col-md-6">
              <div className="chart_bg">
                <a  onClick={this.selectedGraph.bind(this)}>Edit</a>
                <MlBarChart
          title= {employmentDataTitle}
          data= {this.state.employmentData}
          width= {width}
          height= {height}
          xScale= {xScale}
          chartSeries = {employmentDataChartSeries}
          showXAxis= {showXAxis}
          showYAxis= {showYAxis}
        /></div>
            </div>

            <div className="col-md-6">
              <div className="chart_bg">
                <a  onClick={this.selectedGraph.bind(this)}>Edit</a>
              <BarGroupTooltip
                title= {prlTitle}
                data= {this.state.prlData}
                width= {width}
                height= {height}
                chartSeries = {prlChartSeries}
                xScale= {xScale}
                x= {prlX}
                 y={prlY}
                xLabel = {prlXLabel}
                yLabel = {prlYLabel}
                showXAxis= {showXAxis}
                showYAxis= {showYAxis}
              />
            </div>
            </div>
              <br className="brclear"/>
            <div className="col-md-6">
              <div className="chart_bg">
                <a  onClick={this.selectedGraph.bind(this)}>Edit</a>
                <LineTooltip
              title= {reviewTitle}
              data= {this.state.reviewData}
              width= {width}
              height= {height}
              margins= {margins}
              chartSeries= {reviewChartSeries}
              xScale= {xScale}
              x= {reviewX}
              y={reviewY}
            />
              </div></div>

            <div className="col-md-6">
              <div className="chart_bg">
                <a  onClick={this.selectedGraph.bind(this)}>Edit</a>
                <p className="text-center">Employee breakup at Department level</p>
                <PieTooltip
              title= {title}
              data= {this.state.empBreakUpData}
              width= {width}
              height= {height}
              chartSeries= {chartSeries}
              value = {value}
              name = {name}
            />
              </div></div>
            </ScrollArea>
          </div>
        </div>
          /*<MlLineChart
          title= {reviewTitle}
          data= {this.state.reviewData}
          width= {width}
          height= {height}
          margins= {margins}
          chartSeries= {reviewChartSeries}
         x= {reviewX}
          xScale= {xScale}
        />
        <MlPieChart
          title= {title}
          data= {this.state.empBreakUpData}
          width= {width}
          height= {height}
          chartSeries= {chartSeries}
          value = {value}
          name = {name}
        />*/
        ):(<div>{<MlStartupChartConfig getPortfolioStartupChartDetails={this.getPortfolioStartupChartDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} startupChartsDetails={this.state.startupCharts} isApp={this.props.isApp}></MlStartupChartConfig> }</div>)}

      </div>
    )
  }

}

MlStartupCharts.contextTypes = {
  startupPortfolio: PropTypes.object,
};
