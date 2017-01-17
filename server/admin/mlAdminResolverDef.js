/**
 * Created by venkatasrinag on 17/1/17.
 */
const MlResolver={
  LeftNavQuery: {
  mlLeftNav() {
    return MlLeftNavModel.find().fetch();
  },
}
};
module.exports=MlResolver;
