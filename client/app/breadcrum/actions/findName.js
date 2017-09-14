// import gql from 'graphql-tag'
// import {client} from '../../core/appConnection';
//
// export async function findName(Id,Type)
// {
//   const result = await client.query({
//     query: gql`
//     query  ($id: String){
//         findName(_id:$id){
//         name
//       }
//       }
//     `,
//     variables: {
//       id:Id,
//       type:Type
//     },
//     forceFetch:true
//   });
//   const name= result.data.findMasterSetting||{};
//   const {addressName,aboutAddress,addressDisplayName}=masterSetting.addressTypeInfo||{};
//   if(result){
//     return {isActive:masterSetting.isActive,addressName,aboutAddress,addressDisplayName};
//   }
//   return {};
// }
