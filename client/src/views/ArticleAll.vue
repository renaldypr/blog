<template>
  <div id="all">
    <h2>All Articles</h2><br>
    <div class="card mb-4 w-75" v-for="(article,index) in articles" :key="index">
      <div class="card-body">
        <h4 class="mb-1"><b><router-link class="text-dark" :to="{ name: 'details', params: { id: article._id } }">{{ article.title }}</router-link></b></h4>
        <p class="text-muted"><router-link class="text-dark" :to="{ name: 'details', params: { id: article._id } }">{{ shortenArticle(article.content) }}...</router-link></p>
        <p class="mb-0" id="author"><b>{{ article.userId.name }}</b></p>
        <p class="mt-0 mb-0 text-muted" id="date">{{ convertDate(article.createdAt) }}</p>
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
    shortenArticle: function(content) {
      let shorten = content.split('.')[0]
      return shorten
    },
    convertDate: function(date) {
      let newFormat = String(new Date(date)).split(' ').slice(1,3).join(' ')
      return newFormat
    }
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
.text-dark {
  text-decoration: none;
}
#author, #date {
  font-size: 14px;
}
.card {
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
}
.card h4,p {
  text-align: left;
}
</style>
