<template><!--航班量统计列表-->
	<div class="countStatistic">
		<div class="yanqiBox">
            <div class="box">
                <div class="lbox">
                    <div class="ybq">
                        <span>查询条件</span>
                    </div>
                </div>
                <div class="rbox">
                    <div class="infobox">
                        <div class="flexTongJ">
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>飞机机型</div>
                                <div class="cen">
                                <input  @keyup="toUpperCase" type="text" v-model="actypeCode" class="text" placeholder="请输入" clearable>
                                </div>
                            </div>
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>飞机注册号</div>
                                <div class="cen">
                                <input  @keyup="toUpperCase1" type="text" v-model="regCode" class="text" placeholder="请输入" clearable>
                                </div>
                            </div>    
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>航班号</div>
                                <div class="cen">
                                <input   @keyup="toUpperCase2" type="text" v-model="flightNo" class="text" placeholder="请输入" clearable>
                                </div>
                            </div>  
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>任务性质</div>
                                <div class="cen">
                                <FlgtType v-bind:flgtType="flgttypeCode" v-on:change="updateFlgttypeCode"></FlgtType>
                                </div>
                            </div>
                        </div>
                        <div class="flexTongJ">
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>计划日期</div>
                                <div class="cen">
                                    <el-date-picker :clearable="false" filterable v-model="beginDate" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                            </div>
                            <div class="rbbq">
                                <div class="tit">至</div>
                                <div class="cen">
                                    <el-date-picker :clearable="false"  filterable v-model="endDate" type="date" placeholder="选择结束时间" value-format="yyyy-MM-dd "></el-date-picker>
                                    <!-- <i class="el-icon-date"></i>  -->
                                </div>
                            </div>
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>进出港</div>
                                <div class="cen">
                                <el-select v-model="aOrd" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in aOrds"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>                     
                                </div>
                            </div>   
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>航班类别</div>
                                <div class="cen">
                                <el-select v-model="dOrI" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in dOrIs"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>                           
                                </div>
                            </div>  
                        </div>
                        <div class="flexTongJ">                                                    
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>停靠机场</div>
                                <div class="cen"> 
                                <stop-arpt v-bind:arpt="orderArptCode" v-on:success="updateOrderArptCode"></stop-arpt>
                                </div>
                            </div>
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>代理公司</div>
                                <div class="cen">
                                    <input @keyup="toUpperCase3"  type="text" v-model="companyCode" class="text" placeholder="代理公司" clearable>
                                </div>
                            </div>
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>出发地/目的地</div>
                                <div class="cen">
                                <input @keyup="toUpperCase4" type="text" v-model="cityCode" class="text" placeholder="出发地/目的地" clearable>
                                </div>
                            </div>
                            <div class="rbbq rbbqFlex">
                                <div class="btnbox">
                                    <el-button type="primary" icon="el-icon-search" @click="currentPage1">查  询</el-button>
                                </div>
                                <div class="btnbox">
                                    <el-button type="warning" @click="exportDatas"><span class="searchBtn"><i class="el-icon-upload"></i> 导出EXCEL</span></el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box table-box">
                <el-table class="table table-border table-bg" :data="dataList" stripe>
                    <el-table-column prop="rn" fixed label="序号" width="50" ></el-table-column>
                    <el-table-column prop="stm" label="计划时间" sortable></el-table-column>
                    <el-table-column prop="flightNo" label="航班号" sortable></el-table-column>
                    <el-table-column prop="regCode" label="飞机注册号" min-width="100" sortable></el-table-column>
                    <el-table-column prop="actypeCode" label="飞机机型" sortable></el-table-column>
                    <el-table-column prop="agentCom" label="代理公司"  sortable></el-table-column>
                    <el-table-column prop="flgttypeCode" label="任务性质" sortable></el-table-column>
                    <el-table-column prop="aOrd" label="进出港" sortable></el-table-column>
                    <el-table-column prop="dOrI" label="航班类别" sortable></el-table-column>
                    <el-table-column prop="city" label="目的地/出发地" min-width="140" sortable></el-table-column>
                    <el-table-column prop="arpt" label="停靠机场" sortable></el-table-column>
                    <el-table-column prop="opStnd" label="运行机位" sortable></el-table-column>
                    <el-table-column prop="parkingStnd" label="停场机位" sortable></el-table-column>
                    <el-table-column prop="crew" label="机组"  sortable></el-table-column>
                    <el-table-column prop="passenger" label="客人" sortable></el-table-column>
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
import { mapGetters, mapMutations } from "vuex";
import qs from "qs";
import stopArpt from "../simpleComponent/StopArpt";
import CpySlt from "../simpleComponent/CpySlt";
import FlgtType from "../simpleComponent/FlgtType";
export default {
  components: {
    CpySlt,
    FlgtType,
    stopArpt
  },
  data() {
    return {
      totalNumber: 1, //总条数
      pagesize: 10, //每页的数据条数
      currentPages: 1, //默认开始页面
      judNum: false, //判断分页
      stndLevelList:[],
      dataList: [],
      stopArptList: [],
      showData:true,
      beginDate: this.$formatDate(new Date(),"yyyy-MM-dd"),
      endDate:this.$formatDate(new Date(),"yyyy-MM-dd"),
      actypeCode: "",//机型
      flgttypeCode: "",//任务性质
      flightNo:"",//航班号
      dOrI:"",//航班类别
      dOrIs: [{
          value: '国内',
          label: '国内'
        }, {
          value: '国际',
          label: '国际'
        }],
      aOrd:"",//进出港
      aOrds: [{
          value: '进港',
          label: '进港'
        }, {
          value: '出港',
          label: '出港'
        }],
      regCode:"",//注册号
      orderArptCode: "PEK",//停靠机场
      companyCode: "",//公司
      cityCode:""//出发地 目的地
    };
  },
  created() {},
  mounted() {
    this.getdatas();
  },
  computed: {
    ...mapGetters(["selectFalse", "FILE_SERVER_URL"])
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
    updateCompanyCode(val) {
      this.companyCode = val;   //
    },
    toUpperCase(){//小写变大写
        this.actypeCode=this.actypeCode.toUpperCase()
    },
    toUpperCase1(){//小写变大写
        this.regCode=this.regCode.toUpperCase()
    },
    toUpperCase2(){//小写变大写
        this.flightNo=this.flightNo.toUpperCase()
    },    
    toUpperCase3(){//小写变大写
        this.companyCode=this.companyCode.toUpperCase()
    },
    toUpperCase4(){//小写变大写
        this.cityCode=this.cityCode.toUpperCase()
    },  
    updateOrderArptCode(val) {
      this.orderArptCode = val;
    },
    updateFlgttypeCode(val) {
      this.flgttypeCode = val;
    },
    exportDatas() {
      let _this = this;
      let param = qs.stringify({
        'beginDate':_this.beginDate,//起
        'endDate':_this.endDate,//止
        'comId':_this.companyCode,//公司   
        'actypeCode':_this.actypeCode,//机型
        'flgttypeCode':_this.flgttypeCode[0],//任务性质
        'regCode':_this.regCode,//注册号
        'arpt':_this.orderArptCode,//停靠机场
        'aOrd':_this.aOrd,//进出港
        'dOrI':_this.dOrI,//航班类别
        'flightNo':_this.flightNo,//航班号
        'city':_this.cityCode//出发地/目的地
      });
      downloadPost(_this,"/statisticAnalysis/exportCountList", param, {
        headers: {
          Authorization: localStorage.getItem("token")
        },
        responseType: 'arraybuffer'
      });
    },
    getdatas() {
      let _this = this;
      let param = qs.stringify({
        'beginDate':_this.beginDate,//起
        'endDate':_this.endDate,//止
        'comId':_this.companyCode,//公司   
        'actypeCode':_this.actypeCode,//机型
        'flgttypeCode':_this.flgttypeCode[0],//任务性质
        'regCode':_this.regCode,//注册号
        'arpt':_this.orderArptCode,//停靠机场
        'aOrd':_this.aOrd,//进出港
        'dOrI':_this.dOrI,//航班类别
        'flightNo':_this.flightNo,//航班号
        'city':_this.cityCode//出发地/目的地
      });
      _this.$http
        .post("/statisticAnalysis/selectCountList", param, {
          headers: {
            Authorization: localStorage.getItem("token"),
            page: _this.currentPages,
            limit: _this.pagesize
          }
        })
        .then(res => {
             console.info(res.data);
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
    }
  }
};
</script>
<style scoped>
</style>