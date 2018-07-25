import axios from 'axios'
import qs from "qs"
import {Notification,MessageBox } from 'element-ui'
function errMsg(msg){
    Notification.warning({
        title: '提示',
        message: msg,
        offset: 100
    })
}
function Auditing(router){
    MessageBox.confirm('用户资料或机队信息未审核，请联系010-64535807进行审核！', '提示', {
        confirmButtonText: '确定',
        closeOnClickModal:false
    }).then(() => {
        router.push({ path: "/menu/userInfo" })
        return
    }).catch(()=>{
        //console.log('操作取消')
    })
}
export default {      
	loginInit:({commit,state},PARAM)=>{
        axios({
            method: 'post',
            url: '/login',
            data:PARAM.param         
         })
        .then(response => {
            // console.log(response);
            if(response.status==200){
                if(response.data.status==100){
                    
                    localStorage.setItem('token','');
                    localStorage.setItem('get_mapMenu','')
                    localStorage.setItem('set_information','')
                    localStorage.setItem('get_companyId','')
                    //commit('get_token', response.data.token)
                    localStorage.setItem('token', response.data.token);
                    let obj = JSON.stringify(response.data)
                    localStorage.setItem('set_information',obj)
                    commit('set_information',response.data)
                    let customUrl = window.location.href.split('/')[2]//判断服务地址，切换图片上传
                    if (customUrl == '210.75.250.249'){
                        commit('set_FILE_SERVER_URL','http://210.75.250.249:8087/gwj');
                    }
                    let objList = JSON.stringify(response.data.mapMenu.list)
                    localStorage.setItem('get_mapMenu',objList)
                    commit('get_mapMenu',response.data.mapMenu.list);

                    let menus=response.data.mapMenu.list[0] 
                    // console.log(response.data.mapMenu.list[0].flag)
                    
                    localStorage.setItem('get_companyId',response.data.companyId)
                    if(response.data.roles.indexOf('3597329961435136')!=-1&&response.data.companyId==''){
                        PARAM.router.push({ path: "/menu/userInfo" });
                        return
                    }else{
                        if(state.mapMenu.length>=0||state.mapMenu==null){ 
                            if(menus.children){ 
                                if(menus.children.length>0&&menus.flag==2){                     
                                    PARAM.router.push({ path: "/menu"+menus.children[0].menuUrl});
                                }else{
                                    PARAM.router.push({ path: "/menu"+menus.menuUrl });
                                }
                            }else{
                                // console.log(menus.menuUrl)
                                PARAM.router.push({ path: "/menu"+menus.menuUrl });
                            }     
                        }else{
                            errMsg('该用户名权限不足')
                        }
                    }
                }else if(response.data.status==102){
                    errMsg('用户名密码错误')
                    return false
                }else if(response.data.status==401){
                    errMsg('网络异常')
                    return false
                }
                
            }else{
                errMsg('服务器异常')
                return false
                
            }
                     
        })
        .catch(error => {
          console.log(error);
        });
    },
    dataInit:({commit},router)=>{//获取飞机注册号
        axios({
            method: 'post',
            url: '/bizOrder/selectAcCodes/',
            data:null,
            async:false,
            headers:{
                'Authorization':localStorage.getItem("token")
            }
        })
        .then(response=>{
            // console.log(response.data.data)
            if(response.status==200){
                for(let i of response.data.data){
                    i.label = i.actRegCode
                    i.value = i.actRegCode
                }
                commit('get_planNum',response.data.data)
                if(router!=undefined){
                    if(response.data.data==0){
                        Auditing(router);
                    }
                }
            }            
        })
        .catch(error => {
            console.log(error);
        });
    },
    get_Aircraft:({commit},params)=>{//获取飞机型号
        var param=qs.stringify({
            actRegCode:params
         })
        axios({
            method: 'post',
            //url: '/bizOrder/selectAcCodes/',
            url: '/bizOrder/selectAcTypeCodes/',
            data:param,
            headers:{
                'Authorization':localStorage.getItem("token")
            }
        })
        .then(response=>{           
            if(response.status==200){               
                // console.log(response.data.data.length)
                commit('set_Aircraft',response.data.data)
                if(response.data.data.length==0){
                    commit('set_orderActypeCode','')                                       
                }else{
                    commit('set_orderActypeCode',response.data.data[0].actActypeCode)                    
                }
            }            
        })
        .catch(error => {
            console.log(error);
        });
    },
    get_FLGTTYPE_CODE:({commit})=>{//获取任务性质
        var param=qs.stringify({
           dicType:'ORDER_FLGTTYPE_CODE'
        })
        axios({
            method: 'post',
            url: '/dict/selectAirptPark',
            data:param,
            headers:{
                'Authorization':localStorage.getItem("token")
            }
        })
        .then(response=>{
            //console.log(response.data.data+'JIC')
            commit('set_FLGTTYPE_CODE',response.data.data)
        })
        .catch(error => {
            console.log(error);
        });
    },
    get_SYS_ARPT_CODE:({commit})=>{//获取停靠机场 
        var param=qs.stringify({
           dicType:'SYS_ARPT_CODE'
        })
        axios({
            method: 'post',
            url: '/dict/selectAirptPark',
            data:param,
            headers:{
                'Authorization':localStorage.getItem("token"),
                'language':'zh'
            }
        })
        .then(response=>{
            // console.error(response.data.data)
            commit('set_dateRenovate','true')
            response.data.data.forEach((item)=>{
                if(item.dicStatus=='1'||item.disabled=='TRUE'){
                    item.disabled=false
                }else{
                    item.disabled=true
                }
            })
            commit('set_orderArptCodes',response.data.data)
        })
        .catch(error => {
            console.log(error);
        });
    },
    get_CITY_CODE:({commit})=>{//获取目的地 
        var param=qs.stringify({
           dicType:'ARPT_CODE'
        })
        axios({
            method: 'post',
            url: '/dict/selectAirptPark',
            data:param,
            headers:{
                'Authorization':localStorage.getItem("token")
            }
        })
        .then(response=>{
            // console.log(response.data.data)
            for(let i of response.data.data){
                i.value = i.dicCh
            }
            commit('get_PlaceData',response.data.data)
        })
        .catch(error => {
            console.log(error);
        });
    },//
    get_selectPtDeadline:({commit})=>{//获取时间 
        var param=qs.stringify({
            ptdStatus: "1"
        })
        axios({
            method: 'post',
            url: '/bizOrder/selectPtDeadline',
            headers:{
                'Authorization':localStorage.getItem("token")
            }
        })
        .then(response=>{
            //console.log(response.data.data)
            commit('set_selectPtDeadline',response.data.data)
        })
        .catch(error => {
            console.log(error);
        });
    },

    get_REGION:({commit})=>{//获取所属地区
        var param=qs.stringify({
           dicType:'REGION'
        })
        axios({
            method: 'post',
            url: '/dict/selectAirptPark',
            data:param,
            headers:{
                'Authorization':localStorage.getItem("token")
            }
        })
        .then(response=>{
            //console.log(response.data.data)
            commit('get_RegionData',response.data.data)
        })
        .catch(error => {
            console.log(error);
        });
    },//

    get_HGR_CODE:({commit})=>{//机库类型 
        var param=qs.stringify({
           dicType:'HGR_CODE'
        })
        axios({
            method: 'post',
            url: '/dict/selectAirptPark',
            data:param,
            headers:{
                'Authorization':localStorage.getItem("token"),
                'language':'zh'
            }
        })
        .then(response=>{
            //console.log(response.data.data)
            commit('set_HGR_CODE',response.data.data)
        })
        .catch(error => {
            console.log(error);
        });
    },
    initHangars({commit}){//获取机坪信息        
        axios({
            url: "/stnd/selectAll",
            method: "post",
            headers: {'Authorization':localStorage.getItem("token")}
        }).then(response=>{
            if(response.status==200){
                if(response.data.status==100){
                    commit('get_AddHangars',response.data.data.franchiseList)
                    commit('get_unAddHangars',response.data.data.notFranchiseList)
                }                
            }else{
                errMsg('删除失败')                       
            }           
        }).catch(error => {
            console.log(error);
        });
    },
    changeStndPostflgtJobs({commit}){
       setTimeout(()=>{
        commit('elSet_ModReservation',true)
       },1)
        commit('elSet_ModReservation',false)
       
    },
    initDosDont({commit}) {//获取注意事项
        axios({
            url: "/dict?dicCode=NOTE",
            method: "get",
            headers: {'Authorization':localStorage.getItem("token"),
            'language':localStorage.lang
        }
        }) .then(response => {
            commit('set_DosDont',response.data.data.list[0].dicCh)
           
          })
          .catch(error => {
            console.log(error);
          });
    },
    // initQueryStndControl({commit}) {//机型冲突预警
    //     let param = qs.stringify({})
    //     axios({
    //         url: "/monitor/selectBigFlightToSmallLevel",
    //         method: "post",
    //         data:param,
    //         headers: {'Authorization':localStorage.getItem("token")}
    //     }) .then(response => {console.log(response)
    //         if (response.data.status == 100) {
    //             commit('set_navigatepageNums',response.data.data.length)   
    //         }         
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // },
    get_sysmuData({commit}){//获取系统管理菜单menu    
        axios({
            url: "/sysmu/list",
            method: "post",
            headers: {'Authorization':localStorage.getItem("token")}
        }).then(res=>{
            if(res.data.status==100){//console.log(res.data.data)
                commit('set_sysmuData',res.data.data)
                
            }                          
        }).catch(err => {
            console.log(err);
        });   
    },
}