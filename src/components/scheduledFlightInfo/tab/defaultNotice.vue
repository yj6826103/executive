<template>
  <div class="box">
    <div class="rbox">
        <el-table border class="table table-border table-bg" :data="bizOrderList" width='100%'>               
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="订单编号" >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" placement="top">
                        <div slot="content" v-text="scope.row.orderNo"></div>
                        <i class="el-icon-document"></i>
                    </el-tooltip>
                </template>
            </el-table-column>                
            <el-table-column prop="date1" label="订单日期" ></el-table-column>
            <el-table-column prop="orderAFlgtNo" label="航班号" ></el-table-column>                
            <el-table-column prop="orderRegCode" label="飞机注册号"></el-table-column>
            <el-table-column prop="orderActypeCode" label="飞机机型" ></el-table-column>
            <el-table-column prop="orderComNameId" label="代办公司"></el-table-column>
            <el-table-column prop="sta" label="进港时间"></el-table-column>
            <el-table-column prop="orderArptName" label="停靠机场"></el-table-column>
            <el-table-column prop="std" label="出港时间" ></el-table-column>
            <el-table-column prop="orderStay" label="约定停场时长" min-width='100'></el-table-column>
            <el-table-column prop="orderPostponeNum" label="延期次数"></el-table-column>
            <el-table-column prop="orderWarn" label="警示次数"></el-table-column>
            <el-table-column prop="orderBoc" label="违约次数"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="warning" class="publish" @click="toRelease(scope.row.orderNo)">发布</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination 
            v-if="judNum" 
            @current-change="currentPage"
            :page-size="pagesize" 
            background 
            layout="prev, pager, next,jumper" 
            :total="totalNumber">
        </el-pagination>
    </div>
    <el-dialog title="违约发布" 
        :visible.sync="selectFalse" 
        :modal-append-to-body="false"
        :append-to-body="true" 
        top='10vh'
        width="800px">
        <span slot="footer" class="dialog-footer">
            <el-button @click="selectFalse = false">取 消</el-button>
        </span>
        <defaultRelease v-if="selectFalse" :orderNo="orderNo" v-on:success="getData"></defaultRelease>
    </el-dialog>
    <el-dialog title="订单详情" 
        :visible.sync="showDialog" 
        :modal-append-to-body="false"
        :append-to-body="true" 
        top='10vh'
        width="1250px">
        <order-detail v-if="showDialog"></order-detail>
    </el-dialog>

  </div>
</template>

<script>

import defaultRelease from '../../other/DefaultRelease'
import { mapGetters,mapMutations} from "vuex"
import orderDetail from "../../reservation/orderDetail"

export default {
    components: {
        defaultRelease,
        orderDetail
    },
    data(){
        return {
            back:'back',
            bizOrderList:[],
            showData:true,
            totalNumber:1,//总条数
            pagesize:10,//每页的数据条数
            currentPages:1,//默认开始页面
            judNum:false,//判断分页
            orderNo:'',
            showDialog:false,
            selectFalse:false
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        currentPage(currentPage){//触发
            this.currentPages=currentPage;
            this.getData();
        },
        getData(){
            let _this = this;
            _this.$http.post("/bizOrder/selectBreakNotify",{},{headers:{'limit':_this.pagesize,'page':_this.currentPages,'Authorization':localStorage.getItem("token")}}
            ).then((res)=>{
                // console.info(res);
                if(res.data.status == '100'){
                   _this.showData = false
                    _this.bizOrderList = res.data.data.list
                    _this.totalNumber =parseInt(res.data.data.total)
                    if(_this.totalNumber>10){
                    _this.judNum = true
                    }
                    else{
                        this.judNum=false
                    }
                } else if(res.data.status == '402'){
                    _this.bizOrderList = [];
                    _this.totalNumber = 1;
                    _this.showData = true;
                }
            }).catch(function(err) {
                console.log(err);
            });
            this.selectFalse=false
        },
        toRelease(orderNo){
            this.orderNo = orderNo;
            this.selectFalse=true;
        },
        showDetail(bizOrder){
            this.$store.commit('get_details',bizOrder)
            // this.$router.push({ path: "/menu/details" });
            this.showDialog=true
       }
    }
}
</script>
<style scoped>
.rbox{
    margin-left: 0;
}
</style>