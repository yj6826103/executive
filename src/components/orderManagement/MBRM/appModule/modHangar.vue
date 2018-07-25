<template><!--弹框-->
    <div class="addHangar">
        <div class="popbox-cen dd-box">
            <i class="el-icon-circle-close" @click="close"></i>	
            <h3>修改{{titMsg}}</h3>
            <div class="rBox">
                 <ul>
                   <li>
                        <label>{{titMsg}}名称:</label>
                        <input type="text" v-model="stndObjectName" :class="msgFalse==true?errBorder:''" placeholder="请输入内容"/>
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
            arpt:'',
            stndRemark:'',
            msgFalse:false,
            errBorder:'errBorder',
            stndObjectId:''
        }
    },
    computed: {
        ...mapGetters(['modHangar',"AddHangarsInfo","unAddHangarsInfo","stndPObjectIds"]),
    },
    mounted(){
        if(this.stndPObjectIds==0){
            this.titMsg='机坪'
        }else{
            this.titMsg='机库'
        }
    },
    mounted () {
        ///console.log(this.unAddHangarsInfo)
        if(this.stndPObjectIds==0){
            this.stndObjectName=this.AddHangarsInfo.stndObjectName
            this.stndRemark=this.AddHangarsInfo.stndRemark
            this.stndObjectId=this.AddHangarsInfo.stndObjectId
        }else{
            this.stndObjectName=this.unAddHangarsInfo.stndObjectName
            this.stndRemark=this.unAddHangarsInfo.stndRemark
            this.stndObjectId=this.unAddHangarsInfo.stndObjectId
        }  
    },
    methods: {
        ...mapMutations(['clickmodHangar']),           
        close(){//关闭弹框
            this.clickmodHangar()
        },       
        set_hangar(item){
            let param=qs.stringify({
                stndObjectId:this.stndObjectId,
                stndObjectName:this.stndObjectName,
                stndRemark:this.stndRemark
            })
            if(this.newstndObjectId==''){
               this.msgFalse=true
                return false
            }else{
                this.$http({
                    url: "/stnd/doUpdateApron",
                    method: "post",
                    data: param,
                    headers: {'Authorization':localStorage.getItem("token")}
                }).then(response=>{
                    if(response.data.status==100){ console.log(response)
                        this.close() 
                        this.$store.dispatch('initHangars')
                    }else{
                        this.$message({
                            message: '机坪修改失败',
                            type: 'warning'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            }    
        },
        
    }

}
</script>

