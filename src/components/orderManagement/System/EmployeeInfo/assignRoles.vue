<template>
  <div class="assignRoles">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedRoleIds" @change="handleCheckedRolesChange">
        <el-checkbox v-for="role in roles" :label="role.roleId" :key="role.roleId">{{role.roleName}}</el-checkbox>
    </el-checkbox-group>
    <div class="btnbox flexOld">
        <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props:['userId'],
  data() {
      return {
        checkAll: false,
        checkedRoleIds: [],
        roles: [],
        isIndeterminate: true
      };
    },
    mounted(){
      this.getData()
    },
    methods: {
      save(){
        let _this = this 
        if(_this.checkedRoleIds === null || _this.checkedRoleIds.length === 0){
          _this.$notify.warning({
            title: "提示",
            message: "请至少选择一个角色!"
          });
        }
        let list = []
        _this.checkedRoleIds.forEach(roleId => {
          let role = {userId:_this.userId,roleId:roleId}
          list.push(role)
        })
        _this.$http.post("/sysrole/saveUserRole",JSON.stringify(list),{
            headers: {
              Authorization: localStorage.getItem("token"),
              'Content-Type': 'application/json;charset=utf-8'
            }}).then(res => {
              if (res.data.status === 100) {
                _this.$notify.success({
                  title: '提示',
                  message: '保存成功'
                })
                _this.$emit('success')
              } else {
                _this.page.total = 0
                _this.$notify.error({
                  title: "提示",
                  message: res.data.message
                });
              }
        })
        .catch(e =>console.log(e));
      },
      handleCheckAllChange(val) {
        this.checkedRoleIds = val ? this.roles : [];
        this.isIndeterminate = false;
      },
      handleCheckedRolesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.roles.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length;
      },
      getData(){
        if (this.userId === null ||this.userId === undefined ||this.userId === "") {
            return;
        }
        let _this = this;
        _this.$http.get("/sysrole/selectAllRoleByUserId", {
          params: {userId: _this.userId},
          headers: { Authorization: localStorage.getItem("token")}
        }).then(res => {
          if (res.data.status === 100 || res.data.status === 402) {
            _this.roles = res.data.data.list
            _this.roles.forEach(role => {
              if(role.userId != null && role.userId != ''){
                _this.checkedRoleIds.push(role.roleId)
              }
            })
          } else {
            _this.roles = [];
            _this.$notify.error({
              title: "提示",
              message: res.data.message
            });
          }
        }).catch(e =>console.log(e));
      }
    }
}
</script>

<style scoped>
.assignRoles {
    margin: 15px;
}
.btnbox{
    bottom: 20px;
    text-align: center;
    position: absolute;
    right: 110px;
    cursor: pointer;
    z-index: 999999999;
}
</style>
