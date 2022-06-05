<template>
    <div class="tile" @click="tileClick">
        <div class="icon">
                <i v-if="post.dest === 'UCLA to LAX'" class="fa-solid fa-plane-departure" />
                <i v-else class="fa-solid fa-plane-arrival" />
        </div>
        <div v-for="info in ['date', 'time', 'dest']" :class="info" :key="info">
            {{ formatData(post[info], info) }}
        </div>
    </div>
</template>

<script>
export default {
    props: ['post'],
    methods: {
        tileClick () {
            this.$router.push(`/ride/${this.post._id}`)
        },
        formatData(data, type) {
            if (type === 'time' && data) {
                const tSplit = data.split(':')
                return tSplit[0] <= 12 ? (data + ' AM') : (tSplit[0]-12 + ':' + tSplit[1] + ' PM')
            }
            if (type === 'date' && data)
                return new Date(data).toLocaleDateString('en-us', {
                    weekday: 'long', month: 'long', day: 'numeric' 
                })
            else
                return data
        }
    }
}
</script>

<style scoped>
.tile {
    min-width: 220px;
    max-width: 340px;
    flex: 1;
    cursor: pointer;
    padding: 20px 30px;
    border-radius: 14px;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
    transition: .2s ease all;
    box-sizing: border-box;
}
.tile:hover {
    /* background: #D7D7D7; */
    background: rgb(247, 247, 247);
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px, rgb(51 51 51) 0px 0px 0px 3px;
}
.icon {
    font-size: 100px;
    color: #222222;
    margin-bottom: 12px;
}
.date {
    font-weight: 600;
    font-size: 15px;
    text-align: left;
    color: #222222;
    line-height: 19px;
}
.time, .dest {
    color: #717171;
    text-align: left;
    font-size: 14px;
    line-height: 19px;
}
</style>