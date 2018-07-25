const downloadPost = (_this,url,param,config) => {
    _this.$http
      .post(url, param,config)
      .then(res => {
          if(res.data.byteLength<200){
            let resdata = JSON.parse(decodeURIComponent(escape(String.fromCharCode.apply(null, new Uint8Array(res.data)))));
            _this.$message({
                showClose: true,
                message: resdata.msg,
                type: 'success'
            });
          } else {//保存文件
            let filename = decodeURIComponent(res.headers["content-disposition"].replace("attachment;filename=",""));
            let blob = new Blob([res.data], { type: "" }, filename)
            if (window.navigator.msSaveOrOpenBlob) {
                // if browser is IE
                navigator.msSaveBlob(blob, filename);//filename文件名包括扩展名，下载路径为浏览器默认路径
            } else {
                let urlCreator = window.URL || window.webkitURL;
                let _url = urlCreator.createObjectURL(blob); //返回内存的地址。
                let link = document.createElement('a'); //创建事件对象  
                link.setAttribute('href', _url);
                link.setAttribute("download", filename);  
                let evt = document.createEvent("MouseEvents"); //初始化事件对象  
                evt.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //触发事件  
                link.dispatchEvent(evt);
            }
          }
      })
      .catch(function(err) {
        console.log(err);
      });
}
export default downloadPost