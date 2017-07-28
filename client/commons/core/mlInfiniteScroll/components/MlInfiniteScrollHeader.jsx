/** ************************************************************
 * Date: 13 Jul, 2017
 * Programmer: Pankaj <pankajkumar.jatav@raksan.in>
 * Description : Infinite scroll header presentation layer
 * JavaScript file MlInfiniteScrollHeader.js
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React, {Component} from 'react';

export default class MlInfiniteScrollHeader extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props){
    super(props);
  }

  render() {
    const that = this;
    const props = that.props;
    return (
      <div>
        <input type="text" className="form-control" id="btn-search" placeholder="Search..." onChange={(evt)=>props.updateSearchValue(evt.target.value)} />
        <br className="clearfix" />
      </div>
    )
  }
}

