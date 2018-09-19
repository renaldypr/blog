<template>
  <div id="app">
    <NavBar></NavBar>

    <router-view/>

    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.row {
  height: 550px;
}
.col-lg-4, .col-lg-8 {
  overflow: scroll;
}
.btn-secondary {
  background-color: #1e1544;
}
</style>
