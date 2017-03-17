import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'

export default class Step5 extends React.Component{
  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));

    $('.uploaded_files .upload_file').change(function(){
      var FileName = $(this).val().replace(/C:\\fakepath\\/i, '');
      $(this).parents('.uploaded_files').find(".panel-body ul").prepend('<li class="doc_card" data-toggle="tooltip" data-placement="bottom" title="'+FileName+'"><span class="ml ml-minus"></span><img id="preview_file" /></li>');
      $(this).parents('.uploaded_files').find("#preview_file").attr("src", URL.createObjectURL(this.files[0]));
      $('[data-toggle="tooltip"]').tooltip({container:'body'});
    });
  }
  render(){
    return (
      <div className="step_form_wrap step5">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <h3>Self KYC</h3>

          <div className="col-lg-4 nopadding-left">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Passport</label></div>
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask">
                    <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                      <input type="file" className="upload_file upload" name="file_source" /></a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information"></span>
                </div>
              </div>
              <div className="panel-body uploaded_files_swiper">
                <ul className="swiper-wrapper">
                  <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
                </ul>
              </div>
              <div className="panel-body">
                asdffdf
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Passport</label></div>
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask">
                    <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                      <input type="file" className="upload_file upload" name="file_source" /></a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information"></span>
                </div>
              </div>
              <div className="panel-body uploaded_files_swiper">

                <ul className="swiper-wrapper">
                  <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 nopadding-right">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Passport</label></div>
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask">
                    <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                      <input type="file" className="upload_file upload" name="file_source" /></a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information"></span>
                </div>
              </div>
              <div className="panel-body uploaded_files_swiper">

                <ul className="swiper-wrapper">
                  <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
                </ul>
              </div>
            </div>
          </div>
          <h3>Self KYC</h3>
          <div className="col-lg-4 nopadding-left">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Passport</label></div>
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask">
                    <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                      <input type="file" className="upload_file upload" name="file_source" /></a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information"></span>
                </div>
              </div>
              <div className="panel-body uploaded_files_swiper">

                <ul className="swiper-wrapper">
                  <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 nopadding">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Passport</label></div>
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask">
                    <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                      <input type="file" className="upload_file upload" name="file_source" /></a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information"></span>
                </div>
              </div>
              <div className="panel-body uploaded_files_swiper">

                <ul className="swiper-wrapper">
                  <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 nopadding-right">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Passport</label></div>
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask">
                    <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                      <input type="file" className="upload_file upload" name="file_source" /></a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information"></span>
                </div>
              </div>
              <div className="panel-body uploaded_files_swiper">

                <ul className="swiper-wrapper">
                  <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
