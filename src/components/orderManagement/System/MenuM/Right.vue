<template> 
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn">
        <div class="r-yg-box" v-if="menuManagement">
            <div class="ygbox2">
                <div class="item">
                    <div class="rbbq">
                        <div class="tit gray"><i class="el-icon-caret-right gray"></i>所属子系统</div>
                        <div class="cen">
                            <input type="text" v-model="managementDataed.menuSubsystem" class="inputText R_text" placeholder="请输入">
                        </div>
                    </div>
                    <div class="validateStyle"></div>
                </div>
                <div class="item">
                    <div class="rbbq">
                        <div class="tit gray"><i class="el-icon-caret-right gray"></i>菜单编码</div>
                        <div class="cen">
                            <input type="text" v-model="managementDataed.menuCode" class="inputText R_text" placeholder="请输入">
                        </div>
                    </div>
                    <div class="validateStyle"></div>
                </div>
            </div>
            <div class="ygbox2">
                <div class="item">
                    <div class="rbbq">
                        <div class="tit"><i class="el-icon-caret-right"></i>菜单名称</div>
                        <div class="cen">
                            <input v-if="addOrMod=='0'" v-validate data-vv-rules="required" data-vv-as="菜单名称" name="menuName" type="text" v-model="managementData.menuName" class="inputText R_text" placeholder="请输入">
                            <input v-else v-validate data-vv-rules="required" data-vv-as="菜单名称" name="menuName" type="text" v-model="managementDataed.menuName" class="inputText R_text" placeholder="请输入">
                        </div>
                    </div>
                    <div class="validateStyle"><span v-show="errors.has('menuName')" class="help is-danger">{{ errors.first('menuName') }}</span></div>	
                </div>
                <div class="item">
                    <div class="rbbq">
                        <div class="tit"><i class="el-icon-caret-right"></i>显示顺序</div>
                        <div class="cen">
                            <input v-if="addOrMod=='0'" v-validate data-vv-rules="required" data-vv-as="显示顺序" name="menuOrder" type="text" v-model="managementData.menuOrder" class="inputText R_text" placeholder="请输入">
                            <input v-else v-validate data-vv-rules="required" data-vv-as="显示顺序" name="menuOrder" type="text" v-model="managementDataed.menuOrder" class="inputText R_text" placeholder="请输入">
                        </div>
                    </div>
                    <div class="validateStyle"><span v-show="errors.has('menuOrder')" class="help is-danger">{{ errors.first('menuOrder') }}</span></div>	
                </div>
            </div>
            <div class="ygbox2">
                <div class="item">
                    <div class="rbbq">
                        <div class="tit"><i class="el-icon-caret-right"></i>URL</div>
                        <div class="cen">
                            <input v-if="addOrMod=='0'" v-validate data-vv-rules="required" data-vv-as="URL" name="menuUrl" type="text" v-model="managementData.menuUrl" class="inputText R_text" placeholder="请输入">
                            <input v-else v-validate data-vv-rules="required" data-vv-as="URL" name="menuUrl" type="text" v-model="managementDataed.menuUrl" class="inputText R_text" placeholder="请输入">
                        </div>
                    </div>
                    <div class="validateStyle"><span v-show="errors.has('menuUrl')" class="help is-danger">{{ errors.first('menuUrl') }}</span></div>	
                </div>
                <div class="item">
                    <div class="rbbq">
                        <div class="tit"><i class="el-icon-caret-right"></i>是否启用</div>
                        <div class="cenMission">
                            <div class="ddlb">
                                <el-radio-group v-model="menuInuse" @change="changeMenuInuse">
                                    <el-radio-button label="1">是</el-radio-button>
                                    <el-radio-button label="0">否</el-radio-button>	
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnbox flexOld">
                <el-button class="btn" @click="clore">取 消</el-button>
                <el-button type="primary" class="btn" @click="save">确 定</el-button>
                
            </div>
        </div> 
    </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import qs from "qs";
export default {
    props:['menuInused'],
    data () {
        return {     
            managementDataed:{} ,
            menuInuse:'0'      
        }
    },
    computed: {
        ...mapGetters([
            "menuManagement",
            'addOrMod',
            'managementData'   
        ])
    },
    methods:{
        MenuInuse(){
            this.menuInuse=this.menuInused
        },
        changeMenuInuse(val){
            console.log(val)
            this.menuInuse=val
        },
        clore(){//取消
            this.$store.commit('set_menuManagement',false)
            this.$store.dispatch('get_sysmuData') //获取菜单
        },
        save(){//保存// console.log(this.managementData.menuInuse)
            this.$validator.validateAll().then(result => {
                if(result){
                    let param
                    if(this.addOrMod=='1'){//添加同级菜单                        
                        param={
                            menuId:null,
                            menuPid:this.managementData.menuPid,
                            menuSubsystem:this.managementDataed.menuSubsystem,//; 所属子系统
                            menuCode:this.managementDataed.menuCode,//; 菜单编码
                            menuName:this.managementDataed.menuName,//; 菜单名称
                            menuOrder:this.managementDataed.menuOrder,//; 排序
                            menuUrl:this.managementDataed.menuUrl,//; 菜单utl
                            menuInuse:this.menuInuse,//; '是否启用，1为启用，0为不启用，默认为0'
                            arpt:this.managementData.arpt,//; 所属机场
                            menuFlag:this.managementData.menuFlag,//;  前段标识
                        }
                        this.append(param)
                    }else if(this.addOrMod=='2'){//添加子菜单                        
                        param={
                            menuId:null,
                            menuPid:this.managementData.menuId,
                            menuSubsystem:this.managementDataed.menuSubsystem,//; 所属子系统
                            menuCode:this.managementDataed.menuCode,//; 菜单编码
                            menuName:this.managementDataed.menuName,//; 菜单名称
                            menuOrder:this.managementDataed.menuOrder,//; 排序
                            menuUrl:this.managementDataed.menuUrl,//; 菜单utl
                            menuInuse:this.menuInuse,//; '是否启用，1为启用，0为不启用，默认为0'
                            arpt:this.managementData.arpt,//; 所属机场
                            menuFlag:this.managementData.menuFlag,//;  前段标识
                        }
                        this.append(param)
                    }else if(this.addOrMod=='0'){//修改                        
                        param={
                            menuId:this.managementData.menuId,
                            menuPid:this.managementData.menuPid,
                            menuSubsystem:this.managementDataed.menuSubsystem,//; 所属子系统
                            menuCode:this.managementDataed.menuCode,//; 菜单编码
                            menuName:this.managementData.menuName,//; 菜单名称
                            menuOrder:this.managementData.menuOrder,//; 排序
                            menuUrl:this.managementData.menuUrl,//; 菜单utl
                            menuInuse:this.menuInuse,//; '是否启用，1为启用，0为不启用，默认为0'
                            arpt:this.managementData.arpt,//; 所属机场
                            menuFlag:this.managementData.menuFlag,//;  前段标识
                        }
                        this.mode(param)
                    }
                }else{
                    this.$notify.warning({
                        title: '系统提示',
                        message: "请完善提示信息！",
                        offset: 100
                    })
                }
            })
        },
        append(param){//添加菜单  
            this.$http({
                url: "/sysmu/addMenu",
                method: "post",
                data:qs.stringify(param),
                headers: {'Authorization':localStorage.getItem("token")}
            }).then(res=>{console.log(res.data)
                if(res.data.status==100){
                    // console.log(res.data)
                     this.$notify({
                        title: '提示',
                        message: '添加成功',
                        type: 'success'
                    });
                    
                    this.$store.commit('set_menuManagement',false)
                    this.$store.dispatch('get_sysmuData')//获取菜单
                    this.managementDataed={}
                }                          
            }).catch(err => {
                console.log(err);
            });
        },
        mode(param){//修改菜单// console.log(param)
            this.$http({
                url: "/sysmu/updateMenu",
                method: "post",
                data:qs.stringify(param),
                headers: {'Authorization':localStorage.getItem("token")}
            }).then(res=>{//console.log(res.data.status)
                if(res.data.status==100){                    
                    this.$notify({
                        title: '提示',
                        message: '修改成功',
                        type: 'success'
                    });
                    this.$store.commit('set_menuManagement',false)
                    this.$store.dispatch('get_sysmuData') //获取菜单
                }                          
            }).catch(err => {
                console.log(err);
            });
        },
    }
   
}
</script>

<style scoped>
.R_text{
  padding-top:3px;
  width: 95%
}
.r-yg-box{
    margin: 0 auto;
    padding: 20px;
}
.r-yg-box .ygbox2{
    display: flex;
}
.r-yg-box .ygbox2 .item{
    margin-right: 10px;;
    flex: 1;
}
.r-yg-box .itembox{
    padding: 10px;
}
.r-yg-box .btnbox{
    margin-top: 20px;
    text-align: center;
}
.r-yg-box .btnbox .btn{
    font-size: 14px;
    width: 15%;
}
</style>
