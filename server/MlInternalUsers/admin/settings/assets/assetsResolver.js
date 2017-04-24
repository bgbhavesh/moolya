/**
 * Created by venkatsrinag on 21/4/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createAssets'] = (obj, args, context, info) => {
    if(args && args.assetsMasterData){
        try{
            let ret = MlAssets.insert({...args.assetsMasterData})
            if(ret){
                let response = new MlRespPayload().successPayload("Asset Created Successfully", 200);
                return response;
            }
            else{
              let response = MlRespPayload.errorPayload("Error in Creating an Asset", 400);
              return response;
            }
        }
        catch (e){
            let response = MlRespPayload.errorPayload(e.message, 400);
            return response;
        }

    }
}

MlResolver.MlMutationResolver['updateSelectedAsset'] = (obj, args, context, info) => {
    if(args && args.assetId && args.assetsMasterData){
        try{
            let resp = MlAssets.update({_id: args.assetId}, {$set: args.assetsMasterData}, {upsert: true})
            if(resp){
                let response = new MlRespPayload().successPayload("Asset Created Successfully", 200);
                return response;
            }
            else{
                let response = new MlRespPayload.errorPayload("Error in Creating an Asset", 400);
                return response;
            }
        }
        catch (e){
            let response = new MlRespPayload.errorPayload(e.message, 400);
            return response;
        }
    }
}

MlResolver.MlQueryResolver['fetchAssets'] = (obj, args, context, info) => {
    return MlAssets.find({isActive : true}).fetch();
}

MlResolver.MlQueryResolver['findAsset'] = (obj, args, context, info) => {
    if(args && args.assetId){
        return MlAssets.findOne({"_id":args.assetId})
    }
}
