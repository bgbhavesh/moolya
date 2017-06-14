/**
 * Created by vishwadeep on 10/6/17.
 */
import React, {Component} from "react";
import {render} from "react-dom";
import {findProcessSetupActionHandler} from "../actions/findProcessSetupAction";
import MlLoader from "../../../commons/components/loader/loader";

export default class MlAppInvestment extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, data: {}};
    this.findProcessSetup.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findProcessSetup();
    return resp;
  }

  async findProcessSetup() {
    const response = await findProcessSetupActionHandler();
    console.log('find query')
    console.log(response)
    this.setState({loading: false, data: response});
  }

  render() {
    var data = this.state.data && this.state.data.processSteps && this.state.data.processSteps.length > 0 ? this.state.data.processSteps : ['']
    const dataList = data.map(function (stage, id) {
      return (
        <span className="form-control float-label" key={id}>{stage.stageName}</span>
      )
    });
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div>
            <h1>My investment landing screen</h1>
            {dataList}
          </div>
        )}
      </div>
    )
  }
}
