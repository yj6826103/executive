<template>
  <div class="statisticAnalysis">
    <div class="infoBox">
        <div class="info-nav">
            <div class="ybq">
                <span>机位预订统计</span>
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

import StandBookingStatisticChart from "./StandBookingStatisticChart";
import StandBookingStatisticList from "./StandBookingStatisticList";
import DelayApplyStatisticList from "./DelayApplyStatisticList";
export default {
  components: {
    StandBookingStatisticChart,
    StandBookingStatisticList,
    DelayApplyStatisticList
  },
  data(){
      return {
         active:0,
         iscur:'StandBookingStatisticChart',
         tabDatas:[
             {text:'机位预订统计',iscur:'StandBookingStatisticChart'},
             {text:'预订审批统计表',iscur:'StandBookingStatisticList'} ,
             {text:'延期审批统计表',iscur:'DelayApplyStatisticList'}
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
