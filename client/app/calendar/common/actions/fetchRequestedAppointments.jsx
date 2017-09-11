/**
 * Created by pankaj on 25/7/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../../core/appConnection";

export async function requestedAppointmentActionHandler() {
  const result = await appClient.query({
    query: gql`
      query {
        fetchBeSpokeServices {
        _id,
        displayName        
      }
      }
    `,
    forceFetch: true
  });
  const data = result.data.fetchBeSpokeServices;
  return data;
}


export async function servicesForAppointmentsActionHandler() {
  const result = await appClient.query({
    query: gql`
      query {
        fetchServicesForAppointments {
        _id
        name        
      }
      }
    `,
    forceFetch: true
  });
  const data = result.data.fetchServicesForAppointments;
  return data;
}


