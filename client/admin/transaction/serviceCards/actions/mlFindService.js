/** ************************************************************
 * Date: 5 Jul, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This will manage the actions of service cards
 * JavaScript XML file mlFindService.jsx
 * *************************************************************** */


/**
 * Imports libs and components
 */
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function getServiceBasedOnProfileId (profileId) {
  const result = await client.query({
    query: gql`
query ($profileId: String) {
  getServiceBasedOnProfileId(profileId: $profileId) {
        userId
        profileId
        name
        displayName
        noOfSession
        sessionFrequency
        duration{
         hours
         minutes
        }
        status
        termsAndCondition{
          isCancelable
          isRefundable
          isReschedulable
          noOfReschedulable
        }
        attachments{
          name
          info
          isMandatory
        }
        payment{
          amount
          isDiscount
          discountType
          discountValue
          isTaxInclusive
          isPromoCodeApplicable

       }
        createdAt
        updatedAt
      
      
  }
}
    `,
    forceFetch:true,
    variables: {
      profileId
    }
  });
  const services = result.data.getServiceBasedOnProfileId;
  return services;
}


/**
 * Method :: fetchTaskDetails
 * Description :: This function is called to get the details of a task based on the selected tasks
 * @params :: name : type :: String
 * returns ::  taskDetails : type :: Array
 **/


  export async function fetchTaskDetails (name) {
  const result = await client.query({
    query: gql`
query ($name: String) {
  fetchTaskDetails(name: $name) {
    displayName
    noOfSession
    sessionFrequency
    duration {
      hours
      minutes
    }
    session {
      sessionId
      duration {
        hours
        minutes
      }
      activities
    }
  }
}
    `,
    variables: {
      name
    },
  });
  console.log(result)
  const taskDetails = result.data.fetchTaskDetails;
  return taskDetails
}


/**
 * Method :: getTaskFromService
 * Description :: This function is called on multiple instances to get Service details based in serviceId
 * @params :: serviceId : type :: String
 * returns ::  taskDetails : type :: Array
 **/

export async function getTaskFromService (serviceId) {
  console.log(serviceId)
  const result = await client.query({
    query: gql`
    query($serviceId:String){
        getTaskFromService(serviceId:$serviceId){
         userId
        profileId
        name
        displayName
        noOfSession
        sessionFrequency
        duration{
         hours
         minutes
        }
        status
        termsAndCondition{
          isCancelable
          isRefundable
          isReschedulable
          noOfReschedulable
        }
        attachments{
          name
          info
          isMandatory
        }
        payment {
          amount
          isDiscount
          discountType
          discountValue
          isTaxInclusive
          isPromoCodeApplicable
          tasksAmount
          tasksDiscount
          tasksDerived
        }
        tasks {
          id
          sequence
          sessions{
            id
            sequence
          }
        }
        facilitationCharge{
          amount
          percentage
          derivedAmount
        }
        state{
          id
          name
        }
        city{
          id
          name
        }
        community{
          id
          name
        }
        createdAt
        updatedAt
      }
      }
    `,
    variables: {
      serviceId
    },
  });
  console.log(result)
  const taskDetails = result.data.getTaskFromService;
  return taskDetails
}

/**
 * Method :: updateServiceActionHandler
 * Description :: This function used to update the service collection
 * @params :: serviceId : type :: String
 * @params :: Services  : type :: Object
 * returns ::  response : type :: Object
 **/

export async function updateServiceActionHandler(serviceId,Services) {
  const result = await client.mutate({
    mutation: gql`
    mutation($serviceId:String, $Services:service){
        updateService(serviceId:$serviceId,Services:$Services){
        success
        code
        result
      }
      }
    `,
    variables: {
      serviceId,
      Services
    }
  });
  const response = result.data.updateService;
  return response
}

