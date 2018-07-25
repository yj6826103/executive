<template><!--机位余量-->
	<div class="statisticAnalysis">
	<div class="yanqiBox">
            <div class="box">
                <div class="lbox">
                    <div class="ybq">
                        <span>查询条件</span>
                    </div>
                </div>
                <div class="rbox">
                    <div class="infobox flexTongJ">                
                        <div class="rbbq">
                            <div class="tit"><i class="el-icon-caret-right"></i>统计日期</div>
                            <div class="cen">
                                <el-date-picker :clearable="false" filterable v-model="beginDate" type="datetime" placeholder="选择开始日期" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
                            </div>
                        </div>   
                                     
                        <div class="flexTongJButton">
                            <el-button type="primary" icon="el-icon-search" @click="currentPage1">查  询</el-button>
                        </div>
                        <div class="rbbq rbbqFlex"></div>  
                        <div class="rbbq rbbqFlex"></div>  
                    </div>
                </div>
            </div>
            <div class="box table-box">
                <el-table class="table table-border table-bg" :data="dataList" stripe>
                    <el-table-column  prop="DATE_DATE" label="日期" sortable></el-table-column> 
                    <el-table-column  prop="G450及以下" label="G4" sortable></el-table-column>
                    <el-table-column prop="G550及以下" label="G5" sortable></el-table-column>
                    <el-table-column prop="G650及以下" label="C及650" sortable></el-table-column>
                </el-table>
                <el-pagination 
                    v-if="judNum" 
                    @current-change="currentPage"
                    :page-size="pagesize" 
                    background 
                    layout="prev, pager, next,jumper" 
                    :total="totalNumber">
                </el-pagination>
            </div>
        </div>
	</div>
</template>

<script>
import qs from "qs"
// import stopArpt from "../simpleComponent/StopArpt"
import downloadPost from "../../common/js/download-post"
export default {
    components: {
        // stopArpt,
    },
    computed: {
 
    },
    data(){
        return{
           totalNumber:1,//总条数
           pagesize:10,//每页的数据条数
           currentPages:1,//默认开始页面
           judNum:false,//判断分页
           beginDate:this.$formatDate(new Date(),"yyyy-MM-dd HH:mm"),
           dataList:[],
        //    stopArptList:[],
        }
    },
    mounted () {
      this.getdatas()
    },
    methods: {
        currentPage(currentPage) {
        //触发
        this.currentPages = currentPage;
        this.getdatas();
        },
        currentPage1(){
                this.currentPages=1
                this.totalNumber=0
                this.getdatas()
            },  
        getdatas() {
        let _this = this;
        let param = qs.stringify({
            'nowDate':_this.beginDate//停靠机场
        });
        _this.$http
            .post("/statisticAnalysis/selectStndMargin", param, {
            headers: {
                Authorization: localStorage.getItem("token"),
                page: _this.currentPages,
                limit: _this.pagesize
            }
            })
            .then(res => {
                //  console.info(res.data.data.list);
            if (res.data.status == 100) {
                        this.showData=false
                        this.totalNumber=parseInt(res.data.data.total)
                        this.dataList=res.data.data.list                
                        if(parseInt(res.data.data.total)>10){
                        this.judNum=true
                        }else{
                            this.judNum=false
                        } 
                    } else if(res.data.status == 402){
                        this.dataList=[]
                        this.judNum=false
                    }
            })
            .catch(function(err) {
                // this.dataList=[]
            console.log(err);
        });
        },
        exportDatas() {
        let _this = this;
        let param = qs.stringify({
            'nowDate':_this.beginDate//停靠机场
        });
        downloadPost(_this,"/statisticAnalysis/selectStndMargin", param, {
            headers: {
                Authorization: localStorage.getItem("token")
                },
                responseType: 'arraybuffer'
            });
        },      
    }
};
</script>