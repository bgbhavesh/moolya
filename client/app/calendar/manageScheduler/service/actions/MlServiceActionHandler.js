/**
 * Created by Mukhil on 19/6/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../../core/appConnection';

export async function createServiceActionHandler (Services) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($Services: service){
        createService(Services:$Services){
        success
        code
        result
      }
      }
    `,
    variables: {
      Services
    }
  });
  const services = result.data.createService;
  return services
}

export async function fetchServiceActionHandler (serviceId) {
  const result = await appClient.query({
    query: gql`
    query($serviceId:String){
        fetchService(serviceId:$serviceId){
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
          discountAmount
          discountPercentage
          isTaxInclusive
          isPromoCodeApplicable
        }
        tasks
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
    forceFetch:true
  });
  const service = result.data.fetchService;
  return service
}


export async function updateServiceActionHandler(serviceId,Services) {
  const result = await appClient.mutate({
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
  const teamMembers = result.data.updateService;
  return teamMembers
}


export async function fetchServicesActionHandler (profileId) {
  const result = await appClient.query({
    query: gql`
    query($profileId:String) {
      fetchServices(profileId: $profileId) {
        displayName
        _id
      }
    }
    `,
    forceFetch:true,
    variables: {
      profileId:profileId
    }
  });
  const services = result.data.fetchServices;
  return services;
}



export async function fetchProfileActionHandler (profileId) {
  const result = await appClient.query({
    query: gql`
    query ($profileId: String) {
      getUserProfile(profileId: $profileId) {
        clusterName
        clusterId
        countryId
  }
}
    `,
    forceFetch:true,
    variables: {
      profileId
    }
  });
  const profile = result.data.getUserProfile;
  return profile;
}