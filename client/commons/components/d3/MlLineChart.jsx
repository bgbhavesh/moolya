/**
 * Created by Sireesha on 13/7/17.
 */
import React from 'react';
const LineTooltip = require('react-d3-tooltip').LineTooltip;

export default class MlLineChart extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const title = this.props.title ? this.props.title : ''
    const chartData = this.props.data ? this.props.data : []
    const chartWidth = this.props.width ? this.props.width : null
    const chartHeight = this.props.height ? this.props.height : null
    const chartSeries = this.props.chartSeries ? this.props.chartSeries : []
    const xScale = this.props.xScale ? this.props.xScale : ''
    const margins = this.props.margins ? this.props.margins : '';
    const dataX = function (d) {
      return d.year;
    };
    const xLabel = this.props.xLabel ? this.props.xLabel : '';
    const yLabel = this.props.yLabel ? this.props.yLabel : '';

    return (<div><LineTooltip
      title= {title}
      data= {chartData}
      width= {chartWidth}
      height= {chartHeight}
      margins= {margins}
      chartSeries = {chartSeries}
      x= {dataX}
      xLabel={xLabel}
      yLabel={yLabel}
      xScale= {xScale}
    /></div>);
  }
}
