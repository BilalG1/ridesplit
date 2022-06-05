<template>
    <div class="search-header-full">
        <router-link to="/" class="header-logo" @click="handleHomeClick">
            ridesplit
        </router-link>

        <Transition name="drop">
                <div v-if="searchDest || searchDate" class="search-icon-container main-hide" @click="handleSearchClick">
                    <i class="fa-solid fa-magnifying-glass" />
                </div>
        </Transition>
        <div class="header-search-options">
            <Transition mode="out-in" name="search-trs">
                <div 
                    v-if="searchButtonState == 'dest' || searchDest" 
                    class="search-button search-dest w-lim pickdest ignore-sb-click" ref="pickdest" 
                    :style="searchButtonState == 'dest' ? {border: '2px solid black'} : '' "
                    @click="searchButtonState = 'dest'"
                >
                    {{ searchDest || '___ to ___' }}
                    <Transition name="search-trs">
                        <div class="search-dest-picker header-dropdown" v-if="searchButtonState == 'dest'">
                            <div 
                                v-for="option in ['UCLA to LAX', 'LAX to UCLA']" 
                                :key="option" class="dest-option dropdown-link" 
                                @click="searchDest = option"
                            >
                                {{ option }}
                            </div>
                        </div>
                    </Transition>
                </div>
                <button v-else class="search-button search-dest ignore-sb-click" @click="chooseDestClick">
                    Any Destination 
                </button>
            </Transition>
            <span class="seperator" />
            <Transition mode="out-in" name="search-trs">
                <input 
                    v-if="searchButtonState == 'date' || searchDate" 
                    type="date" 
                    class="search-button search-date w-lim ignore-sb-click" 
                    v-model="searchDate" 
                    ref="pickdate"
                    @click="searchButtonState = 'date'"
                />
                <button v-else class="search-button search-date ignore-sb-click" @click="chooseDateClick">
                    Any Date
                </button>
            </Transition>
            <Transition name="drop">
                <div v-if="searchDest || searchDate" class="search-icon-container main-show" @click="handleSearchClick">
                    <i class="fa-solid fa-magnifying-glass" />
                </div>
            </Transition>
        </div>

        <div class="header-seg-3">
            <router-link to ="/addpost" class="add-post-route">
                Add Post
            </router-link>
            <div class="header-extra-pulldown ignore-event-click" @click="this.dropDownOpen = !this.dropDownOpen">
                <i class="fa-solid fa-bars ignore-event-click"></i>
            </div>
            <Transition name="drop">
                <div class="header-dropdown ignore-event-click" v-if="dropDownOpen">
                    <div>
                        <router-link to="/" class="dropdown-link ignore-event-click" @click="handleHomeClick">
                            Home
                        </router-link>
                        <router-link to="/addpost" class="dropdown-link ignore-event-click">
                            New Post
                        </router-link>
                        <router-link to="/about" class="dropdown-link ignore-event-click">
                            About
                        </router-link>
                        <router-link to="/contact" class="dropdown-link ignore-event-click">
                            Contact
                        </router-link>
                    </div>
                </div>
            </Transition>
        </div>
    </div>  
</template>

<script>

export default {
    emits: ['search'],
    data() {
        return {
            dropDownOpen: false,
            searchButtonState: 'none', //'none', 'dest', or 'date'
            searchDest: '',
            searchDate: '',
        }
    },
    mounted() {
        window.addEventListener('click', this.closeDropDown)
        this.searchDest = this.$route.params.searchDest === 'any' ? '' : this.$route.params.searchDest
        this.searchDate = this.$route.params.searchDate || ''
    },
    unmounted() {
        window.removeEventListener('click', this.closeDropDown)
    },
    methods: {
        closeDropDown(e) {
            if (this.dropDownOpen && !e.target.className.includes('ignore-event-click'))
                this.dropDownOpen = false
            if (this.searchButtonState !== 'none' && !e.target.className.includes('ignore-sb-click'))
                this.searchButtonState = 'none'
        },
        chooseDestClick() {
            if (this.searchButtonState === 'dest')
                this.searchButtonState = 'none'
            else {
                this.searchButtonState = 'dest'
                setTimeout(() => {
                    this.$refs.pickdest.focus()
                }, 250)
            }                                                                  
        },
        chooseDateClick() {
            if (this.searchButtonState === 'date')
                this.searchButtonState = 'none'
            else {
                this.searchButtonState = 'date'
                setTimeout(() => {
                    this.$refs.pickdate.showPicker()
                    this.$refs.pickdate.focus()
                }, 250)
            }
        },
        handleSearchClick() {
            const dest = this.searchDest
            const date = this.searchDate
            this.$router.push(`/search/${dest || 'any'}/${date}`)
            this.$emit('search', dest || 'any', date)
        },
        handleHomeClick() {
            this.searchDest = ''
            this.searchDate = ''
            this.$emit('search')
        }
    },
}
</script>

<style scoped>
.search-header-full{
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0 80px;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: white;
    opacity: 0.98;
}
.header-logo{
    font-size: 36px;
    font-weight: 500;
    color: green;
    text-decoration: none;
    width: 170px;
    text-align: left;
}
.header-search-options{
    border-radius: 40px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.05);
    border: 1px solid #DDDDDD;
    cursor: pointer;
    transition: 0.2s ease all;
    display: flex;
    align-items: center;
    position: relative;
}
.header-search-options:hover{
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px 0px;
}
.search-button{
    height: 48px;
    border: none;
    background: #ffffff;
    padding: 0 16px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    font-family: sans-serif;
}
.search-dest{
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    width: 150px;
    z-index: 10;
}
.search-date{
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    width: 150px;
}
.seperator{
    height: 24px;
    width: 1px;
    background: #DDDDDD;
}
.add-post-route{
    padding: 12px;
    text-decoration: none;
    color: #222222;
    border-radius: 22px;
    transition: 0.25s ease all;
    font-size: 14px;
    font-weight: 600;
}
.add-post-route:hover, .header-extra-pulldown:hover{
    background: #f7f7f7;
}
.header-seg-3{
    display: flex;
    align-items: center;
    width: 170px;
    display: flex;
    justify-content: flex-end;
    position: relative;
}
.header-extra-pulldown{
    margin-left: 10px;
    padding: 12px 25px;
    font-size: 14px;
    transition: 0.25s ease all;
    cursor: pointer;
    border-radius: 22px;
    border: 1px solid #DDDDDD;
}
.header-dropdown{
    position: absolute;
    right: 0;
    margin-top: 34px;
    border-radius: 12px;
    top: 50%;
    padding: 8px 0;
    background: white;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    min-width: 240px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.12);
    z-index: 1000;
}
.dropdown-link{
    text-decoration: none;
    display: block;
    color: #222222;
    cursor: pointer;
    text-align: left;
    padding: 12px 16px;
    transition: .1s all;
    font-size: 14px;
    font-weight: 400;
}
.dropdown-link:hover{
    background: #f7f7f7;
}

.drop-enter-active{
    transition: all 0.3s ease;
}
.drop-leave-active {
  transition: all 0.2s ease;
}

.drop-enter-from,
.drop-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.search-trs-enter-active,
.search-trs-leave-active {
    transition: all 0.1s ease;
}
.search-trs-enter-from,
.search-trs-leave-to {
    opacity: 0;
    /* transform: translateY(30px); */
}

.w-lim{
    padding: 0 16px;
    width: 118px;
    /* outline: 2px solid black; */
    z-index: 10;
    transition: .2s all;
}
.w-lim:focus {
    border: 2px solid black;
}

.pickdest{
    position: relative;
    display: flex;
    align-items: center;
}
.search-dest-picker{
    left: 0;
    right: auto;
}
.search-icon-container{
    position: absolute;
    z-index: 300;
    display: flex;
    align-items: center;
    top: 6px;
    right: -50px;
    border-radius: 50%;
    color: white;
    background: green;
    height: 27px;
    width: 27px;
    padding: 5px;
    justify-content: center;
    font-size: 12px;
}

.main-hide{
    display: none;
}

@media screen and (max-width: 880px) {
    .header-logo {
        display: none;
    }
}
@media screen and (max-width: 680px) {
    .search-header-full {
        padding: 10px 20px;
        flex-direction: column-reverse;
        height: 120px;
    }
    .main-show {
        display: none;
    }
    .main-hide {
        display: inherit;
        position: static;
    }
}
</style>