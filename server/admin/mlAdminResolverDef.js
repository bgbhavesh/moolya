/**
 * Created by venkatasrinag on 17/1/17.
 */
const MlResolver={
  LeftNavQuery: {
  mlLeftNav(_, { name }, ctx) {
    return MlLeftNavModel.findOne({name});
  },
}
};
module.exports=MlResolver;
