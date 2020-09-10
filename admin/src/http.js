import axios from 'axios'
import Vue from 'vue'
const http = axios.create({
  baseURL:'http://localhost:3000/api/admin'
})

http.interceptors.response.use(res => {
  return res
},err => {
  // console.log(err.response);
  // console.log(err.response.data.message);
  if(err.response.data.message) {
    Vue.prototype.$message({
      type:'error',
      message:err.response.data.message  //el-ui
    })
  }
  return Promise.reject(err)
})

export default http