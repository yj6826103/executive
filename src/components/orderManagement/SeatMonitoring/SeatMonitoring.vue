<template>
  <div class="seatMonitoring"><!--机位监控平面状态图-->
      <div class="yudingBox">
            <div class="yuding-info">
                <div class="info-nav">
                    <div class="ybq">
                        <span>机位监控平面状态图</span>
                    </div>
                    <ul>                        
                        <li v-for="(item,index) in tabDatas" :key="index" :class="{on:active==index}" @click="togger(item.iscur,index)">
                            <a>{{item.text}}</a>
                        </li>
                        <el-badge v-show="parseInt(navigatepageNums)>0" :value="navigatepageNums" class="elBadge"></el-badge>
                    </ul>
                </div>   
                <component :is="iscur"></component>
            </div>
        </div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import qs from 'qs'
import SeatPlan from './page/seatPlan'
// import SeatLive from './page/seatLive'
// import SeatQueue from './page/seatQueue'------initQueryStndControl
// import SeatAlarm from './page/seatAlarm'
// import SeatInfo from './page/seatInfo'
import ProcessControl from './page/processControl'
// import InterfaceSettings from './page/InterfaceSettings'
import BigFlightToSmall from './page/BigFlightToSmall'
export default {
    components: {
        SeatPlan,
        // SeatLive,
        // SeatQueue,
        // SeatAlarm,
        // SeatInfo,
        ProcessControl,
        // InterfaceSettings
        BigFlightToSmall,        
    },
    
    data(){
        return {
            active:0,
            iscur:'SeatPlan',
            tabDatas:[
                {text:'机位平面状态图',iscur:'SeatPlan'},
                // {text:'机位占用预警',iscur:'SeatAlarm'},
                // {text:'消息',iscur:'SeatInfo'},
                {text:'进程管控',iscur:'ProcessControl'},
                // {text:'界面设置',iscur:'InterfaceSettings'}
                {text:'机型冲突预警',iscur:'BigFlightToSmall'},

            ],
            navigatepageNums:0
        }
    },
    mounted(){
        this.initQueryStndControl()
    },
    methods: {
        togger(item,index){
           this.iscur=item
           this.active=index
           this.initQueryStndControl()
        },
        initQueryStndControl(){            
            // console.log(typeof this.navigatepageNums)
            let param = qs.stringify({})
            this.$http.post("/monitor/selectBigFlightToSmallLevel",param,{
                headers: {'Authorization':localStorage.getItem("token")}
            })
            .then(response => {console.log(response.data.data)
                if(response.data.data!=null){
                    if (response.data.status == 100) {
                        this.navigatepageNums=response.data.data.length
                    }else{
                        this.navigatepageNums=0
                    }
                }         
            })
            .catch(error => {});
        }
    }
};
</script>
<style scoped>
.right-btn{
    float: right;
}
button.el-button.el-button--info {
    height: 50px;
}
.info-nav ul{
    position: relative;
}
.info-nav .elBadge{
    position: absolute;
    right: 5px;
    top: -10px;
}
</style>