if(Meteor.isServer) {
  MlRegistration.insert(
    {registrationInfo:{
      /*userType:"Individual",
      firstName:"Muralidhar",
      lastName:"Reddy",
      countryId:"c102",
      countryName:"India",
      contactNumber:"",
      email:"muralidharreddy.kunduru@raksan.in",
      cityId:"",
      cityName:"Hyderabad",
      registrationType:"ideator",
      userName:"mreddy",
      password:"123456",
      accountType:"Starter",
      institutionAssociation:"",
      companyName:"raksan",
      companyUrl:"www.raksan.in",
      remarks:"",
      referralType:"",
      clusterId:"",
      clusterName:"",
      chapterId:"",
      chapterName:"",
      subChapterId:"",
      subChapterName:"",
      communityId:"",
      communityName:"",
      source:"",*/
      firstName : "Muralidhar",
      lastName : "Reddy",
      email : "muralidharreddy.kunduru@raksan.in",
      cityName : "Hyderabad",
      registrationType : "ideator",
      userName : "mreddy",
      password : "123456",
      companyUrl : "www.raksan.in",
      deviceName : "HP-QF-12234",
      deviceNumber : "1234",
      ipAddress : "10.20.30.156",
      ipLocation : "Hyderabad",
      countryId : "c101"

    },
      registrationDetails:{individualInfo:{firstName:"Muralidhar",middleName:"K",lastName:"Reddy"}}}
  );
}
