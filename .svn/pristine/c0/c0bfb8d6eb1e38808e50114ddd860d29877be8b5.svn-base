<template>
  <div class="fileManagement">
    <div class="infoBox">
        <div class="info-nav">
            <div class="ybq">
                <span>客户审批</span>
            </div>
            <ul>
                <el-badge v-show="priceNumber>0" :value="priceNumber"></el-badge>
                <li v-for="(item,index) in tabDatas" :key="index" :class="{on:active==index}" @click="setCur(item.iscur,index)">
                    <a>{{item.text}}</a>
                </li>               
            </ul>
        </div>  
        <component :is="iscur"  @trendsPriceNumber="trendsPriceNumber"></component>      
    </div>
    
  </div>
</template>

<script>

import CustomerApproval1 from "./customerApproval/customerApproval1";
import CustomerApproval2 from "./customerApproval/customerApproval2";
import CustomerApproval3 from "./customerApproval/customerApproval3";
import CustomerApproval4 from "./customerApproval/customerApproval4";
export default {
  components: {
    CustomerApproval1,
    CustomerApproval2,
    CustomerApproval3,
    CustomerApproval4
  },
  data(){
      return {
         active:0,
         iscur:'CustomerApproval1',
         tabDatas:[
             {text:'待审批',iscur:'CustomerApproval1'},
             {text:'已批复',iscur:'CustomerApproval2'},
             {text:'已驳回',iscur:'CustomerApproval3'},
             {text:'协议到期预警',iscur:'CustomerApproval4'}
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