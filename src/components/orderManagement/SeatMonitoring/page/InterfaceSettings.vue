<template>
  <div class="InterfaceSettings"><!--界面设置-->
     <div class="box">
            <div class="lbox">
                <div class="ybq">
                    <span>界面设置</span>
                </div>
            </div>
            <div class="rbox">
                <dl class="dl-jm-box">
                    <dt>机型：</dt>
                    <dd>
                        <label>
                            <input type="checkbox">全部</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">G450及以下</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">G550及以下</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">G650及以下</label>
                    </dd>
                </dl>
                <dl class="dl-jm-box">
                    <dt>停场类型：</dt>
                    <dd>
                        <label>
                            <input type="checkbox">全部</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">过站</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">过夜</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">超时</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">当日出港</label>
                    </dd>
                </dl>
                <dl class="dl-jm-box">
                    <dt>任务性质：</dt>
                    <dd>
                        <label>
                            <input type="checkbox">全部</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">公务飞行</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">调机飞行</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">专机飞行</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">要客包机</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox">急救飞机</label>
                    </dd>
                </dl>
            </div>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.dl-jm-box
{
    font-size: 16px;
    line-height: 40px;
}.dl-jm-box dt
{
    display: inline-block;;

    width: 80px;
}.dl-jm-box dd
{
    display: inline-block;

    min-width: 115px;;
    padding: 0 10px;
}.dl-jm-box input
{
    margin-right: 10px;
}
</style>
