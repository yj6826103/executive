// import * as types from './mutations-type'
const mutations = {
  get_token: (state, datas) => {state.token = datas},
  set_companyId:(state, datas) => {state.companyId = datas},
  set_information:(state,datas)=>{state.information=datas},//登录信息
    
  get_params: (state, stats) => {state.params = stats},
  clickSelectFalse: (state) => { //订单查询
      state.selectFalse = !state.selectFalse
  },
  clickSeatQuery: (state) => { //余量查询
      state.seatQuery = !state.seatQuery
  },
  get_planNum: (state, datas) => { //飞机注册号
    state.planNum = datas
  },
  set_orderADOrIs:(state,datas)=>{state.orderADOrIs=datas},//航线类型
  set_orderDDOrIs:(state,datas)=>{state.orderDDOrIs=datas},
  set_errClassed:(state,datas)=>{state.errClassed=datas},//判断停场时间
  set_Aircraft:(state,datas)=>{state.Aircraft=datas},//飞机型号
  set_orderRegCode:(state,datas)=>{state.orderRegCode=datas},
  set_orderActypeCode:(state,datas)=>{state.orderActypeCode=datas},
  set_orderIsappliedHangar:(state,datas)=>{
    state.orderIsappliedHangar=datas
  },//是否申请机库
  set_orderHangar:(state,datas)=>{
    state.orderHangar=datas
  },//机库类型
  get_orderStatus:(state,datas)=>{
    state.orderStatus=datas
  },//订单状态
  get_orderType:(state,datas)=>{
    state.orderType=datas
  },//订单类型
  set_dateRenovate:(state,datas)=>{
    state.dateRenovate=datas
  },
  get_orderStay: (state, datas) => { //停场时间
    state.orderStay = datas
  },
  set_orderSta: (state, datas) => { //计划日期(进港)
    state.orderSta = datas
  },
  set_delayTime: (state, datas) => { //延期时间
    state.delayTime = datas
  },
  set_orderStd: (state, datas) => { //计划日期(出港)
    state.orderStd = datas
  },
  get_orderOerdertype: (state, datas) => { //订单类型
    state.orderOerdertype = datas
  },
  get_changeorderOerdertype: (state, datas) => {
    state.changeorderOerdertype = datas
  },
  get_PlaceData: (state, datas) => {//出发地目的地,
    state.PlaceData = datas
  },
  departureData: (state, datas) => {////出发地数据,
    state.departureData = datas
  },
  destinationData:state=>state.destinationData,//目的地数据
  set_selectPtDeadline :(state, datas) => {//时间差
    state.selectPtDeadline = datas
  },
  set_departure: (state) => { //出发地
      state.departure = !state.departure
  },
  set_destination: (state) => {//目的地
      state.destination = !state.destination
  },
  set_orderArptCodes: (state, datas) => {//、机场
    state.orderArptCodes = datas
  },
  set_orderArptCode: (state, datas) => {//、机场
    state.orderArptCode = datas
  },//机场
  set_HGR_CODE:(state,datas)=>{//机库类型
    state.HGR_CODE=datas
  },
  set_FLGTTYPE_CODE: (state, datas) => {//任务性质
    state.FLGTTYPE_CODE = datas
  },

  get_ChooseOrder: (state, datas) => {
    state.ChooseOrder = datas
  },
  set_AcCode: (state, datas) => { 
    state.AcCode = datas
  },
  set_DosDont: (state, datas) => { //注意事项
    state.DosDont = datas
  },
  set_IsappliedHangar: (state, datas) => { //机库
    state.orderIsappliedHangar = datas
  },
  //-----------------------------------------------------------------------------
  get_FlightPlanList: (state, datas) => { //飞行计划清单
    state.FlightPlanList = datas
  },
  get_TimeReply: (state, datas) => { //"航班时刻批复"
    state.TimeReply = datas
  },
  get_ConfirmationLetter: (state, datas) => { //"机库申请确认函"
    state.ConfirmationLetter = datas
  },
  set_FlightPlanListName:(state, datas) => { //飞行计划清单名字
    state.FlightPlanListName = datas
  },
  set_FlightPlanListNewName:(state, datas) => { //飞行计划清单名字
    state.FlightPlanListNewName = datas
  },
  set_FlightPlanListAddress:(state, datas) => { //飞行计划清单地址
    state.FlightPlanListAddress = datas
  },
  set_TimeReplyName:(state, datas) => { //航班时刻批复名字
    state.TimeReplyName = datas
  },
  set_TimeReplyNewName:(state, datas) => { //航班时刻批复名字
    state.TimeReplyNewName = datas
  },
  set_TimeReplyAddress:(state, datas) => { //航班时刻批复地址
    state.TimeReplyAddress = datas
  },
  set_ConfirmationLetterName:(state, datas) => { //机库申请确认函名字
    state.ConfirmationLetterName = datas
  },

  set_ConfirmationLetterNewName:(state, datas) => { //机库申请确认函名字
    state.ConfirmationLetterNewName = datas
  },
  set_ConfirmationLetterAddress:(state, datas) => { //机库申请确认函
    state.ConfirmationLetterAddress = datas
  },
  set_disabledReason:(state, datas)=>{state.disabledReason=datas},
  set_FaultList:(state, datas)=>{state.FaultList=datas},  //故障清单
  set_FaultListNewName:(state, datas)=>{state.FaultListNewName=datas},  //故障清单
  set_FaultListAddress:(state, datas)=>{state.FaultListAddress=datas},  //故障清单
  // set_orderPostponeReason:(state, datas)=>{state.orderPostponeReason=datas},  //延期原因

  set_isApplyFor: (state, datas) => {state.isApplyFor = datas}, //附件上传是否显示    
  set_disabledFalse: (state, datas) => {state.disabledFalse = datas},
  set_bled: (state,datas) => {state.bled = datas},
  //-----------------------------------------------------------------------------
  get_mapMenu: (state, datas) => {state.mapMenu = datas}, //"菜单列表"   
  get_details: (state, datas) => {state.details = datas}, //订单详情
  clickseatAddHangar:(state) => {state.seatAddHangar = !state.seatAddHangar},
  set_AddReservation:(state) => {//添加机位
      if(state.seatAddreservation==true){
        state.seatAddreservation=false        
      }else{
        state.seatAddreservation=true
        state.ModReservation=false
      }
  },
  set_newdates:(state,datas) => {state.newdates=datas},//计划出港日期
  elSet_AddReservation:(state,datas) => {state.seatAddreservation=datas},
  elSet_ModReservation:(state,datas) => {state.ModReservation = datas},
  set_ModReservation:(state)=>{ 
    if(state.ModReservation==true){
      state.ModReservation=false      
    }else{
      state.ModReservation=true
      state.seatAddreservation=false
    }
  },//修改机位
  clickmodHangar:(state)=>{state.modHangar = !state.modHangar },//修改机坪
  get_AddHangars: (state, datas) => { state.AddHangars = datas},//"机坪列表
  set_AddHangarsInfo:(state,datas)=>{//机坪信息
    state.AddHangarsInfo=datas
  },
  add_AddHangars: (state, datas) => { //添加机坪
    state.AddHangars.push(datas)
  },

  get_unAddHangars: (state, datas) => { //"机坪列表
    state.unAddHangars = datas
  },
  add_unAddHangars: (state, datas) => { //添加机坪
    state.unAddHangars.push(datas)
  },
  set_unAddHangarsInfo:(state,datas)=>{//机坪信息
    state.unAddHangarsInfo=datas
  },

  set_unAddreservations:(state,datas)=>{//机位列表
    state.unAddreservations=datas
  },
  add_unAddreservations: (state, datas) => { //"添加机位
    state.unAddreservations.push(datas) 
  },
  set_stndPObjectIds:(state,datas)=>{state.stndPObjectIds=datas},//判断是否特许0 or 1
  set_stndPostflgtJobs:(state,datas)=>{state.stndPostflgtJobs.push(datas)},//航后保障工作

  get_AddHangarsName:(state,datas)=>{state.AddHangarsName=datas},//机坪名称
  get_unAddHangarsName:(state,datas)=>{state.unAddHangarsName=datas},//机坪名称
  set_AddHangarsId:(state,datas)=>{state.AddHangarsId=datas},//机坪名称
  set_unAddHangarsId:(state,datas)=>{state.unAddHangarsId=datas},//机坪名称
  set_Addreservations:(state,datas)=>{state.Addreservations=datas},//机位列表    
  add_Addreservations: (state, datas) => {state.Addreservations.push(datas)}, //"添加机位
  set_reservation:(state,datas)=>{state.reservation=datas},//机位信息
  set_unreservation:(state,datas)=>{state.unreservation=datas},//机位信息
  get_RegionData: (state, datas) => {state.RegionData = datas},//所属地区
  set_FILE_SERVER_URL : (state, datas) => {state.FILE_SERVER_URL  = datas},
  //系统管理
  set_menuManagement:(state, datas)=>{state.menuManagement=datas},
  set_addOrMod :(state, datas)=>{state.addOrMod=datas},
  set_managementData:(state, datas)=>{state.managementData=datas},
  set_sysmuData:(state, datas)=>{state.sysmuData=datas},
  set_menuInuse:(state, datas)=>{state.menuInuse=datas},
  set_navigatepageNums:(state, datas)=>{state.navigatepageNums=datas},
}
export default mutations
