<template>
  <div class="unlicens">
        <div class="tit">
            <div class="t" @click="toggle_two">
                <i :class="Level2==false?i1:i1_"></i> <i :class="Level2==false?i2:i2_"></i>
                <span>非特许经营</span>
            </div>
            <el-dropdown trigger="click" :show-timeout="0" placement="bottom-start">
                <span class="el-dropdown-link">
                    <i class="i3"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><i class="el-icon-circle-plus i_icon" @click="Add_Hangar(1)"> 增加机库</i></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn">
            <ul class="cen" v-show="Level2" style="padding-left:50px">
                <li v-for="(item,index) in unAddHangars">
                    <div class="tit">
                        <div class="t">
                            <!-- <i :class="Level3==index?i1_:i1"></i> -->
                             <i :class="Level3==index?i2_:i2"></i>
                            <span>{{item.stndObjectName}}</span>
                        </div>
                        <el-dropdown trigger="click" :show-timeout="0"  placement="bottom-start">
                            <span class="el-dropdown-link">
                                <i class="i3"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item><i class="el-icon-circle-plus-outline i_icon"></i><a @click="add_reservation(item.stndObjectName,item.stndObjectId,1)">添加机库</a></el-dropdown-item> -->
                                <el-dropdown-item><i class="el-icon-edit-outline" @click="mod_Hangar(item,1)"> 修改机库</i></el-dropdown-item>
                                <el-dropdown-item><i class="el-icon-delete i_icon" @click="del_Hangar(item.stndObjectId,index)"> 删除机库</i></el-dropdown-item>
                                
                            </el-dropdown-menu>
                        </el-dropdown>                            
                    </div>
                    <!-- <transition name="custom-classes-transition" enter-active-class="animated fadeIn">
                        <ul class="cend" v-show="Level3==index">
                            <li v-for="(items,indexs) in unAddreservations">
                                <div class="tit">
                                    <div class="t" @click="mod_reservation(item.stndObjectName,item.stndObjectId,items,indexs,1)">                                               
                                        <i :class="Level4==indexs?i2_:i2"></i>
                                        <span>{{items.stndCode}}</span>
                                    </div>
                                    <el-dropdown trigger="click" :show-timeout="0" placement="bottom-start">
                                        <span class="el-dropdown-link">
                                            <i class="i3"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">            
                                            <el-dropdown-item><i class="el-icon-delete i_icon"></i><a @click="del_reservation(items.stndId,indexs)">修改机库</a></el-dropdown-item>
                                            <el-dropdown-item><i class="el-icon-delete i_icon"></i><a @click="del_reservation(items.stndId,indexs)">删除机库</a></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </li>                                   
                        </ul>
                    </transition> -->
                </li>                            
            </ul>
        </transition>
        <!-- <el-dialog 
            :visible.sync="seatAddHangar" 
            :modal-append-to-body="false" 
            :append-to-body="true"
            top='10vh'
            width="460px">
            <AddHangar v-if="seatAddHangar" ref="set_addhangar"></AddHangar>
        </el-dialog> -->
  </div>
</template>

<script>
import AddHangar from "../appModule/AddHangar"
import ModHangar from "../appModule/modHangar";
import { mapGetters, mapMutations } from "vuex";
import qs from 'qs'
export default {
    components: {AddHangar,ModHangar},
  data() {
    return {
        addshowDialog:false,
        modshowDialog:false,
        Level2:false,
        Level3:-1,
        Level4:-1,
        i1:"i1",
        i1_:"i1_",
        i2:"i2",
        i2_:"i2_",
        colorBlue:'colorBlue',
        rightHide:false,
    };
  },
  computed: {
    ...mapGetters([
        "seatAddHangar",//机库切换
        "seatAddreservation",//添加机位
        "modHangar",//修改机库
        "ModReservation",//修改机位
        "unAddHangars",//机库列表
        "unAddHangarsInfo",//机库信息
        "unAddreservations",//机位列表
    ])
  },
  mounted () {
      this.$store.dispatch('initHangars')
  },  
  methods: {
    ...mapMutations([
        "clickseatAddHangar",//机库切换
        "set_AddReservation",//机位切换
        "clickmodHangar",//机库切换
        "set_ModReservation",
    ]),
    Add_Hangar(stndPObjectIds) {//增加机库
        this.$store.commit('set_stndPObjectIds',stndPObjectIds)
        this.clickseatAddHangar();
        this.operation=false;
        return
    },
    mod_Hangar(item,valNum){//修改机库
        this.$store.commit('set_stndPObjectIds',valNum)
        this.$store.commit('set_unAddHangarsInfo',item)
        this.clickmodHangar()
        return
    },
    del_Hangars(stndId,index){//删除机库/ stnd/ doDeleteApron
        let param=qs.stringify({
            stndObjectId:stndId
        })
        this.$http({
            url: "/stnd/doDeleteApron",
            method: "post",
            data:param,
            headers: {'Authorization':localStorage.getItem("token")}

        }).then(response=>{
            if(response.status==200){
                if(response.data.status==100){
                    this.unAddHangars.splice(index, 1) 
                    this.$store.commit('elSet_AddReservation',false) 
                    this.$store.commit('elSet_ModReservation',false)                    
                    this.$message({
                        showClose: true,
                        message: '删除机库成功',
                        type: 'success'
                    });
                    return
                }
            }else{
                this.$message.error('删除失败');
                return false
                   
            }           
        }).catch(error => {
            console.log(error);
        });    
     
    },
    del_Hangar(stndId,index){//删除机库
        this.$confirm('是否删除?','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        //   type: 'warning'
        }).then(() => {
          this.del_Hangars(stndId,index)
        }).catch(() => {
          console.log('删除失败')
        });  
    },  
    add_reservation(itemName,itemID,valNum){//增加机位
        this.addshowDialog=true
        this.$store.commit('set_stndPObjectIds',valNum)
        this.$store.commit('get_unAddHangarsName',itemName)
        this.$store.commit('set_unAddHangarsId',itemID)
    },
    addclickselected(){//增加机库2--确定
        this.$refs.set_addhangar.set_reservation()
    },
    closeclickselected(){
        this.addshowDialog=false
    },
    // add_reservation(itemName,itemID,valNum){//增加机位
    //     this.$store.commit('elSet_ModReservation',false)
    //     this.$store.commit('set_stndPObjectIds',valNum)
    //     this.$store.commit('get_unAddHangarsName',itemName)
    //     this.$store.commit('set_unAddHangarsId',itemID)
    //     setTimeout(()=>{
    //         this.$store.commit('elSet_AddReservation',true)
    //     },100)
    // },
    
    // mod_reservation(itemName,itemID,item,index,valNum){//修改机位
    //     console.log(itemID)
    //     this.$store.commit('elSet_AddReservation',false)
    //     this.Level4=index        
    //     this.$store.dispatch('changeStndPostflgtJobs')
    //     this.$store.commit('set_stndPObjectIds',valNum)//0
    //     this.$store.commit('set_unreservation',item)//机位信息
    //     this.$store.commit('get_unAddHangarsName',itemName)//机库名称
    //     this.$store.commit('set_unAddHangarsId',itemID)//机库ID
    // },
    
    
    del_reservations(stndId,index){//删除机位
        let param=qs.stringify({
            stndId:stndId
        })
        this.$http({
            url: "/stnd/doDeleteStnd",
            method: "post",
            data:param,
            headers: {'Authorization':localStorage.getItem("token")}

        }).then(response=>{
            if(response.status==200){
                if(response.data.status==100){
                    this.unAddreservations.splice(index, 1)  
                    this.$store.commit('elSet_AddReservation',false) 
                    this.$store.commit('elSet_ModReservation',false)  
                    this.$message({
                        showClose: true,
                        message: '删除机位成功',
                        type: 'success'
                    });
                    return
                }    
            }else{
                this.$message.error('删除失败');
                return false
                          
            }           
        }).catch(error => {
            console.log(error);
        });         
    },   
    del_reservation(stndId,index){//删除机位
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        //   type: 'warning'
        }).then(() => {
          this.del_reservations(stndId,index)  
        }).catch(() => {
          console.log('删除失败')
        }); 
    },          
    toggle_two(){//下拉   
        this.Level2=!this.Level2
        this.Level4=-1
        this.$store.commit('elSet_AddReservation',false) 
        this.$store.commit('elSet_ModReservation',false) 
    },
    toggle_th(item,index){//下拉       
        if(this.Level3==index){
            this.Level3=-1
        }else{
            this.Level3=index
        }
        this.Level4=-1
        this.$store.commit("set_unAddHangarsInfo",item)
        this.$store.commit("set_unAddreservations",item.stndList)
        this.$store.commit('elSet_AddReservation',false) 
        this.$store.commit('elSet_ModReservation',false) 
    },
    
  }
};
</script>

