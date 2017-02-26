import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {createCommunityActionHandler} from '../actions/createCommunityFormAction'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../commons/components/select/MoolyaSelect'

class MlAddCommunityFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      clusters: [{id:''}],
      chapters:[{id:''}],
    }
    this.addEventHandler.bind(this);
    this.createCluster.bind(this)
    return this;
  }

  componentDidMount() {
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
        $(this).val(true)
      } else {
        $(this).parent('.switch').removeClass('on');
        $(this).val(false)
      }
    });
  }

  async addEventHandler() {
    this.createCluster()
  }

  async handleSuccess(response) {
    FlowRouter.go("/admin/dashboard");
  };

  async  createCluster() {
    let communityDetails = {
      communityName: this.refs.communityName.value,
      communityDisplayName: this.refs.displayName.value,
      clusters    : this.state.clusters,
      chapters    : this.state.chapters,
      communityDescription: this.refs.about.value,
      communityDefId: this.props.params, // Community Def Id from router
      showOnMap: this.refs.showOnMap.checked,
      isActive: this.refs.status.checked
    }

    console.log(communityDetails)
    const response = await createCommunityActionHandler(communityDetails)
  }
  optionsBySelectClusters(val){
    let clusters=this.state.clusters
    clusters[0]['id']=val;
    this.setState({clusters:clusters})
  }

  optionsBySelectChapters(val){
    let chapters=this.state.chapters
    chapters[0]['id']=val;
    this.setState({chapters:chapters})
  }

  render() {
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.addEventHandler.bind(this), this.handleSuccess.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    let clusterquery=gql` query{data:fetchClustersForMap{label:displayName,value:_id}}`;
    let chapterquery=gql`query($id:String){  
        data:fetchChapters(id:$id) {
          value:_id
          label:chapterName
        }  
      }`;
    let chapterOption={options: { variables: {id:this.state.clusters[0].id}}};

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Add community details</h2>
          <div className="col-md-6">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="communityName" placeholder="Community Name"
                         className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label"
                         id=""/>

                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}  placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters[0].id} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'}  onSelect={this.optionsBySelectClusters.bind(this)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={true}  placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters[0].id} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)} />
                </div>

              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form_bg">
              <div className="form-group ">
                <div className="fileUpload mlUpload_btn">
                  <span>Upload Icon</span>
                  <input type="file" className="upload" ref="upload"/>
                </div>
              </div>
              <br className="brclear"/>
              <br className="brclear"/>
              <div className="form-group switch_wrap">
                <label>Show on map</label><br/>
                <label className="switch">
                  <input type="checkbox" ref="showOnMap"/>
                  <div className="slider"></div>
                </label>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <textarea placeholder="About" ref="about" className="form-control float-label" id="cl_about"></textarea>
              </div>
              <div className="form-group switch_wrap">
                <label>Status</label><br/>
                <label className="switch">
                  <input type="checkbox" ref="status"/>
                  <div className="slider"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
      </div>
    )
  }
}
;

export default MlAddChapter = formHandler()(MlAddCommunityFormComponent);
