
export default function queryFunction(args) {
  let query={};
  let ary=[];
  let fieldsArgs=args.fieldsData||[];
  _.each(fieldsArgs,function (s,v) {
    let json={};
    let regex={$regex:".*"+s.value+".*",$options:"i"};
    json[s.fieldName]=regex
    ary.push(json);
  })

  if(ary&&ary.length>0){
    query.$or=ary;
  }
  return query;
}
