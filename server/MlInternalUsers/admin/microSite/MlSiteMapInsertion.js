var noData = "not mentioned";


const MlSiteMapInsertion= class MlSiteMapInsertion {

  static  mlCreateSEOUrl(urlFormationObject,uniqueSeoName) {
    try {

     let existsSeoName =  MlSitemap.findOne({uniqueSeoName: uniqueSeoName});
      const seoUrl =urlFormationObject;

    } catch (e) {
      console.log("Error"+e);
    }
  }


}

export default MlSiteMapInsertion;




