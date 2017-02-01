/**
 * Created by venkatasrinag on 1/2/17.
 */
"use strict";



module.exports = class MlRespPayload{
    constructor(){
    }
    successPayload(object, code){
        let result = {};
        result.success = true;
        result.data = {
            code: code,
            result:object
        }

        return result;

    }

    errorPayload(errMsg, code){
        let result = {};
        result.success = false;
        result.data = {
            code: code,
            result:{error:errMsg}
        }
        return result;
    }
}
