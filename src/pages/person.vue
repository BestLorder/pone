<template>
    <div>
        {{this.$route.params.id}}
        <keep-alive>
            <component v-bind:is="currentTabComponent"></component>
        </keep-alive>
    </div>
</template>

<script>
    import theme1 from '@/components/themes/theme1'
    import theme2 from '@/components/themes/theme2'
    export default {
        name: "person",
        data(){
          return {
              currentTabComponent:theme1
          }
        },
        mounted(){
            this.currentTabComponent=theme1;
        },
        components:{
            theme1,
            theme2
        }
    }
</script>

<style scoped>

</style>