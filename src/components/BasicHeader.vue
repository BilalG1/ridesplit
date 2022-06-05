<template>
    <div class="search-header-full">
        <router-link to="/" class="header-logo">
            ridesplit
        </router-link>
    </div>
</template>

<style scoped>
.search-header-full{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 80px;
    padding: 0 80px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    z-index: 900;
    border-bottom: 1px solid #ebebeb;
}
.header-logo{
    font-size: 36px;
    font-weight: 500;
    color: green;
    text-decoration: none;
}
</style>