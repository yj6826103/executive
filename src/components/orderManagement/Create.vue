<template><!--创建订单-->	
	<div class="create">	
    <div class="createOrderBox">
		  <Applicant></Applicant>
			<div class="box">
				<div class="lbox">
					<div class="ybq">
						<span>{{$t('Applicant.Applicationcontent')}}</span>
					</div>
				</div>
				<div class="rbox">
					<ul class="info-box1">
						<li>
							<div class="rbbq">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.AircraftregistrationNO')}}</div><!--飞机注册号-->
								<div class="cen">
                  <el-cascader :value="orderRegCodes"
                    @change="changeAircraft"
                    :placeholder="$t('Pleaseselect')"
                    :options="planNum"
                    filterable
                    clearable
                    :debounce="0"
                  ></el-cascader>
								</div>
							</div>
              <div class="validateStyle"></div>
							<div class="rbbq">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.Aircrafttype')}}</div><!--飞机型号-->
								<div class="cen">
									<el-select v-validate data-vv-rules="required" data-vv-as="飞机型号" name="orderActypeCode" :value="orderActypeCode" @change="changeOrderActypeCode" :placeholder="$t('Pleaseselect')">
                    <el-option
                    v-for="item in Aircraft"
                    :key="item.actActypeCode"
                    :label="item.actActypeCode"
                    :value="item.actActypeCode">
                    </el-option>
                  </el-select>
                  
								</div>
							</div>
              <div class="validateStyle"><span v-show="errors.has('orderActypeCode')" class="help is-danger">{{ errors.first('orderActypeCode') }}</span></div>
						</li>
						<li>
							<div class="rbbq">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.Flight')}}</div><!--航班号-->
								<div class="cen">
									<label>
                      <span>{{$t('msg.Arrival')}}</span>
                       <input v-model="ChooseOrder.orderNo" v-show="false">
                      <el-input type="text" style="width:85%" v-validate data-vv-rules="required" data-vv-as="进港航班号" name="orderAFlgtNo" v-model="ChooseOrder.orderAFlgtNo" @focus="additional" :placeholder="$t('Pleaseselect')"></el-input>
                  </label>
								</div>
							</div>
              <div class="validateStyle"><span v-show="errors.has('orderAFlgtNo')" class="help is-danger">{{ errors.first('orderAFlgtNo') }}</span></div>          
							<div class="rbbq">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.Flight')}}</div><!--航班号-->
								<div class="cen">
									<label>
                      <span>{{$t('msg.Departure')}}</span>
                      <input style="width:84%" type="text" @keyup="toUpperCase" v-validate data-vv-rules="required" data-vv-as="出港航班号" name="orderDFlgtNo" v-model="orderDFlgtNo" clearable :placeholder="$t('pleaseenter')">
                  </label>
								</div>
							</div>
              <div class="validateStyle"><span v-show="errors.has('orderDFlgtNo')" class="help is-danger">{{ errors.first('orderDFlgtNo') }}</span></div>
						</li>
						<li>
							<div class="rbbq">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.Cityfrom')}}</div>
								<div class="cen">
                  <el-autocomplete v-validate data-vv-rules="required" name="orderDArptCode" disabled
                    v-model="ChooseOrder.orderDArptCode"
                    :fetch-suggestions="querySearch"
                    placeholder="—————"
                    :debounce="0" 
                  ></el-autocomplete>
                </div>
							</div>
              <div class="validateStyle"><span v-show="errors.has('orderDArptCode')" class="help is-danger">{{ errors.first('orderDArptCode') }}</span></div>
							<div class="rbbq">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.Cityto')}}</div><!--目的地-->
								<div class="cen">
                  <el-autocomplete v-validate data-vv-rules="required" name="orderAArptCode"
                    v-model="ChooseOrder.orderAArptCode"
                    :fetch-suggestions="querySearch"
                    :placeholder="$t('Pleaseselect')"
                    :debounce="0" 
                  ></el-autocomplete>
								</div>
							</div>
              <div class="validateStyle"><span v-show="errors.has('orderAArptCode')" class="help is-danger">{{ errors.first('orderAArptCode') }}</span></div>
						</li>
						<li>
							<CalculateDate :massage="judge" ref="changeCounts"></CalculateDate>
              <input type="text" :value="orderStay" v-show="false" v-validate data-vv-rules="required" name="orderStaySTATUS">
              <div class="validateStyle"><span v-show="errors.has('orderStaySTATUS')" class="help is-danger">{{ errors.first('orderStaySTATUS') }}</span></div>
						</li>
						<li>
							<div class="rbbq">
								<div class="tit gray"><i class="el-icon-caret-right gray"></i>{{$t('msg.AirRoutetype')}}</div>
								<div class="cen">
									<el-select v-model="ChooseOrder.orderADOrI" disabled clearable placeholder="—————">
									    <el-option
									      v-for="item in orderADOrIs"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>
								</div>
							</div>
              <div class="validateStyle"></div>
							<div class="rbbq">
                <div class="tit gray"><i class="el-icon-caret-right gray"></i>{{$t('msg.AirRoutetype')}}</div>
								<div class="cen">
									<el-select v-model="ChooseOrder.orderDDOrI" clearable :placeholder="$t('Pleaseselect')">
									    <el-option
									      v-for="item in orderDDOrIs"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>
								</div>
							</div>
              <div class="validateStyle"></div>
						</li>
						<li>
							<div class="rbbq" :class="errClassed?errClass:''">
								<div class="tit" ><i class="el-icon-caret-right"></i>{{$t('msg.ParkingDuration')}}</div><!---停场时间-->
								<div class="cen">
									<input type="text" :value="orderStay" disabled style="background:none;width:100%" readonly  placeholder="—————">
								</div>
							</div>
              <div class="validateStyle"></div>
						</li>
					</ul>
					<div class="info-box2">
						<div class="tab-cell">
							<div class="rbbq padBottom">
								<div class="tit gray" v-if="disableds"><i class="el-icon-caret-right gray"></i>{{$t('msg.Attachmentupload')}}</div>
                <div class="tit" v-else><i class="el-icon-caret-right"></i>{{$t('msg.Attachmentupload')}}</div>
								<UpFile ref="colseFiles"></UpFile>              
							</div>
              <div class="validateStyle"><span v-if="fileFALSE">{{$t('Required')}}</span></div><!--必填项-->
						</div>
						<div class="tab-cell right">
							<div class="rbbq">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.Airport')}}</div>			    
								<div class="cen cen21">
									<el-select v-validate data-vv-rules="required" data-vv-as="机场" name="orderArptCode" :value="orderArptCode" @change="changeArptCode" :placeholder="$t('Pleaseselect')">
									    <el-option
									      v-for="item in orderArptCodes"  
									      :key="item.dicCode"
									      :label="item.dicCh"
									      :value="item.dicCode"
                        :disabled="item.disabled">
									    </el-option>
									</el-select>
								</div>
							</div>
              <div class="validateStyle"><span v-show="errors.has('orderArptCode')" class="help is-danger">{{ errors.first('orderArptCode') }}</span></div>
							<div class="rbbq FLGTTYPE">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.Arrival')}}{{$t('msg.FlightType')}}</div>
                  <el-cascader :disabled='true' :options="FLGTTYPE_CODE" :props="orderFlgttypeCode" :value="orderFlgttypeCodes" @change="FLGTTYPE_CODE_Change" separator=">" placeholder="————"></el-cascader>
              </div>
              <div class="validateStyle"><span v-show="orderFlgttypeCodes_s">{{$t('msg.Airport')}}</span></div>
							<div class="rbbq disabled">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.ReservationType')}}</div>
								<div class="cenMission">
                  <div class="ddlb cen21">
									    <el-radio-group v-model="orderOerdertype">
									      <el-radio-button label="1">{{$t('msg.RegularReservation')}}</el-radio-button>
									      <el-radio-button label="2">{{$t('msg.TransitStop')}}</el-radio-button>	
									    </el-radio-group>
									</div>    
								</div>
							</div>
              <div class="validateStyle"></div>
						</div>
					</div>
					<div class="info-box3">
						<div class="tab-cell">
							<div class="rbbq">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.Toapplyforhangar')}}</div>
								<div class="sfsq">
									<el-radio-group @change="judgeDisableds1" v-model="orderIsappliedHangar">
									    <el-radio-button label="1">{{$t('company.yes')}}</el-radio-button>
									    <el-radio-button label="2">{{$t('company.no')}}</el-radio-button>	
									</el-radio-group>
								</div>							    																	
							</div>
						</div>
						<div class="tab-cell" v-if="!disableds">
							<div class="rbbq">
								<div class="tit"><i class="el-icon-caret-right"></i>{{$t('msg.Hangar')}}</div>
								<div class="cen cen21">
									<el-select v-validate data-vv-rules="required" data-vv-as="机库类型" name="orderHangar" :value="orderHangar" @change="changeorderHangar" clearable :placeholder="$t('Pleaseselect')">
									    <el-option
									      v-for="item in HGR_CODE"
									      :key="item.dicCode"
									      :label="item.dicCh"
									      :value="item.dicCode">
									    </el-option>
									</el-select>
								</div>  
							</div>
              <div class="validateStyle"><span v-show="errors.has('orderHangar')" class="help is-danger">{{ errors.first('orderHangar') }}</span></div>
						</div>
            <div class="tab-cell" v-else>
              <div class="rbbq">
								<div class="tit gray"><i class="el-icon-caret-right gray"></i>{{$t('msg.Hangar')}}</div>
								<div class="cen cen21">
									<el-select :value="orderHangar" @change="changeorderHangar" disabled clearable placeholder="—————">
									    <el-option
									      v-for="item in HGR_CODE"
									      :key="item.dicCode"
									      :label="item.dicCh"
									      :value="item.dicCode">
									    </el-option>
									</el-select>
								</div>    
							</div>
              <div class="validateStyle"></div>
						</div>
						<div class="tab-cell">							
              <button class="letter" type="text" @click="SeatQuery">{{$t('RemainingStandCheck')}}</button>
						</div>
            <div class="tab-cell"></div>
					</div>
					<div class="info-box4">
						<div class="tab-cell">
							<div class="rbbq">
								<div class="tit gray"><i class="el-icon-caret-right gray"></i>{{$t('Remarks')}}</div>
								<div class="cen">
									<textarea class="beizhu inputText" v-validate data-vv-rules="max:1000" name="orderRemark" v-model="ChooseOrder.orderRemark" :placeholder="$t('msg.Pleaseentercontent')"></textarea>
								</div>
							</div>
              <span v-show="errors.has('orderRemark')" class="help is-danger">{{$t('Morethanwords')}}</span>
						</div>
						<div class="tab-cell">
							<div class="tipbox">
                <textarea class="zhuyi" v-model="DosDont" readonly rows="4" ></textarea>                                  
              </div>
						</div>
					</div>

          <div class="btnsbox" v-if="subIF">
            <button @click="saveSubmit(1)">{{$t('Save')}}</button>
            <button @click="saveSubmit(2)" class="sub">{{$t('Submit')}}</button>
          </div>
          <div class="btnsbox" v-else>
            <button>{{$t('Save')}}</button>
            <button class="sub">{{$t('Submit')}}</button>
          </div>
				</div>
			</div>
		</div>
    <!-- 余量查询 -->
    <el-dialog 
        :visible.sync="seatQuery" 
        :modal-append-to-body="false" 
        :append-to-body="true"
        top='10vh'
        width="945px">
        <AllowanceQuery :residual="allowance" v-if="seatQuery"></AllowanceQuery>
    </el-dialog>
    <el-dialog :title="$t('Selectorder')" 
        :visible.sync="ArderSelectionF" 
        :modal-append-to-body="false" 
        :append-to-body="true"
        :close-on-click-modal='false'
        :before-close='additionalclose'
        top='10vh'
        width="800px">
        <OrderSelection :message="message" @additional="additional" v-if="ArderSelectionF"></OrderSelection>
    </el-dialog>
	</div>
</template>
<script>
import { mapGetters} from "vuex";
import qs from "qs";
import Applicant from "../other/Applicant";
import AllowanceQuery from "../other/AllowanceQuery";
import OrderSelection from "../other/orderSelection";
import UpFile from "../other/UpFile";
import CalculateDate from "../other/CalculateDate";
import singleFileUpload from "../other/SingleFileUpload";
export default {
  components: {
    UpFile,
    Applicant,
    AllowanceQuery,
    CalculateDate,
    singleFileUpload,
    OrderSelection
  },
  data() {
    return {
      subIF:true,
      ArderSelectionF: false,
      seatQuery:false,
      judge: "create",
      errClass: "errClass",
      orderFlgttypeCodes_s: false,
      orderFlgttypeCodes: [],//任务性质绑定
      orderFlgttypeCode: {//任务性质渲染
        label: "dicCh",
        value: "dicCode",
        children: "child"
      },
      orderIsappliedHangar: "2", //是否已申请机库
      disableds: true,
      allowance: {}, //余量查询传参
      message: {},
      orderRegCodes:[],
      orderDFlgtNo:'',
      fileFALSE:false
    };
  },
  computed: {
    ...mapGetters([
      "errClassed",//判断停场时间
      "orderHangar", //机库类型
      "orderIsappliedHangars",
      "orderRegCode",
      "orderActypeCode",
      "ChooseOrder",
      "Aircraft", //飞机机型
      "orderADOrIs", //进航线类型
      "orderDDOrIs", //出航线类型
      "PlaceData", //目的地
      "FLGTTYPE_CODE", //任务性质
      "orderArptCodes", //机场列表
      "orderArptCode", //机场
      //"seatQuery",
      "planNum",
      "orderStay",
      "orderOerdertype",
      "orderSta",
      "orderStd",
      "FlightPlanList", //飞行计划清单
      "FlightPlanListName", //飞行计划清单
      "FlightPlanListNewName", //飞行计划清单
      "FlightPlanListAddress", //飞行计划清单
      "TimeReply", //"航班时刻批复"
      "TimeReplyName", //"航班时刻批复"
      "TimeReplyNewName", //"航班时刻批复"
      "TimeReplyAddress", //"航班时刻批复"
      "ConfirmationLetter", //"机库申请确认函"
      "ConfirmationLetterName", //"机库申请确认函"
      "ConfirmationLetterNewName", //"机库申请确认函"
      "ConfirmationLetterAddress", //"机库申请确认函"
      "HGR_CODE", //机库类型
      "DosDont", //注意事项
    ])
  },
  mounted() {    
    this.$store.dispatch("dataInit",this.$router); //注册号
    this.$store.dispatch("get_SYS_ARPT_CODE"); //机场
    this.$store.dispatch("get_FLGTTYPE_CODE"); //任务性质
    this.$store.dispatch("get_CITY_CODE"); //目的地
    this.$store.dispatch("get_HGR_CODE"); //机库类型
    this.$store.dispatch("initDosDont"); //注意事调用action
    this.orderIsappliedHangar = this.orderIsappliedHangars;
    this.judgeDisableds();
    this.initRegCodes()
    this.initRWXZ();
    if (this.orderRegCodes[0] == ""||this.orderRegCodes[0]==null) {
        this.$store.commit("set_orderActypeCode", '');
        this.delateCreate()
        this.$store.commit("get_ChooseOrder", {});
      }
  },
  methods: {
    additionalclose(close){
      this.$store.commit('set_dateRenovate','true')
      close()  
          
    },
    toUpperCase(){//小写变大写
      this.orderDFlgtNo=this.orderDFlgtNo.toUpperCase()
    },
    initRegCodes(){//初始化注册号
      this.orderRegCodes.splice(0,this.orderRegCodes.length);
      this.orderRegCodes.push(this.ChooseOrder.orderRegCode)
      if(this.ChooseOrder.orderDFlgtNo){//初始化出港航班号
        this.orderDFlgtNo=this.ChooseOrder.orderDFlgtNo
      }
    },
    additional(msg) {
      if (this.orderRegCodes[0] == ""||this.orderRegCodes[0]==null) {
        this.$message.error(this.$t('Pleasechooseaircraft'));//请选择飞机注册号
        return;
      } else {
        this.message.flgtDCityCode = this.orderRegCodes.toString();
        this.ArderSelectionF = !this.ArderSelectionF;
        this.initRWXZ();
        if(msg=='1'){
          this.delateCreate()
          
        }
      }
    },
    delateCreate(){//清空
        this.$store.commit("get_orderStay", '');
        this.orderIsappliedHangar="2"
        this.orderDFlgtNo=''
        this.$refs.colseFiles.closeFile()
        
        this.judgeDisableds();
        this.VClear(500);
    },
    querySearch(queryString, cb) {//出发地目的地
      let restaurants = this.PlaceData;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {//出发地目的地
      return restaurant => {
        return (
          restaurant.dicCh.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    judgeDisableds() {//初始化是否申请机库
      if (this.orderIsappliedHangar == "2") {
        this.disableds = true;
        this.$store.commit("set_isApplyFor", "1");
        this.$store.commit("set_orderHangar", "");
      } else {
        this.disableds = false;
        this.$store.commit("set_isApplyFor", "2");
      }
    },
    judgeDisableds1() {//是否申请机库
      // console.log(this.ChooseOrder.orderStd)
      this.judgeDisableds()      
      if (this.orderIsappliedHangar == "2") {
        this.$store.commit("set_IsappliedHangar", 2);
        if(this.ChooseOrder.orderStd!=undefined)this.$refs.changeCounts.changeCount();
      } else {
        this.$store.commit("set_IsappliedHangar",1);
        if(this.ChooseOrder.orderStd!=undefined)this.$refs.changeCounts.changeCount();
      }      
    },
    changeOrderActypeCode(val){
      this.orderActypeCode=val
    },
    changeArptTypeCode(val) {//获取机型
      this.$store.commit("set_orderActypeCode", val);
    },
    changeArptCode(val) {//获取机场
      this.$store.commit("set_orderArptCode", val);
    },
    changeorderHangar(val) {//机库类型
      this.$store.commit("set_orderHangar", val);
    },
    changeAircraft(val) {//绑定机型      
      this.orderRegCodes=val
      let vals=val.toString()
      this.$store.commit("set_orderRegCode", vals);
      this.$store.dispatch("get_Aircraft", vals);
      this.changeArptTypeCode(vals);
      this.$store.commit("get_ChooseOrder", {});
      this.delateCreate()
      this.orderFlgttypeCodes=[]
      this.$store.commit('set_dateRenovate','true')
    },
    initRWXZ() {//初始化任务性质
      let RWXZ = [];
      RWXZ.push(this.ChooseOrder.orderFlgttypeCode);
      if (this.ChooseOrder.orderSlvlCode != "") {
        RWXZ.push(this.ChooseOrder.orderSlvlCode);
      }
      this.FLGTTYPE_CODE_Change(RWXZ);
      this.VClear(500);
    },
    FLGTTYPE_CODE_Change(val) {//change任务性质
      this.orderFlgttypeCodes = val;
      if (this.orderFlgttypeCodes[0] != undefined) {
        this.orderFlgttypeCodes_s = false;
      }
    },
    scrollToped() {//置顶
      setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }, 100);
    },
    saveSubmit(index) {      
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.orderIsappliedHangar == "2") {
            this.$store.commit("set_orderHangar", "");           
          }else if(this.orderIsappliedHangar == "1"){
            if(this.ConfirmationLetterName==''){
              this.scrollToped();
              this.fileFALSE=true;
              this.$notify.warning({
                title: this.$t('Prompt'),
                message: this.$t('Pleaseperfecttherequireditems'),
                offset: 100
              });
              return
            }              
          }
          if(this.errClassed==true){
            this.$refs.changeCounts.changeCount();
            this.scrollToped();
            return false
          }
          if (
            this.orderFlgttypeCodes[0] == undefined &&
            this.orderFlgttypeCodes[1] == undefined
          ) {
            this.orderFlgttypeCodes_s = true;
            this.scrollToped();
            return;
          }
          let param = qs.stringify({
            FlightPlanListName: this.FlightPlanListName, //飞行计划清单
            FlightPlanListNewName: this.FlightPlanListNewName, //飞行计划清单
            FlightPlanListAddress: this.FlightPlanListAddress, //飞行计划清单
            TimeReplyName: this.TimeReplyName, //"航班时刻批复"
            TimeReplyNewName: this.TimeReplyNewName, //"航班时刻批复"
            TimeReplyAddress: this.TimeReplyAddress, //"航班时刻批复"
            ConfirmationLetterName: this.ConfirmationLetterName, //"机库申请确认函"
            ConfirmationLetterNewName: this.ConfirmationLetterNewName, //"机库申请确认函"
            ConfirmationLetterAddress: this.ConfirmationLetterAddress, //"机库申请确认函"
            orderRegCode: this.orderRegCodes.toString(), //飞机注册号
            orderActypeCode: this.orderActypeCode, //飞机型号
            orderAFlgtNo: this.ChooseOrder.orderAFlgtNo, // 航班号(进港)
            orderDFlgtNo: this.orderDFlgtNo, // 航班号(出港)
            orderDArptCode: this.ChooseOrder.orderDArptCode, // 出发地
            orderAArptCode: this.ChooseOrder.orderAArptCode, // 目的地
            orderSta: this.ChooseOrder.orderSta, // 计划日期(进港)
            orderStd: this.ChooseOrder.orderStd, // 计划日期(出港)
            orderADOrI: this.ChooseOrder.orderADOrI, // 航线类型(进港)
            orderDDOrI: this.ChooseOrder.orderDDOrI, // 航线类型(出港)
            orderStay: this.orderStay, // 停场时间
            orderArptCode: this.orderArptCode, // 机场
            orderFlgttypeCode:
              this.orderFlgttypeCodes[0] == undefined
                ? this.orderFlgttypeCodes[1]
                : this.orderFlgttypeCodes[0], // 任务性质
            orderSlvlCode:
              this.orderFlgttypeCodes[0] == undefined
                ? ""
                : this.orderFlgttypeCodes[1], // 要客包机
            orderOerdertype: this.orderOerdertype, // 预定类别
            orderIsappliedHangar: this.orderIsappliedHangar, // 是否已申请机库
            orderHangar: this.orderHangar, // 机库
            orderNo: this.ChooseOrder.orderNo, //订单编号
            orderRemark: this.ChooseOrder.orderRemark, // 备注
            orderType: "1", // 订单类型
            orderStatus: index // 订单状态
          });
          this.$http({
            url: "/bizOrder/addOrder",
            method: "post",
            data: param,
            headers: { Authorization: localStorage.getItem("token") }
          })
            .then(response => {
              if (response.data.status == 100) {
                this.subIF=false
                this.$message({
                  message: this.$t('Addsuccess'),
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({ path: "/menu/reserve" });
                }, 1000);
                return;
              } else if (response.data.status == 200) {
                this.$message.error(this.$t('msg.Theuserisnotloggedin'));//用户未登录
              } else if (response.data.status == 201) {
                this.$message.error(this.$t('msg.Stoptimerules'));//停场时间不符合规则
              } else if (response.data.status == 210) {
                  this.$notify.warning({
                    title: this.$t('Prompt'),
                    message: this.$t('msg.Yourorderisnotcomple'),//您的订单必填项不全
                    offset: 100
                  });
              } else if (response.data.status == 401) {
                this.$message.error(this.$t('erroperation'))//'操作失败',);
              } else if (response.data.status == 500) {
                this.$message.error(this.$t('Systemabnormality'));//系统异常
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.scrollToped();
          this.$notify.warning({
            title: this.$t('Prompt'),
            message: this.$t('Pleaseperfecttherequireditems'),
            offset: 100
          });
        }
      });
    },
    SeatQuery() {
      //余量查询
      if (this.orderActypeCode == "") {
        this.$message.error(this.$t('Pleasechooseaircraft'));//请选择飞机注册号
        return;
      } else {
        this.allowance.stndType = this.orderActypeCode;
        this.seatQuery=true
      }
    }
  }
};
</script>

<style scoped>
.FLGTTYPE {
  margin: 2px 0;
  height: 21px;
}
.el-cascader {
  display: block;
  line-height: 24px;
}
.el-radio-group {
  height: 20px;
}
.el-icon-circle-close {
  float: right;
}
.createOrderBox .info-box3 button {
  height: 51px;
}
.create {
  clear: both;
}

.el-select {
  width: 100%;
}
.el-message-box__message p {
  text-align: center;
}
.info-box1 .rbbq .cen input {
  width: 68%;
}
</style>