<template>
  <div class="historicalDetail">
    <div class="detailBox" style="padding:0 10px">
        <el-table class="table table-border table-bg" height='400' :data="acTeamInfoList" stripe>
            <el-table-column :label="$t('Ordernumber')" ><!---订单编号-->
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p> {{ scope.row.hisOrderNo }}</p>
                        <i slot="reference" class="el-icon-tickets"></i>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="hisOrderOperationUser" :label="$t('msg.Operator')" ></el-table-column><!---用户名-->
            <el-table-column prop="hisOrderDArptCode" :label="$t('msg.Cityfrom')" ></el-table-column><!---出发地-->
            <el-table-column prop="hisOrderAArptCode" :label="$t('msg.Cityto')" ></el-table-column><!---目的地-->
            <el-table-column prop="ata" :label="$t('msg.Arrival')+$t('time')"  width="85"></el-table-column><!---进港时间-->
            <el-table-column prop="atd" :label="$t('msg.Departure')+$t('time')" width="85"></el-table-column><!---出港时间-->
            <el-table-column prop="orderType" :label="$t('type')" ></el-table-column><!---类型-->
            <el-table-column prop="hisOrderStatus" :label="$t('status')" ></el-table-column><!---状态-->
            <el-table-column prop="opTime" :label="$t('operation')+$t('Date')" width="85"></el-table-column><!---操作日期-->
            <el-table-column :label="$t('Changecontrast')" width="130"><!---变更对比-->
                <template slot-scope="scope">
                    <a v-if="scope.$index ==0" style="color:#909399">{{$t('Contrastiveinformation')}}</a><!---对比信息-->
                    <a v-else style="color:#f8891a" @click="historicalCompare(scope.row.hisOrderNo,scope.row.hisOrderHistoryId)">{{$t('Contrastiveinformation')}}</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!---变更对比-->
    <el-dialog :label="$t('Changecontrast')" 
        :visible.sync="historicalChanges" 
        :modal-append-to-body="false"
        :append-to-body="true" 
        top='10vh'
        width="80%">
        <historicalCompare v-if="historicalChanges" :historicalCompareInfo='this.historicalCompareInfo'></historicalCompare>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import historicalCompare from "../other/historicalCompare"
import qs from "qs";
export default {
    components: {
        historicalCompare
    },
  props:['historicalChangesInfo'],
  data() {
    return {
        showDialog:false,
        historicalChanges:false,//历史变更信息
        historicalCompareInfo:[{}],
       acTeamInfoList:[],
       checkedList:[],
       back:'back'
    }
  },
  mounted () {
     this.getDatas()
  },
  methods:{
 historicalCompare(no,id){
       this.historicalCompareInfo=[{
          no:no,
          id:id,
          way:'1'
        }],
        this.historicalChanges=true
    },
    handleSelectionChange(val) {
        this.checkedList = val;
    },
    getDatas(){
        let param =qs.stringify({
            hisOrderNo:this.historicalChangesInfo
        })
        this.$http({
            url: "/bizOrder/selectOrderHistory",
            method: "post",
            data: param,
            headers: { Authorization: localStorage.getItem("token") }
        }).then(response => {
            if (response.data.status == 100) {
                this.acTeamInfoList=response.data.data
            }
        }).catch(error => {
            console.log(error);
        });
    }
  },    
 }
</script>
