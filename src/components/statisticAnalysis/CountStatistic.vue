<template><!--航班量统计-->
  <div class="statisticAnalysis">
    <div class="infoBox">
        <div class="info-nav">
            <div class="ybq">
                <span>航班量统计</span>
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

import CountStatisticChart from "./CountStatisticChart";
import CountStatisticList from "./CountStatisticList";

export default {
  components: {
    CountStatisticChart,
    CountStatisticList,
  },
  data(){
      return {
         active:0,
         iscur:'CountStatisticChart',
         tabDatas:[
             {text:'航班量统计',iscur:'CountStatisticChart'},
             {text:'航班量统计列表',iscur:'CountStatisticList'}
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
