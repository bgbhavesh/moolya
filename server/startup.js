Meteor.startup(function () {

  // BrowserPolicy.content.allowOriginForAll('fonts.gstatic.com');
  // BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
  // BrowserPolicy.content.allowOriginForAll('maps.gstatic.com');
  // BrowserPolicy.content.allowEval('https://ajax.googleapis.com');
  // BrowserPolicy.content.allowEval('http://fonts.gstatic.com');
  // BrowserPolicy.content.allowEval('https://fonts.gstatic.com');
  // BrowserPolicy.content.allowEval('http://*.googleapis.com');
  // BrowserPolicy.content.allowEval('https://*.googleapis.com');
  // BrowserPolicy.content.allowEval('http://maps.gstatic.com');
  // BrowserPolicy.content.allowEval('https://maps.gstatic.com');


      // console.log("Insider SSL start!!!!");
      // let sslCert = "/etc/nginx_test/ssl/nginx.crt";
      // let sslKey = "/etc/nginx_test/ssl/nginx.key";
      // let sslPort = 4443;
      // console.log("sslCert "+sslCert);
      // console.log("sslKey "+sslKey);
      // if (sslCert && sslKey) {
      //     let port = sslPort ? sslPort : 4443;
      //     console.log("Port is :" + port);
      //     SSL(sslKey, sslCert, port);
      // }
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
