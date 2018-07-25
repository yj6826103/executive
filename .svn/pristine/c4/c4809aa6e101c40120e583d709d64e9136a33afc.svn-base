<template>
  <div class="fileManagement">
    <div class="infoBox">
        <div class="info-nav">
            <div class="ybq">
                <span>机队备案</span>
            </div>
            <ul>
                <el-badge v-show="priceNumber>0" :value="priceNumber"></el-badge>
                <li v-for="(item,index) in tabDatas" :class="{on:active==index}" @click="setCur(item.iscur,index)">                   
                    <a>{{item.text}}</a>
                </li>               
            </ul>
        </div>  
        <component :is="iscur" @trendsPriceNumber="trendsPriceNumber"></component>      
    </div>
    
  </div>
</template>

<script>

import PutOnRecord1 from "./PutOnRecord/PutOnRecord1";
import PutOnRecord2 from "./PutOnRecord/PutOnRecord2";
import PutOnRecord3 from "./PutOnRecord/PutOnRecord3";
export default {
  components: {
    PutOnRecord1,
    PutOnRecord2,
    PutOnRecord3
  },
  data(){
      return {
         active:0,
         iscur:'PutOnRecord1',
         tabDatas:[
             {text:'待审批',iscur:'PutOnRecord1'},
             {text:'已批复',iscur:'PutOnRecord2'},
             {text:'已驳回',iscur:'PutOnRecord3'},
        ],
        priceNumber:''
      }
  },
  methods: {
        setCur(item,index) {                  
            this.iscur=item
            this.active=index
        },
        trendsPriceNumber(item){
            this.priceNumber=item                   
        }
  }
};

</script>
<style scoped>
.el-badge{
    left: 57px;
    top: -10px;
    position: absolute;
}
.info-nav ul {
    position: relative;
}
</style>

