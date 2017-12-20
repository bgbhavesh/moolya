import React, {Component} from "react";
var FontAwesome = require('react-fontawesome');
import generateAbsolutePath from '../../../../../../../../../lib/mlGenerateAbsolutePath'

export default class BeSpokeAttachment extends Component {
    constructor(props){
        super(props);
    }

componentDidMount(){
    $(".information").unbind("click").click(function () {
        if ($(this).hasClass('ml-information')) {
          $(this).removeClass('ml-information').addClass('ml-delete');
          $(this).parents('.panel').find('.panel-body').css({ 'overflow': 'hidden' });
  
        } else {
          $(this).removeClass('ml-delete').addClass('ml-information');
          $(this).parents('.panel').find('.panel-body').css({ 'overflow': 'auto' });
        }
        $(this).parents('.panel').find(".show-information").toggle(200);
      });
      setTimeout(function(){
        var mySwiper = new Swiper('.manage_tasks', {
          slidesPerView: 'auto',
          speed: 400,
          spaceBetween: 5
      });
    },300);
}


    render() {
        return(
            <div className="col-lg-21 col-md-21 col-sm-21 library-wrap nopadding-left hide_panel">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
              Attachments if any ?
                <span className="see-more pull-right" onClick={this.props.toggleSeeMore}>See Less</span>
                {/*<span className="see-less pull-right" style={{'display':'none'}}><a href="">See Less</a></span>*/}
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask pull-right" id="create_client">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload">
                        <input type="file" className="upload_file upload"
                            name="video_source" id="video_upload"
                            onChange={e=>this.props.fileUpload(e)} 
                            />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information information"></span>
                </div>
              </div>
              <div className="panel-body" style={{"height": "-webkit-fill-available"}} onContextMenu={(e) => e.preventDefault()}>
              <p className="show-information" style={{ 'display': 'none' }}>Document Format : .png, .jpg, .jpeg , .doc, .docx, .xls, .xlsx, .pdf<br/>Document Size : 10 MB <br/></p>
                <div className="swiper-container manage_tasks">
                  <div className="manage_swiper swiper-wrapper">
                  {this.props.attach.map(function(details, index){return(
                   <div className="upload-image">
                      <img src={generateAbsolutePath(details.fileUrl)} id="output"/>
                  </div> )})}        
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }
}