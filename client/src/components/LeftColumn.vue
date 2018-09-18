<template>
  <div class="leftcolumn">
    <div class="card ml-2">
      <div class="card-body">
        <div class="form-group">
          <input type="tet" class="form-control" id="searchQuery" placeholder="Search article">
        </div>
        <button type="button" class="btn btn-secondary">Search</button>
      </div>
    </div>
    <br><br>
    <div class="card ml-2">
      <div class="card-body">
        <button type="button" class="btn btn-secondary"><router-link to="/articles/form">Create a new article</router-link></button>
        <br><br>
        <ul class="list-group">
          <router-link v-for="(article, index) in articles" :key="article" class ="list-group-item list-group-item-action" :to="{ name: 'details', params: { id: index } }">{{ article }}</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftColumn',
  data () {
    return {
      articles: [
        'Great Sword',
        'Long Sword',
        'Gunlance',
        'Sword & Shield'
      ]
    }
  }
  // props: {
  //   msg: String
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
button a {
  text-decoration: none;
  color: white
}
</style>
