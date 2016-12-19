import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';



AdminUsersContent = React.createClass({
  getInitialState(){

    this.state = {users:[]};
    this.props.users = null;
    let self = this;
    Meteor.call('reterieveAllUsers', function (err, resp) {
        // Session.set("users", resp);
        let usersobj = resp
        let users = usersobj.map(function(user){
            return <tr><td>{user.userName || user.eMail}</td></tr>;
        })
        self.setState({users:users})
    })

    return this;
  },

  render(){

      if(!this.state.users)
        return null;

      return(
        <div className="col-md-8 col-sm-8 content-display">
            <div className="panel panel-default adminPannel">
              <table>
                <tr>
                  <th>Email</th>
                </tr>
                {this.state.users}
              </table>
            </div>
        </div>
      )
  }

})

