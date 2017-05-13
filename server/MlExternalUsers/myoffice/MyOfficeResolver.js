/**
 * Created by venkatsrinag on 11/5/17.
 */

import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'

MlResolver.MlQueryResolver['fetchMyOffice'] = (obj, args, context, info) => {
    let myOffice = [];
}

MlResolver.MlQueryResolver['fetchMyOfficeMembers'] = (obj, args, context, info) => {
  let officeMembers = [];
}

MlResolver.MlMutationResolver['createMyOffice'] = (obj, args, context, info) => {
    let ret = "";
    try {
        if(args.myOffice){
            let myOffice = args.myOffice;
            myOffice['userId'] = context.userId;
            let ret = MlMyOffice.insert({...myOffice});
            if(!ret){
                let code = 400;
                let response = new MlRespPayload().successPayload("Failed To Create Office", code);
                return response;
            }
        }
    }
    catch (e){
        let code = 400;
        let response = new MlRespPayload().successPayload(e.message, code);
        return response;
    }

    let code = 200;
    let response = new MlRespPayload().successPayload('Office Successfully Created', code);
    return response;
}

MlResolver.MlMutationResolver['updateMyOffice'] = (obj, args, context, info) => {
}
