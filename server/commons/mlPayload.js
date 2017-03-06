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
}
