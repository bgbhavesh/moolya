import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";
var _ = require('lodash')

MlResolver.MlMutationResolver['createSharedLibrary'] = (obj, args, context, info) => {

  let libraryInput = args.libraryInput;

  if(!libraryInput) {
    return
  }

  let files = libraryInput;
  let users = libraryInput

}

MlResolver.MlMutationResolver['updateSharedLibrary'] = (obj, args, context, info) => {
}

MlResolver.MlQueryResolver['fetchSharedLibrary'] = (obj, args, context, info) => {

}

