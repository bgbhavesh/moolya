/**
 * Created by venkatasrinag on 1/2/17.
 */
"use strict";


module.exports = class MlRespPayload{
    constructor(){
    }
    successPayload(object, code){
        let response = {};
        response.success = true;
        response.code = code;
        response.result = JSON.stringify(object);
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
