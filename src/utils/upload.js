import request from "./request.js";
const FILE_TYPE_MAP = {
  RESOURCE: 1,
  IMAGE: 2,
  VIDEO: 3
};
const noop = function() {}
function generateFileKey(fileName) {
  var suffixReg = /\.\w+$/;
  var fileSuffix = (fileName.match(suffixReg) || [''])[0];
  var time = Date.now();
  var random = Math.floor(Math.random() * 10000);
  var rdStr = ('0000' + random).substr(-4);
  var key = time + '_' + rdStr;
  return key + fileSuffix;
}
const defaultOptions = {
  filePath: '', //要上传文件资源的路径。
  fileType: 'resource', //文件类型，可选值有 image video resource
  success: noop,
  fail: noop,
  progress: noop
}
function upload(options) {
  options = Object.assign({}, defaultOptions, options);
  if (!options.filePath) {
    console.error("必须指定filePath字段上传");
    return Promise.reject();
  }
  if (!options.fileType) {
    console.error("必须指定fileType字段上传，可选值有 image video resource");
    return Promise.reject();
  }
  if (!FILE_TYPE_MAP[options.fileType.toUpperCase()]) {
    console.error("fileType字段的可选值有 image video resource");
    return Promise.reject();
  }
  const zeusUrl = process.env.VUE_APP_ZEUS;
  return request({
    url: zeusUrl + "/api/oss/policy/" + FILE_TYPE_MAP[options.fileType.toUpperCase()],
    method: 'get',
    params: {}
  }).then(res => {
    console.log('file upload token1:', res);
    const {
      host,
      accessid,
      policy,
      signature,
      dir,
      ossUrl
    } = res;
    const {
      filePath,
      success,
      fail,
    } = options;
    let fileKey = generateFileKey(filePath);
    let uploadOpt = {
      url: host,
      formData: {
        OSSAccessKeyId: accessid,
        policy: policy,
        signature: signature,
        key: dir + '/' + fileKey,
        success_action_status: '200'
      },
      success: function(res) {
        success({res: res, url: ossUrl + fileKey})
      },
      fail
    }
    uploadOpt.filePath = filePath;
    uploadOpt.name = "file";
    return uploadOpt;
  }).then((uploadOpt) => {
    const uploadTask = uni.uploadFile(uploadOpt);
    uploadTask.onProgressUpdate(options.progress);
    return uploadTask;
  });
}

export default upload;