import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export default class MlTable extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    const selectRow = {
      mode: 'radio',
      bgColor: '#feeebf',
      onSelect: this.props.handleRowSelect
    };
    const config = {tableHeaderClass:this.props.tableHeaderClass,
                    striped:true,hover:true,
                    selectRow:(this.props.selectRow?selectRow:{}) ,
                    data:this.props.data,
                    remote:true,
                    search:true,multiColumnSearch:true,pagination:this.props.pagination,
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
      sizePerPageList: [5,10,20,50,100],
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
      }
      return <TableHeaderColumn {...columnOptions}>{cl.title}</TableHeaderColumn>;
    });

    return (
       <BootstrapTable {...config}>
                {columnItems}
       </BootstrapTable>
    );
  }
}
