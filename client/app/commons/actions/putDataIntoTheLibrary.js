/** ************************************************************
 * Date: 07 Jul, 2017
 * Programmer: Mukhil <mukhil.padmanabhan@raksan.in>
 * Description : This will help put files into the library
 * JavaScript XML file createSelfInternalTask.js
 * *************************************************************** */

import gql from "graphql-tag";
import {appClient} from "../../core/appConnection";

export async function putDataIntoTheLibrary(portfolioDetailsId, files) {
  const result = await appClient.mutate({
    mutation: gql`
      mutation($portfolioDetailsId: String, $files:file){
        putDataIntoTheLibrary(portfoliodetailsId:$portfolioDetailsId,files:$files) {
          success
          code
          result
        }
      }
    `,
    variables: {
      portfolioDetailsId,
      files
    },
    forceFetch: true
  });
  const id = result.data.putDataIntoTheLibrary;
  return id;
}
