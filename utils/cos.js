//获取COS对象
const Bucket = 'gongming-1256575297'; // 这里填你存储桶名称
const Region = 'ap-beijing'; // 填你的地域名称
const COS = require('../lib/cos-wx-sdk-v5.js')
const cos = new COS({
  SecretId: 'AKIDsb7PUMrKQGqTs2wc1A3g4C5jCSVLiMYX',
  SecretKey: 'xhEXcWDgwzrVv87tRlslZCm9JDsHQIuF',
});
// 上传文件
const uploadFile = (filePath, callback) => {
  let filename = filePath.substr(filePath.lastIndexOf('/') + 1);
  cos.postObject({
    Bucket: Bucket,
    Region: Region,
    Key: filename,
    FilePath: filePath,
    onProgress: info => {
      console.log(JSON.stringify(info));
    }
  }, (err, data) => {
    console.log(err);
    if (err === null) {
      callback(data);
    } else {
      wx.hideLoading();
      wx.showToast({
        title: '上传失败',
        icon: 'none'
      })
    }
  });
}
module.exports = {
  uploadFile,
}
