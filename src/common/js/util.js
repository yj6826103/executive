
    /** 
     * 文件上传方法
     * 参数说明：event：file input 点击事件
     * 返回文件
     */

  export function  uplaodSingle(event){
      let file = null;
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
    } else if (event.target.files && event.target.files.item(0)) {
      file = event.target.files.item(0);
    }
    return file;
  }

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).format("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */
export default{
  install(Vue,options)
  {
    Vue.prototype.$formatDate = function(date,fmt) {
        var o = {
        "M+" : date.getMonth()+1, //月份         
        "d+" : date.getDate(), //日         
        "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时         
        "H+" : date.getHours(), //小时         
        "m+" : date.getMinutes(), //分         
        "s+" : date.getSeconds(), //秒         
        "q+" : Math.floor((date.getMonth()+3)/3), //季度         
        "S" : date.getMilliseconds() //毫秒         
        };         
        var week = {         
        "0" : "/u65e5",         
        "1" : "/u4e00",         
        "2" : "/u4e8c",         
        "3" : "/u4e09",         
        "4" : "/u56db",         
        "5" : "/u4e94",         
        "6" : "/u516d"        
        };         
        if(/(y+)/.test(fmt)){         
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));         
        }         
        if(/(E+)/.test(fmt)){         
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);         
        }         
        for(var k in o){         
            if(new RegExp("("+ k +")").test(fmt)){         
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
            }         
        }         
        return fmt;         
    },
    Vue.prototype.$uplaodSingle = function(event){
      let file = null;
      if (event.target.files && event.target.files[0]) {
        file = event.target.files[0];
      } else if (event.target.files && event.target.files.item(0)) {
        file = event.target.files.item(0);
      }
      return file;
    },
    Vue.prototype.$showImage = function(id,type){
        this.$alert('<img src="http://10.42.6.49:8087/gwj/download.do?fileType='+type+'&id='+id+'" />', '预览', {
            dangerouslyUseHTMLString: true,
        callback: action => {}
        });
    }
    Vue.prototype.$validateAllBeforeSubmit = function(){
      this.$validator.validateAll().then((result) => {
        if (!result) {
          this.$notify.warning({
            title: '系统提示',
            message: "请先修正填写错误！"
          })
        }
        console.log(result)
        return result
      });
    }
  }
}