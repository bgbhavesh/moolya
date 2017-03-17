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

    uploadFile(filePath, fileKey, fileContentType, s3Bucket, callback){
        check(fileData, String);
        check(fileKey, String);
        check(fileContentType, String);
        check(s3Bucket, String);
        var params = {
            localFile: filePath,
            Bucket:s3Bucket,
            Key: bucketFolder+fileKey,
            ContentType:fileContentType
        }
        // this.client.uploadFile(params, Meteor.bindEnvironment(function(err, response) {
        //     console.log(response)
        //     callback(err, response);
        // }));
    }

    getS3SignedUrl(fileKey, s3Bucket){
        let params = {Key:fileKey, Bucket:s3Bucket, Expires:Meteor.settings.private.aws.urlExpirationTime}
        return this.client.s3.getSignedUrl('getObject', params);
    }

    getS3PublicUrl(fileKey, s3Bucket){
        return s3.getPublicUrlHttp(s3Bucket, fileKey);
    }

}
