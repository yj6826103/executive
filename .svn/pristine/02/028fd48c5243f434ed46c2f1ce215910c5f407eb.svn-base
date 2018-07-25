<!-- 停靠机场 下拉组件：返回选择的机场名称，返回触发事件名称：changed -->
<template>
<div class="companyList">
    <el-select v-model="company" clearable filterable  placeholder="请选择" @change="selected()">
        <el-option
            v-for="item in companyList"
            :key="item.comId"
            :label="item.comName"
            :value="item.comId">
        </el-option>
    </el-select>
    </div>
</template>
<script>
import qs from "qs"
export default {
    props:['company1'],
    data(){
        return{
            companyList:[],
            company:'',
        }
    },
    mounted () {
        if(this.company1!=null){
            console.info(this.company1);
            this.company= this.company1
        }
        this.getStopArptList()
    },
     methods: {
        getStopArptList(){
            let _this = this;
            _this.$http.post(
                '/company/getCompany',
               qs.stringify(),
               {headers:{'Authorization':localStorage.getItem("token")}}
           ).then(function(res) {
            //    console.info(res.data.data);
               if(res.data.status == '100'){
                   _this.companyList = res.data.data
               }else{
                   // TODO获取失败
               }
           }).catch(function(err) {
               // TODO获取失败
               console.log(err)
            });
        },
        selected(){
             console.info(this.company);
            this.$emit('change',this.company);
        }
     }
}
</script>
