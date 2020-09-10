const express = require('express')
const app = express()
const path = require('path')

app.set('secret','ewfnehrfoiew93d3')

app.use(require('cors')()) //注意顺序 先usecors 再require?
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./routes/admin/category')(app)
require('./routes/admin/goods')(app)
require('./routes/admin/hero')(app)
require('./routes/admin/article')(app)
require('./routes/admin/adminUser')(app)

require('./plugins/db')(app)

  //图片上传
  const multer = require('multer')
  const upload = multer({ dest:__dirname + '/uploads'})
  //upload.single()表示单个文件的上传 此处的file为network的formdata 名字可改(el的upload查看)
  app.post('/api/admin/upload',upload.single('file'),async(req,res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  //登录接口
  app.post('/api/admin/login',async(req,res) => {
    const { username,password } = req.body
    //1.根据用户名找用户
    const AdminUser = require('./models/AdminUser')
    const user = await AdminUser.findOne({ username }).select('+password')
    if(!user) {
      return res.status(422).send({
        message:'用户不存在'
      })
    }
    //2.校验密码
    const isValid = require('bcrypt').compareSync(password,user.password)
    if(!isValid) {
      return res.status(422).send({
        message:'密码错误'
      })
    }
    //3.返回token
    var jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id },app.get('secret'))
    res.send({ token })
  })

app.listen(3000,() => {
  console.log('http://localhost:3000');
})