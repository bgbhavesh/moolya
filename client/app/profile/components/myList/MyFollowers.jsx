import React from 'react';
import { render } from 'react-dom';
import ProfileTileComponent from './ProfileTileComponent';
import MlLoader from '../../../../commons/components/loader/loader'
import { fetchMyFollowersActionHandler } from '../../actions/myListActions'

export default class MyFollowers extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, data: [] };
  }
  componentDidUpdate() {
    const WinWidth = $(window).width();
    const WinHeight = $(window).height();
    $('.tab_wrap_scroll').height(WinHeight - ($('.app_header').outerHeight(true) + 120));
    if (WinWidth > 768) {
      $('.tab_wrap_scroll').mCustomScrollbar({ theme: 'minimal-dark' });
    }
  }


  async componentWillMount() {
    const response = await fetchMyFollowersActionHandler();
    this.setState({ loading: false, data: response });
  }

  render() {
    const data = this.state.data || [];
    const showLoader = this.state.loading;
    const list = data.map((prop, idx) => (<ProfileTileComponent data={prop} key={idx}/>));
    return (<div>{showLoader === true ? (<MlLoader/>) : (<div>
      <div className="row">
        <div className="tab_wrap_scroll">
          {list}
        </div>
      </div>
    </div>)}</div>)
  }
}
