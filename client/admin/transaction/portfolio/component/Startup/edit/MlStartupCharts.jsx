import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import _ from "lodash";
var FontAwesome = require('react-fontawesome');
var BarTooltip = require('react-d3-tooltip').BarTooltip;
var BarGroupTooltip = require('react-d3-tooltip').BarGroupTooltip;
var LineTooltip = require('react-d3-tooltip').LineTooltip;
var PieTooltip = require('react-d3-tooltip').PieTooltip;

export default class MlStartupCharts extends React.Component{
  constructor(props, context){
    super(props)
    this.state = {employmentData:[], prlData:[], reviewData:[], empBreakUpData:[]}
    this.getEmploymentOfCompany.bind(this)
    this.getProfitRevenueLiability.bind(this)
    this.getReviewOfCompany.bind(this)
    this.getEmployeeBreakUpDepartment.bind(this)
  }

  componentDidMount(){
    this.getEmploymentOfCompany();
    this.getProfitRevenueLiability();
    this.getReviewOfCompany();
    this.getEmployeeBreakUpDepartment();
  }

  getEmploymentOfCompany(){
    var actualData = [
      {
        fromYear:2012,
        toYear:2013,
        fromMonth:"April",
        toMonth:"March",
        totalEmployment:300
      },
      {
        fromYear:2013,
        toYear:2014,
        fromMonth:"April",
        toMonth:"March",
        totalEmployment:500
      },
      {
        fromYear:2014,
        toYear:2015,
        fromMonth:"April",
        toMonth:"March",
        totalEmployment:20
      },
      {
        fromYear:2015,
        toYear:2016,
        fromMonth:"April",
        toMonth:"March",
        totalEmployment:300
      },
      {
        fromYear:2016,
        toYear:2017,
        fromMonth:"April",
        toMonth:"March",
        totalEmployment:300
      }
    ]
    var barChartData = [];
    actualData.map(function (data) {
      var cData = {}
      cData['year'] = data.fromYear+'-'+data.toYear
      cData['number'] = data.totalEmployment;
      barChartData.push(cData)
    })

    this.setState({employmentData:barChartData})
  }

  getProfitRevenueLiability(){
    var actualData = [
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
    ]

    var barChartData = [];
    actualData.map(function (data) {
      var cData = {}
      cData['value'] = data.value
      cData[data.entity] = data.value
      cData['year'] = data.fromYear+'-'+data.toYear
      barChartData.push(cData)
    })
    this.setState({prlData:barChartData})
  }

  getReviewOfCompany(){
    var actualData = [
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
    ]

    var barChartData = [];
    actualData.map(function (data) {
      var cData = {}
      cData['rating'] = data.rating
      cData['year'] = data.year
      barChartData.push(cData)
    })
    this.setState({reviewData:barChartData})
  }

  getEmployeeBreakUpDepartment(){
    var actualData = [
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
        fromYear:20113,
        fromMonth:"March",
        toYear:20114,
        toMonth:"April",
        employmentNumber:400
      }
    ]

    var barChartData = [];
    actualData.map(function (data) {
      var cData = {}
      cData['department'] = data.department
      cData['employmentNumber'] = data.employmentNumber
      barChartData.push(cData)
    })
    this.setState({empBreakUpData:barChartData})
  }

  render(){
    var width = 450,
      height = 400,
      margins = {left: 100, right: 100, top: 50, bottom: 50},
      employmentDataTitle = "Bar Chart with tooltip",
      employmentDataChartSeries = [
        {
          field: 'number',
          name: 'Employment Of Company'
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
      xScale = 'ordinal',
      yTicks = [1, "%"],
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

      title = "Pie Chart With Tooltip",
      // value accessor
      value = function(d) {
        return +d && d.employmentNumber;
      },
      // name accessor
      name = function(d) {
        return d && d.department;
      },

      chartSeries = [
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
      ]
    return(
      <div>
        <BarTooltip
          title= {employmentDataTitle}
          data= {this.state.employmentData}
          width= {width}
          height= {height}
          chartSeries = {employmentDataChartSeries}
          x= {employmentDataX}
          xScale= {xScale}
        />

        <BarGroupTooltip
          title= {prlTitle}
          data= {this.state.prlData}
            width= {width}
          height= {height}
          chartSeries = {prlChartSeries}
          x= {prlX}
          xScale= {xScale}
          xLabel = {prlXLabel}
          yLabel = {prlYLabel}
        />
        <LineTooltip
          title= {reviewTitle}
          data= {this.state.reviewData}
          width= {width}
          height= {height}
          margins= {margins}
          chartSeries= {reviewChartSeries}
          x= {reviewX}
          xScale= {xScale}
        />
        <PieTooltip
          title= {title}
          data= {this.state.empBreakUpData}
          width= {width}
          height= {height}
          chartSeries= {chartSeries}
          value = {value}
          name = {name}
        />
      </div>
    )
  }

}

MlStartupCharts.contextTypes = {
  startupPortfolio: PropTypes.object,
};
