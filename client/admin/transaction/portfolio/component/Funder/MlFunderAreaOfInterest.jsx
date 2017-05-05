import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var options = [
  {value: 'Select Industry', label: 'Select Industry'},
  {value: '2', label: '2'}
];
var options2 = [
  {value: 'Select Domain', label: 'Select Domain'},
  {value: '2', label: '2'}
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlFunderAreaOfInterest extends React.Component {
  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });

    $("#create_client").popover({
      'title': 'Add Investments',
      'html': true,
      'placement': 'right',
      'container': '.admin_main_wrap',
      'content': $(".ml_create_client").html()
    });

  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap portfolio-main-wrap">
          <h2>Area of Intrests</h2>
          <div className="requested_input main_wrap_scroll">

            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="#" id="create_client" data-placement="top" data-class="large_popover">
                      <div className="list_block list_block_intrests notrans">
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3>Add New Investor</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderAreaIntrestsDetails">
                      <div className="list_block list_block_intrests notrans">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div className="hex_outer"><img src="/images/education.png"/></div>
                        <h3>Education</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderAreaIntrestsDetails">
                      <div className="list_block list_block_intrests notrans">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div className="hex_outer"><img src="/images/health.png"/></div>
                        <h3>Health</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderAreaIntrestsDetails">
                      <div className="list_block list_block_intrests notrans">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div className="hex_outer"><img src="/images/mobility.png"/></div>
                        <h3>Mobility</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderAreaIntrestsDetails">
                      <div className="list_block list_block_intrests notrans">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div className="hex_outer"><img src="/images/ecommerce.png"/></div>
                        <h3>Ecommerce</h3>
                      </div>
                    </a>
                  </div>

                </div>
              </div>

            </ScrollArea>


            <div style={{'display': 'none'}} className="ml_create_client">
              <div className="medium-popover">
                <div className="row">
                  <div className="col-md-12">

                    <div className="form-group">
                      <Select
                        name="form-field-name"
                        options={options}
                        value='Select Industry'
                        onChange={logChange}
                      />
                    </div>

                    <div className="form-group">
                      <Select
                        name="form-field-name"
                        options={options2}
                        value='Select Domain'
                        onChange={logChange}
                      />
                    </div>

                    <div className="ml_btn" style={{'textAlign': 'center'}}>
                      <a href="#" className="save_btn">Save</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          {/*<span className="actions_switch show_act"></span>*/}
          {/*<div className="bottom_actions_block show_block">*/}
          {/*<div className="hex_btn"><a data-toggle="tooltip" title="Edit" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-edit"></span></a></div>*/}
          {/*<div className="hex_btn"><a data-toggle="tooltip" title="Make Public" data-placement="top" href="#" className="hex_btn hex_btn_in"> <FontAwesome name='bullhorn'/></a></div>*/}
          {/*<div className="hex_btn"><a data-toggle="tooltip" title="Timeline" data-placement="top" href="#" className="hex_btn hex_btn_in"> <FontAwesome name='list-ul'/></a></div>*/}
          {/*<div className="hex_btn"><a data-toggle="tooltip" title="Cancel" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-delete"></span></a></div>*/}
          {/*<div className="hex_btn"><a data-toggle="tooltip" title="Save" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-save"></span></a></div>*/}
          {/*<div className="hex_btn"><a data-toggle="tooltip" title="Assign" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-assign"></span></a></div>*/}
          {/*<div className="hex_btn"><a data-toggle="tooltip" title="Annotate" data-placement="top" href="#" className="hex_btn hex_btn_in"> <span className="ml ml-annotate"></span></a></div>*/}
          {/*<div className="hex_btn"><a data-toggle="tooltip" title="Go Live" data-placement="top" href="#" className="hex_btn hex_btn_in"> <FontAwesome name='rocket'/></a></div>*/}
          {/*</div>*/}
        </div>


      </div>
    )
  }
};
