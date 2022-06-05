<template>
    <BasicHeader />
    <TurinHorse class="horse-anim" />
    <div class="about-header">
        About Ridesplit
    </div>
    <div class="about-desc">
        Ridesplit was created to help UCLA students split Uber or Lyft rides to common destinations. For now the only available options are to or from LAX, but more will be added after some time. 
        With ridesplit, only verified UCLA students can add a post or view a post's contact information. This way, everyone who uses the site can feel safe knowing the person they are contacting is 
        another student.
    </div>
</template>

<script>
import BasicHeader from '@/components/BasicHeader.vue'
import TurinHorse from '@/components/TurinHorse.vue'

export default {
    components: {
        BasicHeader,
        TurinHorse
    },
}
</script>

<style scoped>
.horse-anim {
    width: 90vw;
    max-width: 800px;
    margin-top: 50px;
}
.about-header {
    font-weight: 800;
    font-size: 30px;
    color: #008000;
    margin-bottom: 20px;
}
.about-desc {
    max-width: 800px;
    font-size: 16px;
    line-height: 28px;
    margin: 0 auto;
}
</style>