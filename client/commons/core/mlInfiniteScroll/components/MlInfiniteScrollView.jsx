/** ************************************************************
 * Date: 13 Jul, 2017
 * Programmer: Pankaj <pankajkumar.jatav@raksan.in>
 * Description : Infinite scroll main view presentation layer
 * JavaScript file MlInfiniteScrollView.js
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React, {Component} from 'react';

export default class MlInfiniteScrollView extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props){
    super(props);
  }

  render() {
    const {data, viewComponent}= this.props;
    let pConfig=_.extend(this.props.config);
    let ListComponent =React.cloneElement(viewComponent,{data:data, config:pConfig});
    return (
      <div>
        {ListComponent}
      </div>
      )
  }
}

