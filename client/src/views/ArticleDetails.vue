<template>
  <div>
    <h1>{{ currentArticle.title }}</h1>
    <p>by: {{ currentArticle.userId.name }}</p>
    <p class="text-left">{{ currentArticle.content }}</p><br>
    <div class="form-group border-top pt-4">
      <p>Comments</p>
      <textarea v-model="commentInput" class="form-control mb-3" rows="4" id="commentInput" placeholder="Post a comment"></textarea>
      <button v-on:click="postComment" type="button" class="btn btn-secondary">Submit</button>
    </div>
    <div class="card mt-4" v-for="(comment,index) in currentArticle.comments" :key="index">
      <div class="card-body text-left">
        <img class="rounded-circle mr-2" src="https://via.placeholder.com/30x30">
        <p class="mb-4" id="commentAuthor">{{ comment.userId.name }}</p>
        <p>{{ comment.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: [ 'id' ],
  data() {
    return {
      commentInput: '',
      currentArticle: ''
    }
  },
  methods: {
    postComment: function() {
      let token = localStorage.getItem('token')
      let self = this
      axios({
        method: 'post',
        url: 'http://localhost:3000/comments',
        headers: {
          token: token
        },
        data: {
          message: this.commentInput,
          articleId: this.currentArticle._id
        }
      })
        .then(comment => {
          self.commentInput = ''
          self.refreshArticle(self.currentArticle._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    refreshArticle: function(articleId) {
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${this.id}`,
      })
        .then(article => {
          self.currentArticle = article.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    let self = this
    axios({
      method: 'get',
      url: `http://localhost:3000/articles/${this.id}`,
    })
      .then(article => {
        self.currentArticle = article.data.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    id: function() {
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${this.id}`,
      })
        .then(article => {
          self.currentArticle = article.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
img {
  display: inline-block;
}
#commentAuthor {
  display: inline-block;
  font-size: 14px;
}
.form-control {
  width: 60%;
  margin: 0 auto;
  float: none;
}
.card {
  width: 60%;
  margin: 0 auto;
  float: none;
}
</style>
