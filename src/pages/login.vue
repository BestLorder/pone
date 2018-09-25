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
      <router-link :to="{name:'homePage'}" class="mui-btn">随便看看</router-link>
      <button type="button" class="mui-btn mui-btn-primary" id="login" @click="login">登录</button>
      <router-link :to="{name:'register'}" class="mui-btn mui-btn-danger ">注册</router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'login',
    data:function(){
        return {
            name:'',
            password:''
        }
    },
    methods:{
        login:function(){
            var that=this;
            $.ajax({
                url:URL+'/api/login/index',
                type:'POST',
                data:{
                    name:that.name,
                    password:that.password
                },
                dataType:'json',
                success:function(data){
                    if(data.code==0){
                        that.GLOBAL.token=data.data.id;
                        that.$router.push({name:'homePage'});
                    }else{
                        mui.toast(data.message);
                    }
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
