
import MlResolver from '../mlAdminResolverDef'


MlResolver.MlQueryResolver['FetchRole'] = (_,{name},context) =>{
  return MlRoles.findOne({name});
}

MlResolver.MlQueryResolver['FetchRoles'] = (_,{name,searchQuery},context) =>{
  let role=null;
  if(searchQuery){
     role= MlRoles.findOne({name:name,"role.roleName":{ $regex:"^"+searchQuery, $options: "si" }});
  }else{
    role=MlRoles.findOne({name});
  }
  return role&&role.role?role.role:null;
}

