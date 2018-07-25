<template><!--菜单管理-->
  <div class="box">
      <div class="left">
          <div class="treeBox">
             <el-tree :data="sysmuData" :props="defaultProps">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span @click="append(data,'0')">{{ node.label }}</span>
                            <span>
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <i class="el-icon-setting"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <el-button size='medium' type="text" @click="append(data,'1')">增加同级菜单</el-button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <el-button size='medium' type="text" @click="append(data,'2')">增加子菜单</el-button>
                                        </el-dropdown-item>                                
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </span>
                        </span>
                </el-tree>
          </div>
      </div>
      <div class="right">
           <Right ref="c1" :menuInused='menuInused'></Right>
      </div>
      <div style="clear:both"></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import qs from 'qs'
import Right from './Right'
export default {
   components: {
       Right
   },
   data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'menuName'
            },
            menuInused:'0'
        };
    },
    computed: {
            ...mapGetters([
                "sysmuData",     
            ])
        },
    mounted(){
        this.$store.dispatch('get_sysmuData')//获取菜单
    },
    methods: {
        
        append(data,num){//添加子菜单
            this.$store.commit('set_menuManagement',false)//隐藏
            this.$store.commit('set_managementData',data)//绑定数据
            this.$store.commit('set_addOrMod',num)//判断
            setTimeout(()=>{//显示
                this.$store.commit('set_menuManagement',true)
            },100)
            this.menuInused=data.menuInuse
            this.$refs.c1.MenuInuse();//调用
        },
    }
}
</script>

<style scoped>
.box{
    display: flex;
    min-height: 450px;
}
.box .left{
    width: 300px;;
    padding: 10px;
    flex: 1;
}
.box .right{
    border-left: 1px solid #f0f0f0;
    flex: 4;
}
</style>
