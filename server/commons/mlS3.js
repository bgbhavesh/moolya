/**
 * Created by venkatasrinag on 6/1/17.
 */
'use strict';
let s3 = Meteor.npmRequire('s3');

Meteor.startup(function () {

})

module.exports = class s3Client{
    constructor(){
        this.client = s3.createClient({
            s3RetryCount: 3,    // this is the default
            s3RetryDelay: 1000, // this is the default
            maxAsyncS3: 20,     // this is the default
            multipartUploadThreshold: 20971520, // this is the default (20 MB)
            multipartUploadSize: 15728640, // this is the default (15 MB)
            s3Options: {
                accessKeyId: Meteor.settings.private.aws.s3Config.accessKeyId,
                secretAccessKey: Meteor.settings.private.aws.s3Config.secretAccessKey
            }
        })
    }

    uploadFile(fileData, fileKey, fileContentType, s3Bucket, callback){
        check(fileData, String);
        check(fileKey, String);
        check(fileContentType, String);
        check(s3Bucket, String);
    }

    getS3SignedUrl(fileKey, s3Bucket){
    }

    getS3PublicUrl(fileKey, s3Bucket){
    }

}
