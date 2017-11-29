/**
 * Created by Sireesha on 13/7/17.
 */
import React from 'react';
const BarTooltip = require('react-d3-tooltip').BarTooltip;

export default class MlBarChart extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const title = this.props.title ? this.props.title : ''
    const chartData = this.props.data && this.props.data.length > 0 ? this.props.data : [{ year: null, number: null }]
    const chartWidth = this.props.width ? this.props.width : null
    const chartHeight = this.props.height ? this.props.height : null
    const chartSeries = this.props.chartSeries && this.props.chartSeries.length > 0 ? this.props.chartSeries : []
    const xScale = this.props.xScale ? this.props.xScale : ''
    const xLabel = this.props.xLabel ? this.props.xLabel : '';
    const yLabel = this.props.yLabel ? this.props.yLabel : '';
    const employmentDataX = function (d) {
      return d.year;
    }


    return (<div><BarTooltip
      title= {title}
      data= {chartData}
      width= {chartWidth}
      height= {chartHeight}
      chartSeries = {chartSeries}
      x= {employmentDataX}
      xScale= {xScale}
      xLabel={xLabel}
      yLabel={yLabel}
    /></div>);
  }
}
