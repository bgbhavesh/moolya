/**
 * Created by venkatasrinag on 17/1/17.
 */
import moolyaEmail from './commons/mlEmail'
import s3Client from './commons/mlS3'
import validteAuthorization from './mlAuthorization/mlAuthorization'

Meteor.startup(function ()
{
    // console.log("Insider SSL start!!!!");
    // let sslCert = "/etc/nginx_test/ssl/nginx.crt";
    // let sslKey = "/etc/nginx_test/ssl/nginx.key";
    // let sslPort = 4444;
    // console.log("sslCert "+sslCert);
    // console.log("sslKey "+sslKey);
    // if (sslCert && sslKey) {
    //   let port = sslPort ? sslPort : 4443;
    //   console.log("Port is :" + port);
    //   SSL(sslKey, sslCert, port);
    // }
    mlEmail = new moolyaEmail();
    mlS3Client = new s3Client();
    mlAuthorization = new validteAuthorization();
})

//Copied from SSL package..
function SSL(key, cert, port)
{
    let httpProxy = Npm.require('http-proxy');
    let fs = Npm.require('fs');
    if (!port) {
      port = 4443;
    }
    httpProxy.createServer({
      target: {
        host: 'localhost',
        port: process.env.PORT
      },
      ssl: {
        key: fs.readFileSync(key, 'utf8'),
        cert: fs.readFileSync(cert, 'utf8')
      },
      ws: true,
      xfwd: true
  }).listen(port);
};

