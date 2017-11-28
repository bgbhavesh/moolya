/**
 * Updated by shubhankit on 23/10/17.
 */


const AWS = require('aws-sdk');
const awsConfig = require('aws-config');
const fs = require('fs')
const Minio = require('minio')
// Instantiate the minio client with the endpoint
// and access keys
Meteor.startup(() => {

})
const isProd = Meteor.settings.private && Meteor.settings.private.isProdENV ? Meteor.settings.private.isProdENV : false
const accessKeyId = Meteor.settings.private.aws && Meteor.settings.private.aws.s3Config && Meteor.settings.private.aws.s3Config.accessKeyId ? Meteor.settings.private.aws.s3Config.accessKeyId : 'AKIAIOLVK4M2SMABND3Q';
const secretAccessKey = Meteor.settings.private.aws && Meteor.settings.private.aws.s3Config && Meteor.settings.private.aws.s3Config.secretAccessKey ? Meteor.settings.private.aws.s3Config.secretAccessKey : 'tX/MmyWGfVjEX37FCQlE+MLWBcwdY59FX23fXSmj';
const region = Meteor.settings.private.aws && Meteor.settings.private.aws.s3Config && Meteor.settings.private.aws.s3Config.region ? Meteor.settings.private.aws.s3Config.region : 'ap-south-1';


const minioAccessKey = Meteor.settings.private.minio && Meteor.settings.private.minio.minioConfig && Meteor.settings.private.minio.minioConfig.accessKeyId ? Meteor.settings.private.minio.minioConfig.accessKeyId : 'RakSan987';
const minioSecretKey = Meteor.settings.private.minio && Meteor.settings.private.minio.minioConfig && Meteor.settings.private.minio.minioConfig.secretAccessKey ? Meteor.settings.private.minio.minioConfig.secretAccessKey : 'RakSan987';
const minioRegion = Meteor.settings.private.minio && Meteor.settings.private.minio.minioConfig && Meteor.settings.private.minio.minioConfig.region ? Meteor.settings.private.minio.minioConfig.region : 'us-east-1';
const endPoint = Meteor.settings.private.minio && Meteor.settings.private.minio.minioConfig && Meteor.settings.private.minio.minioConfig.endPoint ? Meteor.settings.private.minio.minioConfig.endPoint : '127.0.0.1';
const port = Meteor.settings.private.minio && Meteor.settings.private.minio.minioConfig && Meteor.settings.private.minio.minioConfig.port ? Meteor.settings.private.minio.minioConfig.port : 9000;
const secure = Meteor.settings.private.minio && Meteor.settings.private.minio.minioConfig && Meteor.settings.private.minio.minioConfig.secure ? Meteor.settings.private.minio.minioConfig.secure : false;

const minioClient = new Minio.Client({
  endPoint,
  port,
  region: minioRegion,
  secure,
  accessKey: minioAccessKey,
  secretKey: minioSecretKey
});

module.exports = class s3Client {
  constructor() {
    if (isProd) {
      this.client = new AWS.S3(awsConfig({
        region, accessKeyId, secretAccessKey, timeout: 15000
      }));
    }
  }

  generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  uploadFile(file, s3Bucket, bucketFolder, callback) {
    const uniqueId = this.generateUUID();

    if (isProd) {
      const fileData = fs.createReadStream(file.path);
      const filename = file.name.replace(/ /g, '')
      const params = {
        Bucket: s3Bucket,
        Key: `${bucketFolder + uniqueId}-${filename}`,
        ContentType: file.type,
        Body: fileData
      }
      const self = this
      this.client.putObject(params, Meteor.bindEnvironment((err, response) => {
        console.log(response)
        if (err) {
          callback(err, response);
        } else {
          const url = `${self.client.endpoint.href + s3Bucket}/${bucketFolder}${uniqueId}-${filename}`;
          callback(err, url);
        }
      }));
    } else {
      const bucketName = s3Bucket;
      const fileNameValue = file.name.replace(/ /g, '');
      const fileName = `${bucketFolder + uniqueId}-${fileNameValue}`;
      const filePath = file.path;

      minioClient.fPutObject(bucketName, fileName, filePath, 'application/octet-stream', (err, response) => {
        console.log(response)
        if (err) {
          callback(err, response);
        } else {
          const url = `${bucketFolder}${uniqueId}-${fileNameValue}`;

          // let url = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + s3Bucket+"/"+bucketFolder+uniqueId+"-"+fileNameValue;
          callback(err, url);
        }
      });
    }
  }

  getS3SignedUrl(fileName, s3Bucket, fromDate, toDate) {
    const expiryDuration = (toDate - fromDate) / 1000;
    minioClient.presignedGetObject(s3Bucket, fileName, expiryDuration, (err, presignedUrl) => {
      if (err) {
        callback(err);
      } else {
        callback(presignedUrl);
      }
    });
  }
}
