<template><!--机位余量统计-->
  <div class="statisticAnalysis">
    <div class="infoBox">
        <div class="info-nav">
            <div class="ybq">
                <span>机位余量统计</span>
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

import DelayStatisticList1 from "./DelayStatisticList1";
import DelayStatisticList2 from "./DelayStatisticList2";
// import StopStatisticFlightList from "./StopStatisticFlightList";
export default {
  components: {
    DelayStatisticList1,
    DelayStatisticList2
    
  },
  data(){
      return {
         active:0,
         iscur:'DelayStatisticList1',
         tabDatas:[
             {text:'早八点晚四点半余量统计',iscur:'DelayStatisticList1'},
             {text:'机位余量统计',iscur:'DelayStatisticList2'}
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

