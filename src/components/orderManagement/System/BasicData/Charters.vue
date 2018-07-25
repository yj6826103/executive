<template>
  <div class="charters">
        <div class="tit" v-for="(item,index) in dictList" :key="index">
            <div class="t" @click="toggle_two(index,item)">
                <i :class="Level2!=index?i1:i1_" v-if="item.dicChildren != null && item.dicChildren.length > 0"></i>
                <i :class="Level2!=index?i2:i2_"></i>
                <span :class="{'ii2':Level2!=index,'ii2_':Level2==index}">{{item.dicCh}}</span>
            </div>
            <el-dropdown trigger="click" :showTimeout="0"  placement="bottom-start">
                <span class="el-dropdown-link">
                    <i class="i3"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><i class="el-icon-circle-plus i_icon"></i><a @click="rename(index)">修改</a></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import qs from 'qs'
export default {
  data() {
    return {
        Level2:-1,
        Level3:-1,
        Level4:-1,
        i1:"i1",
        i1_:"i1_",
        i2:"i2",
        i2_:"i2_",
        colorBlue:'colorBlue',
        rightHide:false,
        dictList:[]
    };
  },
  computed: {
    
  },
  mounted () {
      this.getData()
  },
  methods: {
    getData() {
      let _this = this
      _this.$http
        .get('/dict/tree', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
            _this.dictList = res.data.data.list
            if(_this.dictList.length>0){
                _this.toggle_two(0,_this.dictList[0])
            }
        })
        .catch(err => {
          console.log(err)
        })
    },
    toggle_two(index,item){
        if(this.Level2 === index){
            this.Level2 = -1
            this.$emit('select',null);
        }else{
            this.Level2 = index
            this.$emit('select',item);
        }
    },
    rename(dict){
       
    }
  }
};
</script>
<style>
.ii2{
    color: #000;
}
.ii2_{
    color: #409EFF;
}
</style>

