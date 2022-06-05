import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";


import App from './App.vue'
import AddPost from './pages/AddPost.vue'
import ViewPost from './pages/ViewPost.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'
import PageNotFound from './pages/PageNotFound.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/addPost', component: AddPost },
  { path: '/ride/:postId', component: ViewPost, props: true },
  { path: '/search/:searchDest/:searchDate?', component: Home, props: true},
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/:pathMatch(.*)*', component: PageNotFound } 
]
  
const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
