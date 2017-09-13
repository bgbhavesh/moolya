const MlStatus= class MlStatus {
  static mlEmailVerificationStatusCode(code){
    var regDetails = mlDBController.findOne('MlStatus',{code: code});
    return regDetails&&regDetails.description?regDetails.description:""
  }
}


export default MlStatus;
