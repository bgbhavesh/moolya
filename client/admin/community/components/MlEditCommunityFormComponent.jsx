import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {updateCommunityActionHandler} from '../actions/updateCommunityFormAction'
import {findCommunityDefActionHandler} from '../actions/findCommunityDefAction'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../commons/components/select/MoolyaSelect'
import {multipartFormHandler} from '../../../commons/MlMultipartFormAction'

class MlEditCommunityFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
      loading: true, data: {},
      clusters: [],
      chapters: [],
      subchapters: [],
    }
    this.findComDef.bind(this);
    this.addEventHandler.bind(this);
    this.updateCommunityAccess.bind(this)
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

  componentWillMount() {
    const resp = this.findComDef();
    return resp;
  }

  componentDidUpdate() {
    $(function () {
      $('.float-label').jvFloat();
    });

    $('input[type=checkbox]').each(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });

    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }

  async addEventHandler() {
    const resp = await this.updateCommunityAccess();
    return resp;
  }

  async handleSuccess(response) {
    FlowRouter.go("/admin/community");
  };

  async findComDef() {
    let Id = this.props.params;
    const response = await findCommunityDefActionHandler(Id);

    if (response) {
      this.setState({loading: false, data: response});

      // if (this.state.data.aboutCommunity) {
      //   this.setState({"data":{"aboutCommunity":this.state.data.aboutCommunity}});
      // }
      //
      // if (this.state.data.showOnMap) {
      //   this.setState({"data":{"showOnMap":this.state.data.showOnMap}});
      // }
      //
      // if (this.state.data.showOnMap) {
      //   this.setState({"data":{"showOnMap":this.state.data.showOnMap}});
      // }

      if (this.state.data.clusters) {
        this.setState({clusters: this.state.data.clusters});
      }
      if (this.state.data.chapters) {
        this.setState({chapters: this.state.data.chapters});
      }
      if (this.state.data.subchapters) {
        this.setState({subchapters: this.state.data.subchapters});
      }
    }
  }

  async  updateCommunityAccess() {
    let communityDetails = {
      displayName: this.refs.displayName.value,
      aboutCommunity: this.refs.about.value,
      showOnMap: this.refs.showOnMap.checked,
      isActive: this.refs.status.checked
    }
    let data = {
      moduleName: "COMMUNITY",
      actionName: "UPDATE",
      community: communityDetails,
      communityId: this.props.params,
      clusters: this.state.clusters,
      chapters: this.state.chapters,
      subchapters: this.state.subchapters
    }
    let response;
    if(data.subchapters.length<1){
      toastr.error('Please select Sub-Chapter');
      response = false;
    }else{
      response = await multipartFormHandler(data, null);
    }
    this.setState({loading: false});
    return response;
  }

  optionsBySelectClusters(val) {
    let clusters = this.state.clusters
    clusters = val;
    this.setState({clusters: clusters})
  }

  optionsBySelectChapters(val) {
    let chapters = this.state.chapters
    chapters = val;
    this.setState({chapters: chapters})
  }

  optionsBySelectSubChapters(val) {
    let subchapters = this.state.subchapters
    subchapters = val;
    this.setState({subchapters: subchapters})
  }

  onStatusChange(e) {
    const data = this.state.data;
    if (e.currentTarget.checked) {
      this.setState({"data": {"isActive": true}});
    } else {
      this.setState({"data": {"isActive": false}});
    }
  }

  render() {
    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateCommunityAccess.bind(this), this.handleSuccess.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: null
      }
    ]

    let clusterquery = gql` query{data:fetchClustersForMap{label:displayName,value:_id}}`;
    let chapterquery = gql`query($clusters:[String]){  
        data:fetchActiveClusterChapters(clusters:$clusters) {
          value:_id
          label:chapterName
        }  
    }`;
    let subChapterquery = gql`query($chapters:[String],$clusters:[String]){  
        data:fetchActiveChaptersSubChapters(chapters:$chapters,clusters:$clusters) {
          value:_id
          label:subChapterName
        }  
    }`;
    let chapterOption = {options: {variables: {clusters: this.state.clusters}}};

    let subChapterOption = this.state.chapters.length>0&&this.state.clusters.length>0?{options: {variables: {chapters: this.state.chapters,clusters: this.state.clusters}}}:{options: {variables: {chapters: [],clusters: []}}};
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (

          <div className="admin_padding_wrap">
            <h2>Edit Community Details</h2>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" ref="communityName" defaultValue={this.state.data && this.state.data.name}
                           readOnly="true" placeholder="Community Name"
                           className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="displayName" defaultValue={this.state.data && this.state.data.displayName}
                           placeholder="Display Name" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect multiSelect={true} placeholder={"Cluster"} className="form-control float-label"
                                  valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters}
                                  queryType={"graphql"} query={clusterquery} isDynamic={true} id={'clusterquery'}
                                  onSelect={this.optionsBySelectClusters.bind(this)}/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect multiSelect={true} placeholder={"Chapter"} className="form-control float-label"
                                  valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters}
                                  queryType={"graphql"} query={chapterquery} queryOptions={chapterOption}
                                  isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)}/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect multiSelect={true} placeholder={"Sub Chapter"} className="form-control float-label"
                                  valueKey={'value'} labelKey={'label'} selectedValue={this.state.subchapters}
                                  queryType={"graphql"} query={subChapterquery} queryOptions={subChapterOption}
                                  isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)}/>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <textarea placeholder="About" ref="about"
                              defaultValue={this.state.data && this.state.data.aboutCommunity}
                              className="form-control float-label" id="cl_about"></textarea>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Show on map</label>
                    <label className="switch">
                      <input type="checkbox" ref="showOnMap"
                             defaultValue={this.state.data && this.state.data.showOnMap}/>
                      <div className="slider"></div>
                    </label>
                  </div>
                  <br className="brclear"/>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="status" checked={this.state.data && this.state.data.isActive}
                             onChange={this.onStatusChange.bind(this)}/>
                      <div className="slider"></div>
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
          </div>)}
      </div>
    )
  }
}
;

export default MlEditCommunityFormComponent = formHandler()(MlEditCommunityFormComponent);
