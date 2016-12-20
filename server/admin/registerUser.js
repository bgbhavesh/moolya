Meteor.methods({
  insertUser(data)
  {
    check(data,Object);
    try{
      var insertedUser= MlSoftRegistration.insert(data);
      return insertedUser;
    }catch(e){
      throw new Meteor.Error(403,"an user with this email already exists,Please register with a new email address");
    }


  }
})
