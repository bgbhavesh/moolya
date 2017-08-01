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
import ScrollArea from 'react-scrollbar';

export default class MlInfiniteScrollView extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props){
    super(props);
  }

  componentDidMount() {
    var WinHeight = $(window).height();
    $('.infinite_scroll').height(WinHeight - (20 + $('.app_header').outerHeight(true)));
  }

  render() {
    const {data, viewComponent}= this.props;
    let pConfig=_.extend(this.props.config);
    let ListComponent =React.cloneElement(viewComponent,{data:data, config:pConfig});
    return (
      <div className="infinite_scroll">
        <ScrollArea
        speed={0.8}
        className="infinite_scroll"
        smoothScrolling={true}
        default={true}
        >
          {ListComponent}
        </ScrollArea>
      </div>
      )
  }
}

