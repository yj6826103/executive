<template>
  <div class="seatQueue"><!--机位进港队列-->
        <div class="rboxs">
            <el-table class="table table-border table-bg" :data="list" height='400' stripe>
                <el-table-column prop="flgtStm" label="计划时间" min-width='120'></el-table-column>
                <el-table-column prop="flgtFlightNo" label="航班号"></el-table-column>
                <el-table-column prop="flgtDCityCode" label="出发地"></el-table-column>
                <el-table-column prop="flgtRegCode" label="飞机注册号"></el-table-column>
                <el-table-column prop="flgtActypeCode" label="机型"></el-table-column>
                <el-table-column prop="aircraftCategory" label="飞机类型"></el-table-column>
                <el-table-column prop="flgtOpStnd" label="运行机位"></el-table-column>
                <el-table-column prop="flgtParkingStnd" label="停场机位"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import qs from "qs"

export default {
    props:['date'],
    data() {
        return {
            list:[],
        }
    },
     mounted() {
        this.getData()
    },
    methods:{
        getData(){
            let _this = this
            _this.$http.post(
                '/monitor/queryStndQueue', 
                qs.stringify({date: _this.date}), 
                {headers: { Authorization: localStorage.getItem("token")}}
            ).then(res=> {
                if(res.data.status == "100"){
                    _this.list = res.data.data.list
                    for(let i of _this.list){
                        i.flgtStm=i.flgtStm?i.flgtStm.substring(0,16):''
                    }
                }
            }).catch(err=>{console.log(err)});
        }
    }
};
</script>

<style scoped>
.seatQueue{
    max-height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
}
.rboxs{
    padding: 5px 15px
}
</style>
