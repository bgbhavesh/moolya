import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar'
import $ from 'jquery'
import _ from 'lodash'
require('malihu-custom-scrollbar-plugin')($);

export default class MlAppLeftNav extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        var WinWidth = $(window).width();
        var WinHeight = $(window).height();
        $('.app_menu, .app_main_wrap ').height(WinHeight-$('.app_header').outerHeight(true));
        $('.main_wrap_scroll ').height(WinHeight-(68+$('.app_header').outerHeight(true)));
        $('.actions_switch').click(function(){
            $('.bottom_actions_block').toggleClass('show_block');
            $(this).toggleClass('show_act');
        });
        $('.left_wrap').height(WinHeight-(90+$('.app_header').outerHeight(true)));

        $('.mobile_menu_trigger').click(function(){
            $('.moolya_app').toggleClass('slid');
            $('.app_menu').toggleClass('show_menu');
            $('.overlay').fadeToggle( );
            $(this).toggleClass('open');
        });
        $(document).on('click', '.menu_in a', function(e){
          //e.preventDefault();
          $(this).parents('li').addClass('active_menu');
          $('.admin_menu ul li').not($(this).parents('li')).removeClass('active_menu');
          return false;
        });

        if(WinWidth > 768){
            $(".app_menu").mCustomScrollbar({theme:"minimal-dark"});
        }
    }

    render(){
        function find(uniqueId, menus) {
            var i = 0, found;
            for (; i < menus.length; i++) {
                if (menus[i].uniqueId === uniqueId) {
                    var res = menus[i].uniqueId
                    return res;
                } else if (_.isArray(menus[i].subMenu)) {
                    found = find(uniqueId, menus[i].subMenu)
                    if (found) {
                        return menus[i].uniqueId
                    }
                }
            }
        }
        let path = FlowRouter.current().route.name;
        let data = this.context.menu||{};
        let menu = data.menu || [];
        let parentKey = find(path, menu)
        let navOptions = menu.map(function (dataItem) {
            let activeClass
            if (parentKey == dataItem.uniqueId) {
                activeClass = 'active_menu'
            }
            return (
                <li className={`menu_item ${activeClass}`} key={dataItem.uniqueId}>
                    <a href={dataItem.link} id={dataItem.uniqueId}>
                        <div className={"menu_in"}>
                            <span className={dataItem.image}></span>
                            <br/>
                            <b className="menu_title">{dataItem.name}</b>
                        </div>
                    </a>
                </li>
            )
        });

        return(
            <div className="app_menu mCustomScrollbar _mCS_11 mCS-autoHide">
                <ul>
                    {navOptions }
                    <li className="menu_item"></li>
                </ul>
            </div>
        )
    }
}

MlAppLeftNav.contextTypes = {
    menu: React.PropTypes.object
};
