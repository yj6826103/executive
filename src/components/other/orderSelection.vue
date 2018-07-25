<template><!--弹框-->
  <div class="orderSelection">
       <!-- <div class="popbox"> -->
        <div class="popbox-cen dd-box">
            <div class="rBox">
                <div class="tbox">
                    <table class="table table-border table-bg">
                        <thead class="fixedThead">
                            <tr>
                                <th style="width:50px">{{$t('Select')}}</th>
                                <th style="width:150px">{{$t('msg.Flight')}}</th>
                                <th style="width:150px">{{$t('Date')}}</th>
                                <th style="width:150px">{{$t('msg.Cityfrom')}}</th><!--出发地-->
                                <th style="width:150px">{{$t('msg.FlightType')}}</th>
                                <th style="width:100px;padding-right:20px">{{$t('msg.AirRoutetype')}}</th>
                            </tr>
                        </thead>
                        <tbody class="scrollTbody">
                          <tr v-for="(item,index) in informations" :class="index%2==0?'':back" @dblclick='changedblclick(item)'>
                            <td style="width:50px">
                                <input type="radio" :value="item" v-model="ChooseOrder">
                            </td>
                            <td style="width:150px">{{item.flgtFlightNo}}</td>
                            <td style="width:150px">{{item.flgtStm}}</td>
                            <td style="width:150px">{{item.flgtDCityCode}}</td>
                            <td style="width:150px">{{item.flgtFlgttypeName}}</td>
                            <td style="width:100px">{{item.flgtDOrI}}</td>
                        </tr>
                          <div class="showDataClass" v-show="showData"><i class="el-icon-info"></i>{{$t('NoData')}}</div>
                        </tbody>                        
                    </table>
                </div>
                <div class="btnbox">
                  <el-button @click="close" plain>{{this.$t('cancel')}}</el-button>
                  <el-button type="primary" @click="selected">{{this.$t('Confirm')}}</el-button>                    
                </div>
            </div>
        </div>
    <!-- </div> -->
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import qs from "qs";
export default {
  props: ["message"],
  data() {
    return {
      informations: [], //查找的值集合
      ChooseOrder: {}, //选定的集合
      back: "back",
      showData: true,
    };
  },
  computed: {
    ...mapGetters(["planNum"])
  },
  mounted() {
    this.getdatas()
    this.$store.dispatch("dataInit");
    this.$store.commit('set_dateRenovate','false')
  },
  methods: {
    ...mapMutations(["clickSelectFalse"]),
    close() {//关闭弹框
      this.$emit('additional') 
      this.$store.commit('set_dateRenovate','true')
    },
    changedblclick(item){
      let ChooseOrder={}
          ChooseOrder.orderADOrI=item.flgtDOrICode
          ChooseOrder.orderSta=item.flgtStm
          ChooseOrder.orderDArptCode=item.flgtDCityCode
          ChooseOrder.orderSlvlCode=item.flgtFlgttypeCode
          ChooseOrder.orderAFlgtNo=item.flgtFlightNo,
        this.$store.commit("get_ChooseOrder", ChooseOrder);
        // this.$emit('additional',1)
        this.$store.commit('set_dateRenovate','true')
        if(ChooseOrder.orderADOrI!='')this.close()
    },
    selected() {//选择订单
       
      if(!this.ChooseOrder.flgtStm){
        this.$notify.warning({
            title: this.$t('Prompt'),
            message: "请选择一条数据",
            offset: 100
        })
        return
      }else{
        let ChooseOrder={}
          ChooseOrder.orderADOrI=this.ChooseOrder.flgtDOrICode
          ChooseOrder.orderSta=this.ChooseOrder.flgtStm
          ChooseOrder.orderDArptCode=this.ChooseOrder.flgtDCityCode
          ChooseOrder.orderSlvlCode=this.ChooseOrder.flgtFlgttypeCode
          ChooseOrder.orderAFlgtNo=this.ChooseOrder.flgtFlightNo,
        this.$store.commit("get_ChooseOrder", ChooseOrder);
        this.$emit('additional',1)
        this.$store.commit('set_dateRenovate','true')
      } 
    },
    getdatas() {//订单列表  
      let param=qs.stringify({
        flgtFlightNo:this.message.flgtFlightNo,//'N666GL',//
        flgtRegCode:this.message.flgtDCityCode,
        flgtAOrD:'进港'
      })
      this.$http({
            url: "/bizOrder/selectFlatInfo",
            method: "post",
            data: param,
            headers: { Authorization: localStorage.getItem("token") }
          })
          .then(response => {//console.log(response.data.data);
            if(response.data.status==100){
              this.showData=false
              for(let i of response.data.data){
                i.flgtStm=i.flgtStm.substring(0,16)
              }          
              this.informations=response.data.data
              
            }
          })
          .catch(error => {
              console.log(error);
          });
    },

  }
};
</script>
<style scoped>
.tbox .table{
  border-collapse:collapse;
  border-spacing:0; 
  width: 100%;
}
.fixedThead{
    display: block;
    width: 100%;
}
.table-border{
  margin-bottom:0 !important
}
.scrollTbody{
    display: block;
    height: 200px;
    overflow: auto;
    width: 100%;
}
.orderSelection{
  display: flow-root;
}
button.el-button.el-button--primary {
    width:20%;
    font-size: 14px
}
button.el-button.el-button--default.is-plain {
  width:20%
}
.dd-box .tbox {
    height: 250px;
    overflow: auto;
}
.dd-box .fbox {
  overflow: auto;
  height: 220px;
}
.dd-box .fbox .tablebox {
  overflow: auot;
  height: 280px;
}
.dd-box .btnbox {
  text-align: center;
  padding-bottom:10px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}
.dd-box .btnbox button{
  font-size: 16px
}
.popbox .popbox-cen {
  background: #fff;
  height: 425px;
}
</style>
