import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var options = [
  {value: 'Type of Funding', label: 'Type of Funding'},
  {value: '2', label: '2'}
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlFunderInvestment extends React.Component {
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
          <h2>Investments</h2>
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
                      <div className="list_block notrans">
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3>Add New Investor</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderInvestmentDetails">
                      <div className="list_block notrans funding_list">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div><p>DoneThing</p><p className="fund">$300k</p><p>Seed</p></div>
                        <h3>March, 2017</h3>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderInvestmentDetails">
                      <div className="list_block notrans funding_list">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div><p>NeoStencil</p><p className="fund">$1M</p><p>Venture</p></div>
                        <h3>February, 2017</h3>
                      </div>
                    </a>
                  </div>

                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderInvestmentDetails">
                      <div className="list_block notrans funding_list">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div><p>1World Online</p><p className="fund">$4.9M</p><p>Series B</p></div>
                        <h3>December, 2016</h3>
                      </div>
                    </a>
                  </div>

                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderInvestmentDetails">
                      <div className="list_block notrans funding_list">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div><p>Postmates</p><p className="fund">$750,000</p><p>Seed</p></div>
                        <h3>January, 2017</h3>
                      </div>
                    </a>
                  </div>

                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderInvestmentDetails">
                      <div className="list_block notrans funding_list">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div><p>A Thinking Ape</p><p className="fund">$150,000</p><p>Series A</p></div>
                        <h3>December, 2016</h3>
                      </div>
                    </a>
                  </div>

                  <div className="col-lg-2 col-md-4 col-sm-4">
                    <a href="/admin/funderInvestmentDetails">
                      <div className="list_block notrans funding_list">
                        <FontAwesome name='lock'/>
                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                        <div><p>Change.org</p><p className="fund">$ 50,000</p><p>Series B</p></div>
                        <h3>August, 2016</h3>
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
                      <input type="text" placeholder="Enter Date of Investment" className="form-control float-label"
                             id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Company Name" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Investment Amount" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <Select
                        name="form-field-name"
                        options={options}
                        value='Type of Funding'
                        onChange={logChange}
                      />
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="About" className="form-control float-label" id=""/>
                      <FontAwesome name='unlock' className="input_icon"/>
                    </div>
                    <div className="form-group">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox"
                                                          value="1"/><label htmlFor="checkbox1"><span></span>Make
                        Default</label></div>
                    </div>
                    <div className="ml_btn" style={{'textAlign': 'center'}}>
                      <a href="#" className="save_btn">Save</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <span className="actions_switch show_act"></span>
          <div className="bottom_actions_block show_block">
            <div className="hex_btn"><a data-toggle="tooltip" title="Edit" data-placement="top" href="#"
                                        className="hex_btn hex_btn_in"> <span className="ml ml-edit"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Make Public" data-placement="top" href="#"
                                        className="hex_btn hex_btn_in"> <FontAwesome name='bullhorn'/></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Timeline" data-placement="top" href="#"
                                        className="hex_btn hex_btn_in"> <FontAwesome name='list-ul'/></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Cancel" data-placement="top" href="#"
                                        className="hex_btn hex_btn_in"> <span className="ml ml-delete"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Save" data-placement="top" href="#"
                                        className="hex_btn hex_btn_in"> <span className="ml ml-save"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Assign" data-placement="top" href="#"
                                        className="hex_btn hex_btn_in"> <span className="ml ml-assign"></span></a></div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Annotate" data-placement="top" href="#"
                                        className="hex_btn hex_btn_in"> <span className="ml ml-annotate"></span></a>
            </div>
            <div className="hex_btn"><a data-toggle="tooltip" title="Go Live" data-placement="top" href="#"
                                        className="hex_btn hex_btn_in"> <FontAwesome name='rocket'/></a></div>
          </div>
        </div>


      </div>
    )
  }
};
