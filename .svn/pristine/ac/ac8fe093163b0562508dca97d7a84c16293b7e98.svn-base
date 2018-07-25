<template>
<div class="flightEntry">
    <div class="infoBox">
        <div class="box">
            <div class="lbox">
                <div class="ybq">
                    <span>航班录入</span>
                </div>
            </div>
            <div class="rbox">
                <div class="rbbq">
                    <div class="tit"><i class="el-icon-document" style="margin-right:5px"></i>航班信息</div>
                    <div class="cen">
                        <table>
                            <tr>
                                <td class='td-left-3'><label class="label bt">进港航班号：</label></td>
                                <td class='td-right-3'>
                                    <input type="text" v-model="aTnfFlgt.flgtNo" class="text" placeholder="请输入"
                                        v-validate="'required'" data-vv-as="进港航班号" name="aflgtNo">
                                    <span v-show="errors.has('aflgtNo')" class="help is-danger">{{ errors.first('aflgtNo')}}</span>
                                </td>
                                 <td><label class="label bt">出发地：</label></td>
                                <td>
                                    <el-autocomplete  v-validate data-vv-rules="required" name="aflgtDArptCode"
                                        class="inline-input"
                                        v-model="aTnfFlgt.flgtDArptCode"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请选择"
                                        :debounce="0" 
                                    ></el-autocomplete>
                                    <span v-show="errors.has('aflgtDArptCode')" class="help is-danger">{{ errors.first('aflgtDArptCode')}}</span>
                                </td>
                                <td class='td-left-3'><label class="label bt">飞机注册号：</label></td>
                                <td class='td-right-3'>
                                    <input type="text" v-model="aTnfFlgt.flgtRegCode" class="text" placeholder="请输入"
                                        v-validate="'required'" data-vv-as="飞机注册号" name="aflgtRegCode">
                                    <span v-show="errors.has('aflgtRegCode')" class="help is-danger">{{ errors.first('aflgtRegCode')}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td class='td-left-3'><label class="label bt">出港航班号：</label></td>
                                <td class='td-right-3'>
                                    <input type="text" v-model="dTnfFlgt.flgtNo" class="text" placeholder="请输入"
                                        v-validate="'required'" data-vv-as="出港航班号" name="dflgtNo">
                                    <span v-show="errors.has('dflgtNo')" class="help is-danger">{{ errors.first('dflgtNo')}}</span>
                                </td>
                                 <td><label class="label bt">目的地：</label></td>
                                <td>
                                    <el-autocomplete  v-validate data-vv-rules="required" name="aflgtDArptCode"
                                        class="inline-input"
                                        v-model="dTnfFlgt.flgtAArptCode"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请选择"
                                        :debounce="0" 
                                    ></el-autocomplete>
                                    <span v-show="errors.has('dflgtAArptCode')" class="help is-danger">{{ errors.first('dflgtAArptCode')}}</span>
                                </td>
                                <td><label class="label bt">机型：</label></td>
                                <td>
                                    <input type="text" v-model="aTnfFlgt.flgtActypeCode" class="text" placeholder="请输入"
                                        v-validate="'required'" data-vv-as="飞机机型" name="aflgtActypeCode">
                                    <span v-show="errors.has('aflgtActypeCode')" class="help is-danger">{{ errors.first('aflgtActypeCode')}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td><label class="label bt">进港航班类别：</label></td>
                                <td>
                                    <el-select v-model="aTnfFlgt.flgtDOrI" clearable placeholder="请选择"
                                        v-validate="'required'" data-vv-as="进港航班类别" name="aflgtDOrI">
									    <el-option
									      v-for="item in orderDDOrIs"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>
                                    <span v-show="errors.has('aflgtDOrI')" class="help is-danger">{{ errors.first('aflgtDOrI')}}</span>
                                </td>
                                
                                <td class='td-left-3'><label class="label bt">进港运行机位：</label></td>
                                <td class='td-right-3'>
                                    <input type="text" v-model="aTnfFlgt.flgtOpStnd" class="text" placeholder="请输入"
                                        v-validate="'required'" data-vv-as="进港运行机位" name="aflgtOpStnd">
                                    <span v-show="errors.has('aflgtOpStnd')" class="help is-danger">{{ errors.first('aflgtOpStnd')}}</span>
                                </td>
                                
                                 <td><label class="label bt">进港任务类型：</label></td>
                                <td>
                                    <el-select v-model="aTnfFlgt.flgtFlgttypeCode" clearable placeholder="请选择" 
                                        v-validate="'required'" data-vv-as="进港任务类型" name="aflgtFlgttypeCode">
									    <el-option
									      v-for="item in flgtTypeCodeList"
									      :key="item.dicCode"
									      :label="item.dicCh"
									      :value="item.dicCode">
									    </el-option>
									</el-select>
                                    <span v-show="errors.has('aflgtFlgttypeCode')" class="help is-danger">{{ errors.first('aflgtFlgttypeCode')}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td><label class="label bt">出港航班类别：</label></td>
                                <td>
                                    <el-select  v-model="dTnfFlgt.flgtDOrI" clearable placeholder="请选择" v-validate="'required'" data-vv-as="出港航班类别" name="dflgtDOrI">
									    <el-option
									      v-for="item in orderADOrIs"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>
                                    <span v-show="errors.has('dflgtDOrI')" class="help is-danger">{{ errors.first('dflgtDOrI')}}</span>
                                </td>
                               
                                <td class='td-left-3'><label class="label bt">出港运行机位：</label></td>
                                <td class='td-right-3'>
                                    <input type="text" v-model="dTnfFlgt.flgtOpStnd" class="text" placeholder="请输入"
                                        v-validate="'required'" data-vv-as="出港运行机位" name="dflgtOpStnd">
                                    <span v-show="errors.has('dflgtOpStnd')" class="help is-danger">{{ errors.first('dflgtOpStnd')}}</span>
                                </td>
                                <td><label class="label bt">出港任务类型：</label></td>
                                <td>
                                    <el-select v-model="dTnfFlgt.flgtFlgttypeCode" clearable placeholder="请输入"
                                        v-validate="'required'" data-vv-as="出港任务类型" name="dflgtFlgttypeCode">
									    <el-option
									      v-for="item in flgtTypeCodeList"
									      :key="item.dicCode"
									      :label="item.dicCh"
									      :value="item.dicCode">
									    </el-option>
									</el-select>
                                    <span v-show="errors.has('dflgtFlgttypeCode')" class="help is-danger">{{ errors.first('dflgtFlgttypeCode')}}</span>
                                </td>
                            </tr>
                            <tr>
                               <td><label class="label bt">代理公司：</label></td>
                                <td>
                                    <input type="text" v-model="aTnfFlgt.flgtAgentCom" class="text" placeholder="请输入"
                                        v-validate="'required'" data-vv-as="代理公司" name="aflgtAgentCom">
                                    <span v-show="errors.has('aflgtAgentCom')" class="help is-danger">{{ errors.first('aflgtAgentCom')}}</span>
                                </td>
                                <td><label>停靠机场：</label></td>
                                <td class="disabled">
                                     <input style="color:#C0C4CC"  type="text" v-model="arptName" class="text">
                                </td>
                                 <td class='td-left-3'><label class="label bt">停场机位：</label></td>
                                <td class='td-right-3'>
                                    <input type="text" v-model="aTnfFlgt.flgtParkingStnd" class="text" placeholder="请输入"
                                        v-validate="'required'" data-vv-as="停场机位" name="aflgtParkingStnd">
                                    <span v-show="errors.has('aflgtParkingStnd')" class="help is-danger">{{ errors.first('aflgtParkingStnd')}}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="rbbq" style="margin-bottom:15px">
                    <div class="tit"><i class="el-icon-time"></i>航班时刻</div>
                    <div class="cen">
                        <table>
                            
                            <tr>
                                <td><label class="label bt">计划到达：</label></td>
                                <td>
                                    <label class="input-time">
                                        <el-date-picker :clearable='false'
                                            v-model="aTnfFlgt.flgtStm" 
                                            type="datetime" 
                                            placeholder="请选择日期"
                                            format="yyyy-MM-dd HH:mm"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            v-validate="'required|beforeDate:'+dTnfFlgt.flgtStm" data-vv-as="计划到达" name="aflgtStm">
                                        ></el-date-picker>
                                        
                                    </label>
                                    <span v-show="errors.has('aflgtStm')" class="help is-danger">{{ errors.first('aflgtStm')}}</span>
                                </td>
                                <td><label>预计到达：</label></td>
                                <td>
                                    <label class="input-time">
                                        <el-date-picker :clearable='false'
                                            v-model="aTnfFlgt.flgtEtm" 
                                            type="datetime" 
                                            placeholder="请选择日期"
                                            format="yyyy-MM-dd HH:mm"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></el-date-picker>
                                        
                                    </label>
                                </td>
                                <td><label>实际到达：</label></td>
                                <td>
                                    <label class="input-time">
                                        <el-date-picker :clearable='false'
                                            v-model="aTnfFlgt.flgtAtm" 
                                            type="datetime" 
                                            placeholder="请选择日期"
                                            format="yyyy-MM-dd HH:mm"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></el-date-picker>
                                        
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td class='td-left-3'><label class="label bt">计划起飞：</label></td>
                                <td class='td-right-3'>
                                    <label class="input-time">
                                        <el-date-picker :clearable='false'
                                            v-model="dTnfFlgt.flgtStm" 
                                            type="datetime" 
                                            placeholder="请选择日期"
                                            format="yyyy-MM-dd HH:mm"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            v-validate="'required|afterDate:'+aTnfFlgt.flgtStm" data-vv-as="计划起飞" name="dflgtStm">
                                        ></el-date-picker>
                                       
                                    </label>
                                    <span v-show="errors.has('dflgtStm')" class="help is-danger">{{ errors.first('dflgtStm')}}</span>
                                </td>
                                <td class='td-left-3'><label>预计起飞：</label></td>
                                <td class='td-right-3'>
                                    <label class="input-time">
                                        <el-date-picker :clearable='false'
                                            v-model="dTnfFlgt.flgtEtm" 
                                            type="datetime" 
                                            placeholder="请选择日期"
                                            format="yyyy-MM-dd HH:mm"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></el-date-picker>
                                        
                                    </label>
                                </td>
                                <td class='td-left-3'><label>实际起飞：</label></td>
                                <td class='td-right-3'>
                                    <label class="input-time">
                                        <el-date-picker :clearable='false'
                                            v-model="dTnfFlgt.flgtAtm" 
                                            type="datetime" 
                                            placeholder="请选择日期"
                                            format="yyyy-MM-dd HH:mm"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></el-date-picker>
                                        
                                    </label>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="btnsbox">
                    <button class="sub" @click="cancer">清空</button>
                    <button @click="save">保存</button>                    
                </div>
            </div>
        </div>
    </div>
</div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import qs from 'qs'
export default {
  data() {
    return {
      aTnfFlgt: {},
      dTnfFlgt: {},
      arptList: [],
      stopArptList: [],
      // orderADOrIList:[],
      flgtTypeCodeList: [],
      arptName: ''
    }
  },
  created() {
    this.$store.dispatch('dataInit')
  },
  computed: {
    ...mapGetters([
      'PlaceData', //目的地
      'QS_STRINGIFY_OPTIONS',
      'orderADOrIs', //进航线类型
      'orderDDOrIs' //出航线类型
    ])
  },
  mounted() {
    this.$store.dispatch('get_CITY_CODE') //目的地
    this.getFlgtTypeCodeList()
    this.getArpt()
    this.VClear(500)
  },
  methods: {
    getArpt() {
      let _this = this
      let formData = new FormData()
      formData.append('dicType', 'SYS_ARPT_CODE') // 停靠机场
      _this.$http
        .post('/dict/selectAirptPark', formData, {
          headers: { Authorization: localStorage.getItem('token') }
        })
        .then(res => {
          if (res.data.status == '100') {
            _this.stopArptList = res.data.data
            _this.$http
              .get('user/getArpt', {
                headers: { Authorization: localStorage.getItem('token') }
              })
              .then(res => {
                if (res.data.status == '100') {
                  let arpt = res.data.data.arpt
                  _this.aTnfFlgt.arpt = arpt
                  _this.dTnfFlgt.arpt = arpt
                  _this.arptName = _this.getLabelByValue(
                    _this.stopArptList,
                    arpt
                  )
                }
              })
              .catch(res => {
                console.log(res)
              })
          }
        })
    },
    setDFlgtAArptName() {
      this.dTnfFlgt.flgtAArptName = this.dTnfFlgt.flgtAArptCode
    },
    setAFlgtFlgttypeName() {
      this.aTnfFlgt.flgtFlgttypeName = this.getLabelByValue(
        this.flgtTypeCodeList,
        this.aTnfFlgt.flgtFlgttypeCode
      )
    },
    setDFlgtFlgttypeName() {
      this.dTnfFlgt.flgtFlgttypeName = this.getLabelByValue(
        this.flgtTypeCodeList,
        this.dTnfFlgt.flgtFlgttypeCode
      )
    },
    getLabelByValue(list, value) {
      for (let i = 0; i < list.length; i++) {
        let element = list[i]
        if (element.dicCode == value) {
          return element.dicCh
        }
      }
    },
    getCityList() {
      let _this = this
      let formData = new FormData()
      formData.append('dicType', 'CITY_CODE') // 停靠机场
      _this.$http
        .post('/dict/selectAirptPark', formData, {
          headers: { Authorization: localStorage.getItem('token') }
        })
        .then(res => {
          if (res.data.status == '100') {
            _this.cityList = res.data.data
          }
        })
    },
    querySearch(queryString, cb) {
      let restaurants = []
      restaurants = this.PlaceData
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.dicCh.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    getFlgtTypeCodeList() {//获取任务性质
      let formData = new FormData()
      formData.append('dicType', 'ORDER_FLGTTYPE_CODE')
      this.$http({
        method: 'post',
        url: '/dict/selectAirptPark',
        data: formData,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(response => {
          //console.log(response.data.data)
          this.flgtTypeCodeList = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    save() {
      let _this = this
      // 数据校验
      _this.$validator.validateAll().then(result => {
        if (result) {
          // 进出港公用信息同步
          _this.dTnfFlgt.flgtRegCode = _this.aTnfFlgt.flgtRegCode
          _this.dTnfFlgt.flgtActypeCode = _this.aTnfFlgt.flgtActypeCode
          // _this.dTnfFlgt.arpt = _this.aTnfFlgt.arpt
          _this.dTnfFlgt.flgtAgentCom = _this.aTnfFlgt.flgtAgentCom
          // 停靠机场
          _this.dTnfFlgt.flgtParkingStnd = _this.aTnfFlgt.flgtParkingStnd

          _this.dTnfFlgt.flgtDArptCode = 'PEK' // 出港 出发地
          _this.dTnfFlgt.flgtDArptName = '北京' // 出港 出发地
          _this.aTnfFlgt.flgtAArptCode = 'PEK' // 进港 目的地
          _this.aTnfFlgt.flgtAArptName = '北京' // 进港 目的地
          _this.dTnfFlgt.flgtAOrD = 'D'
          _this.aTnfFlgt.flgtAOrD = 'A'
          _this.dTnfFlgt.flgtAOrDName = '出港'
          _this.aTnfFlgt.flgtAOrDName = '进港'

          _this.$http({
              method: 'post',
              url: '/acteam/insertTnfFlgt',
              data: JSON.stringify([_this.aTnfFlgt, _this.dTnfFlgt]),
              headers: {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json;charset=utf-8'
              }
            })
            .then(res => {
            //   console.log(res)
              const h = _this.$createElement
              _this.$notify({
                title: '提示',
                message: h('i', { style: 'color: teal' }, res.data.msg)
              })
              if (res.data.status == '100') {
                _this.tnfFlgt = {}
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          _this.$notify.warning({
            title: '提示',
            message: '请完善必填项！'
          })
        }
      })
    },
    cancer() {
      this.aTnfFlgt = {}
      this.dTnfFlgt = {}
    }
  }
}
</script>

<style scoped>
.flightEntry .rbbq {
  padding: 20px;
}
.flightEntry .rbbq .tit {
  top: -13px;
  font-size: 18px;
  left: 42%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 235px;
  border: 1px solid #c0c4cc;
  height: 35px;
  line-height: 35px;
}
.rbbq .cen label span,
.rbbq .cen label input {
  font-size: 12px !important;
}
i.el-icon-tickets,
i.el-icon-time {
  margin-right: 5px;
}
.flightEntry td {
  position: relative;
}
.help {
  color: #ff3860;
  font-size: 12px;
  position: absolute;
  left: 0;
  top: 50px;
}
.flightEntry .el-select {
  border: 1px solid #c0c4cc;
  width: 235px;
  height: 35px;
  line-height: 35px;
}
.td-left-3 {
  width: 105px;
}
i.el-icon-date {
  position: inherit;
}
.rbbq {
  margin-bottom: 30px;
}
.cen table {
  margin-left: 20px;
}
.cen table tr {
  height: 60px;
}

.flightEntry .infoBox input,
.el-autocomplete.inline-input {
  width: 225px;
  border: 1px solid #c0c4cc;
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
}
.el-autocomplete.inline-input {
  padding-left: 0 !important;
  padding-right: 10px;
}
.label.bt {
  width: 105px;
}
.label.bt::before {
  content: '*';
  color: red
}
</style>

