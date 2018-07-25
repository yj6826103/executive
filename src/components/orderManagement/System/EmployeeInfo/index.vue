<template><!--组织机构-->
    <div class="box">
      <div class="left">
          <div class="treeBox">
             <LeftMenu @select="selectDept"></LeftMenu>
          </div>
      </div>
      <div class="right">
           <Right :deptId="deptId" :count="count"></Right>
      </div>
      <div style="clear:both"></div>
  </div>
</template>

<script>
import LeftMenu from './leftMenu'
import Right from './Right'
export default {
   components: {
       LeftMenu,Right
   },
   data(){
       return {
           deptId:null,
           count:null
       }
   },
   methods:{
       selectDept(deptId,count){
           this.deptId = deptId
           this.count = count
       }
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
    border-left: 1px solid #f0f0f0;;
    flex: 4;
}
</style>

