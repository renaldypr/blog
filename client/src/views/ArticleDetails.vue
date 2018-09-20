<template>
  <div>
    <div v-if="ownArticle" class="row float-left">
      <div class="col-lg-12">
        <div class="btn-group mb-3">
          <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Article Tools
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#"><router-link :to="{ name: 'editForm', params: { id: id } }">Update Article</router-link></a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="deleteArticle">Delete Article</a>
          </div>
        </div>
      </div>
    </div>
    <h1>{{ currentArticle.title }}</h1>
    <p>by: {{ currentArticle.userId.name }}</p>
    <p class="text-left">{{ currentArticle.content }}</p><br>
    <div v-if="!isLogin" class="form-group border-top pt-4">
      <p>Please login to post a comment</p>
    </div>
    <div v-if="isLogin" class="form-group border-top pt-4">
      <p>Comments</p>
      <textarea v-model="commentInput" class="form-control mb-3" rows="4" id="commentInput" placeholder="Post a comment"></textarea>
      <button v-on:click="postComment" type="button" class="btn btn-secondary">Submit</button>
    </div>
    <div v-if="isLogin" class="card mt-4" v-for="(comment,index) in comments" :key="index">
      <div class="card-body text-left">
        <img class="rounded-circle mr-2" src="https://via.placeholder.com/30x30">
        <p class="mb-4" id="commentAuthor">{{ comment.userId.name }}</p>
        <div v-if="userId === comment.userId.email" class="dropdown">
          <i class="fas fa-ellipsis-v float-right text-muted" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" v-on:click="deleteComment(comment._id)">Delete Comment</a>
          </div>
        </div>
        <p>{{ comment.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data () {
    return {
      comments: [],
      commentInput: '',
      currentArticle: '',
      ownArticle: '',
      isLogin: '',
      userId: localStorage.getItem('email')
    }
  },
  methods: {
    postComment: function () {
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
    refreshArticle: function (articleId) {
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${this.id}`
      })
        .then(article => {
          self.currentArticle = article.data.data
          self.comments = []
          article.data.data.comments.forEach(comment => {
            self.comments.push(comment)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkArticleOwner: function (email) {
      if (email === localStorage.getItem('email')) {
        this.ownArticle = true
      } else {
        this.ownArticle = false
      }
    },
    getToken: function () {
      if (localStorage.getItem('token')) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    deleteArticle: function () {
      let self = this
      let token = localStorage.getItem('token')
      axios({
        method: 'delete',
        url: `http://localhost:3000/articles`,
        headers: {
          token: token
        },
        data: {
          id: this.currentArticle._id
        }
      })
        .then(response => {
          self.$emit('refresh-article')
          self.$router.push(`/articles`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteComment: function (id) {
      console.log('masuukk')
      let self = this
      let token = localStorage.getItem('token')
      axios({
        method: 'delete',
        url: `http://localhost:3000/comments`,
        headers: {
          token: token
        },
        data: {
          id: id
        }
      })
        .then(response => {
          self.refreshArticle(self.currentArticle._id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    let self = this
    axios({
      method: 'get',
      url: `http://localhost:3000/articles/${this.id}`
    })
      .then(article => {
        self.currentArticle = article.data.data
        self.checkArticleOwner(article.data.data.userId.email)
        self.comments = []
        article.data.data.comments.forEach(comment => {
          self.comments.push(comment)
        })
        self.getToken()
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    id: function () {
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${this.id}`
      })
        .then(article => {
          self.currentArticle = article.data.data
          self.checkArticleOwner(article.data.data.userId.email)
          self.comments = []
          article.data.data.comments.forEach(comment => {
            self.comments.push(comment)
          })
          self.getToken()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
.row {
  height: 0px;
}
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
