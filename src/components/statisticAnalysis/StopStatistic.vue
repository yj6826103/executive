<template><!--航班停场统计-->
  <div class="statisticAnalysis">
    <div class="infoBox">
        <div class="info-nav">
            <div class="ybq">
                <span>航班停场统计</span>
            </div>
            <ul>
                <li v-for="(item,index) in tabDatas" :class="{on:active==index}" @click="setCur(item.iscur,index)">
                    <a>{{item.text}}</a>
                </li>
            </ul>
        </div>  
        <component :is="iscur"></component>      
    </div>
    
  </div>
</template>

<script>

import StopStatisticChart from "./StopStatisticChart";
import StopStatisticList from "./StopStatisticList";
import StopStatisticFlightList from "./StopStatisticFlightList";
export default {
  components: {
    StopStatisticChart,
    StopStatisticList,
    StopStatisticFlightList
  },
  data(){
      return {
         active:0,
         iscur:'StopStatisticChart',
         tabDatas:[
             {text:'航班停场统计',iscur:'StopStatisticChart'},
             {text:'停场时长统计列表',iscur:'StopStatisticList'},
             {text:'航班停场统计列表',iscur:'StopStatisticFlightList'}
        ]
      }
  },
  methods: {
      setCur(item,index) {                  
            this.iscur=item
            this.active=index
        }
  }
};

</script>

