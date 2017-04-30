import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
var FontAwesome = require('react-fontawesome');


export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:" "
    }
  this.goToPage.bind(this)
    this.onSlideChange.bind(this)
    this.pageSkip.bind(this);
    this.pageCount.bind(this)
    this.sendCurPageToParent.bind(this)
    this.toggleOnClick.bind(this)
    return this;
  }

  componentDidMount() {
    let totalRecords=this.props.totalRecords
    console.log(this.props.totalRecords)
    let pages = totalRecords/10;     //divide by dynamic limit
    let pagesMax = parseInt(pages)+1
    let pagesMin = 1;
    let startPage = 1;
    let url = "This is the url click"
    $('.pagination .pageSlider').slider({
      value: startPage, max: pagesMax, min: pagesMin,
      animate: true,
      create: function (event, ui) {
        $('.pagination .pageSlider .ui-slider-handle').attr({
          "aria-valuenow": startPage,
          "aria-valuetext": "Page " + startPage,
          "role": "slider",
          "aria-valuemin": pagesMin,
          "aria-valuemax": pagesMax,
          "aria-describedby": "pageSliderDescription"
        });

        $('.pagination .pageInput').val(startPage);
      }

    }).on('slide', function (event, ui) {
      // let user skip 10 pages with keyboard ;)
      if (event.metaKey || event.ctrlKey) {
        if (ui.value > $(this).slider('value')) {
          if (ui.value + 9 < pagesMax) {
            ui.value += 9;
          }
          else {
            ui.value = pagesMax
          }
          $(this).slider('value', ui.value);

        } else {
          if (ui.value - 9 > pagesMin) {
            ui.value -= 9;
          }
          else {
            ui.value = pagesMin
          }
          $(this).slider('value', ui.value);
        }
        event.preventDefault();
      }
this.goToPage.bind(ui.value);
//       this.goToPage.bind(this);
      $('.pagination .pageNumber span').text(ui.value);
      $('.pagination .pageInput').val(ui.value);
      console.log(ui.value)


    }).on('slidechange', function (event, ui) {
      $('.pagination .pageNumber')
        .attr('role', 'alert')
        .find('span')
        .text(ui.value);

      $('.pagination .pageInput').val(ui.value);

      $('.pagination .pageSlider .ui-slider-handle').attr({
        "aria-valuenow": ui.value,
        "aria-valuetext": "Page " + ui.value
      });
      console.log(ui.value)
      this.goToPage.bind(ui.value);

      // this.goToPage.bind(ui.value);
      // this.sendCurPageToParent(ui.value)
    });
    this.sliderPips(pagesMin, pagesMax);
    this.sliderLabel();
  }

  // componentWillUpdate(){
  //   let a = this.state.value;
  //   sendCurPageToParent(a);
  //
  // }

  sliderPips(min, max){
      let pips = max - min;
      let $pagination = $('.pagination .pageSlider');
      for (i = 0; i <= pips; i++) {
        let s = $('<span class="pagePip"/>').css({
          left: '' + (100 / pips) * i + '%'
        });
        $pagination.append(s);
      }
      let minPip = $('<span class="pageMinPip">' + min + '</span>');
      let maxPip = $('<span class="pageMaxPip">' + max + '</span>');
      $pagination.prepend(minPip, maxPip);
  }

  sliderLabel(){
    $('.pagination .ui-slider-handle').append(
      '<span class="pageNumber"><span>' +
      $('.pagination .pageSlider').slider('value') +
      '</span></span>');
  }

  toggleOnClick(e) {
    console.log("toggle to close")
    // $('.pagination').click(function () {
    //   $(this).toggleClass('pagination_open');
    // })
  }

  goToPage(event) {
    event.preventDefault();
    let value = this.refs.pageInput.value
    $('.pagination .pageSlider').slider('value', value);
    this.sendCurPageToParent(value)
  }

  pageSkip(event){
    let curPage;
    if (event.target.name == 'nextPage') {
      curPage = $('.pagination .pageSlider').slider('value') + 1;
    } else if (event.target.name == 'prePage') {
      curPage = $('.pagination .pageSlider').slider('value') - 1;
    }
    $('.pagination .pageSlider').slider('value', curPage);
    this.sendCurPageToParent(curPage)
    console.log(event.target.name)
  }

  pageCount(event){
    if(event.target.className=='fa fa-chevron-up'){
      console.log('increase count')
    }else if(event.target.className=='fa fa-chevron-down'){
      console.log('decrease count')
    }
  }

  // inputChange(){
  //   let curPage = this.refs.pageInput.value
  //   this.sendCurPageToParent(curPage)
  // }

  onSlideChange(e) {
    this.setState({value:e.target.value})
    console.log('Slide is perform');
  }
  sendCurPageToParent(curPage) {
    this.props.onPageChange(curPage);
  }
    render() {
    let that=this;
    return (
      <div className="custome_pagination">
        <div className="pagination pagination_open" role="navigation" onClick={that.toggleOnClick.bind(that)}>
          <div className="perpage">
            <a onClick={that.pageCount.bind(that)}>
              <FontAwesome name='chevron-up'/>
            </a>
            <br />
            <b>10</b>
            <br />
            <a onClick={that.pageCount.bind(that)}>
              <FontAwesome name='chevron-down'/>
            </a>
          </div>
          <a href="#">
          <div className="pageSlider long">
          </div>
          </a>
          <form className="pageForm" action="#">
            <label className="pageLabel" htmlFor="pageInput">
              Page number you'd like to go to. (Max of 30)
            </label>
            <a className="pagePrev pageSkip" name="prePage" onClick={that.pageSkip.bind(that)}>Previous Page</a>
            <input id="pageInput" className="pageInput" type="text" maxLength="3" placeholder="#" ref="pageInput" onBlur={that.onSlideChange.bind(that)}/>
            <a className="pageNext pageSkip" name="nextPage" onClick={that.pageSkip.bind(that)}>Next Page</a>
            <button className="pageButton" title="Go to chosen page" onClick={that.goToPage.bind(that)}>
              <FontAwesome name='hand-pointer-o'/>
            </button>
          </form>
        </div>
      </div>
    )
  }
}
