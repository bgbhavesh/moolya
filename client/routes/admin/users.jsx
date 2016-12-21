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
            return <tr>
              <td>{user.userName}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.eMail}</td>
              <td>{user.city}</td>
              <td>{user.regType}</td>
              <td>{user.userName}</td>
              <td>{user.password}</td>
              <td>{user.companyName}</td>
              <td>{user.companyUrl}</td>
              <td>{user.remarks}</td>
              <td>{user.referralType}</td>
              <td>{user.uploadFile}</td>
            </tr>;
        })
        self.setState({users:users})
    })

    return this;
  },

  render(){

      if(!this.state.users)
        return null;

      return(
        <div className="col-md-9 col-sm-9 content-display">
            <div className="adminPannel">
              <table style={{width: "100%"}}>
                <tr>
                  <th>fullName</th>
                  <th>mobileNumber</th>
                  <th>eMail</th>
                  <th>city</th>
                  <th>regType</th>
                  <th>userName</th>
                  <th>password</th>
                  <th>companyName</th>
                  <th>companyUrl</th>
                  <th>remarks</th>
                  <th>referralType</th>
                  <th>uploadFile</th>
                </tr>
                {this.state.users}
              </table>
            </div>
        </div>
      )
  }

})

