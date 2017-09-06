/**
 * Created by mohammed.mohasin on 11/6/17.
 */
import React from "react";
import {render} from "react-dom";
import _ from "lodash";
import FontAwesome from 'react-fontawesome';

export default class MlAccordion extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      isExpand:true
    }
    this.onTabClick.bind(this)
    return this;
  }
  onTabClick(){
    var data = $('#pdp-accord-toggle').attr('aria-expanded')
    var isExpand = data == 'true'?true:false
    this.setState({isExpand:isExpand})
  }
  render() {
    var _this = this;
    /*props 'accordionOptions'  contains accordion configuration only*/
    let accordion = this.props.accordionOptions ? this.props.accordionOptions : {};
    let accordionId = accordion.id || 'accordion';
    let panelOptions = accordion.panelItems || [];
    let panelItems = panelOptions.map(function (option, index) {
      return (
        <a className="re-btn" id="pdp-accord-toggle" data-toggle="collapse" data-parent={"#" + accordionId} key={"panel"+index}
           href={"#" + accordionId + index} onClick={_this.onTabClick.bind(_this)}>
          {option.title} <span className={`fa fa-caret-${_this.state.isExpand?"down":"up"}`}/>
          </a>
      )
    });

    var propz = _.omit(this.props, ['accordionOptions']);
    let panelItemsContent = panelOptions.map(function (option, index) {
      let isText = option.isText || false;
      let PanelComponent = React.cloneElement(option.contentComponent, propz);

      if(isText){
           return  (<div id={accordionId + index} key={"panelContent"+index} className="panel-collapse collapse in" style={option.style}>{option.contentComponent}</div>);
      }else{
      return (<div id={accordionId + index} key={"panelContent"+index} className="panel-collapse collapse in" style={option.style}>
              {PanelComponent}
              </div>)
     }

    });

    return (
      <div>
        {/*<div className="opacity"></div>*/}
        <div className="panel-group bottom-buttons" id={accordionId}>
          <div className="panel">
            <div className="panel-heading clearfix">
              <h4 className="panel-title text-left">
                {panelItems}
              </h4>
            </div>

            {panelItemsContent}


          </div>
        </div>
      </div>
    )
  }
};
