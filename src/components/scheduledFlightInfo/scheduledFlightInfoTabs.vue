<template>
  <div class="scheduledFlightInfo">
    <div class="infoBox">
        <div class="info-nav">
            <div class="ybq">
                <span>通知发布</span>
            </div>
            <ul>
                <li v-for="(item,index) in tabDatas" :key="index" :class="{on:active==index}" @click="setCur(item.iscur,index)">
                    <a>{{item.text}}</a>
                </li>
            </ul>
        </div>  
        <component :is="iscur"></component>      
    </div>
    
  </div>
</template>

<script>

import alertNotice from "./tab/alertNotice";
import defaultNotice from "./tab/defaultNotice";
import defaultNoticeReleased from "./tab/defaultNoticeReleased";

export default {
  components: {
    defaultNotice,
    alertNotice,
    defaultNoticeReleased
  },
  data(){
      return {
         active:0,
         iscur:'alertNotice',
         tabDatas:[
             {text:'警示通知(已发布)',iscur:'alertNotice'},
             {text:'违约通知(待发布)',iscur:'defaultNotice'},
             {text:'违约通知(已发布)',iscur:'defaultNoticeReleased'}
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

<style>

</style>
