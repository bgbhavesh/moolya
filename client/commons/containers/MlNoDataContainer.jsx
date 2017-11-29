import React from 'react';
import MlNoData from '../../commons/components/noData/MlNoData.jsx';
import _ from 'lodash';
export default class MlNoDataContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    const data = this.props.data;
    const dataType = this.props.dataType || null;
    const skipCheck = this.props.skipCheck || false;
    let isEmpty = !!skipCheck;
    if (!skipCheck) {
      switch (dataType) {
        case 'String':
          if (_.isEmpty(data || ''))isEmpty = true;
          break;
        case 'Object':
          if (_.isPlainObject(data || {}))isEmpty = true;
          break;
        case 'Array':
          if (_.isEmpty(data || []))isEmpty = true;
          break;
      }
    }

    if (!isEmpty) return null;

    return (
    /** returning the Generic NoData Component */
      <MlNoData {...this.props}/>
    )
  }
}
