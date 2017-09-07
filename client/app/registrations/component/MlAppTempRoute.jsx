/**
 * Created by viswadeep on 6/7/17.
 */
import React, {Component} from "react";
import {render} from "react-dom";
import {fetchPendingRegistration} from "../actions/findRegistration";

export default class MlAppTempRoute extends Component {
  constructor(props){
    super(props);
    this.state={
      loading:true,
      register:[]
    }
    this.fetchPendingReg.bind(this)
  }

  componentWillMount(){
    const resp = this.fetchPendingReg()
    return resp
  }

  async fetchPendingReg() {
    const response = await fetchPendingRegistration();
    if(response){
      this.setState({loading:false, register:response})
    }
  }
  fillRegistration(regId, e){
      FlowRouter.go('/app/register/'+regId)
  }
  render() {
    let that = this
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12 ideators_list">
            <div className="row">
              {this.state.register.map(function (reg, idx) {
                return (
                  <div className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={idx}>
                    {/*<a href={ideatorListRoutes.ideatorDetailsRoute("ideator",ideator.ideas[0].portfolioId)}>*/}
                    <a href='' onClick={that.fillRegistration.bind(that, reg.registrationId)}>
                      <div className="ideators_list_block">
                        <div className="premium">
                          <span>{reg.registrationInfo?reg.registrationInfo.communityName:''}</span>
                        </div>
                        <div className="block_footer">
                          <span>{reg.registrationInfo?reg.registrationInfo.email:''}</span>
                        </div>
                      </div>

                    </a>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </div>
    )
  }
};
