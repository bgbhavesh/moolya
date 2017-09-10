/**
 * Created by venkatasrinag on 6/1/17.
 */
'use strict';
let AWS = require('aws-sdk');
let awsConfig = require('aws-config');
let fs = require('fs')

Meteor.startup(function () {

})

const accessKeyId = Meteor.settings.private.aws&&Meteor.settings.private.aws.s3Config&&Meteor.settings.private.aws.s3Config.accessKeyId?Meteor.settings.private.aws.s3Config.accessKeyId:'AKIAIOLVK4M2SMABND3Q';
const secretAccessKey = Meteor.settings.private.aws&&Meteor.settings.private.aws.s3Config&&Meteor.settings.private.aws.s3Config.secretAccessKey?Meteor.settings.private.aws.s3Config.secretAccessKey:'tX/MmyWGfVjEX37FCQlE+MLWBcwdY59FX23fXSmj';
const region = Meteor.settings.private.aws&&Meteor.settings.private.aws.s3Config&&Meteor.settings.private.aws.s3Config.region?Meteor.settings.private.aws.s3Config.region:"ap-south-1";
module.exports = class s3Client{
    constructor(){
        this.client = new AWS.S3(awsConfig({region:region, accessKeyId:accessKeyId, secretAccessKey:secretAccessKey, timeout: 15000}));
    }

  generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

    uploadFile(file, s3Bucket, bucketFolder, callback){
        let fileData = fs.createReadStream(file.path);
        var uniqueId=this.generateUUID();
        let filename = file.name.replace(/ /g,'')
        var params = {
            Bucket:s3Bucket,
            Key: bucketFolder+uniqueId+"-"+filename,
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
                let url = self.client.endpoint.href+s3Bucket+"/"+bucketFolder+uniqueId+"-"+filename;
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
