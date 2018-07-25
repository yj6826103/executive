<template><!--修改机位-->
  <div class="Addreservation">
    <div class="tab-box">
        <div class="tab-cell">
            <div class="rbbq inputHeight">
                <div class="tit"><i class="el-icon-caret-right"></i>机位号码</div>
                <div class="cen">
                    <label>
                        <input v-validate data-vv-rules="required" data-vv-as="机位号码" name="stndCode" type="text" v-model="reservation.stndCode" placeholder="请输入">
                    </label>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndCode')" class="help is-danger">{{ errors.first('stndCode') }}</span>
            </div>
        </div>
         <!-- <div class="tab-cell" style="flex:1;margin-right:10px">
            <div class="rbbq">
                <div class="tit gray"><i class="el-icon-caret-right gray"></i>是否机库</div>
                <div class="sfsq">
                    <el-radio-group v-model="reservation.stndIsHangar">
                        <el-radio-button label="1">是</el-radio-button>
                        <el-radio-button label="2">否</el-radio-button>	
                    </el-radio-group>
                </div>							    																	
            </div>
        </div> -->
        <div class="tab-cell" style="flex:1">
            <div class="rbbq">
                <div class="tit gray"><i class="el-icon-caret-right gray"></i>是否常用</div>
                <div class="sfsq">
                    <el-radio-group v-model="reservation.stndFrequent">
                        <el-radio-button label="0">是</el-radio-button>
                        <el-radio-button label="1">否</el-radio-button>	
                    </el-radio-group>
                </div>							    																	
             </div>             
        </div>
    </div>

    <div class="tab-box">
        <div class="tab-cell">
            <div class="rbbq">                   
                <div class="tit"><i class="el-icon-caret-right"></i>所属机场</div>
                <div class="cen cen21">
                    <el-select v-validate data-vv-rules="required" data-vv-as="所属机场" name="stndArpt" v-model="reservation.stndArpt" clearable placeholder="请选择">
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
            <div class="validateStyle">
                <span v-show="errors.has('stndArpt')" class="help is-danger">{{ errors.first('stndArpt') }}</span>
            </div>
        </div>
        <div class="tab-cell">
            <div class="rbbq inputHeight">
                <div class="tit"><i class="el-icon-caret-right"></i>所在机坪</div>
                <div class="cen cen21">
                    <label>
                        <input v-if="stndPObjectIds==0" type="text" class="disabled" v-model="AddHangarsName" disabled >
                        <input v-else type="text" class="disabled" v-model="unAddHangarsName" disabled >
                    </label>
                </div>
                
            </div>
        </div>
    </div>

    <div class="tab-box">
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit"><i class="el-icon-caret-right"></i>使用性质</div>
                <div class="cen cen21">
                    <el-select v-validate data-vv-rules="required" data-vv-as="使用性质" name="stndUsage" v-model="reservation.stndUsage" clearable placeholder="请选择">
                        <el-option
                        v-for="item in orderADOrIs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndUsage')" class="help is-danger">{{ errors.first('stndUsage') }}</span>
            </div>
        </div>
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit"><i class="el-icon-caret-right"></i>机位类型</div>
                <div class="cen cen21">
                    <el-select v-validate data-vv-rules="required" data-vv-as="机位类型" name="stndType1" v-model="reservation.stndType1" clearable placeholder="请选择">
                        <el-option
                        v-for="item in stndType1s"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndType1')" class="help is-danger">{{ errors.first('stndType1') }}</span>
            </div>
        </div>
    </div>

    <div class="tab-box">
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit gray"><i class="el-icon-caret-right gray"></i>组合拆分</div>
                <div class="cen">
                    <div class="flex-box">
                        <div class="flex1">
                            <button class="btn radius">取消</button>
                        </div>
                        <div class="flex1">
                            <button class="btn radius">L</button>
                        </div>
                        <div class="flex1">
                            <button class="btn radius">R</button>
                        </div>
                    </div>
                    <div class="shmBox" style="margin-top: 15px;">
                        <em class="t w2">原机位号码</em>
                        <input class="w2" v-model="reservation.stndGroup" type="text">
                    </div>
                </div>
            </div>
        </div>
        
        <div class="tab-cell">
            <div class="rbbq" style="height:92px">
                <div class="tit"><i class="el-icon-caret-right"></i>保障作业规则</div>
                <el-checkbox-group v-validate data-vv-rules="required" data-vv-as="保障作业规则" name="stndPostflgtJobs" v-model="stndPostflgtJobs">
                    <el-checkbox-button v-for="Jobsed in stndPostflgtJobsed" :label="Jobsed" :key="Jobsed">{{Jobsed}}</el-checkbox-button>
                </el-checkbox-group>
            </div>  
            <div class="validateStyle">
                <span v-show="errors.has('stndPostflgtJobs')" class="help is-danger">{{ errors.first('stndPostflgtJobs') }}</span>
            </div>                              
        </div>                          
    </div>

    <div class="tab-box">
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit"><i class="el-icon-caret-right"></i>机位等级（便利）</div>
                <div class="cen cen21">
                    <el-select v-validate data-vv-rules="required" data-vv-as="机位等级" name="stndRank2" v-model="reservation.stndRank2" clearable placeholder="请选择">
                        <el-option
                        v-for="item in stndRank2s"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndRank2')" class="help is-danger">{{ errors.first('stndRank2') }}</span>
            </div> 
        </div>
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit"><i class="el-icon-caret-right"></i>机位性质</div>
                <div class="cen cen21">
                    <el-select v-validate data-vv-rules="required" data-vv-as="机位性质" name="stndType2" v-model="reservation.stndType2" clearable placeholder="请选择">
                        <el-option
                        v-for="item in stndType2s"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndType2')" class="help is-danger">{{ errors.first('stndType2') }}</span>
            </div>
        </div>
    </div>

    <div class="tab-box">
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit"><i class="el-icon-caret-right"></i>机位规则</div>
                <div class="cen">
                    <div class="shmBox">
                        <label>入位规则</label>
                        <el-select v-validate data-vv-rules="required" data-vv-as="入位规则" name="stndARule" v-model="reservation.stndARule" clearable placeholder="请选择">
                            <el-option
                            v-for="item in stndARules"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="shmBox">
                        <label>离位规则</label>
                        <el-select v-validate data-vv-rules="required" data-vv-as="离位规则" name="stndDRule" v-model="reservation.stndDRule" clearable placeholder="请选择">
                            <el-option
                            v-for="item in stndDRules"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="shmBox">
                        <label>试车</label>
                        <el-select v-validate data-vv-rules="required" data-vv-as="试车" name="stndTestRun" v-model="reservation.stndTestRun" clearable placeholder="请选择">
                            <el-option
                            v-for="item in stndTestRuns"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndARule')" class="help is-danger">{{ errors.first('stndARule') }}</span>
                <span v-show="errors.has('stndDRule')" class="help is-danger">{{ errors.first('stndDRule') }}</span>
                <span v-show="errors.has('stndTestRun')" class="help is-danger">{{ errors.first('stndTestRun') }}</span>
            </div>
        </div>
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit"><i class="el-icon-caret-right"></i>机位等级</div>
                <div class="cen">
                    <div class="shmBox">                                           
                        <label>机位等级（机型）</label>
                        <el-select v-validate data-vv-rules="required" data-vv-as="机位等级" name="stndRank1" v-model="reservation.stndRank1" clearable placeholder="请选择">
                            <el-option
                            v-for="item in stndRank1s"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>                                       
                    <div class="flex1">
                        <div class="shmBox">
                            <em class="t w2">最长机长限制</em>
                            <div style="flex:1">
                                <input v-validate data-vv-rules="required|Number" data-vv-as="最长机长限制" name="stndMaxLength" v-model="reservation.stndMaxLength" type="text">
                                <span class="w1">米</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex1">
                        <div class="shmBox">
                            <em class="t w2">最长翼展限制</em>
                            <div style="flex:1">
                                <input v-validate data-vv-rules="required|Number" data-vv-as="最长翼展限制" name="stndMaxWidth" v-model="reservation.stndMaxWidth" type="text">
                                <span class="w1">米</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndRank1')" class="help is-danger">{{ errors.first('stndRank1') }}</span>
                <span v-show="errors.has('stndMaxLength')" class="help is-danger">{{ errors.first('stndMaxLength') }}</span>
                <span v-show="errors.has('stndMaxWidth')" class="help is-danger">{{ errors.first('stndMaxWidth') }}</span>
            </div>
        </div>                            
    </div>

    <div class="tab-box">
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit"><i class="el-icon-caret-right"></i>除冰位</div>
                <div class="cen cen21">
                <el-select v-validate data-vv-rules="required" data-vv-as="除冰位" name="stndDeice" v-model="reservation.stndDeice" clearable placeholder="请选择">
                        <el-option
                        v-for="item in stndDeices"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndDeice')" class="help is-danger">{{ errors.first('stndDeice') }}</span>
            </div>
        </div>
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit"><i class="el-icon-caret-right"></i>状态</div>
                <div class="cen cen21">
                <el-select v-validate data-vv-rules="required" data-vv-as="状态" name="stndStatus" v-model="reservation.stndStatus" clearable placeholder="请选择">
                        <el-option
                        v-for="item in stndStatused"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndStatus')" class="help is-danger">{{ errors.first('stndStatus') }}</span>
            </div>
        </div>
    </div>

    <div class="tab-box">
        <div class="tab-cell">
            <div class="rbbq inputHeight">
                <div class="tit gray"><i class="el-icon-caret-right gray"></i>对应摄像头</div>
                <div class="cen">
                    <label>
                        <input type="text" v-model="reservation.stndCamera" placeholder="请输入">
                    </label>
                
                </div>
            </div>
        </div>
        <div class="tab-cell">
            <div class="rbbq">
                <div class="tit"><i class="el-icon-caret-right"></i>特许经营</div>
                <div class="cen cen21">
                    <el-select v-validate data-vv-rules="required" data-vv-as="特许经营" name="stndFranchise" v-model="reservation.stndFranchise" clearable placeholder="请选择">
                        <el-option
                        v-for="item in stndFranchises"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="validateStyle">
                <span v-show="errors.has('stndFranchise')" class="help is-danger">{{ errors.first('stndFranchise') }}</span>
            </div>
        </div>
    </div>
    <div style="text-align:center;margin-bottom:30px">
        <el-button plain @click="close">取  消</el-button>
        <el-button type="primary" @click="set_reservation">确  定</el-button>        
    </div>                             
  </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
import qs from 'qs'
export default {
    data () {
        return {
             stndApron:'',////所在机坪	
            // stndCode:'',//机位编码
            // stndIsHangar:"2",//是否机库
            // stndArpt:"",//所属机场
            stndArpts:[
                {value: "PEK",label: "首都机场"},
                {value: "2",label: "新机场"},
                {value: "3",label: "三河机场" }
            ],

            //stndUsage:"",//使用性质
            stndUsages:[
                {value: "1",label: "国内"},
                {value: "2",label: "国际"},
            ],
            //stndType1:"",//机位类型
            stndType1s:[
                {value: "1",label: "B类机位"},
                {value: "2",label: "C类数据"},
            ],
            // stndGroup:"",//组合拆分
            // stndRank1:"",//机位等级-机型
            stndRank1s:[
                {value: "1",label: "L1（G450及以下）"},
                {value: "2",label: "L2（G550及以下）"},
                {value: "3",label: "L3（G650及以下）" },
                {value: "4",label: "L4（C类 B737-800及以下）" },
            ],
            // stndMaxLength:"",//最大机长限制	
            // stndMaxWidth:"",//最大翼展限制	
            // stndRank2:"",//机位等级	
            stndRank2s:[
                {value: "1",label: "一级"},
                {value: "2",label: "二级"},
                {value: "3",label: "三级" }
            ],
            // stndType2:"",//机位性质	
            stndType2s:[
                {value: "1",label: "运行机位"},
                {value: "2",label: "航后机位"},
            ],
            // stndARule:"",//入位规则	
            stndARules:[
                {value: "1",label: "拖入"},
                {value: "2",label: "自滑"},
            ],
            // stndDRule:"",//离位规则	
            stndDRules:[
                {value: "1",label: "顶推"},
                {value: "2",label: "自滑"},
            ],
            // stndTestRun:"",//试车	
            stndTestRuns:[
                {value: "1",label: "禁止试车"},
                {value: "2",label: "可以试慢车"},
                {value: "3",label: "可以试大车"},
            ],
            stndPostflgtJobs:[],
            stndPostflgtJobsed:['航后保障作业', '上下客', '加油', '仅限航后停放'],//航后保障工作	
            // stndDeice:"",//除冰位	
            stndDeices:[
                {value: "1",label: "是"},
                {value: "2",label: "否"},
            ],
            // stndStatus:"",//状态	
            stndStatused:[
                {value: "1",label: "启用"},
                {value: "2",label: "预留"},
                {value: "3",label: "关闭"},
            ],
            // stndCamera:"",//对应摄像头	
            // stndCameras:'',
            // stndFranchise:"",//特许经营	
            stndFranchises:[
                {value: "0",label: "是"},
                {value: "1",label: "否"},
            ],
            item_reservation:{},
            stndId:'',
            AddHangarsIds:'',
        }
    },    
    computed: {
        ...mapGetters([
            "orderArptCodes", //机场列表"
            "orderADOrIs",
            'seatAddreservation',
            'AddHangarsName',
            'reservation',
            'AddHangarsId',
            'unAddHangarsName',
            'unreservation',
            'unAddHangarsId',
            'stndPObjectIds',
            //'stndPostflgtJobs'
            ])     
    },
    mounted () {
        this.$store.dispatch("get_SYS_ARPT_CODE")  //机场
        this.initdata()
    },
    methods: {
        close(){
            this.$store.commit('elSet_AddReservation',false) 
            this.$store.commit('elSet_ModReservation',false)
            this.$store.dispatch('initHangars')
        },
        initdata(){
            if(this.stndPObjectIds==0){
                this.$store.commit('set_reservation',this.reservation)
                this.stndId=this.reservation.stndId;
                this.AddHangarsIds=this.AddHangarsId
                this.stndPostflgtJobs=this.reservation.stndPostflgtJobs.split(',')
            }else{
                this.$store.commit('set_reservation',this.unreservation)
                this.stndId=this.unreservation.stndId
                this.AddHangarsIds=this.unAddHangarsId
                this.stndPostflgtJobs=this.unreservation.stndPostflgtJobs.split(',')
            }
        },
        set_reservation(){
            this.$validator.validateAll().then((result) => {
                if(result){
                    let stndPostflgtJobs=this.stndPostflgtJobs.toString()           
                    let param=qs.stringify({
                        stndCode:this.reservation.stndCode,//机位编码
                        stndIsHangar:this.reservation.stndIsHangar,//是否机库
                        stndFrequent:this.reservation.stndFrequent,//是否常用
                        stndArpt:this.reservation.stndArpt,//所属机场
                        stndApron:this.AddHangarsIds,//机坪ID	
                        stndUsage:this.reservation.stndUsage,//使用性质
                        stndType1:this.reservation.stndType1,//机位类型
                        stndGroup:this.reservation.stndGroup,//组合拆分
                        stndRank1:this.reservation.stndRank1,//机位等级
                        stndMaxLength:this.reservation.stndMaxLength,//最大机长限制	
                        stndMaxWidth:this.reservation.stndMaxWidth,//最大翼展限制	
                        stndRank2:this.reservation.stndRank2,//机位等级	
                        stndType2:this.reservation.stndType2,//机位性质	
                        stndARule:this.reservation.stndARule,//入位规则	
                        stndDRule:this.reservation.stndDRule,//离位规则	
                        stndTestRun:this.reservation.stndTestRun,//试车	
                        stndPostflgtJobs:stndPostflgtJobs,//航后保障工作	
                        stndDeice:this.reservation.stndDeice,//除冰位	
                        stndStatus:this.reservation.stndStatus,//状态	
                        stndCamera:this.reservation.stndCamera,//对应摄像头	
                        stndFranchise:this.reservation.stndFranchise,//特许经营	
                        stndId:this.reservation.stndId//机位ID
                    })
                    this.$http({
                        url: "/stnd/doUpdateStnd",
                        method: "post",
                        data: param,
                        headers: {'Authorization':localStorage.getItem("token")}
                    }).then(response=>{
                        this.$store.dispatch('initHangars')
                        if(response.data.status==100){
                            this.$notify({
                                title: '提示',
                                message: "机位修改成功",
                                type: 'success'
                            })
                            this.close()
                            this.$router.push({ path: "/menu/seatResourcesManage" });
                            // window.location.reload()                                        
                        }else{
                            this.$notify({
                                title: '提示',
                                message: '机位修改失败',
                                type: 'warning'
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }else{
                    this.$notify.warning({
                        title: '提示',
                        message: "请完善必填项！",
                        offset: 100
                    })
                }
            })
        }

    }
}
</script>