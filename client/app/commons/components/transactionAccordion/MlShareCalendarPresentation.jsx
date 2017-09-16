import React from 'react';
export default class MlShareCalendarPresentation extends React.Component {

  componentDidMount() {
    $('.float-label').jvFloat();

  }
  componentWillMount() {
    this.setState({data: this.props.propsData});
    console.log('---this.props---', this.props.propsData)
  }

  render() {
    let that = this;
    const {propsData} = this.props || [];
    let transId = Math.random().toString(36).slice(2); //userDetails.userId;
    return (
      <div className="ml_tabs">
        <ul className="nav nav-pills">
          <li className="active">
            <a href="#1a" data-toggle="tab">Details</a>
          </li>
        </ul>
        <div className="tab-content clearfix">
          <div className="tab-pane active" id="1a">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Shared Date & Time" value={propsData && propsData.createdAt ? propsData.createdAt: ''} className="form-control float-label" id=""/>
                </div>
                <h5>Shared with :</h5>
                <ul>
                  {
                    propsData.users && propsData.users.map(function (user, index) {
                      return (
                        <li key={index}>
                          {/*<FontAwesome name='minus'/>*/}
                          <img src={ user.profilePic ? user.profilePic : "/images/data_balance.jpg"}/>
                          <span>{user.displayName}</span>
                        </li>
                      )
                    })
                  }
                </ul>
                <div className="clearfix" />
                <br />
                <div className="form-group">
                  <input type="text" placeholder="Status" value="Completed" className="form-control float-label" id=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
