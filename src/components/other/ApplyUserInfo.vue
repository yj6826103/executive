<template>
  <div class="box sqinfo">
    <div class="lbox">
        <div class="ybq">
            <span>{{$t('Applicant.Applicantinformation')}}</span>
        </div>
    </div>
    <div class="rboxs">
        <ul>
            <li class="tab-cell act">
                <div class="tit" v-text="information.companyName">——————</div>
                <div class="rbq">{{$t('company.companyname')}}</div>
            </li>
            <li class="tab-cell">
                <div class="tit" v-text="information.userName">——————</div>
                <div class="rbq">{{$t('Applicant.ApplicantName')}}</div>
            </li>
            <li class="tab-cell">
                <div class="tit" v-text="information.userTel">——————</div>
                <div class="rbq">Tel</div>
            </li>
            <li class="tab-cell">
                <div class="tit" v-text="information.userEmail">——————</div>
                <div class="rbq">Email</div>
            </li>
        </ul>
    </div>
</div>
</template>
<<script>
export default {
  props:['information']
}
</script>
<style scoped>
.box {
  margin: 20px;
}
.lbox{
    padding-top: 15px !important;
}
.box .rboxs {
  margin-left: 120px;
  border-left: 1px solid #eee;
  
}
.rboxs ul{
  display: flex
}
.act{
  flex:1.5 !important
}
.createOrderBox .box li {
    border-right: 1px solid #eee;
    padding: 15px 25px;
    flex:1;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:30%;
    float: left;
}
.createOrderBox .box li:last-child{
    border-right: none;
}
</style>


