import React from 'react';

export default class Step7 extends React.Component{
componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap step5">
        <h3>Coming Soon....</h3>
      </div>
    )
  }
};
