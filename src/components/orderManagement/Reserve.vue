<template>
	<div class="reserve">
		<div class="yudingBox">
            <div class="yuding-info">
                <div class="info-nav">
                    <div class="ybq">
                        <span>{{$t('Recent.RecentReservations')}}</span>
                    </div>
                    <ul>
                        <li v-for="(item,index) in tabDatas" :class="{on:active==index}" @click="togger(item.menuUrl,index)">
                            <a>{{item.menuName}}</a>
                        </li>
                    </ul>
                </div>   
                <component :is="iscur"></component>        
            </div>
        </div>
	</div>
</template>
<script>
import Examine from '../reservation/Examine'
import Todo from '../reservation/Todo'
import Approve from '../reservation/Approve'
export default {
    components: {
        Examine,
        Todo,
        Approve
    },
    data(){
        return {
            active:0,
            iscur:'Examine',
            tabDatas:[
                {menuName:this.$t('Recent.Approval'),menuUrl:'Examine'},
                {menuName:this.$t('Recent.Schedule'),menuUrl:'Todo'},
                {menuName:this.$t('Recent.Approved'),menuUrl:'Approve'}
            ]
        }
    },
    methods: {
        togger(item,index){
           this.iscur=item
           this.active=index
        }
    }
};
</script>
<style scoped>
</style>