<template>
  <div class="approve"><!--已批准-->
      <div class="yuding-cen">
          <el-table class="table table-border table-bg" :data="datas" stripe :row-class-name="tableRowClassName">
                <el-table-column :label="$t('Ordernumber')" min-width='60px'><!--订单编号-->
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" placement="top">
                            <div slot="content" v-text="scope.row.orderNo"></div>
                            <i class="el-icon-tickets" @click='jump(scope.row)'></i>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="orderRegCode" :label="$t('msg.AircraftregistrationNO')" ></el-table-column><!--飞机注册号-->
                <el-table-column prop="orderActypeCode" :label="$t('msg.Aircrafttype')" ></el-table-column><!--飞机型号-->
                <el-table-column prop="date1" :label="$t('Scheduleddate')" min-width='100px'></el-table-column><!--预订日期-->
                <el-table-column prop="orderDArptCode" :label="$t('msg.Cityfrom')" ></el-table-column><!--出发地-->
                <el-table-column prop="sta" :label="$t('msg.ScheduledArrival')" min-width='100px'></el-table-column><!--计划进港日期-->
                <el-table-column prop="orderArptName" :label="$t('ParkingAirport')" ></el-table-column><!--停靠机场-->
                <el-table-column prop="std" :label="$t('msg.ScheduledDeparture')" min-width='100px'></el-table-column><!--计划出港日期-->
                <el-table-column prop="orderAArptCode" :label="$t('msg.Cityto')" ></el-table-column><!--目的地-->
                <el-table-column prop="orderStay" :label="$t('dockingtime')" ></el-table-column><!--停靠时间-->
                <el-table-column prop="orderPostponeNum" :label="$t('Delaytimes')" ></el-table-column><!--延期次数-->
                <el-table-column :label="$t('Ordertype')" ><!--订单类型-->
                    <template slot-scope="scope">
                        <label v-if="scope.row.orderType==1">{{scope.row.orderType==1?$t('Add'):''}}</label><!--新增-->
                        <label v-if="scope.row.orderType==2">{{scope.row.orderType==2?$t('Recent.Delay'):''}}</label><!--延期-->
                        <label v-if="scope.row.orderType==3">{{scope.row.orderType==3?$t('Modify'):''}}</label><!--修改-->
                        <label v-if="scope.row.orderType==0">{{scope.row.orderType==0?$t('cancel'):''}}</label><!--取消-->
                    </template>
                </el-table-column>
                <el-table-column :label="$t('operation')" ><!--操作-->
                    <template slot-scope="scope">
                        <button v-if="scope.row.orderFlgtStatus !=1 " class="button warning" @click="modOrder(scope.row)">{{$t('Recent.Delay')}}</button>
                        <button v-else class="button">{{$t('Recent.Delay')}}</button>
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
        <el-dialog :title="$t('Orderdetails')" 
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
import qs from "qs";
import orderDetail from "./orderDetail"
export default {
    components: {
        orderDetail
    },
    data () {
        return {
           datas:[],
           totalNumber:0,//总条数
           pagesize:10,//每页的数据条数
           currentPages:1,//默认开始页面
           judNum:false,//判断分页
           showDialog:false,
           NumberWarning:'NumberWarning',
        }
    },
    mounted () {
        this. getdatas()
    },
    methods: {
        setDatas(item){
            this.$store.commit("get_ChooseOrder",item);
            if(item.orderFlgtStatus=="2"){
                this.$store.commit("set_bled",true)
            }
            for (let i = 0; i < item.basDocs.length; i++) {
                if (item.basDocs[i].docType == "飞行计划申请单") {
                    this.$store.commit("get_FlightPlanList",item.basDocs[i]);
                    this.$store.commit("set_FlightPlanListName",item.basDocs[i].docName);
                    this.$store.commit("set_FlightPlanListNewName",item.basDocs[i].attName);
                    this.$store.commit("set_FlightPlanListAddress",item.basDocs[i].docAddress)
                }
                if (item.basDocs[i].docType == "航班时刻批复") {
                    this.$store.commit("get_TimeReply", item.basDocs[i]);
                    this.$store.commit("set_TimeReplyName",item.basDocs[i].docName);
                    this.$store.commit("set_TimeReplyNewName",item.basDocs[i].attName);
                    this.$store.commit("set_TimeReplyAddress",item.basDocs[i].docAddress)
                }
                if (item.basDocs[i].docType == "机库申请确认函") {
                    this.$store.commit("get_ConfirmationLetter",item.basDocs[i]);
                    this.$store.commit("set_ConfirmationLetterName",item.basDocs[i].docName);
                    this.$store.commit("set_ConfirmationLetterNewName",item.basDocs[i].attName);
                    this.$store.commit("set_ConfirmationLetterAddress",item.basDocs[i].docAddress)
                }
            }
            if (item.orderIsappliedHangar == "2") {
                this.$store.commit("set_isApplyFor", '1');
                this.$store.commit("set_disabledReason", false);
            } else {
                this.$store.commit("set_isApplyFor", '2');
                this.$store.commit("set_disabledReason", true);
            }
            //console.log(item.orderIsappliedHangar)
            this.$store.commit("set_orderRegCode",item.orderRegCode)//注册号
            this.$store.commit("set_orderActypeCode",item.orderActypeCode)//机型
            this.$store.commit("set_orderArptCode",item.orderArptCode)//机场
            this.$store.commit("set_orderHangar",item.orderHangar)
            this.$store.commit("set_orderIsappliedHangar",item.orderIsappliedHangar)
            this.$store.commit("set_disabledFalse",false)
            this.$store.commit("set_orderSta",item.orderSta)
            this.$store.commit("set_orderStd",item.orderStd)
            this.$store.commit("set_newdates",item.orderStd)//延迟 计划出港日期
            this.$store.commit("get_orderOerdertype", item.orderOerdertype);
            this.$store.commit("get_orderStay", item.orderStay);
        },
        modOrder(item){            
            this.setDatas(item)
            this.$router.push({ path: "/menu/deferred" });                       
        },
        currentPage(currentPage){
             this.currentPages=currentPage
            this.getdatas()
        },
        jump(item){
            this.$store.commit('get_details',item)
            this.showDialog=true
        },
        getdatas(){
             var param=qs.stringify({
                orderStatus:'3'
            })
            this.$http({
                method: "post",
                url: "/bizOrder/selectOrderApprove",    
                data:param,            
                headers: {
                    'Authorization':localStorage.getItem("token"),
                    'page':this.currentPages,
                    'limit':this.pagesize
                    }
            })
            .then(response => {
                // console.log(response.data.data.list)
                if(response.data.status==100){
                    this.totalNumber=parseInt(response.data.data.total)
                    this.datas=response.data.data.list
                    for(let i of this.datas){
                        i.orderSta=i.orderSta?i.orderSta.substring(0,16):''
                        i.orderStd=i.orderStd?i.orderStd.substring(0,16):''
                    }                    
                     if(parseInt(response.data.data.total)>10){
                       this.judNum=true
                    }else{
                        this.judNum=false
                    }
                   
                }     
            })
            .catch(error => {
                console.log(error);
            });
        },
        tableRowClassName({row}) {
            if (row.orderWarn>0) {
                return 'NumberWarning';
            }
            return '';
        }
    }

}
</script>
