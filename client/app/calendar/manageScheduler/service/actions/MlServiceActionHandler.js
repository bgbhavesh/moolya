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
        findService(serviceId:$serviceId){
        _id
        userId
        profileId
        name
        displayName
        noOfSession
        validTill
        sessionFrequency
        finalAmount
        duration{
         hours
         minutes
        }
        status
        termsAndCondition{
          isCancelable
          noOfDaysBeforeCancelation
          isReschedulable
          noOfReschedulable
        }
        attachments{
          name
          info
          isMandatory
        }
        payment {
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
          type
          amount
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
  var response = result.data.findService;
  let service = _.omit(response, '__typename');
  service.duration = _.omit(service.duration, '__typename');
  service.payment = _.omit(service.payment, '__typename');
  service.facilitationCharge = _.omit(service.facilitationCharge, '__typename');
  let stateArray = [];
  _.each(service.state, (item, say) => {
    let value = _.omit(item, '__typename')
    stateArray.push(value);
  });
  service.state = stateArray;
  let cityArray = [];
  _.each(service.city, (item, say) => {
    let value = _.omit(item, '__typename')
    cityArray.push(value)
  });
  service.city = cityArray;
  let communityArray = [];
  _.each(service.community, (item, say) => {
    let value = _.omit(item, '__typename')
    communityArray.push(value)
  });
  service.community = communityArray;
  let taskArray = [];
  _.each(service.tasks, (item, say) => {
    let value = _.omit(item, '__typename')
    taskArray.push(value)
  });
  service.tasks = taskArray;
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
      fetchUserServices(profileId: $profileId) {
        displayName
        profileId
        _id
      }
    }
    `,
    forceFetch:true,
    variables: {
      profileId:profileId
    }
  });
  const services = result.data.fetchUserServices;
  return services;
}

export async function fetchBeSpokeServicesActionHandler (portfolioId) {
  const result = await appClient.query({
    query: gql`
    query($portfolioId:String) {
      fetchBeSpokeServices(portfolioId: $portfolioId) {
        profileId
        _id
        about
        profileId
        noOfSession
        expectedInput
        expectedOutput
        conversation
        industryId
        mode
        isBeSpoke
        attachments{
          fileUrl
        }
      }
    }
    `,
    forceFetch:true,
    variables: {
      portfolioId:portfolioId
    }
  });
  const services = result.data.fetchBeSpokeServices;
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

export async function fetchTasksAmountActionHandler (profileId) {
  const result = await appClient.query({
    query: gql`
query ($profileId: String) {
  fetchTasksAmount(profileId: $profileId) {
    totalAmount
  }
}
    `,
    forceFetch:true,
    variables: {
      profileId:profileId
    }
  });
  const services = result.data.fetchTasksAmount;
  return services;
}

export async function getProfileBasedOnPortfolio (portfolioId) {
  const result = await appClient.query({
    query: gql`
query ($portfolioId: String) {
  getProfileBasedOnPortfolio(portfolioId: $portfolioId) {
    profileId
  }
}
    `,
    forceFetch:true,
    variables: {
      portfolioId
    }
  });
  const services = result.data.getProfileBasedOnPortfolio;
  return services;
}


export async function fetchTaskDetailsForServiceCard (profileId, serviceId) {
  const result = await appClient.query({
    query: gql`
      query($profileId: String, $serviceId: String) {
        fetchTaskDetailsForServiceCard(profileId: $profileId, serviceId: $serviceId) {
          id: _id
          name
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
            activities {
              id: _id
              mode
              name
              displayName
            }
          }
          attachments {
             name
             info
             isMandatory
          }
        }
      }
    `,
    variables: {
      profileId,
      serviceId
    },
    forceFetch: true
  });
  var taskDetails = result.data.fetchTaskDetailsForServiceCard;
  let tasks = [];
  let taskArray = [];
  _.each(taskDetails, (task, say) => {
    let sessionArray = [];
    let taskInfo =  _.omit(task, '__typename');
    _.each(taskInfo.session, (item, say) => {
      let value = _.omit(item, '__typename');
      sessionArray.push(value)
    });
    taskInfo.session = sessionArray;
    taskArray.push(taskInfo);
  });
  tasks = taskArray;
  return tasks;
}

export async function bookUserServiceCardActionHandler(serviceId, taskDetails) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($serviceId:String!,$taskDetails: [tasks]){
        createServiceCardOrder(serviceId:$serviceId,taskDetails:$taskDetails){
        success
        code
        result
      }
      }
    `,
    variables: {
      serviceId,
      taskDetails
    }
  });
  const teamMembers = result.data.createServiceCardOrder
  return teamMembers;
}

export async function userServiceCardPaymentActionHandler(userServiceCardPaymentInfo) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($userServiceCardPaymentInfo:userServiceCardPaymentInfo){
        updateServiceCardOrder(userServiceCardPaymentInfo:$userServiceCardPaymentInfo){
        success
        code
        result
      }
      }
    `,
    variables: {
      userServiceCardPaymentInfo
    }
  });
  const teamMembers = result.data.updateServiceCardOrder;
}


