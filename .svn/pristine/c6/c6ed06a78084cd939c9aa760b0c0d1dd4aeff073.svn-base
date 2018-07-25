<template>
  <div class="editRole">
    <el-form class="dict" :model="dict" border :rules="rules" ref="dict" label-width="100px">
      <el-form-item label="字典编码:" prop="dicCode">
        <el-input style="width:230px;border:1px solid #ccc" v-model="dict.dicCode"></el-input>
      </el-form-item>
      <el-form-item label="中文:" prop="dicCh">
        <el-input style="width:230px;border:1px solid #ccc" v-model="dict.dicCh"></el-input>
      </el-form-item>
      <el-form-item label="中文简称:" prop="dicCnShotcut">
        <el-input style="width:230px;border:1px solid #ccc" v-model="dict.dicCnShotcut"></el-input>
      </el-form-item>
      <el-form-item label="英文;">
        <el-input style="width:230px;border:1px solid #ccc" v-model="dict.dicEn"></el-input>
      </el-form-item>
      <el-form-item label="英文简称:">
        <el-input style="width:230px;border:1px solid #ccc" v-model="dict.dicEnShotcut"></el-input>
      </el-form-item>
      <el-form-item label="顺序:" prop="dicOrder">
        <el-input-number style="width:230px;border:1px solid #ccc" v-model="dict.dicOrder" :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="所属机场:" prop="dicArpt">
        <stop-arpt style="width:230px;border:1px solid #ccc" :arpt="dict.dicArpt" @success="setDicArpt"></stop-arpt>
      </el-form-item>
      <!-- <el-form-item label="状态" prop="dicStatus">
        <el-radio-group v-model="dict.dicStatus">
          <el-radio label="0">启用</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="resetForm('dict')">重置</el-button>
        <el-button type="primary" @click="submitForm('dict')">保存</el-button>        
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import stopArpt from '../../../simpleComponent/StopArpt'
export default {
  props: ['oldDict'],
  components: {
    stopArpt
  },
  data() {
    return {
      dict: {},
      rules: {
        dicCh: [{ required: true, message: '必填项', trigger: 'blur' }],
        dicCode: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (this.oldDict != null) {
      this.dict = this.oldDict
    }
  },
  methods: {
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          // if (_this.dict.dicId == null) {
          //   // 新增
          //   _this.add()
          // } else {
            // 修改
            _this.modify()
          // }
        } else {
          return false
        }
      })
    },
    add() {
      let _this = this
      _this.$http
        .post('/dict', JSON.stringify(_this.dict), {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          if (res.data.status === 100) {
            _this.$notify.success({
              title: '提示',
              message: '添加成功'
            })
            _this.$emit('close')
          } else {
            _this.$notify.error({
              title: '提示',
              message:'添加失败'
            })
          }
        })
        .catch(e => console.log(e))
    },
    modify() {
      let _this = this
      _this.$http
        .put('/dict', JSON.stringify(_this.dict), {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          if (res.data.status === 100) {
            _this.$notify.success({
              title: '提示',
              message: '保存成功'
            })
            _this.$emit('close')
          } else {
            _this.$notify.error({
              title: '提示',
              message: '保存失败'
            })
          }
        })
        .catch(e =>console.log(e))
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    setDicArpt(arpt) {
      this.dict.dicArpt = arpt
    }
  }
}
</script>

