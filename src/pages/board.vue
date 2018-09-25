<template>
    <div class="board">
        <div class="mui-card" v-for="p in person">
            <!--页眉，放置标题-->
            <div class="mui-card-header mui-card-media">
                <img :src=[imgPath+p.head]  />
                <div class="mui-media-body">
                    {{p.name}}
                    <p>发表于 {{p.time}}</p>
                </div>
            </div>
            <!--内容区-->
            <div class="mui-card-content padding10">
                <div>{{p.content}}</div>
                <!--<img :src=[imgPath+p.head] class="widthB100" :style="style" />-->
            </div>
            <!--页脚，放置补充信息或支持的操作-->
            <!--<div class="mui-card-footer">-->
                <!--<div class="card-footer">-->
                    <!--<span :class="{colorBlue300:p.zan_status==1}" @click="like(p.id)"><i class="iconfont icon-dianzan fontSize20"></i> {{p.zan_count}}</span>-->
                    <!--<router-link :to="{name:'board'}"><i class="iconfont icon-liuyan fontSize20"></i></router-link>-->
                    <!--<i class="iconfont icon-shoucang fontSize20"></i>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class='archiveAreaDetails-searchBox'>
            <input id="archiveAreaDetails-search" v-model="value" type='text' placeholder='期待您的留言'  maxlength='-1' class='archiveAreaDetails-search'/>
            <div @click="send" class="archiveAreaDetails-send backgroundBlue300 marginLeft5">发送</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "board",
        data:function(){
            return {
                person:[],
                value:''
            }
        },
        mounted:function(){
            this.id=this.$route.params.id;
            this.imgPath=imgPath;
            this.getData();
        },
        methods:{
            getData:function(){
                var that=this;
                // 人物
                $.ajax({
                    url:URL+'/api/board/index',
                    type:'POST',
                    data:{
                        person_id:that.id
                    },
                    dataType:'json',
                    success:function(data){
                        that.person=data.data;
                        setTimeout(function(){
                            new Swiper('.person-carousel', {
                                autoplay: {
                                    delay: 5000,
                                    disableOnInteraction: true
                                },
                                pagination: {
                                    el: '.swiper-pagination',
                                    clickable: true
                                },
                                loop: true
                            });
                        },0)
                    }
                })
            },
            send:function(){
                var that=this;
                $.ajax({
                    url:URL+'/Api/board/msg',
                    type:'POST',
                    data:{
                        person_id:that.id,
                        user_id:that.GLOBAL.token,
                        content:that.value
                    },
                    dataType:'json',
                    success:function(data){
                        if(data.code==0){
                            that.getData();
                            that.value='';
                        }
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .board{
        padding-bottom: 50px;
    }
    /*人物卡片*/
    .card-footer{
        width: 100%;
        display: inline-flex;
        justify-content: space-around;
    }
    .card-footer>a{
        color: #6d6d72;
    }
    /*留言框*/
    .archiveAreaDetails-searchBox{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #EEEEEE;
        padding: 5px 0;
        /*z-index: 10;*/
    }
    .archiveAreaDetails-search{
        display: block;
        width: 70%;
        height: 32px;
        line-height: 32px;
        /*text-align: center;*/
        border:0.1rem solid #73CAF2;
        border-radius: 1rem;
        padding: 0 1rem;
        box-sizing: border-box;
        margin-bottom: 0;
    }
    .archiveAreaDetails-send{
        padding: 0 1.5rem;
        height: 32px;
        line-height: 32px;
        color: white;
    }
</style>