/**
 * Created by pankaj on 2/8/17.
 */
Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};


export const GenerateUniqueCode=function(u1,u2){
  var uniqueCode=u1+u2;
  if(u1>u2)uniqueCode=u2+u1;
  if(u1===u2)uniqueCode=null;
  return uniqueCode;
}
