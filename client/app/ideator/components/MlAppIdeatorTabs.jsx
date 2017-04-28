import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import Tabs from 'react-responsive-tabs';
import MlAppIdeatorDetails from './MlAppIdeatorDetails';
import MlAppIdeatorIdeas from './MlAppIdeatorIdeas';
import MlAppIdeatorProblemsSolutions from './MlAppIdeatorProblemsSolutions';
import MlAppIdeatorAudience from './MlAppIdeatorAudience';
import MlAppIdeatorLibrary from './MlAppIdeatorLibrary';
import MlAppIdeatorStrategyAndProblems from './MlAppIdeatorStrategyAndProblems';
import MlAppIdeatorIntellectual from './MlAppIdeatorIntellectual';
import MlAppIdeatorLookingFor from './MlAppIdeatorLookingFor'


export default class MlAppIdeatorTabs extends React.Component{
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });

    setTimeout(function(){
      $('div[role="tab"]').each(function( index ) {
        var test = $(this).text();
        $(this).empty();
        $(this).html('<div class="moolya_btn moolya_btn_in">'+test+'</div>');
      });
      $('.RRT__tabs').addClass('horizon-swiper');
      $('.RRT__tab').addClass('horizon-item');
      /*$('.RRT__container').addClass('swiper-container').addClass('swiper-menu');
       var mySwiper = new Swiper('.swiper-container', {
       speed: 400,
       slidesPerView:'auto'
       });.addClass('swiper-slide')*/
      $('.horizon-swiper').horizonSwiper();
    },300);

  }

  render(){

    let MlTabs = [
      {name: 'Ideator', tabContent: <MlAppIdeatorDetails/>},
      {name: 'Ideas', tabContent:<MlAppIdeatorIdeas/>},
      {name: 'Problems and Solutions', tabContent: <MlAppIdeatorProblemsSolutions/>},
      {name: 'Audience', tabContent: <MlAppIdeatorAudience/>},
      {name: 'Library', tabContent: <MlAppIdeatorLibrary/>},
      {name: 'Strategy and Planing', tabContent: <MlAppIdeatorStrategyAndProblems/>},
      {name: 'Intellectual Planing and Trademark', tabContent: <MlAppIdeatorIntellectual/>},
      {name: 'Looking For', tabContent: <MlAppIdeatorLookingFor/>}

    ];

    function getTabs() {
      return MlTabs.map(MlTab => ({
        tabClassName: 'moolya_btn', // Optional
        panelClassName: 'panel1', // Optional
        title: MlTab.name,
        getContent: () => MlTab.tabContent,
      }));
    }

    const App = () => <Tabs items={getTabs()} />;
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <div className="main_wrap_scroll">

            <App/>


          </div>
          <span className="actions_switch show_act"></span>

          <div className="bottom_actions_block show_block">
            <div className="hex_btn"><a data-toggle="tooltip" title="Edit" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-edit"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Make Public" data-placement="top" href="#" className="hex_btn hex_btn_in"> <FontAwesome name='bullhorn'/></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Timeline" data-placement="top" href="#" className="hex_btn hex_btn_in"> <FontAwesome name='list-ul'/></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Cancel" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-delete"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Save" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-save"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Assign" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-assign"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Annotate" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-annotate"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Go Live" data-placement="top" href="#" className="hex_btn hex_btn_in"> <FontAwesome name='rocket'/></a></div>

          </div>
        </div>
      </div>
    )
  }
};
