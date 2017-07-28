import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";


export default class MlAppRegStep6 extends React.Component {
  componentDidMount() {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (150 + $('.app_header').outerHeight(true)));
  }

  render() {
    return (
      <div className="step_form_wrap step5">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
        Step 5

        </ScrollArea>
      </div>
    )
  }
};
