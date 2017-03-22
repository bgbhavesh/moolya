/**
 * Created by venkatasrinag on 6/1/17.
 */
'use strict';
let AWS = Meteor.npmRequire('aws-sdk');
let awsConfig = require('aws-config');
let fs = Meteor.npmRequire('fs')

Meteor.startup(function () {

})

module.exports = class s3Client{
    constructor(){
        this.client = new AWS.S3(awsConfig({region:"ap-south-1", accessKeyId: 'AKIAIOLVK4M2SMABND3Q', secretAccessKey: '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', timeout: 15000}));
    }

    uploadFile(file, s3Bucket, bucketFolder, callback){
        let fileData = fs.createReadStream(file.path);
        let filename = file.name.replace(/ /g,'')
        var params = {
            Bucket:s3Bucket,
            Key: bucketFolder+filename,
            ContentType:file.type,
            Body: fileData
        }
        let self = this
        this.client.putObject(params, Meteor.bindEnvironment(function(err, response) {
            console.log(response)
            if(err){
                callback(err, response);
            }
            else{
                let url = self.client.endpoint.href+s3Bucket+"/"+bucketFolder+filename;
                callback(err,url);
            }

        }));
    }

    getS3SignedUrl(fileKey, s3Bucket){
        let params = {Key:fileKey, Bucket:s3Bucket, Expires:Meteor.settings.private.aws.urlExpirationTime}
        return this.client.getSignedUrl('getObject', params);
    }

    getS3PublicUrl(fileKey, s3Bucket){
        return this.client.getPublicUrlHttp(s3Bucket, fileKey);
    }

}
