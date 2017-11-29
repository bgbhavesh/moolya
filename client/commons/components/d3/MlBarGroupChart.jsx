/**
 * Created by Sireesha on 13/7/17.
 */
import React from 'react';
const BarGroupTooltip = require('react-d3-tooltip').BarGroupTooltip;

export default class MlBarGroupChart extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const title = this.props.title ? this.props.title : ''
    const chartData = this.props.data && this.props.data.length > 0 ? this.props.data : []
    const chartWidth = this.props.width
    const chartHeight = this.props.height
    const chartSeries = this.props.chartSeries ? this.props.chartSeries : []
    const xScale = this.props.xScale
    const xLabel = this.props.xLabel
    const yLabel = this.props.yLabel
    const dataX = function (d) {
      return d.year;
    }

    return (<div><BarGroupTooltip
      title= {title}
      data= {chartData}
      width= {chartWidth}
      height= {chartHeight}
      chartSeries = {chartSeries}
      x= {dataX}
      xScale= {xScale}
      xLabel = {xLabel}
      yLabel = {yLabel}
    /></div>);
  }
}
