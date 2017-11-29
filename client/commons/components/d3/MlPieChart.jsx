/**
 * Created by Sireesha on 13/7/17.
 */
import React from 'react';
const PieTooltip = require('react-d3-tooltip').PieTooltip;

export default class MlPieChart extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const title = this.props.title ? this.props.title : ''
    const chartData = this.props.data ? this.props.data : []
    const chartWidth = this.props.width ? this.props.width : 0
    const chartHeight = this.props.height ? this.props.height : 0
    const chartSeries = this.props.chartSeries ? this.props.chartSeries : []
    const value = this.props.value ? this.props.value : ''
    const name = this.props.name ? this.props.name : ''
    const dataX = function (d) {
      return d.year;
    }

    return (<div><PieTooltip
      title= {title}
      data= {chartData}
      width= {chartWidth}
      height= {chartHeight}
      chartSeries = {chartSeries}
      value = {value}
      name = {name}
    /></div>);
  }
}
