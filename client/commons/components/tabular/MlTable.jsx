import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {OnToggleSwitch} from '../../../admin/utils/formElemUtil';
//var mCustomScrollbar = require('malihu-custom-scrollbar-plugin');
import $ from "jquery";
export default class MlTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    OnToggleSwitch(true,true);
   // var self = this;
   // mCustomScrollbar($);
   // $(".react-bs-container-body").mCustomScrollbar({scrollbarPosition:'outside',alwaysShowScrollbar:0});
   //   self.forceUpdate();
  }
  componentDidUpdate(){
    OnToggleSwitch(true,true);
  }
  componentWillUpdate(nextProps){
  //  $(".react-bs-container-body").mCustomScrollbar({scrollbarPosition:'outside',alwaysShowScrollbar:0});
  }

  render() {
    const selectRow = {
      mode: 'checkbox',
      bgColor: '#feeebf',
      onSelect: this.props.handleRowSelect
    };
    var WinHeight = $(window).height();
    var tblHeight = WinHeight-(125+$('.admin_header').outerHeight(true));
    let searchEnable = true
    if(this.props.filter){
      searchEnable = false
    }else{
      searchEnable = true
    }
    const config = {tableHeaderClass:this.props.tableHeaderClass,
                    maxHeight: tblHeight+'px',
                    striped:true,hover:true,
                    selectRow:(this.props.selectRow?selectRow:{}) ,
                    data:this.props.data,
                    remote:true,
                    search:searchEnable,multiColumnSearch:true,pagination:this.props.pagination,
                    fetchInfo:{ dataTotalSize: this.props.totalDataSize }
                   };
   //Note: you can pass the functions for expandRow and expandComponent as properties.
    if(this.props.isExpandableRow&&this.props.expandComponent){
      //TODO: pass this as the props
      const expandableRow=(row)=> {return true};
      //TODO: pass this as the props
      const CustomExpandComponent = this.props.expandComponent;
      const expandComponent=(row)=> {
        return <CustomExpandComponent data={row} />;
      };
      config['expandComponent']=expandComponent;
      config['expandableRow']=expandableRow;
    };

     config['options']={sizePerPage:this.props.sizePerPage,
      sizePerPageList: [10,20,50,100,200,300,500,700,1000,2000,3000],
      page: this.props.pageNumber,
      onPageChange: this.props.onPageChange,
      onSizePerPageList: this.props.onSizePerPageList,
      onSortChange:this.props.onSortChange,
      onSearchChange:this.props.onSearchChange,
      clearSearch: false};

    const columnItems = this.props.columns.map((cl) =>{
      let columnOptions={key:cl.dataField,dataField:cl.dataField,hidden:(cl.isHidden?cl.isHidden:false),isKey:(cl.isKey?cl.isKey:false),dataSort:(cl.dataSort?cl.dataSort:false)};
      if(cl.customComponent){
        let CustomComponent = cl.customComponent;
        let customColumnComponent=(cell,row)=> {
          return <CustomComponent data={row} />;
        };
        columnOptions['dataFormat']=customColumnComponent;
       // if(cl.width){
        // columnOptions['width']='10%';
       // }
      }
      return <TableHeaderColumn {...columnOptions}>{cl.title}</TableHeaderColumn>;
    });

    return (
       <BootstrapTable {...config} bodyStyle={{overflow: 'overlay','overflowX':'hidden'}}>
                {columnItems}
       </BootstrapTable>
    );
  }
}
