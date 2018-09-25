<template>
    <form class="mui-input-group">
        <div class="mui-input-row">
            <label>用户名</label>
            <input type="text" class="mui-input-clear mui-input-speech" v-model="name" placeholder="请输入用户名">
        </div>
        <div class="mui-input-row">
            <label>密码</label>
            <input type="password" class="mui-input-password" v-model="password" placeholder="请输入密码">
        </div>
        <div class="mui-button-row">
            <button type="button" class="mui-btn mui-btn-primary" @click="register">注册</button>
            <router-link :to="{name:'login'}" class="mui-btn mui-btn-danger" id="login">返回登录</router-link>
        </div>
    </form>
</template>

<script>
    export default {
        name: "register",
        data:function(){
            return {
                name:'',
                password:''
            }
        },
        mounted:function(){

        },
        methods:{
            register:function(){
                var that=this;
                $.ajax({
                    url:URL+'/Api/Register/index',
                    type:'POST',
                    data:{
                        name:that.name,
                        password:that.password
                    },
                    dataType:'json',
                    success:function(data){
                        mui.toast(data.message);
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>