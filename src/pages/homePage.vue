<template>
    <div class="homePage">
        <!--轮播-->
        <!--<div class="swiper-container homePage-carousel">-->
            <!--<div class="swiper-wrapper" >-->
                <!--<div class="swiper-slide" v-for="h in hp_lbt">-->
                    <!--<img :src=[imgPath+h.img] alt="">-->
                <!--</div>-->
            <!--</div>-->
            <!--&lt;!&ndash; Add Pagination &ndash;&gt;-->
            <!--<div class="swiper-pagination" style="bottom:3px"></div>-->
        <!--</div>-->
        <!--搜索-->
        <router-link :to="{name:'search'}">
            <input type="text" v-model="keywords" placeholder="搜索" class="search-input">
            <!--<span @click="search">搜索</span>-->
        </router-link>
        <!--<div class="search">-->
            <!---->
        <!--</div>-->
        <!--按钮-->
        <!--<button type="button" class="mui-btn mui-btn-outlined">1</button>-->
        <!--<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined">2</button>-->
        <!--<button type="button" class="mui-btn mui-btn-success mui-btn-outlined">3</button>-->
        <!--<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined">4</button>-->
        <!--<button type="button" class="mui-btn mui-btn-danger mui-btn-outlined">5</button>-->
        <!--<button type="button" class="mui-btn mui-btn-royal mui-btn-outlined">6</button>-->
        <!--人物卡片-->
        <keep-alive>
            <div class="swiper-container person-carousel">
                <div class="swiper-wrapper" >
                    <div class="swiper-slide" v-for="p in person" @click="into(p.person_id)">
                        <!--<img :src=[imgPath+h.img] alt="">-->
                        <div class="mui-card">
                            <!--页眉，放置标题-->
                            <div class="mui-card-header mui-card-media">
                                <img :src=[imgPath+p.user_head]  />
                                <div class="mui-media-body">
                                    {{p.user_name}}
                                    <p>发表于 {{p.time}}</p>
                                </div>
                            </div>
                            <!--内容区-->
                            <div class="mui-card-content padding10">
                                <div>{{p.person_name}}</div>
                                <img :src=[imgPath+p.person_head] class="widthB100" :style="style" />
                            </div>
                            <!--页脚，放置补充信息或支持的操作-->
                            <div class="mui-card-footer">
                                <div class="card-footer">
                                    <span :class="{colorBlue300:p.zan_status==1}" @click="like(p.person_id)"><i class="iconfont icon-dianzan fontSize20"></i> {{p.person_zan_count}}</span>
                                    <router-link :to="{name:'board',params:{id:p.person_id}}"><i class="iconfont icon-liuyan fontSize20"></i></router-link>
                                    <i class="iconfont icon-shoucang fontSize20"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination" style="bottom:3px"></div>
            </div>
        </keep-alive>
        <!--人物分类-->
        <!--<ul class="mui-table-view marginTop10">-->
            <!--<li class="mui-table-view-cell mui-collapse" v-for="(p,key) in person_type">-->
                <!--<a class="mui-navigate-right" href="#">{{key}}</a>-->
                <!--<div class="mui-collapse-content">-->
                    <!--<div class="personType">-->
                        <!--<div v-for="pp in p" class="personType-item">-->
                            <!--<div><img :src=[imgPath+pp.person_head] alt="" width="100" height="100"></div>-->
                            <!--{{pp.person_name}}-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</li>-->
        <!--</ul>-->
        <!--导航栏-->
        <div class="appNav">
            <router-link to="/homePage"><img src="/static/images/homePageNav/homePageSelect.png" alt="" class="nav-icon"/><span class="colorBlue300">首页</span></router-link>
            <div @click="showMenu" class="showMenu"><span class="showMenuBtn"><i class="iconfont">&#xe611;</i></span>添加</div>
            <router-link :to="{name:'my'}"><img src="/static/images/homePageNav/my.png" alt="" class="nav-icon"/>我的<i class="renIcon"></i></router-link>
        </div>
        <div class="overMenu">
            <div class="overMenuMain">
                <ul class="menuBlock clearfix">
                    <li class="iconBlock">
                        <router-link :to="{name:'addPerson'}">
                            <span><i class="iconfont icon-nansheng"></i></span>
                            <p>创建人物</p>
                        </router-link>
                    </li>
                    <li class="iconBlock">
                        <router-link :to="{name:'cooperation'}">
                            <span><i class="iconfont icon-nvsheng"></i></span>
                            <p>美女</p>
                        </router-link>
                    </li>
                </ul>
                <div class="menuClose">
                    <i class="iconfont" @click="hideMenu">&#xe617;</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home-page",
        data:function(){
            return {
                hp_lbt:[],
                person:[],
                person_type:[],
                style:{'height':document.body.clientWidth*.8+"px"},
                keywords:''
            }
        },
        mounted:function(){
            console.log(this.GLOBAL.token);
            this.imgPath=imgPath;
            this.getData();
            mui('#sheet1').popover('toggle');
        },
        methods:{
            getData:function(){
                var that=this;
                // $.ajax({
                //     url:URL+'/api/homePage/index',
                //     type:'GET',
                //     dataType:'json',
                //     success:function(data){
                //         that.hp_lbt=data.data;
                //         setTimeout(function(){
                //             new Swiper('.homePage-carousel', {
                //                 autoplay: {
                //                     delay: 5000,
                //                     disableOnInteraction: false
                //                 },
                //                 pagination: {
                //                     el: '.swiper-pagination',
                //                     clickable: true
                //                 },
                //                 loop: true
                //             });
                //             // var gallery = mui('.mui-slider');
                //             // gallery.slider({
                //             //     interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                //             // });
                //         },0)
                //     }
                // });
                // 人物
                $.ajax({
                    url:URL+'/api/person/index',
                    type:'POST',
                    data:{
                        user_id:that.GLOBAL.token
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
                // 人物分类
                $.ajax({
                    url:URL+'/api/PersonType/type',
                    type:'GET',
                    dataType:'json',
                    success:function(data){
                        that.person_type=data.data;
                    }
                })
            },
            search:function(){
                var that=this;
                $.ajax({
                    url:URL+'/api/homePage/search',
                    type:'POST',
                    data:{
                        keywords:that.keywords
                    },
                    dataType:'json',
                    success:function(data){

                    }
                })
            },
            like:function(id){
                var that=this;
                $.ajax({
                    url:URL+'/api/person/like',
                    type:'POST',
                    data:{
                        user_id:that.GLOBAL.token,
                        person_id:id
                    },
                    dataType:'json',
                    success:function(data){
                        mui.toast(data.message);
                        if(data.code==0){
                            for(var e in that.person){
                                if(that.person[e].person_id==id){
                                    that.person[e].zan_status=data.data.zan_status;
                                    that.person[e].person_zan_count=data.data.person_zan_count;
                                }
                            }
                        }
                    }
                })
            },
            into(id){
                this.$router.push({name:'person',params:{id:id}});
            },
            showMenu:function () {
                $(".overMenu").addClass("overActive")
            },
            hideMenu:function () {
                $(".overMenu").removeClass("overActive")
            }
        }
    }
</script>

<style scoped>
    .homePage{
        padding-bottom: 60px;
        /*background: url('/static/images/zixia.jpg');*/
        /*background-size: 100% 100%;*/
        background: linear-gradient(#001a3e, #008fce);
        height: 100%;
    }
    .homePage-carousel{
        width:100%;
        height: 21.5rem;
    }
    .homePage-carousel img{
        width:100%;
        height: 21.5rem;
    }
    .person-carousel{
        /*opacity: 0.8;*/
        margin-top: 3rem;
    }
    .search{
        position: relative;
        /*opacity: 0.5;*/
    }
    .search-input{
        text-align: center;
        /*background: rgba(255,255,255,0.5);*/
        font-size: 14px;
    }
    /*.search>span{*/
        /*position: absolute;*/
        /*right: 10px;*/
        /*top: 9px;*/
        /*z-index: 2;*/
    /*}*/
    .card-footer{
        width: 100%;
        display: inline-flex;
        justify-content: space-around;
    }
    .card-footer>a{
        color: #6d6d72;
    }

    /*人物分类*/
    .personType{
        width: 100%;
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
    }
    .personType-item{
        width: 10rem;
        display: inline-block;
        text-align: center;
    }
</style>