<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="9" show-score v-model="model.scores.difficult" style="margin-top:0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" show-score v-model="model.scores.skills" style="margin-top:0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9" show-score v-model="model.scores.attack" style="margin-top:0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" show-score v-model="model.scores.survive" style="margin-top:0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false" :on-success="afterUpload">
              <img v-if="model.avator" :src="model.avator" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 5rem;"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.goods1" multiple>
              <el-option v-for="item in goods" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.goods2" multiple>
              <el-option v-for="item in goods" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" :rows="2" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" :rows="2" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" :rows="2" v-model="model.teamTips"></el-input>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skill">
          <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false" :on-success="res => $set(item,'icon',res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 5rem;"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="info" @click="model.skills.splice(i,1)">删除技能</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:0.5rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      goods: [],
      item: {
        icon: '',
      },
      // skills:[],
      model: {
        name: '',
        avator: '',
        scores: {
          difficult: 0,
        },
      },
    }
  },
  props: {
    id: {}
  },
  created() {
    this.fetchCategories()
    this.fetchGoods()
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`heros/${this.id}`, this.model)
      } else {
        res = await this.$http.post('heros', this.model)
      }
      this.$router.push('/heros/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`heros/${this.id}`)
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories() {
      const res = await this.$http.get(`categories`)
      this.categories = res.data
    },
    async fetchGoods() {
      const res = await this.$http.get(`goods`)
      // console.log(res);
      this.goods = res.data
    },
    afterUpload(res) {
      this.model.avator = res.url  //将avator默认设空可以用这种 不然就用$set
      // this.$set(this.model,'avator',res.url)
    },
    // upSkillsIcon(res) {
    //   this.$set(this.item,'icon',res.url)  // ?? 为什么不行
    //   console.log(res);
    // } 
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>