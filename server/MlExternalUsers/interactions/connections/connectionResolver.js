/**
 * Created by venkatsrinag on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash'

MlResolver.MlQueryResolver['fetchConnections'] = (obj, args, context, info) =>{
    let userConnections = [];
    if(context && context.userId){
        let connections = MlConnections.find({"users.userid":{"$in":[context.userId]}}).fetch();
        _.each(connections, function (connection) {
            _.remove(connection.users, {userid: context.userId})
            let toUser = connection.users[0];
            let conn = {
                _id:connection._id,
                toUser : connection.users[0],
                requestedFrom:connection.requestedFrom,
                createdBy:connection.createdBy,
                updatedBy:connection.updatedBy,
                isAccepted:connection.isAccepted,
                isDenied:connection.isDenied,
                resendCount:connection.resendCount
            }

            userConnections.push(conn);
        })
    }

    return userConnections
}

MlResolver.MlQueryResolver['fetchConnection'] = (obj, args, context, info) =>{

}

MlResolver.MlMutationResolver['createConnection'] = (obj, args, context, info) =>{
    if(args && args.connection && context && context.userId){
        try {
            let users = [];
            let connection = {};
            let fromuser = Meteor.users.findOne(context.userId);
            if (!fromuser) {
                let code = 400;
                let response = new MlRespPayload().errorPayload('Invalid User', code);
                return response;
            }
            let isValid = validateExternalUser(fromuser)
            if(!isValid){
                let code = 400;
                let response = new MlRespPayload().errorPayload('Invalid User', code);
                return response;
            }

            let toUser = Meteor.users.findOne(args.connection.toUser.userid)
            if (!toUser) {
                let code = 400;
                let response = new MlRespPayload().errorPayload('Invalid User', code);
                return response;
            }
            isValid = validateExternalUser(toUser)
            if(!isValid){
                let code = 400;
                let response = new MlRespPayload().errorPayload('Invalid User', code);
                return response;
            }

            let isAlreadyExist = MlConnections.findOne({"users.userid":{"$in":[context.userid, args.connection.toUser.userid]}})
            if(isAlreadyExist){
                let code = 400;
                let response = new MlRespPayload().errorPayload('Connection Already Exists', code);
                return response;
            }

            let fromUser = {
              userid: context.userId,
              userName: fromuser.username,
              isFavourite: false,
              isBlock: false
            }
            users.push(fromUser)
            users.push(args.connection.toUser)
            connection = {
              users: users,
              requestedFrom: context.userId,
              createdBy: "",
              updatedBy: "",
              isAccepted: false,
              isDenied: false,
              resendCount: 0
            }
            ret = MlConnections.insert({...connection})
        }catch (e){
            let code = 400;
            let response = new MlRespPayload().errorPayload(e.message, code);
            return response;
        }
        let code = 200;
        let response = new MlRespPayload().successPayload(ret, code);
        return response;
    }
}

MlResolver.MlMutationResolver['updateConnection'] = (obj, args, context, info) =>{
    if(args && args.connection && args.connectionId){
        let connection = MlConnections.findOne({"_id":args.connectionId})
        if(!connection){
            let code = 400;
            let response = new MlRespPayload().errorPayload("Invalid Connection", code);
            return response;
        }
        let updateFor = args.connection;
        let fromIndex = _.findIndex(connection.users, {userid: context.userId})
        let toIndex = _.findIndex(connection.users, {userid: updateFor.toUser.userid})

        if(fromIndex > -1 && connection.users[toIndex].userid == updateFor.toUser.userid && connection.users[toIndex].userName == updateFor.toUser.userName){
            _.mergeWith(connection.users[toIndex], updateFor['toUser'])
            connection.updatedBy    = args.connection.updatedBy;
            connection.isAccepted   = args.connection.isAccepted;
            connection.isDenied     = args.connection.isDenied;
            connection.resendCount  = args.connection.resendCount;

            let ret = MlConnections.update({"_id": args.connectionId}, {$set: connection})
            if (ret) {
                let code = 200;
                let response = new MlRespPayload().successPayload("Connection Updated Successfully", code);
                return response;
            }
        }
        let code = 400;
        let response = new MlRespPayload().errorPayload("Invalid Connection", code);
        return response;

    }
}

MlResolver.MlMutationResolver['connectionRequest'] = (obj, args, context, info) =>{

}


validateExternalUser=(user)=>{
    let userExternal = user.profile.isExternaluser;
    //check if email is verified.
    let emails=user&&user.emails?user.emails:[];
    var email = _.find(emails || [], function (e) { return (e.verified&&e.address===user.username);});
    if(!email){return false;}
    return userExternal
}
