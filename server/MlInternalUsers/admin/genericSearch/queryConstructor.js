
export function searchFunction(args) {
  let query={};
  let ary=[];
  let fieldsArgs=args.fieldsData||[];
  _.each(fieldsArgs,function (s,v) {
    let json={};
    if(s.fieldType == "List"){
     json[s.fieldName]=s.value
    }else if(s.fieldType == "Date"){
        let dateObject =  JSON.parse(s.value)
        json[s.fieldName]={$gte: new Date(dateObject.$gte),$lt : new Date(dateObject.$lt)}
    }else{
      let regex={$regex:".*"+s.value+".*",$options:"i"};
      json[s.fieldName]=regex
    }
    ary.push(json);
  })

  if(ary&&ary.length>0){
    query.$or=ary;
  }
  return query;
}

export function sortFunction(args) {
  let sortObj={};
  let a={};
  _.each(args.sortData,function (s,v) {
    let sign=null;
    if (s.sort=='desc'){
      sign = -1;
    }else if(s.sort=='asc'){
      sign=1;
    }
    a[s.fieldName]=sign;
  });
  sortObj=a;
  return sortObj;
}
