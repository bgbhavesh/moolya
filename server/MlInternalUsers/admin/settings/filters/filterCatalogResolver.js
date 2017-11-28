import MlResolver from '../../../../commons/mlResolverDef';
import MlRespPayload from '../../../../commons/mlPayload';


MlResolver.MlQueryResolver.findFilterCatalog = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.moduleName) {
    const id = args._id;
    const response = MlFiltersCatalog.findOne({ _id: args.moduleName });
    return response;
  }
}
