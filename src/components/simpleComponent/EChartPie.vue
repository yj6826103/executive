<!-- 停靠机场 下拉组件：返回选择的机场名称，返回触发事件名称：changed -->
<template>
    <div class="pie">

    </div>
</template>
<script>
import qs from "qs"
export default {
    props:['arpt'],
    data(){
        return{
            stopArptList:[],
            stopArpt:'',
        }
    },
    mounted () {
        if(this.arpt!=null){
            this.stopArpt = this.arpt
        }
        this.getStopArptList()
    },
     methods: {
        getStopArptList(){
            let _this = this;
            _this.$http.post(
               '/dict/selectAirptPark',
               qs.stringify({dicType:'SYS_ARPT_CODE'}),
               {headers:{'Authorization':localStorage.getItem("token")}}
           ).then(function(res) {
               if(res.data.status == '100'){
                   _this.stopArptList = res.data.data
               }else{
                   // TODO获取失败
               }
           }).catch(function(err) {
               // TODO获取失败
               console.log(err)
            });
        },
        selected(){
            this.$emit('success',this.stopArpt);
        }
     }
}
</script>
<style scoped>
.pie{
    width:100%;
}
</style>

