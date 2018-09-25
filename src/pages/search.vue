<template>
    <div>
        <div @click="add()">{{ reversedMessage }}</div>
        <div>{{firstName}}</div>
        <div>{{lastName}}</div>
        <div :style="{ fontSize: postFontSize + 'em' }">{{fullName}}</div>
        <button-counter ref="a" :title="123" v-on:enlarge-text="postFontSize += 0.1"></button-counter>
        <alert-box>
            Something bad happened.
        </alert-box>
        <!--<component v-bind:is="currentTabComponent" v-on:enlarge-text="postFontSize += 0.1"></component>-->
        <!--<div v-for="p in person" class="person">-->
            <!--<img :src='[imgPath+p.person_head]' class="person-img" alt="">-->
            <!--<div class="person-content">-->
                <!--<div>{{p.person_name}}</div>-->
                <!--<div>{{p.person_intro}}</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "search",
        data:function(){
            return {
                person:[],
                message: 'Hello',
                num:0,
                firstName: 'Foo',
                lastName: 'Bar',
                postFontSize: 1,
                currentTabComponent:'button-counter'
            }
        },
        components:{
            'button-counter':{
                props: ['title'],
                data: function () {
                    return {
                        count: 0
                    }
            },
                mounted:function(){

                },
                template: '<div><button v-on:click="count++">You clicked me {{ count }} times.{{title}}</button><button v-on:click="$emit(\'enlarge-text\')">Enlarge text</button></div>',
                methods:{
                    alert:function(){
                        alert(1);
                    }
                }
            },
            'alert-box':{
                template: `<div class="demo-alert-box"><strong>Error!</strong><slot></slot></div>`
            }
        },
        mounted:function(){
            this.imgPath=imgPath;
            this.getData();
            this.fullName = 'John Doe';
//            this.$refs.a.alert();
        },
        methods:{
            getData:function(){
                var that=this;
                // 人物
                $.ajax({
                    url:URL+'/api/search/search',
                    type:'POST',
                    data:{
                        // person_id:that.id
                    },
                    dataType:'json',
                    success:function(data){
                        that.person=data.data;
                    }
                })
            },
            add:function(){
                this.num++;
            }
        },
        computed: {
            // 计算属性的 getter
            reversedMessage: function () {
                // `this` 指向 vm 实例
                return this.message.split('').reverse().join('')
            },
            fullName: {
                // getter
                get: function () {
                    return this.firstName + ' ' + this.lastName
                },
                // setter
                set: function (newValue) {
                    var names = newValue.split(' ')
                    this.firstName = names[0]
                    this.lastName = names[names.length - 1]
                }
            }
        },
        watch:{
            num:function(){
                console.log(this.num)
            }
        }
    }
</script>

<style scoped>
.person{
    padding: 5px;
    border-bottom:2px solid #F8F8F8;
    display: flex;
}
.person-img{
    width: 50%;
    height: auto;
}
.person-content{
    padding: 5px;
}
</style>