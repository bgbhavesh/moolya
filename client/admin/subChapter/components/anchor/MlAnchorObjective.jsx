/**
 * Created by vishwadeep on 12/9/17.
 */

import React from 'react';
import { findSubChapterActionHandler } from '../../actions/findSubChapter'

export default class MlAnchorObjective extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      objectiveFormArray: [{
        description: '',
        status: false,
      }],
    };
    this.renderObjectiveFormArray = this.renderObjectiveFormArray.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.removeObjectiveForm = this.removeObjectiveForm.bind(this);
    this.addObjectiveForm = this.addObjectiveForm.bind(this);
    this.updateObjectiveFormArray = this.updateObjectiveFormArray.bind(this);
  }

  async componentWillMount() {
    const { clusterId, chapterId, subChapterId } = this.props;
    const response = await findSubChapterActionHandler(clusterId, chapterId, subChapterId);
    objective = response && response.objective && response.objective.map((ob) => ({
      description: ob.description,
      status: ob.status,
    }));
    this.updateObjectiveFormArray(objective);
  }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });

    var mySwiper = new Swiper('.blocks_in_form', {
      speed: 400,
      spaceBetween: 25,
      slidesPerView: 2,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });

  }

  sendDataToParent(data){
    this.props.getObjectiveDetails(data)
  }

  updateObjectiveFormArray(objectiveFormArray) {
    this.setState({
      objectiveFormArray,
    }, () => {
      this.sendDataToParent(this.state.objectiveFormArray)
    });
  }

  removeObjectiveForm(index) {
    const objectiveFormArray = [...this.state.objectiveFormArray];
    objectiveFormArray.splice(index, 1);
    this.updateObjectiveFormArray(objectiveFormArray);
  }

  addObjectiveForm() {
    const objectiveFormArray = [...this.state.objectiveFormArray, { description: '', status: false }];
    this.updateObjectiveFormArray(objectiveFormArray);
  }

  changeForm(index, prop, value) {
    const objectiveFormArray = [...this.state.objectiveFormArray];
    objectiveFormArray[index][prop] = value;
    this.updateObjectiveFormArray(objectiveFormArray);
  }

  renderObjectiveFormArray() {
    return this.state.objectiveFormArray.map((objectiveForm, index) => {
      const { description, status } = objectiveForm;
      return (
        <div key={index} className="col-lx-6 col-sm-6 col-md-6 nopadding-left">
          <div className="panel panel-default">
            <div className="panel-heading">Objective
              <div className="pull-right block_action">
                {index === 0 ? <img onClick={this.addObjectiveForm} src="/images/add.png" /> : <img onClick={() => this.removeObjectiveForm(index)} src="/images/remove.png"/>}
              </div>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <textarea value={description} onChange={({ target: { value } }) => this.changeForm(index, 'description', value)} placeholder="Enter Text here..." className="form-control float-label"></textarea>
              </div>
              <br className="brclear"/>
              <div className="form-group switch_wrap inline_switch">
                <label className="">Status</label>
                <label className={`switch ${status ? 'on' : ''}`}>
                  <input checked={status} onClick={() => this.changeForm(index, 'status', !status)} type="checkbox"/>
                  <div className="slider"></div>
                </label>
              </div>
              <br className="brclear"/>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="col-md-12 nopadding">
        {this.renderObjectiveFormArray()}
      </div>
    )
  }
};
