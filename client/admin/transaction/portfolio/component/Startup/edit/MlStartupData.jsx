import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');


export default class MlStartupData extends React.Component{
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });


  }
  render(){
    return (
      <div>
        <div className="admin_padding_wrap portfolio-main-wrap">
          <h2>Data</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-md-6 col-sm-6 nopadding-left">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Balance Sheet <span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                  <div className="panel-body panel-body-scroll">



                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-md-6 col-sm-6 nopadding-left">
                  <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Quarterly Report<span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                    <div className="panel-body text-center panel-body-scroll">
                      <ScrollArea
                        speed={0.8}
                        className="panel-body-scroll"
                        smoothScrolling={true}
                        default={true}
                      >
                      </ScrollArea>
                    </div>
                  </div></div>
                  <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Yearly Report<span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                    <div className="panel-body panel-body-scroll">
                      <ScrollArea
                        speed={0.8}
                        className="panel-body-scroll"
                        smoothScrolling={true}
                        default={true}
                      >

                      </ScrollArea>
                    </div>
                  </div></div>
                </div>
                <div className="col-md-6 col-sm-6 nopadding-right">
                  <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Halfyearly Report<span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                    <div className="panel-body text-center panel-body-scroll">
                      <ScrollArea
                        speed={0.8}
                        className="panel-body-scroll"
                        smoothScrolling={true}
                        default={true}
                      >

                      </ScrollArea>
                    </div>
                  </div></div>
                  <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Anual Report<span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                    <div className="panel-body panel-body-scroll">
                      <ScrollArea
                        speed={0.8}
                        className="panel-body-scroll"
                        smoothScrolling={true}
                        default={true}
                      >

                      </ScrollArea>
                    </div>
                  </div></div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 nopadding-right">

                <div className="col-md-6 col-sm-6 nopadding-left">
                  <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Profit & Loss<span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                    <div className="panel-body text-center panel-body-scroll">
                      <ScrollArea
                        speed={0.8}
                        className="panel-body-scroll"
                        smoothScrolling={true}
                        default={true}
                      >
                      </ScrollArea>
                    </div>
                  </div></div>

                </div>
                <div className="col-md-6 col-sm-6 nopadding-right">
                  <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Cash Flow<span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                    <div className="panel-body text-center panel-body-scroll">
                      <ScrollArea
                        speed={0.8}
                        className="panel-body-scroll"
                        smoothScrolling={true}
                        default={true}
                      >

                      </ScrollArea>
                    </div>
                  </div></div>

                </div>
                <div className="clearfix"></div>
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Capital Structure<span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                  <div className="panel-body panel-body-scroll">



                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-md-6 col-sm-6 nopadding-left">
                  <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Ratio<span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                    <div className="panel-body text-center panel-body-scroll">
                      <ScrollArea
                        speed={0.8}
                        className="panel-body-scroll"
                        smoothScrolling={true}
                        default={true}
                      >
                      </ScrollArea>
                    </div>
                  </div></div>

                </div>
                <div className="col-md-6 col-sm-6 nopadding-right">
                  <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
                    <div className="panel-heading">Share Holdings<span className="triangle-topright"><FontAwesome name='minus'/></span></div>
                    <div className="panel-body text-center panel-body-scroll">
                      <ScrollArea
                        speed={0.8}
                        className="panel-body-scroll"
                        smoothScrolling={true}
                        default={true}
                      >

                      </ScrollArea>
                    </div>
                  </div></div>

                </div>
              </div>
            </ScrollArea>
          </div>
        </div>


      </div>
    )
  }
};
