<template>
  <div id="all">
    <h1>Articles</h1><br>
    <div class="card ml-5 mr-5 mb-4" v-for="(article,index) in articles" :key="index">
      <div class="card-body">
        <h3><b><router-link class="text-dark" :to="{ name: 'details', params: { id: article._id } }">{{ article.title }}</router-link></b></h3>
        <p id="author">by: {{ article.userId.name }}</p>
        <p>{{ article.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'articleAll',
  data () {
    return {
      articles: []
    }
  },
  methods: {
    
  },
  created() {
    let self = this
    axios({
      method: 'get',
      url: 'http://localhost:3000/articles',
    })
      .then(articles => {
        articles.data.data.forEach(article => {
          self.articles.push(article)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
#author {
  font-size: 14px;
}
</style>
