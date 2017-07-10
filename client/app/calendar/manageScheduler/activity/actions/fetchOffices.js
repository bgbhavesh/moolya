/** ************************************************************
 * Date: 3 Jul, 2017
 * Programmer: Pankaj <pankaj.jatav@raksan.in>
 * Description : This will fetch office data from server
 * JavaScript XML file fetchOffices.jsx
 * *************************************************************** */

/**
 * Import libs and components
 */
import gql from 'graphql-tag'
import {appClient} from '../../../../core/appConnection';

export async function fetchOfficeActionHandler (Details) {
  const result = await appClient.query({
    query: gql`
    query{
      fetchOffice {
        _id
        officeName
        branchType
      }
    }`,
    variables: {
      Details
    }
  });
  const offices = result.data.fetchOffice;
  return offices
}