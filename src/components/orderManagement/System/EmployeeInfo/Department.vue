<template>
  <div class="department">
    <el-form :model="data" border :rules="rules" ref="data" label-width="113px">
      <el-form-item label="部门名称：" prop="deptName">
        <el-input v-model="data.deptName" style="width:230px;display: table;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('data')">保存</el-button>
        <el-button @click="resetForm('data')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props:['department','rename'],
  data() {
    return {
      data: {},
      rules: {
        deptName: [{ required: true, message: '必填项', trigger: 'blur' }],
      }
    }
  },
  mounted() {
    if(this.department != null){
      this.data = this.department
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.rename) {
            // 新增
            _this.update()
          } else {
            // 修改
            _this.add()
          }
        } else {
          return false
        }
      })
    },
    // 新增下属部门
    add(){
      let _this = this
      _this.$http
        .post('/department', JSON.stringify({deptPid:_this.data.deptPid,deptName:this.data.deptName}), {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          if (res.data.status === 100) {
            _this.$notify.success({
              title: '系统提示',
              message: '保存成功'
            })
            _this.$emit('success')
          } else {
            _this.$notify.error({
              title: '系统提示',
              message: res.data.message
            })
          }
        })
        .catch(e => _this.$notify.error({ title: '系统提示', message: e }))
    },
    // 重命名
    update(){
      let _this = this
      _this.$http
        .put('/department', JSON.stringify({deptId:_this.data.deptId,deptName:this.data.deptName}), {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          if (res.data.status === 100) {
            _this.$notify.success({
              title: '系统提示',
              message: '保存成功'
            })
            _this.$emit('success')
          } else {
            _this.$notify.error({
              title: '系统提示',
              message: res.data.message
            })
          }
        })
        .catch(e => _this.$notify.error({ title: '系统提示', message: e }))
    }
  }
}
</script>
<style>
.department .el-input__inner {
  border: 1px solid #dcdfe6 !important;
  padding-left: 15px !important;
  height: 40px !important;
}
</style>
