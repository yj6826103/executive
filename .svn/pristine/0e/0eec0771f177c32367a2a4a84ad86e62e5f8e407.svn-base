<template>
    <div class="leftMenu">
        <div class="tit">
            <div class="t" @click="toggle_two">
                <i :class="Level2==false?i1:i1_"></i>
                <i :class="Level2==false?i2:i2_"></i>
                <span>公务机管理公司</span>
            </div>
            <el-dropdown trigger="click" :showTimeout="0"  placement="bottom-start">
                <span class="el-dropdown-link">
                    <i class="i3"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><i class="el-icon-circle-plus-outline"></i><a>增加机构</a></el-dropdown-item>
                    
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- <transition name="custom-classes-transition" enter-active-class="animated fadeIn">
            <ul class="cen" v-show="Level2">           
                <li v-for="(item,index) in AddHangars">
                    <div class="tit">
                        <div class="t" @click="toggle_th(item,index)">
                            <i :class="Level3==index?i1_:i1"></i><i :class="Level2==false?i2:i2_"></i>
                            <span>{{item.stndObjectName}}</span>
                        </div>
                        <el-dropdown trigger="click" :show-timeout='0'  placement="bottom-start">
                            <span class="el-dropdown-link">
                                <i class="i3"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><i class="el-icon-edit"></i><a @click="mod_Hangar(item,0)">修改机坪</a></el-dropdown-item>
                                <el-dropdown-item><i class="el-icon-delete"></i><a @click="del_Hangar(item.stndObjectId,index)">删除机坪</a></el-dropdown-item>
                                <el-dropdown-item><i class="el-icon-circle-plus-outline"></i><a @click="add_reservation(item.stndObjectName,item.stndObjectId,0)">添加机位</a></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>                            
                    </div>
                    <transition name="custom-classes-transition" enter-active-class="animated fadeIn">
                        <ul class="cend" v-show="Level3==index">
                            <li v-for="(items,indexs) in Addreservations">
                                <div class="tit">
                                    <div class="t" @click="mod_reservation(item.stndObjectName,item.stndObjectId,items,0)">                                               
                                        <i class="i2"></i>
                                        <span>{{items.stndCode}}</span>
                                    </div>
                                    <el-dropdown trigger="click" :show-timeout='0'  placement="bottom-start">
                                        <span class="el-dropdown-link">
                                            <i class="i3"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item><i class="el-icon-edit"></i><a @click="mod_reservation(item.stndObjectName,item.stndObjectId,items,0)">修改机位</a>
                                            </el-dropdown-item>
                                            <el-dropdown-item><i class="el-icon-document"></i><a @click="cop_reservation(items.stndId,items)">复制机位</a></el-dropdown-item>
                                            <el-dropdown-item><i class="el-icon-delete"></i><a @click="del_reservation(items.stndId,indexs)">删除机位</a></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </li>                                   
                        </ul>
                    </transition>
                </li>                                          
            </ul>
        </transition>  -->
    </div>
</template>
   
<script>
import { mapGetters, mapMutations } from "vuex";
import qs from 'qs'
export default {
  data() {
    return {
        Level2:false,
        Level3:-1,
        i1:"i1",
        i1_:"i1_",
        i2:"i2",
        i2_:"i2_",
        rightHide:false,
    };
  },
  methods: {
      toggle_two(){//下拉   
        this.Level2=!this.Level2
    },
  }
}
</script>

<style scoped>
.t span:hover{
    color: #2b86e0
}
</style>
