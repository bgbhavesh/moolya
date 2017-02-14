/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createUser'] = (obj, args, context, info) => {
        // TODO : Authorization

    var userDetails = {
      profile:{
        isInternaluser : "yes",
        isExternaluser : "no",
        email: args.user.email,
        InternalUprofile:{
          moolyaProfile: args.user
        }
      },
      username: args.user.email,
      password: args.user.password,
    };
     let userId = Accounts.createUser(userDetails);
     Accounts.setPassword(userId, adminPassword);
        if(userId){
            let code = 200;
            let result = {userId: userId}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
}
MlResolver.MlMutationResolver['assignUser'] = (obj, args, context, info) => {
  // TODO : Authorization
  Meteor.users.update({_id:args.user.id}, {$set:{"profile.InternalUprofile.moolyaProfile.userProfiles":args.user}})
  response = JSON.stringify(new MlRespPayload().successPayload(result, code));
}
