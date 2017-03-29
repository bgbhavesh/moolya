import React from "react";
import {render} from "react-dom";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Moolyaselect from  '../../commons/components/select/MoolyaSelect'

export default class MlStepAvailabilityComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      stepAvailability:[{step: null,template:null}]
    }
    return this;
  }
  componentDidMount() {
    this.props.getStepAvailability(this.state.stepAvailability);
  }
  componentWillMount(){
    let stepAvailability = this.props.stepDetails
    if(stepAvailability){
      let stepDetails=[]
      for(let i=0;i<stepAvailability.length;i++){
        let json={
          step:stepAvailability[i].step,
          template:stepAvailability[i].template
        }
        stepDetails.push(json)
      }
      this.setState({stepAvailability: stepDetails})
    }

  }
  /*componentWillUpdate(){
   this.props.getStepAvailability(this.state.stepAvailability);
   }*/
  AssignStep(idx){
    this.setState({
      stepAvailability: this.state.stepAvailability.concat([{ step:null,template:null}])
    });
  }
  RemovestepAvailability(idx,event){
    let stepAvailability;
    stepAvailability= this.state.stepAvailability.filter(function(object,index){
      return idx !== index;
    });
    this.setState({
      stepAvailability: stepAvailability
    })
    this.props.getStepAvailability(stepAvailability);
  }
  optionsBySelectStep(index, selectedValue){
    let stepAvailability=this.state.stepAvailability
    stepAvailability[index]['step']=selectedValue
    this.setState({stepAvailability:stepAvailability})
    this.props.getStepAvailability(this.state.stepAvailability);
  }
  optionsBySelecttemplate(index, selectedValue){
    let stepAvailability=this.state.stepAvailability
    stepAvailability[index]['template']=selectedValue
    this.setState({stepAvailability:stepAvailability})
    this.props.getStepAvailability(this.state.stepAvailability);
  }
  render() {
    let that=this;
    let processQuery=gql`query{
     data: FetchProcessType {
        label:processName
        value:_id
      }
    }
    `;
    let stepData = that.state.stepAvailability || [];
    return(
      <div>
        {stepData.map(function(stepAvailability, idx){
          return(
            <div className="panel panel-default" key={idx}>
              <div className="panel-heading"> Assign Step{idx==0&&(<div className="pull-right block_action" onClick={that.AssignStep.bind(that)}><img src="/images/add.png"/></div>)}
                {idx>0&&(<div className="pull-right block_action" onClick={that.RemovestepAvailability.bind(that,idx)}><img src="/images/remove.png"/></div>)}
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Step"  selectedValue={stepAvailability.step} queryType={"graphql"} query={processQuery}  isDynamic={true}  onSelect={that.optionsBySelectStep.bind(that,idx)} />

                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Template" selectedValue={stepAvailability.template} queryType={"graphql"} query={processQuery} reExecuteQuery={true}  isDynamic={true}  onSelect={that.optionsBySelecttemplate.bind(that,idx)} />
                </div>
              </div>
            </div>
          )}
        )}
      </div>
    )
  }
};

