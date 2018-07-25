<template>
  <div class="seatAlarm"><!-- 机位占用预警 -->
    <div class="box">
        <div class="chart">
            <div style="text-align: center;line-height: 400px;">正在加载...</div>
        </div>
    </div>
</div>
</template>

<script>
import qs from "qs"
import echarts from 'echarts'
export default {
    props:['date'],
    data(){
        return {
            chart:null,
            xList:[],
            aYList:[],
            dYList:[],
            fYList:[],
            ly:0,
            stndw:'',
            ry:0
        };
    },
    mounted(){
        this.get_stndw()
        this.getData()
    },
    methods:{
        get_stndw(){//获取飞机类型
            var param=qs.stringify({
               dicType:'STNDW_CODE'
            })
            this.$http({
                method: 'post',
                url: '/dict/selectAirptPark',
                data:param,
                headers:{
                    'Authorization':localStorage.getItem("token")
                }
            })
            .then(response=>{
                if(response.status==200){
                    if(response.data.status==100){
                        this.stndw=response.data.data
                        console.info(this.stndw[0])
                    }else{
                        this.$message.error("获取信息失败");
                    }
                }else{
                    this.$message.error("获取信息失败");
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        getData(){
            let _this = this
            _this.$http.post('/monitor/queryStndAlarm', qs.stringify({date: _this.date}), 
                {headers: { Authorization: localStorage.getItem("token")}
            }).then(res=> {
                if(res.data.status == "100"){
                    // console.log(res.data.data)
                    _this.xList = res.data.data.xList
                    _this.aYList = res.data.data.aYList
                    _this.dYList = res.data.data.dYList
                    _this.fYList = res.data.data.fYList
                    _this.ly = res.data.data.ly
                    _this.ry = res.data.data.ry
                    _this.initChart()
                }
            }).catch(err=>{console.log(err)});
        },
        initChart(){
            this.chart = echarts.init(document.querySelector('.chart'))
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter:function (params) {
                        return params[0].axisValue+'</br>'+params[0].seriesName+':' +params[0].value + '</br>'+params[1].seriesName+':' + Math.abs(params[1].value) + '</br>'+params[2].seriesName+':' +params[2].value;
                    }
                },
                legend: {
                    data:['进港航班量','出港航班量','计划机位使用量']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.xList,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '航班量',
                        min: -this.ly,
                        max: this.ly,
                        axisLabel: {
                            formatter: function (value, index) {
                                return Math.abs(value)+'次';
                            }
                        }
                    },
                    {
                        type: 'value',
                        name: '机位使用量',
                        min: -this.ry,
                        max: this.ry,
                        axisLabel: {
                            formatter: function (value, index) {
                                return value>=0 ? value+'个':'';
                            }
                        }
                    }
                ],
                series: [
                    {
                        name:'进港航班量',
                        type:'bar',
                        stack: 'one',
                        data:this.aYList
                    },
                    {
                        name:'出港航班量',
                        type:'bar',
                        stack: 'one',
                        data:this.dYList
                    },
                    {
                        name:'计划机位使用量',
                        type:'line',
                        yAxisIndex: 1,
                        data:this.fYList,
                        markLine:{
                            symbol:'circle',
                            itemStyle:{
                                normal:{lineStyle:{type:'solid',width:2},label:{show:true,position:'middle',formatter: '{b}'}}
                            },
                            effect:{
                                show: true,
                                loop: true,
                                period: 0,
                                scaleSize : 2,
                                color : null,
                                shadowColor : null,
                                shadowBlur : null
                            },
                            data:[
                                {
                                    name: 'A级预警('+this.stndw[0].dicCode+')',
                                    yAxis: this.stndw[0].dicCode.substring(1),
                                    itemStyle: {normal: {color: this.stndw[0].dicCh}}
                                },
                                {//dicCh  substring(3)
                                    name: 'B级预警('+this.stndw[1].dicCode+')',
                                    yAxis:  this.stndw[1].dicCode.substring(1),
                                    itemStyle: {normal: {color: this.stndw[1].dicCh}}
                                },
                                {
                                    name: 'C级预警('+this.stndw[2].dicCode+')',
                                    yAxis:  this.stndw[2].dicCode.substring(1),
                                    itemStyle: {normal: {color: this.stndw[2].dicCh}}
                                }
                            ]
                        }
                    },
                ]
            })
        },
    }
};
</script>

<style scoped>
canvas{
    width: 100% !important;
    height: 100% !important;
}
.seatAlarm{
    height: 510px;
    overflow: auto
}
.seatAlarm .box{
    height: 100%;
}
.seatAlarm .box .chart{
    width: 100% !important;
    height: 100%;
}
.chart div{
    width: 100% !important;
    height: 100% !important;
}
</style>
