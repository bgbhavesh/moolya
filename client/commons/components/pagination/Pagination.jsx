import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Slider from 'react-rangeslider';
const FontAwesome = require('react-fontawesome');


export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
    this.goToPage.bind(this)
    this.onSlideChange.bind(this)
    this.pageSkip.bind(this);
    this.pageCount.bind(this)
    this.sendCurPageToParent.bind(this)
    this.toggleOnClick.bind(this)
    this.handleOnChange.bind(this);
    return this;
  }

  handleOnChange(value) {
    this.setState({
      value
    })
    this.sendCurPageToParent(value);
  }

  componentDidMount() {
    /* $('.pagination').click(function () {
     $(this).toggleClass('pagination_open');
     }); */
    $('.pagination').on('click', function (e) {
      if (e.target !== this) { return; }
      $(this).toggleClass('pagination_open');
    });
  }

  // componentWillUpdate(){
  //   let a = this.state.value;
  //   sendCurPageToParent(a);
  //
  // }


  toggleOnClick(e) {
    console.log('toggle to close')
    /* $('.pagination').click(function () {
     alert(1);
     $(this).toggleClass('pagination_open');
     }) */
  }

  goToPage(event) {
    event.preventDefault();
    let value = this.refs.pageInput.value;

    const totalRecords = this.props.totalRecords;
    const pages = totalRecords / 50; // divide by dynamic limit
    const pagesMax = parseInt(pages) + 1
    const pagesMin = 1;

    if (value && value >= pagesMax) {
      value = pagesMax
    }
    if (value && value <= pagesMin) {
      value = pagesMin;
    }
    this.handleOnChange(value)
  }

  pageSkip(event) {
    let curPage;
    if (event.target.name == 'nextPage') {
      curPage = (this.state.value || 0) + 1;
    } else if (event.target.name == 'prePage') {
      curPage = (this.state.value || 0) - 1;
    }

    const totalRecords = this.props.totalRecords;
    const pages = totalRecords / 50; // divide by dynamic limit
    const pagesMax = parseInt(pages) + 1
    const pagesMin = 1;

    if (curPage >= pagesMax) {
      curPage = pagesMax;
    } else if (curPage <= pagesMin) {
      curPage = pagesMin;
    }

    this.handleOnChange(curPage);
  }

  pageCount(event) {
    if (event.target.className == 'fa fa-chevron-up') {
      console.log('increase count')
    } else if (event.target.className == 'fa fa-chevron-down') {
      console.log('decrease count')
    }
  }

  // inputChange(){
  //   let curPage = this.refs.pageInput.value
  //   this.sendCurPageToParent(curPage)
  // }

  onSlideChange(e) {
    if (e.target.value) {
      this.setState({ value: e.target.value })
    } else {
      this.setState({ value: '#' })
    }
    console.log('Slide is perform');
  }

  sendCurPageToParent(curPage) {
    this.props.onPageChange(curPage);
  }

  render() {
    const that = this;
    const totalRecords = this.props.totalRecords;
    const pageSize = this.props.pageSize;
    const currentPage = parseInt(this.state.value);
    console.log(this.props.totalRecords)
    const pages = totalRecords / 50; // divide by dynamic limit
    const pagesMax = parseInt(pages) + 1
    const pagesMin = 1;
    const startPage = 1;
    return (
      <div className="custome_pagination">
        <div className="pagination" role="navigation">

          <div className="perpage pagination_open" onClick={that.toggleOnClick.bind(that)}>
            <a onClick={that.pageCount.bind(that)}>
              {/* <FontAwesome name='chevron-up'/> */}
            </a>
            <br />
            <b>50</b>
            <br />
            <a onClick={that.pageCount.bind(that)}>
              {/* <FontAwesome name='chevron-down'/> */}
            </a>
          </div>

          {/* <a href="">
           <div className="pageSlider long">
           </div>
           </a>
           */}

          <Slider
            min={pagesMin} max={pagesMax} tooltip={true} value={currentPage} step={1}
            onChange={this.handleOnChange.bind(this)}/>

          <form className="pageForm" action="#">
            <label className="pageLabel" htmlFor="pageInput">
              Page number you'd like to go to. (Max of 30)
            </label>
            <a className="pagePrev pageSkip" name="prePage" onClick={that.pageSkip.bind(that)}>Previous Page</a>
            <input
              id="pageInput" className="pageInput" type="text" value={currentPage} maxLength="5" placeholder="#"
              ref="pageInput" onChange={that.onSlideChange.bind(that)} disabled="disabled"/>
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
