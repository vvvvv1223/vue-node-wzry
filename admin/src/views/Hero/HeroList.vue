<template>
  <div>
    <h3>英雄列表</h3>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="称号"></el-table-column>
      <el-table-column prop="avator" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.avator" style="height:3rem;">
      </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="$router.push(`/heros/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
          <el-button @click="delCat(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('heros')
      this.items = res.data
    },
    delCat(row) {
      this.$confirm(`操作将永久删除英雄${row.name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const res = this.$http.delete(`heros/${row._id}`)
        this.items = res.data
        this.fetch()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  },
}
</script>

<style>
</style>