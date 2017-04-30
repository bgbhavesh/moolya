import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');

export default class AppIdeatorLibrary extends React.Component{
  componentDidMount(){}
  render(){
    return (
      <div>

        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">

          <div className="panel panel-default">
            <div className="panel-heading">
              Documents <span className="see-more pull-right"><a href="">See More</a></span>
            </div>
            <div className="panel-body">
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/ppt.png"/><div className="title">Document</div></div>
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
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/img_1.jpg"/><div className="title">Image</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/img_2.jpg"/><div className="title">Image</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/img_3.jpg"/><div className="title">Image</div></div>
            </div>
          </div>


        </div>
        <div className="clearfix"></div>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">

          <div className="panel panel-default">
            <div className="panel-heading">
              Video's <span className="see-more pull-right"><a href="">See More</a></span>
            </div>
            <div className="panel-body">
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/video_1.jpg"/><div className="title">Video</div></div>
              <div className="thumbnail"><FontAwesome name='lock'/><img src="/images/video_2.jpg"/><div className="title">Video</div></div>
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
