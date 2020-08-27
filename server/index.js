const express = require('express')
const app = express()
const path = require('path')

app.use(require('cors')()) //注意顺序 先usecors 再require?
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./routes/admin/category')(app)
require('./routes/admin/goods')(app)
require('./routes/admin/hero')(app)

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

app.listen(3000,() => {
  console.log('http://localhost:3000');
})