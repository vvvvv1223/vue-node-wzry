<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories"
                   multiple>
          <el-option v-for="item in categories"
                     :key="item._id"
                     :label="item.name"
                     :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor id="editor"
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                    v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      categories: []
    }
  },
  props: {
    id: {}
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch() //有id才获取详情
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`articles/${this.id}`, this.model)
      } else {
        res = await this.$http.post('articles', this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get(`categories`)
      this.categories = res.data
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
      //   axios({
      //     url: "https://fakeapi.yoursite.com/images",
      //     method: "POST",
      //     data: formData
      //   })
      //     .then(result => {
      //       let url = result.data.url; // Get url from response
      //       Editor.insertEmbed(cursorLocation, "image", url);
      //       resetUploader();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     })
    }
  }
}
</script>