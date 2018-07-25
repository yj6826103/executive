<template>
  <div class="staffInfo"><!--员工信息-->   
        <div class="box">
            <div class="lbox">
                <div class="ybq">
                    <span>信息列表</span><br>
                </div>
            </div>
            <div class="rbox minrbox">
                <div class="infobox">
                    <div class="rbbq">
                        <div class="tit gray"><i class="el-icon-caret-right gray"></i>姓名</div>
                        <div class="cen">
                            <input type="text" v-model="userName" class="inputText R_text" placeholder="请输入">
                        </div>
                    </div>
                    <div class="rbbq">
                        <div class="tit gray"><i class="el-icon-caret-right gray"></i>账号</div>
                        <div class="cen">
                            <input type="text" v-model="userLoginname"  @keyup="toUpperCase" class="inputText R_text" placeholder="请输入">
                        </div>
                    </div>
                    <div class="flexOld" style="margin-right:10px">
                        <el-button type="primary" @click="getData" icon="el-icon-search">查 询</el-button>
                    </div>
                    <div class="flexOld">
                        <el-button type="success" @click="synchro">用户同步</el-button>
                    </div>
                </div>
                <el-table class="table table-border table-bg" :data="page.list" stripe>           
                    <el-table-column prop="userName" label="姓名" ></el-table-column>
                    <el-table-column prop="userLoginname" label="账号" ></el-table-column>
                    <!-- <el-table-column prop="deptName" label="部门" ></el-table-column> -->
                </el-table>
                <el-pagination style="padding:10px 0 10px " 
                    v-if="page.total>page.pageSize" 
                    @current-change="currentPage"
                    :page-size="page.pageSize"
                    background 
                    layout="prev, pager, next,jumper" 
                    :total="page.total">
                </el-pagination>
            </div>
        </div>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName:null,
      userLoginname:null,
      deptUserList:[],
      page:{
        pageNum:1,
        pageSize:10,
        total:0
      }
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    toUpperCase(){//小写变大写
      this.userLoginname=this.userLoginname.toUpperCase()
    },
    currentPage(currentPage) {
      this.page.pageNum = currentPage
      this.getData()
    },  
    synchro(){//用户同同步
        this.$http({
            url: "/itfUser/callItfUser",
            method: "get",
            headers: { Authorization: localStorage.getItem("token") }
          })
        .then(res => {
            if(res.status==200){
                this.$message({
                    showClose: true,
                    message: '同步成功',
                    type: 'success'
                });
            }
        })
        .catch(e => {
            console.log(e)
        });
    },  
    getData(){
      let _this = this;
      _this.$http.get("/itfUser/findUser",{
            params:{
              userName:_this.userName,
              userLoginname:_this.userLoginname
            },
            headers: {
              Authorization: localStorage.getItem("token"),
              page: _this.page.pageNum,
              limit: _this.page.pageSize
            }
          }
        )
        .then(res => {console.log(res)
          if (res.data.status === 100 || res.data.status === 402) {
            _this.page = res.data.data
          } else {
            _this.page.total = 0
            _this.page.list = []
          }
        })
        .catch(e => {
            console.log(e)
        });
    },
  }
}
</script>

<style scoped>
.inputText{
    width:100%
}
.infobox{
    display: flex;
    margin-bottom: 20px
}
.rbbq{
    flex: 1;
    margin-right:10px
}
</style>
