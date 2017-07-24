/**
 * Created by pankaj on 24/7/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../../core/appConnection";

export async function ongoingAppointmentActionHandler(selfInternalTask) {
  const result = await appClient.query({
    query: gql`
      query {
        fetchMyAppointment{
          _id
          serviceName
          serviceId
        }
      }
    `,
    forceFetch: true
  });
  const data = result.data.fetchMyAppointment;
  return data;
}
