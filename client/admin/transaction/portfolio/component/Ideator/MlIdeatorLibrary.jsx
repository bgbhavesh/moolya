import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import annotator from '../../../../../../lib/collections/admin/portfolio/common/mlAnnotator'
// import annotatormarginalia from '../../../common/lib/annotator/annotator.marginalia'
// import annotatorImageSelect from '../../../common/lib/annotator/jquery.imgareaselect.min'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



// var aaa = annotatormarginalia;

export default class MlIdeatorLibrary extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal

    });
  }
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


    if (typeof annotator === 'undefined') {
      alert("Oops! it looks like you haven't built Annotator. " +
        "Either download a tagged release from GitHub, or build the " +
        "package by running `make`");
    } else {

      function generate_id() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      // set fake date, id, and author in order to demonstrate footer,
      // since demo operates without an annotate store
      var fakeData = function () {
        return {
          beforeAnnotationCreated: function (ann) {
            ann.updated = new Date();
            ann.user = 'anon';
            ann.id = generate_id();
          }
        };
      };

      //var _marginalia = annotatorMarginalia();
      var app = new annotator.App()
        .include(annotator.ui.main)
        .include(fakeData)



      app.start();

      // simulate empty data load since demo has no annotation store
      // _marginalia.annotationsLoaded([]);

    }

  }
  render(){
    return (
      <div>
        <h2>Library</h2>

        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={'library-popup'}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <img src="/images/video_1.jpg"/>
          </ModalBody>

        </Modal>


        <div className="modal fade bs-example-modal-sm library-popup imagepop" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <div className="img_scroll"><img src="/images/zomato-img-1.jpg"/></div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade bs-example-modal-sm library-popup pdfpop" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <div className="img_scroll"><img src="/images/zomato-bs.png"/></div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade bs-example-modal-sm library-popup videopop" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/TD3tYOcGlfM?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">

          <div className="panel panel-default">
            <div className="panel-heading">
              Documents <span className="see-more pull-right"><a href="">See More</a></span>
            </div>
            <div className="panel-body">
              {/*<div className="thumbnail"><FontAwesome name='unlock'/><a className="view-pdf" href="/images/sample.pdf"><img src="/images/ppt.png"/></a><div className="title">Document</div></div>*/}
              <div className="thumbnail"><FontAwesome name='unlock'/><a data-toggle="modal" data-target=".pdfpop" href="#"><img src="/images/ppt.png"/></a><div className="title">Document</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/doc.png"/><div className="title">Document</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/pdf.png"/><div className="title">Document</div></div>
            </div>
          </div>


        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">

          <div className="panel panel-default">
            <div className="panel-heading">
              Images <span className="see-more pull-right"><a href="">See More</a></span>
            </div>
            <div className="panel-body">
              <div className="thumbnail"><FontAwesome name='unlock'/><a href="#" data-toggle="modal" data-target=".imagepop"><img src="/images/img_1.jpg"/></a><div className="title">Image</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/img_2.jpg"/><div className="title">Image</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/img_3.jpg"/><div className="title">Image</div></div>

            </div>
          </div>


        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">

          <div className="panel panel-default">
            <div className="panel-heading">
              Video's <span className="see-more pull-right"><a href="">See More</a></span>
            </div>
            <div className="panel-body">
              <div className="thumbnail"><FontAwesome name='unlock'/><a href="#" data-toggle="modal" data-target=".videopop"><img src="/images/video_1.jpg"/></a><div className="title">Video</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><a href="#"><img src="/images/video_2.jpg"/></a><div className="title">Video</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/video_3.jpg"/><div className="title">Video</div></div>
            </div>
          </div>


        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">

          <div className="panel panel-default">
            <div className="panel-heading">
              Templates <span className="see-more pull-right"><a href="">See More</a></span>
            </div>
            <div className="panel-body">
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/template_1.jpg"/><div className="title">Template</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/template_2.jpg"/><div className="title">Template</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/template_3.jpg"/><div className="title">Template</div></div>
            </div>
          </div>


        </div>




        {/*<h2>Documents</h2>
         <div className="col-md-12 library-wrap-details">
         <div className="row">
         <div className="col-lg-2 col-md-3 col-sm-3">
         <div className="list_block">
         <div className="cluster_status"><FontAwesome name='lock'/></div>

         <h3>Document</h3>
         </div>
         </div>
         <div className="col-lg-2 col-md-3 col-sm-3">
         <div className="list_block">
         <div className="cluster_status"><FontAwesome name='lock'/></div>

         <h3>Document</h3>
         </div>
         </div>
         <div className="col-lg-2 col-md-3 col-sm-3">
         <div className="list_block">
         <div className="cluster_status"><FontAwesome name='lock'/></div>

         <h3>Document</h3>
         </div>
         </div>
         <div className="col-lg-2 col-md-3 col-sm-3">
         <div className="list_block">
         <div className="cluster_status"><FontAwesome name='lock'/></div>

         <h3>Document</h3>
         </div>
         </div>
         <div className="col-lg-2 col-md-3 col-sm-3">
         <a href="/admin/editCluster">
         <div className="list_block">
         <div className="cluster_status"><FontAwesome name='lock'/></div>

         <h3>Document</h3>
         </div>
         </a>
         </div>
         <div className="col-lg-2 col-md-3 col-sm-3">
         <div className="list_block">
         <div className="cluster_status"><FontAwesome name='lock'/></div>

         <h3>Document</h3>
         </div>

         </div>

         </div>
         </div>*/}
      </div>

    )
  }
};
