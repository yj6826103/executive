<template><!--弹框-->
    <div class="addHangar">
        <div class="popbox-cen dd-box">
            <i class="el-icon-circle-close" @click="close"></i>	
            <h3>添加{{titMsg}}</h3>
            <div class="rBox">
                <ul>
                    <li>
                        <label>{{titMsg}}名称:</label>
                        <input type="text" v-model="stndObjectName" :class="msgFalse==true?errBorder:''" placeholder="请输入内容">
                    </li>
                     <li>
                        <label>备注:</label>
                        <textarea v-model="stndRemark" placeholder="请输入内容" ></textarea>
                    </li>                     
                </ul>
            </div>
            <div class="btnbox">
                <el-button @click="close" plain>取  消</el-button>
                <el-button type="primary" @click="set_hangar">确  定</el-button>                
            </div>
        </div>
    </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
import qs from 'qs'
export default {
    data () {
        return {
            titMsg:'',
            stndObjectName:'',
            stndRemark:'',
            msgFalse:false,
            errBorder:'errBorder',
        }
    },
    computed: {
        ...mapGetters(['seatAddHangar','stndPObjectIds',])
    },
    mounted(){
        if(this.stndPObjectIds==0){
            this.titMsg='机坪'
        }else{
            this.titMsg='机库'
        }
    },
    methods: {
        ...mapMutations([
            'clickseatAddHangar',
        ]),    
       
        close(){//关闭弹框
            this.clickseatAddHangar()
        },
        set_hangar(){
            let param=qs.stringify({
                stndPObjectId:this.stndPObjectIds,
                stndObjectName:this.stndObjectName,
                stndRemark:this.stndRemark,
            })
            if(this.stndObjectName==''||this.stndObjectName==null){
               this.msgFalse=true
                return false
            }else{
                this.$http({
                    url: "/stnd/doSaveApron",
                    method: "post",
                    data: param,
                    headers: {'Authorization':localStorage.getItem("token")}

                }).then(response=>{
                    // console.log(response)
                    if(response.data.status==100){
                        if(this.stndPObjectIds=='0'){
                           this.$store.commit('add_AddHangars',response.data.data)
                        }else{
                           this.$store.commit('add_unAddHangars',response.data.data)                            
                        }                       
                        this.close()                        
                    }else{
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }

}
</script>
