import React from 'react';
import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import AdminUsersContent from '../../components/users/UsersList';

const pageNumber=new ReactiveVar(1);
const recordsPerPage=new ReactiveVar(5);

const onPageChange=(page,sizePerPage)=>{
  pageNumber.set(page);
}

const onSizePerPageList=(size)=>{
  recordsPerPage.set(size);
};
function composer(props,onData){
  let currentPage=pageNumber.get();
  let sizePerPage=recordsPerPage.get();
  let limit=sizePerPage*currentPage;
  let skip=sizePerPage*(currentPage-1);
   Meteor.call('reterieveAllUsers',limit,skip, function (err, resp) {
     let data=resp&&resp.records?resp.records:null;
    let totalDataSize=resp&&resp.recordsCount>0?resp.recordsCount:0;
     onData(null,{data,totalDataSize,sizePerPage,currentPage,onPageChange,onSizePerPageList});
  });


}

export default UsersListContainer=composeWithTracker(composer)(AdminUsersContent);
