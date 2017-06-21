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
        createdAt
        updatedAt
      }
      }
    `,
    variables: {
      serviceId
    }
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
  console.log(result)
  const teamMembers = result.data.updateService;
  return teamMembers
}

