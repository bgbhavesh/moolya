/**
 * Created by venkatsrinag on 24/4/17.
 */
if(Meteor.isServer){
    MlMenus.upsert({name:"ideator"}, {$set:{
        "name":"mlIdeatorMenu"
    }})
}
