/**
 * Created by venkatasrinag on 1/2/17.
 */
"use strict";


module.exports = class MlRespPayload{
    constructor(){
    }
    successPayload(result, code){
        let response = {};
        response.success = true;
        response.code = code;
        if(typeof result == 'object')
          response.result = JSON.stringify(result);
        else
          response.result = result;
        return response;
    }

    errorPayload(errMsg, code){
        let response = {};
        response.success = false;
        response.code = code;
        response.result = errMsg;
        return response;
    }

    getArrayDifference(a1, a2)
    {
        if(a1.length == 0)
          return {difference:a2, isActive:true}

        if(a1.length > a2.length){
            return {isActive: false, difference:_.difference(a1, a2)}
        }else if(a2.length > a1.length){
            return {isActive: true, difference:_.difference(a2, a1)}
        }else{
          return {isActive: false, difference:[]}
        }
    }
}
