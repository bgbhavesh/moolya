/**
 * Created by mohammed.mohasin on 11/6/17.
 */
import React from "react";
import {render} from "react-dom";
import _ from "lodash";

export default class MlAccordion extends React.Component {

  constructor(props) {
    super(props);
    return this;
  }

  render() {
    var that = this;
    /*props 'accordionOptions'  contains accordion configuration only*/
    let accordion = this.props.accordionOptions ? this.props.accordionOptions : {};
    let accordionId = accordion.id || 'accordion';
    let panelOptions = accordion.panelItems || [];
    let panelItems = panelOptions.map(function (option, index) {
      return (
        <a className="re-btn" data-toggle="collapse" data-parent={"#" + accordionId} key={"panel"+index}
           href={"#" + accordionId + index}>{option.title}</a>
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
        <div className="opacity"></div>
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
