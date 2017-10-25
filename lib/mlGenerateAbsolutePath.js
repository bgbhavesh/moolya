/*
generate the absolute path for static files using the relative path
 */

let removeStartingSlash = (path)=>{
  if(path[0]=='/') path = path.split('/')[1];
  return path;
}


let generateAbsolutePath = (relativePath,folderName)=>{
  if(!relativePath) return;
  let baseUrl = 'https://' + Meteor.settings.public.minio.minioConfig.endPoint + ':'
                    + Meteor.settings.public.minio.minioConfig.port + '/'
                    + Meteor.settings.public.minio.minioConfig.bucketName + '/';

  relativePath = removeStartingSlash(relativePath);

  if(folderName) relativePath = folderName + '/' + relativePath;

  let absolutePath = baseUrl + relativePath;

  return absolutePath;
};


module.exports = generateAbsolutePath;
