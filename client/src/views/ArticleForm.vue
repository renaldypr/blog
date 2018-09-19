<template>
  <div>
    <h1>Post a New Article</h1>
    <div class="card ml-5 mr-5 mb-4">
      <div class="card-body">
        <div class="form-group">
          <input id="title" type="text" class="form-control" placeholder="Article Title" required="required" v-model="titleInput">
        </div>     
        <div class="form-group">
          <textarea v-model="contentInput" class="form-control" rows="6" id="content" placeholder="Write your content"></textarea>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-secondary btn-block" v-on:click="submitArticle()">Register</button>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticleForm',
  data() {
    return {
      titleInput: '',
      contentInput: ''
    }
  },
  methods: {
    submitArticle: function() {
      let token = localStorage.getItem('token')
      let self = this
      axios({
        method: 'post',
        url: 'http://localhost:3000/articles',
        headers: {
          token: token
        },
        data: {
          title: this.titleInput,
          content: this.contentInput
        }
      })
        .then(article => {
          self.titleInput = ''
          self.contentInput = ''
          self.$router.push(`/articles/${article.data.data._id}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
