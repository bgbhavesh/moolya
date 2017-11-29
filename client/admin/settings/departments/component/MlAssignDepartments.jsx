import React from 'react';
import { render } from 'react-dom';
import Moolyaselect from '../../../commons/components/MlAdminSelectWrapper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
export default class MlAssignDepartments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      departmentAvailability: [{
        cluster: [], chapter: '', subChapter: '', email: '', isActive: false
      }]
    }
    return this;
  }
  AssignDepartmentAvailability(id) {
    this.setState({
      departmentAvailability: this.state.departmentAvailability.concat([{
        cluster: [], chapter: '', subChapter: '', email: '', isActive: false
      }])
    }, function () {
      setTimeout(() => {
        this.context.scrollArea.refresh();
        this.context.scrollArea.scrollBottom();
      });
    });
  }

  RemoveAssignDepartmentAvailability(id, event) {
    let departmentAvailability;
    departmentAvailability = this.state.departmentAvailability.filter((object, index) => id !== index);
    this.setState({
      departmentAvailability
    })
    this.props.getDepartmentAvailability(departmentAvailability)
  }

  componentDidMount() {
    $(() => {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
    this.props.getDepartmentAvailability(this.state.departmentAvailability)
  }
  componentWillMount() {
    const availabilityDetails = this.props.nonMoolya
    if (availabilityDetails) {
      const availabilityDetailsForm = []
      for (let i = 0; i < availabilityDetails.length; i++) {
        const json = {
          cluster: availabilityDetails[i].cluster[0],
          chapter: availabilityDetails[i].chapter,
          subChapter: availabilityDetails[i].subChapter,
          email: availabilityDetails[i].email,
          isActive: availabilityDetails[i].isActive

        }
        availabilityDetailsForm.push(json)
      }
      this.setState({ departmentAvailability: availabilityDetailsForm })
    }
  }
  optionsBySelectCluster(index, selectedIndex) {
    const availabilityDetails = this.state.departmentAvailability
    availabilityDetails[index].cluster = selectedIndex
    // availabilityDetails[index]['cluster'].clusterName = selectedIndex
    this.setState({ departmentAvailability: availabilityDetails })
    this.props.getDepartmentAvailability(this.state.departmentAvailability)
  }

  optionsBySelectChapter(index, selectedIndex) {
    const availabilityDetails = this.state.departmentAvailability
    availabilityDetails[index].chapter = selectedIndex
    this.setState({ departmentAvailability: availabilityDetails })
    this.props.getDepartmentAvailability(this.state.departmentAvailability)
  }
  optionsBySelectSubChapter(index, selectedIndex) {
    const availabilityDetails = this.state.departmentAvailability
    availabilityDetails[index].subChapter = selectedIndex
    this.setState({ departmentAvailability: availabilityDetails })
    this.props.getDepartmentAvailability(this.state.departmentAvailability)
  }
  onEmailChange(index, event) {
    const availabilityDetails = this.state.departmentAvailability
    availabilityDetails[index].email = event.target.value;
    this.setState({ departmentAvailability: availabilityDetails })
    this.props.getDepartmentAvailability(this.state.departmentAvailability)
  }
  onChange(id, event) {
    const filedName = event.target.name
    let fieldValue = event.target.value;
    if (filedName == 'isActive') {
      fieldValue = event.target.checked;
    }
    const departmentDetails = this.state.departmentAvailability

    departmentDetails[id][filedName] = fieldValue
    this.setState({ departmentAvailability: departmentDetails })
    this.props.getDepartmentAvailability(this.state.departmentAvailability)
  }


  render() {
    const that = this;
    const clusterQuery = gql` query{
  data:fetchActiveClusters{label:countryName,value:_id}
}
`;
    const chapterQuery = gql`query($id:String){  
  data:fetchChapters(id:$id) {
    value:_id
    label:chapterName
  }  
}`;
    const subChapterquery = gql`query($chapterId:String,$clusterId:String){  
        data:fetchSubChaptersSelectNonMoolya(chapterId:$chapterId,clusterId:$clusterId) {
          value:_id
          label:subChapterName
        }  
      }`;
    return (

      <div>
        {that.state.departmentAvailability.map((options, id) => {
          if (options.cluster && options.cluster.length < 1) {
            options.cluster = null;
          }
          const chapterOption = { options: { variables: { id: options.cluster } } };
          const subChapterOption = { options: { variables: { chapterId: options.chapter, clusterId: options.cluster } } };
          return (
            <div className="panel panel-default" key={id}>
              <div className="panel-heading">Assign Department{id == 0 ? (
                <div className="pull-right block_action" onClick={that.AssignDepartmentAvailability.bind(that, id)}><img
                  src="/images/add.png"/></div>) : (<div
                className="pull-right block_action"
                onClick={that.RemoveAssignDepartmentAvailability.bind(that, id)}>
                <img src="/images/remove.png"/></div>)}</div>
              <div className="panel-body">
                <div className="form-group" disabled="true">
                  <Moolyaselect
                    multiSelect={false} placeholder="Select Cluster" className="form-control float-label"
                    valueKey={'value'} labelKey={'label'} selectedValue={options.cluster}
                    queryType={'graphql'} query={clusterQuery} isDynamic={true} id={`country${id}`}
                    onSelect={that.optionsBySelectCluster.bind(that, id)}/>
                </div>
                <div className="form-group" disabled="true">
                  <div className="form-group">
                    <Moolyaselect
                      multiSelect={false} placeholder="Select Chapter" className="form-control float-label"
                      valueKey={'value'} labelKey={'label'} selectedValue={options.chapter}
                      queryType={'graphql'} query={chapterQuery} reExecuteQuery={true}
                      queryOptions={chapterOption} isDynamic={true} id={`chapter${id}`}
                      onSelect={that.optionsBySelectChapter.bind(that, id)}/>
                  </div>
                </div>
                <div className="form-group">
                  <Moolyaselect
                    multiSelect={false} className="form-control float-label"
                    placeholder="Select Sub-Chapter" valueKey={'value'} labelKey={'label'}
                    selectedValue={options.subChapter} queryType={'graphql'} query={subChapterquery}
                    reExecuteQuery={true} queryOptions={subChapterOption} isDynamic={true}
                    id={`subChapter${id}`} onSelect={that.optionsBySelectSubChapter.bind(that, id)}/>
                </div>
                <div className="form-group">
                  <input
                    placeholder="Department Email Id" className="form-control float-label"
                    defaultValue={options.email} onBlur={that.onEmailChange.bind(that, id)}/>
                </div>
                <div className="form-group switch_wrap inline_switch">
                  <label>Status</label>
                  <label className="switch">
                    <input
                      type="checkbox" name={'isActive'} checked={options.isActive}
                      onChange={that.onChange.bind(that, id)}/>
                    <div className="slider"></div>
                  </label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

MlAssignDepartments.contextTypes = {
  scrollArea: React.PropTypes.object
};
