<template><!--机队信息维护-->
     <div class="maintenance">
           <div class="box">
            <div class="lbox">
                <div class="ybq">
                    <span>{{$t('company.Fleetinformation')}}</span>
                </div>
            </div>
            <div class="rbox" style="min-height:460px">
                <div class="query">
                    <div class="rbbq">
                      <div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.AircraftregistrationNO')}}</div>
                      <div class="cen">
                        <input type="text" style="width:100%" @keyup="toUpperCase" v-model="query" :placeholder="$t('pleaseenter')">                  
                      </div>
                    </div>
                    <el-button class="querys" @click="currentPage1" type="primary" icon="el-icon-search">{{$t('submit')}}</el-button>
                    <el-button class="querys" @click="addOrder" type="warning" plain icon="el-icon-plus">{{$t('Add')}}</el-button>
                </div>             
                <div class="table-box1">
                    <el-table width='100%' class="table table-border table-bg" :data="list">                     
                      <el-table-column prop="actRegCode" :label="$t('msg.AircraftregistrationNO')" ></el-table-column><!--飞机注册号-->
                      <el-table-column prop="actActypeCodes" :label="$t('msg.Aircrafttype')" ></el-table-column><!--飞机型号号-->
                      <el-table-column prop="actOwnType" :label="$t('company.Owned')+'/'+$t('company.Entrusted')" ></el-table-column><!--所属/委托-->
                      <el-table-column prop="actOwner" :label="$t('company.AircraftOwner')"></el-table-column><!--飞机所有人-->
                      <el-table-column :label="$t('company.Aircraft')"><!--航空器国籍登记证-->
                          <template slot-scope="scope">
                              <el-button type="text" @click="showImage(scope.row.docAddress,fileType)">{{scope.row.docName}}</el-button>
                          </template>
                      </el-table-column>
                      <el-table-column :label="$t('status')">
                          <template slot-scope="scope">
                              <!-- <span v-if="scope.row.status == STATUS.SAVE">审批中</span> -->
                              <span v-if="scope.row.status == '2'||scope.row.status=='5'||scope.row.status=='6'">{{$t('Submissionaudited')}}</span><!--提交待审核-->
                              <span v-if="scope.row.status == STATUS.PASS" class='successs'>{{$t('Approved')}}</span><!--审核通过-->
                              <el-tooltip placement="top" effect="light" v-if="scope.row.status == STATUS.REJECT">
                                  <div slot="content" v-text="scope.row.actCheckReason"></div>
                                  <span class='warning'>{{$t('Dismissal')}}</span><!--驳回-->
                              </el-tooltip>
                          </template>
                      </el-table-column>
                      <el-table-column :label="$t('operation')">
                        <template slot-scope="scope">
                            <button class="btn primary" @click="modOrder(scope.row)">{{$t('Modify')}}</button>
                            <button v-if="scope.row.status == '2'" class="btn warning" @click="delOrder(3,scope.$index)">{{$t('Delete')}}</button><!--提交待审批-->
                            <button v-if="scope.row.status == '5'||scope.row.status == '6'" class="btn" >{{$t('Delete')}}</button>
                            <button v-if="scope.row.status == STATUS.PASS" class="btn warning" @click="delOrder(5,scope.$index)">{{$t('Delete')}}</button><!--修改-->
                            <button v-if="scope.row.status == STATUS.REJECT" class="btn warning" @click="delOrder(3,scope.$index)">{{$t('Delete')}}</button><!--驳回-->
                            <!-- <button v-else class="btn">删除</button> -->
                        </template>
                    </el-table-column>
                    </el-table>
                </div>
                    <el-pagination 
                        v-if="judNum" 
                        @current-change="currentPage"
                        :page-size="pagesize" 
                        background 
                        layout="prev, pager, next,jumper" 
                        :total="totalNumber">
                    </el-pagination>
            </div>
        </div>
        <el-dialog :title="$t('Modify')+$t('company.Fleetinformation')" 
            :visible.sync="modselectFalse" 
            :modal-append-to-body="false"
            :append-to-body="true"
            width="585px"
            @close="modselect('取 消')"
            top='15vh'>
            <span slot="footer" class="dialog-footer">
              <el-button @click="modselect('取 消')">{{$t('cancel')}}</el-button>
            </span>
            <ModMaintainInfo :message='modOrders' v-if="modselectFalse" @submit='modselect'></ModMaintainInfo>
        </el-dialog>
        <!-- 新增订单 -->
        <el-dialog title="" 
            :visible.sync="addselectFalse" 
            :modal-append-to-body="false"
            :append-to-body="true"
            width='970px'
            top='10vh'>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addselect(null)">{{$t('cancel')}}</el-button>
            </span>
            <AddMaintainInfo @submit="addselect" v-if="addselectFalse"></AddMaintainInfo>
        </el-dialog>
    </div>  
</template>
<script>
import qs from 'qs'
import { mapGetters } from 'vuex'
import singleFileUpload from '../other/SingleFileUpload'
import ModMaintainInfo from './modMaintainInfo'
import AddMaintainInfo from './addMaintainInfo'
export default {
  components: {
    singleFileUpload,ModMaintainInfo,AddMaintainInfo
  },
  data() {
    return {
      list: [],
      msg: '',
      status: '',
      actOwner: '',
      fileType: 1,
      query:'',
      modselectFalse:false,
      totalNumber:0,//总条数
      pagesize:10,//每页的数据条数
      currentPages:1,//默认开始页面
      judNum:false,//判断分页 deleteOrder
      addselectFalse:false,
      modOrders:{}//传值
    }
  },
  computed: {
    ...mapGetters([
      'STATUS', 
      'FILE_SERVER_URL', 
      ])
  },
  methods: {
    // changeActOwner(index) {
    //   if (this.list[index].actOwnType == $t('company.Owned')) {//所属
    //     this.list[index].actOwner = this.actOwner
    //   }
    // },
    currentPage(currentPage){
        this.currentPages=currentPage
        this.getData()
    },
    currentPage1(){
        this.currentPages=1
        this.totalNumber=0
        this.getData()
    },
    modOrder(item){//修改订单
      // item.status=this.STATUS.SUBMIT
      this.modOrders=null
      this.modOrders=item
      this.modselectFalse=true
      // this.$refs.mods.initdata();
    },
    modselect(mod){//取消修改
      this.modselectFalse=false
      this.modOrders=null
      if(mod!=null){      
        this.getData()
      }
    },
    addOrder(){//新增订单
    //  console.log(localStorage.getItem('get_companyId'))
      if(localStorage.getItem('get_companyId')!=''){//判断ID，全部修改
        this.addselectFalse=true
      }else{
        this.$confirm('用户资料不全，请到用户资料页面修改！', this.$t('Prompt'), {
            confirmButtonText: this.$t('Confirm'),
            cancelButtonText: this.$t('cancel'),
        }).then(() => {
            this.$emit('setCur','UserInfoMod','0')
            return
        }).catch(()=>{});
        
      }
    },
    addselect(add){//取消新增
      this.addselectFalse = false
      if(add!=null){
        this.getData()
      }
    },
    delOrder(status,index){//删除
      this.$confirm(this.$t('is')+this.$t('Delete'), this.$t('Prompt'), {
        confirmButtonText: this.$t('Confirm'),
        cancelButtonText: this.$t('cancel')
      })
        .then(() => {
          this.dels(status,index)
        })
        .catch(() => {
          // console.log('删除失败')
        })
    },
    dels(status,index) {//console.log(this.list[index].actId)
      let _this = this
      if (_this.list[index].actId != null) {
        let param=qs.stringify({
          actId:_this.list[index].actId,
          status:status
        })
        this.$http({
          url: '/acteam/deleteAcTeamInfo',
          method: 'post',
          data:param,
          headers: { Authorization: localStorage.getItem('token') }
        }).then(res => {console.log(res)
          if (res.data.status == 100){ 
            _this.list.splice(index, 1)
            _this.$notify({
              title: this.$t('Prompt'),
              message: this.$t('Addsuccess'),
              type: 'success'
            })
            this.getData()
          }
        })
      } else {
        console.log('无法删除')
        // this.list.splice(index, 1)
      }
    },
    toUpperCase(){//小写变大写
      this.query=this.query.toUpperCase()
    },
    forActActypeCode(arr){
        arr.forEach(i=>{
          i.actActypeCode=i.actActypeCodes.toString()
        })
    },
    getData() {
      let _this = this
      _this.$http({
          url: '/acteam/selectAcTeamInfo',
          method: 'post',
          data:qs.stringify({actRegCode:this.query}),
          headers: { 
            Authorization: localStorage.getItem('token'),
            'page':this.currentPages,
            'limit':this.pagesize
          }
        })
        .then(res=> {//console.log(res.data.data.list)
         this.totalNumber=res.data.data.total;
          if (res.data.data != null) {
            if(parseInt(res.data.data.total)>10){
              this.judNum=true
            }else{
              this.judNum=false
            }
            for(let i of res.data.data.list){
              i.actActypeCodes=[]
              i.actActypeCodes.push(i.actActypeCode)
              // i.actActypeCode=i.actActypeCodes
            }
            _this.list = res.data.data.list
            _this.msg = res.data.data.msg
            _this.status = res.data.data.status
          
          }
        })
        .catch(err=> {
          console.log(err)
        })
    },
    showImage(id, type) {
      this.$alert('<img src="' +this.FILE_SERVER_URL +'/download.do?fileType=' +type +'&id=' +id +'" />',this.$t('preview'),{
          dangerouslyUseHTMLString: true,
          closeOnClickModal:true,
          callback: action => {}
        }
      )
    },
    save(flag) {
      let _this = this
      _this.$validator.validateAll().then(result => {
        if (result) {
          let _this = this
          let statusList = []
          if(flag != 2){
            _this.list.forEach(item => {
              statusList.push(item.status)
                item.status = _this.STATUS.SAVE
            })
          }
          this.forActActypeCode(_this.list)
          _this.$http({
              url: '/acteam/doSaveAcTeamInfo',
              method: 'post',
              data: JSON.stringify(_this.list),
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: localStorage.getItem('token')
              }
            }).then(res => {console.log(res)
              if (res.data.status == 100) {
                _this.getData()
                const h = _this.$createElement
                _this.$notify({
                  title: this.$t('Prompt'),
                  message: this.$t('Addsuccess'),
                })
              }else{
                _this.list.forEach((item,index) => {
                  item.status = statusList[index]
                })
              }
            }).catch(err=>{
              _this.$notify({
                  title: this.$t('Prompt'),
                  message: this.$t('erroperation')
                })
            })
        } else {
          _this.$notify.warning({
            title: this.$t('Prompt'),
            message: this.$t('Pleaseperfecttherequireditems'),
          })
        }
      })
    },   
  }
}
</script>
<style scoped>
 button.btn {
    color: #fff;
    padding: 5px;
    font-size: 12px;
}
.query{
  margin-bottom: 20px;
  display: block;
  height: 50px;
}
.query .rbbq{
  width:25%;
  float:left;
  margin-right:10px
}
.querys{
  height:48px;
  width:125px
}
.help {
  font-size: 12px;
  display: block;
  position: absolute;
  color: #ff3860;
}
.el-radio + .el-radio {
  margin-left: 0px;
}
button.warning {
  background-color: #ff3860 !important;
}
button.primary {
  background-color: #409eff !important;
}
span.successs {
  color: #67c23a;
}
span.warning{
  color: #ff3860;
}
</style>