import React, { PureComponent } from 'react';
import ScrollArea from 'react-scrollbar';
import CDNImage from '../CDNImage/CDNImage';

export default class MlAnchorUserGrid extends PureComponent {

  render() {
    return (
      <ScrollArea speed={0.8} className="left_wrap">
        {
          !this.props.users.length && <div className={this.props.classNames || 'col-md-6 col-sm-6'} key="1">
            <div className="list_block provider_block">
              <div className="provider_mask">
                <CDNImage className="user_pic" src='/images/def_profile.png' />
              </div>
              <h3>No anchor user</h3>
            </div>
          </div>
        }
        {
          this.props.users.map((user, index) => (
            <div className={this.props.classNames || "col-md-6 col-sm-6"} key={index}>
              <div className="list_block provider_block" onClick={() => this.props.clickHandler(user.userId)}>
                <div className="provider_mask">
                  <CDNImage className="user_pic" src={user.profileImage ? user.profileImage : '/images/def_profile.png'} />
                </div>
                <h3>{user.displayName}</h3>
              </div>
            </div>
          ))
        }
      </ScrollArea>
    );
  }
}

MlAnchorUserGrid.propTypes = {
  users: React.PropTypes.array.isRequired,
  clickHandler: React.PropTypes.func,
  classnames: React.PropTypes.string,
};
