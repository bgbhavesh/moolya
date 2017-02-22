import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {graphql} from 'react-apollo';
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
export default class MlAssignModulesToRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      assignModulesToRoles: [{moduleId: '',moduleName: '',validFrom: '',validTo: '',isActive: '', actions: []}]
    }
    this.addDepartmentComponent.bind(this);
    return this;
  }

  assignModuleToRoles(id) {
    this.setState({
      assignModulesToRoles: this.state.assignModulesToRoles.concat([{moduleId: '',moduleName: '',validFrom: '',validTo: '',isActive: '', actions: []}])
    });
  }

  RemoveModuleToRoles(id, event) {
    let assignModulesToRoles;
    assignModulesToRoles = this.state.assignModulesToRoles.filter(function (object, index) {
      return id !== index;
    });
    this.setState({
      assignModulesToRoles: assignModulesToRoles
    })
  }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }


  componentWillMount() {
    let assignModulesToRolesDetails=this.props.assignModulesToRolesData
    if(assignModulesToRolesDetails){
      let assignModulesToRolesForm=[]
      for(let i=0;i<assignModulesToRolesDetails.length;i++){
        let json={
          moduleId:assignModulesToRolesDetails[i].moduleId,
          moduleName:assignModulesToRolesDetails[i].moduleName,
          validFrom:assignModulesToRolesDetails[i].validFrom,
          validTo:assignModulesToRolesDetails[i].validTo,
          isActive:assignModulesToRolesDetails[i].isActive,
          actions:assignModulesToRolesDetails[i].actions[0]
        }
        assignModulesToRolesForm.push(json)
      }
      this.setState({assignModulesToRoles:assignModulesToRolesForm})
    }
  }

  optionsBySelectModule(index, selectedIndex) {
    let assignModulesToRoles = this.state.assignModulesToRoles
    assignModulesToRoles[index]['moduleId'] = selectedIndex
    this.setState({assignModulesToRoles: assignModulesToRoles})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }

  optionsBySelectAction(index, event) {
    let assignModulesToRoles = this.state.assignModulesToRoles
    let actions = this.state.assignModulesToRoles[index].actions

    if (event.target.checked) {
      let value = event.target.name
      actions.push({actionId: value})
    }else {
      let flag='';
      _.each(actions,function (item,key) {
        if (item.actionId==event.target.name){
          flag=key;
        }
      })
      actions.splice(flag,1);
    }
    assignModulesToRoles[index].actions = actions
    this.setState({assignModulesToRoles: assignModulesToRoles})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }

  addDepartmentComponent(event) {
    var mySwiper = new Swiper('.blocks_in_form', {
      // speed: 400,
      pagination: '.swiper-pagination',
      spaceBetween: 0,
      slidesPerView: 'auto',
      freeMode: true,
      paginationClickable: false
    });
    mySwiper.updateContainerSize()
    this.setState({
      assignModulesToRoles: this.state.assignModulesToRoles.concat([{moduleId: '',moduleName: '',validFrom: '',validTo: '',isActive: '', actions: []}])
    });

  }

  onChange(id, event) {
    let filedName = event.target.name
    let fieldValue = event.target.value;
    if (filedName == 'isActive') {
      fieldValue = event.target.checked;
    }
    let departmentDetails = this.state.assignModulesToRoles
    departmentDetails[id][filedName] = fieldValue
    this.setState({assignModulesToRoles: departmentDetails})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }

  onmoduleNameChange(index, event) {
    let assignModulesToRoles = this.state.assignModulesToRoles
    assignModulesToRoles[index]['moduleName'] = event.target.value
    this.setState({assignModulesToRoles: assignModulesToRoles})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }
  onvalidFromChange(index, event) {
    let assignModulesToRoles = this.state.assignModulesToRoles
    assignModulesToRoles[index]['validFrom'] = event.target.value
    this.setState({assignModulesToRoles: assignModulesToRoles})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }
  onvalidToChange(index, event) {
    let assignModulesToRoles = this.state.assignModulesToRoles
    assignModulesToRoles[index]['validTo'] = event.target.value
    this.setState({assignModulesToRoles: assignModulesToRoles})
    this.props.getassignModulesToRoles(this.state.assignModulesToRoles)
  }





  render() {
    let that = this;
    let getModulesquery = gql` query{data:fetchModules{label:name,value:_id}}`;

    return (
      <div>
        <div className="form-group"><a onClick={that.assignModuleToRoles.bind(this)} className="mlUpload_btn">Add</a>
        </div>
        {that.state.assignModulesToRoles.map(function (options, id) {

          return (
            <div className="form_bg" key={id}>
              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                  default={true}
                >
                  <form style={{marginTop: '0px'}}>

                    <div className="panel panel-default">
                      <div className="panel-heading">Add Module
                        <div className="pull-right block_action" onClick={that.RemoveModuleToRoles.bind(that, id)}><img
                          src="/images/remove.png"/></div>
                      </div>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                            labelKey={'label'} selectedValue={options.moduleId} queryType={"graphql"}
                                            query={getModulesquery} isDynamic={true} id={'moduleId' + id}
                                            onSelect={that.optionsBySelectModule.bind(that, id)}/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input type="text" placeholder="Display Name"
                                     className="form-control float-label" defaultValue={options.moduleName} onBlur={that.onmoduleNameChange.bind(that,id)}/>
                            </div>
                          </div>
                          <div className="col-md-12 role_dif">
                            <div className="form-group">
                              Actions
                            </div>
                            <div className="form-group">
                              <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="CREATE"
                                                                  onChange={that.optionsBySelectAction.bind(that, id)}/><label
                                htmlFor="chapter_admin_check"><span></span>Create</label></div>
                              <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="READ"
                                                                  onChange={that.optionsBySelectAction.bind(that, id)}/><label
                                htmlFor="chapter_admin_check"><span></span>Read</label></div>
                              <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="UPDATE"
                                                                  onChange={that.optionsBySelectAction.bind(that, id)}/><label
                                htmlFor="chapter_admin_check"><span></span>Update</label></div>
                              <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="DELETE"
                                                                  onChange={that.optionsBySelectAction.bind(that, id)}/><label
                                htmlFor="chapter_admin_check"><span></span>Delete</label></div>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <input type="text" placeholder="Active From" className="form-control float-label" defaultValue={options.validFrom} onBlur={that.onvalidFromChange.bind(that,id)}/>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <input type="text" placeholder="Active till" className="form-control float-label" ref="validTo" defaultValue={options.validTo} onBlur={that.onvalidToChange.bind(that,id)}/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group switch_wrap inline_switch" style={{marginTop: '7px'}}>
                              <label className="">Overall Status</label>
                              <label className="switch">
                                <input type="checkbox" value={options.isActive} onChange={that.onChange.bind(that,id)}/>
                                <div className="slider"></div>
                              </label>
                            </div>
                          </div>
                          <hr/>

                        </div>
                      </div>
                    </div>
                  </form>
                </ScrollArea>
              </div>
            </div>
          )
        })}
      </div>

    )
  }
};

