import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {findStartupManagementActionHandler} from '../../actions/findPortfolioStartupDetails'


export default class MlStartupViewManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {startupManagementList: []};
    this.fetchPortfolioStartupDetails.bind(this);
  }

  componentWillMount(){
    this.fetchPortfolioStartupDetails();
  }
  async fetchPortfolioStartupDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await findStartupManagementActionHandler(portfoliodetailsId);
    console.log("-------------------------------------");
    console.log(response);
    if (response) {
      this.setState({loading: false,startupManagementList: response});
    }

  }

  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Management</h2>
          <div className="col-lg-12">
            <div className="row">
              {clientsArray.map(function (details, idx) {
                return(<div className="col-lg-2 col-md-3 col-xs-12 col-sm-4">
                <div className="team-block">
                  <img src={details.logo&&details.logo.fileUrl} className="team_img" />
                  <h3>
                    Name Here <br /><b>COO</b>
                  </h3>
                </div>
              </div>)
              })}
            </div>
          </div>
          <span className="actions_switch"></span>
          <div className="bottom_actions_block">
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
}
