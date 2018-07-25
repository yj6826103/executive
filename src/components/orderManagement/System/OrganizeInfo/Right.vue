<template>
   <div class="ygbox">
          <div class="yg-box">
            <div class="rbbq item">
              <div class="tit">员工姓名</div>
              <div class="cen">
                <input class="text" type="text">
              </div>
            </div>
            <div class="rbbq item">
              <div class="tit">员工编号</div>
              <div class="cen">
                <input class="text" type="text">
              </div>
            </div>
            <div class="flexOld">
              <el-button type="primary" icon="el-icon-search">查 询</el-button>
            </div>
          </div>
          <div class="tableBox">
            <el-table class="table table-border table-bg" :data="acTeamInfoList" stripe @selection-change="handleSelectionChange">
                <el-table-column type="selection" label="全选"></el-table-column>
                <el-table-column prop="actCompanyName" label="姓名" ></el-table-column>
                <el-table-column prop="actRegCode" label="员工编号" ></el-table-column>
                <el-table-column prop="actActypeCode" label="账号" ></el-table-column>
                <el-table-column prop="actOwnType" label="部门" ></el-table-column>
                <el-table-column prop="actOwner" label="状态" ></el-table-column>                    
            </el-table>
          </div>
        </div>
</template>

<script>
export default {
    data () {
      return {
        acTeamInfoList:[],
        checkedList:[],
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.checkedList = val;
      }
    }
}
</script>
