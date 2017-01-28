
import MlResolver from '../mlAdminResolverDef'


MlResolver['FetchRole'] = (_,{name},context) =>{
  return MlRoles.findOne({name});
}

MlResolver['FetchRoles'] = (_,{name,searchQuery},context) =>{
  let role=null;
  if(searchQuery){
     role= MlRoles.findOne({name:name,"role.roleName":{ $regex:"^"+searchQuery, $options: "si" }});
  }else{
    role=MlRoles.findOne({name});
  }
  return role&&role.role?role.role:null;
}

