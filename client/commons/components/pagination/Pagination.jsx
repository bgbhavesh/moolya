import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
var FontAwesome = require('react-fontawesome');


export default class Pagination extends Component {

  constructor(props) {
    super(props);
    return this;
  }

  componentDidMount()
  {
    $('.view_switch').click(function(){
      if($(this).hasClass('map_view')){
        $(this).removeClass('map_view').addClass('list_view');
        $('.map_view_block').hide();
        $('.list_view_block').show();
        $('.admin_padding_wrap').removeClass('no_padding');
      }else{
        $(this).removeClass('list_view').addClass('map_view');
        $('.map_view_block').show();
        $('.list_view_block').hide();
        $('.admin_padding_wrap').addClass('no_padding');
      }
    });
    $(document).ready( function() {
      let pagesMax = 30;
      let pagesMin = 1;
      let startPage = 7;
      let url = "This is the url click"
      $('.pagination .pageSlider').slider({
        value: startPage, max: pagesMax, min: pagesMin,
        animate: true,
        create: function( event, ui ) {
          $('.pagination .pageSlider .ui-slider-handle').attr({
            "aria-valuenow": startPage,
            "aria-valuetext": "Page " + startPage,
            "role": "slider",
            "aria-valuemin": pagesMin,
            "aria-valuemax": pagesMax,
            "aria-describedby": "pageSliderDescription"
          });

          $('.pagination .pageInput').val( startPage );
        }

      }).on( 'slide', function(event,ui) {

        // let user skip 10 pages with keyboard ;)
        if( event.metaKey || event.ctrlKey ) {

          if( ui.value > $(this).slider('value') ) {

            if( ui.value+9 < pagesMax ) { ui.value+=9; }
            else { ui.value=pagesMax }
            $(this).slider('value',ui.value);

          } else {

            if( ui.value-9 > pagesMin ) { ui.value-=9; }
            else { ui.value=pagesMin }
            $(this).slider('value',ui.value);

          }

          event.preventDefault();

        }

        $('.pagination .pageNumber span').text( ui.value );
        $('.pagination .pageInput').val( ui.value );

      }).on('slidechange', function(event, ui) {

        $('.pagination .pageNumber')
          .attr('role','alert')
          .find('span')
          .text( ui.value );

        $('.pagination .pageInput').val( ui.value );

        $('.pagination .pageSlider .ui-slider-handle').attr({
          "aria-valuenow": ui.value,
          "aria-valuetext": "Page " + ui.value
        });

      });

      $('.pagination .pageSlider .ui-slider-handle').on( 'keyup' , function(e) {

        if( e.which == 13 ) {
          let curPage = $('.pagination .pageSlider').slider('value');
          alert( 'we would now send you to: ' + url.replace( /{{.}}/ , curPage ));
        }

      });


      $('.pagination .pageInput').on( 'change' , function(e) {
        $('.pagination .pageSlider').slider( 'value', $(this).val() );
      });

      let tmr;
      $('.pageSkip').on('click', function(e) {

        e.preventDefault();

        let $this = $(this);
        let curPage;
        if( $this.hasClass('pageNext') ) {
          curPage = $('.pagination .pageSlider').slider('value')+1;
        } else if( $this.hasClass('pagePrev') ) {
          curPage = $('.pagination .pageSlider').slider('value')-1;
        }

        $('.pagination .pageSlider').slider('value',curPage);

        clearTimeout(tmr);
        tmr = setTimeout( function() {
          alert( 'we would now send you to: ' + url.replace( /{{.}}/ , curPage ));
        },1000);

      });
      function sliderPips( min, max ) {

        let pips = max-min;
        let $pagination = $('.pagination .pageSlider');

        for( i=0; i<=pips; i++ ) {

          let s = $('<span class="pagePip"/>').css({
            left: '' + (100/pips)*i + '%'
          });

          $pagination.append( s );

        }

        let minPip = $('<span class="pageMinPip">'+min+'</span>');
        let maxPip = $('<span class="pageMaxPip">'+max+'</span>');
        $pagination.prepend( minPip, maxPip );

      };sliderPips( pagesMin, pagesMax );


      function sliderLabel() {
        $('.pagination .ui-slider-handle').append(
          '<span class="pageNumber"><span>' +
          $('.pagination .pageSlider').slider('value') +
          '</span></span>');
      };sliderLabel();

      $('.pagination .pageButton').on('click', function(e) {

        e.preventDefault();
        let curPage = $('.pagination .pageSlider').slider('value');
        alert( 'we would now send you to: ' +
          url.replace( /{{.}}/ , curPage ));
      });
    });

    $('.pagination').click(function(){
      $(this).toggleClass('pagination_open');
    });

  }

  render() {
    return (
      <div className="custome_pagination">
        <div className="pagination pagination_open" role="navigation">
          <div className="perpage">
            <a href="#">
              <FontAwesome name='chevron-up' className=""/>
            </a>
            <br />
            <b>20</b>
            <br />
            <a href="#">
              <FontAwesome name='chevron-down' className=""/>
            </a>
          </div>
          <div className="pageSlider long"></div>
          <form className="pageForm" action="#">
            <label className="pageLabel" htmlFor="pageInput">
              Page number you'd like to go to. (Max of 30)
            </label>
            <a className="pagePrev pageSkip" href="#?page=6" title="Previous Page (6)">Previous Page</a>
            <input id="pageInput" className="pageInput" type="text" maxLength="3" placeholder="#"/>
            <a className="pageNext pageSkip" href="#?page=8" title="Next Page (8)">Next Page</a>
            <button className="pageButton" title="Go to chosen page of results"><FontAwesome name='hand-pointer-o'/>
            </button>
          </form>
        </div>
      </div>
    )
  }
}
