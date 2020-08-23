const express = require('express')
const app = express()
const path = require('path')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')

app.use(require('cors')()) //注意顺序 先usecors 再require?
app.use(express.json())

require('./routes/admin/category')(app)
require('./plugins/db')(app)

var options = {
  definition: {
    openapi:'3.0.0',
    info: {
      title:'仿王者荣耀全栈项目',
      version:'1.0.0',
      description:`个人学习使用`
    }
  },
  apis:[path.join(__dirname,'./routes/*/*.js')]
}

var swaggerSpec = swaggerJsdoc(options)
app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerSpec))

app.listen(3000,() => {
  console.log('http://localhost:3000');
})