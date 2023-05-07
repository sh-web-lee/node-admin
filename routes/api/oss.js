const express = require('express');
const multer = require('multer'); // multer是一个node.js文件上传中间件,有了他才能读取到文件
let co = require('co'); // co 模块，它基于 ES6 的 generator 和 yield ，让我们能用同步的形式编写异步代码。
let fs = require('fs'); // fs可以对文件进行操作
const OSS = require('ali-oss');
const path = require('path');
const { OSSConfig } = require('../../config/config')

const router = express.Router({
  mergeParams: true
});

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-beijing',
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: OSSConfig.OSSAccessKeyId,
  accessKeySecret: OSSConfig.OSSAccessSecret,
  // 填写Bucket名称。
  bucket: 'lee-blog-img',
})

let upload = multer({ // 不太清楚这是什么，但是必须有这一段
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/uploads'); // 必须在上一级有public文件夹，public文件夹内也必须有uploads，当然，文件夹的名称可以随便修改，只需要写对就可以了
    },
    filename: function(req, file, cb) {
      var changedName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
      cb(null, changedName);
    }
  })
});

router.post('/img', upload.single('file'), (req, res) => {
  console.log(req.file)
  // 文件路径
  var filePath = './' + req.file.path;
  // 文件类型
  var temp = req.file.originalname.split('.');
  var fileType = temp[temp.length - 1];
  var lastName = '.' + fileType;
  // 构建图片名
  var fileName = Date.now() + lastName;
  // 图片重命名
  var key = fileName;
  // console.log(filePath, lastName, fileName)
  // 阿里云 上传文件 
  co(function*() {
    client.useBucket(OSSConfig.OSSBucket);
    var result = yield client.put('/images/'+key, filePath); // 这是上传的代码
    var imageSrc = `https://img.lijianyang.vip/${result.name}`
    // 上传之后删除本地文件
    fs.unlinkSync(filePath);
    res.json({
      code: 200,
      msg: 'success',
      data: {
        url: imageSrc
      }
    })
    // res.end(JSON.stringify({ code: 1, msg: '上传成功', path: imageSrc }));
  }).catch(function(err) {
      // 上传之后删除本地文件
      // 如果你发现上传失败了，多检查一下配置参数是否有问题，参数出问题的可能性比较大
      fs.unlinkSync(filePath);
      res.end(JSON.stringify({ code: 0, msg: '上传失败', error: JSON.stringify(err) }));
  });

  // // console.log(req, res)
  // const result = client.put('test.png', path.join(__dirname, '../../public/images/person.jpg'))
  // res.json({
  //   code: 0,
  //   msg: 'success',
  //   data: result
  // })
})

module.exports = router