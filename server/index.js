const express = require('express')
const app = express()
const path = require('path')
// const swaggerJsdoc = require('swagger-jsdoc')
// const swaggerui = require('swagger-ui-express')

app.use(require('cors')()) //注意顺序 先usecors 再require?
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./routes/admin/category')(app)
require('./routes/admin/goods')(app)

require('./plugins/db')(app)

// var options = {
//   definition: {
//     openapi:'3.0.0',
//     info: {
//       title:'仿王者荣耀全栈项目',
//       version:'1.0.0',
//       description:`个人学习使用`
//     }
//   },
//   apis:[path.join(__dirname,'./routes/*/*.js')]
// }

// var swaggerSpec = swaggerJsdoc(options)
// app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerSpec))

  //图片上传
  const multer = require('multer')
  const upload = multer({ dest:__dirname + '/uploads'})
  //upload.single()表示单个文件的上传 此处的file为network的formdata 名字可改(el的upload查看)
  app.post('/api/admin/upload',upload.single('file'),async(req,res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

app.listen(3000,() => {
  console.log('http://localhost:3000');
})