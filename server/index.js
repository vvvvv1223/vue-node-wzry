const express = require('express')
const app = express()
const path = require('path')
const jwt = require('jsonwebtoken');
const assert = require('http-assert')
const AdminUser = require('./models/AdminUser')

app.set('secret','ewfnehrfoiew93d3')


app.use(require('cors')()) //注意顺序 先usecors 再require
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/admin/',express.static(__dirname + '/admin'))

// app.use('/',async(req,res,next) =>{
//   const token = String(req.headers.authorization || '').split(' ').pop()
//   assert(token, 401, '请提供jwt token 先登录')
//   const { id } = jwt.verify(token,app.get('secret'))
//   assert(id, 401, '无效的jwt token')
//   req.user = await AdminUser.findById(id)
//   assert(req.user, 401, '请先登录')
//   await next()
// })

require('./routes/admin/category')(app)
require('./routes/admin/goods')(app)
require('./routes/admin/hero')(app)
require('./routes/admin/article')(app)
require('./routes/admin/adminUser')(app)

require('./plugins/db')(app)


  //图片上传
  const multer = require('multer');
  const adminUser = require('./routes/admin/adminUser');
  const upload = multer({ dest:__dirname + '/uploads'})
  //upload.single()表示单个文件的上传 此处的file为network的formdata 名字可改(el的upload查看)
  app.post('/api/admin/upload',upload.single('file'),async(req,res) => {
    const file = req.file
    file.url = `http://112.74.103.116/admin/uploads/${file.filename}`
    res.send(file)
  })


  //登录接口
  app.post('/api/admin/login',async(req,res) => {
    const { username,password } = req.body
    //1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user,422,'用户不存在')
    // if(!user) {
    //   return res.status(422).send({
    //     message:'用户不存在'
    //   })
    // }
    //2.校验密码
    const isValid = require('bcrypt').compareSync(password,user.password)
    assert(isValid,422,'密码错误')
    // if(!isValid) {
    //   return res.status(422).send({
    //     message:'密码错误'
    //   })
    // }
    //3.返回token 
    const token = jwt.sign({ id: user._id },app.get('secret'))
    res.send({ token })
  })



  // 错误处理 使用http-assert抛出异常 在这里统一使用message处理 进行提示
  app.use( async (err,req,res,next) => {
    res.status(err.statusCode || 500).send({
      message:err.message
    })
  })
app.listen(3000,() => {
  console.log('http://localhost:3000');
})