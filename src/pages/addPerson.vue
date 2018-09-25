<template>
    <div>
        添加人物
        <input type="text" placeholder="姓名" v-model="name">
        <input type="text" placeholder="简介" v-model="intro">
        <div class='placeImg'>
            <input class='camera' type='file' accept='image/*' multiple  @change='up($event)'>
            <div id='img1'>
                <i class='iconfont icon-jiahao fontSize30' style='color: #CACACA'></i>
            </div>
        </div>
        <div @click="submit">提交</div>
    </div>
</template>

<script>
    export default {
        name: "add-person",
        data:function(){
            return {
                head:'',
                neme:'',
                intro:''
            }
        },
        mounted:function(){

        },
        methods:{
            up:function(e){
                var that=this;
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                console.log(e.target.files);
                reader.onload=function(e){
                    var result=document.getElementById("img1");
                    result.innerHTML='<img style="height:100%;width:100%" src="' + this.result +'" alt="" />';
                    that.head=this.result;
                }
            },
            submit:function(){
                var that=this;
                // 人物
                $.ajax({
                    url:URL+'/api/AddPerson/index',
                    type:'POST',
                    data:{
                        user_id:that.GLOBAL.token,
                        name:that.name,
                        intro:that.intro,
                        head:that.head
                    },
                    dataType:'json',
                    success:function(data){
                        // that.person=data.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .placeImg{
        height: 104px;
        width: 139px;
        background: #E5E5E5;
        position: relative
    }
    #img1{
        height: 104px;
        width: 139px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .camera{
        height: 104px;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        outline: none;
        border: none;
    }
</style>