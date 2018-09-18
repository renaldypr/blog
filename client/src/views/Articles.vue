<template>
  <div class="articles">
    <div class="row">
      <div class="col-lg-4 border-right">
        <LeftColumn v-on:send-article="getArticle"/>
      </div>
      <div class="col-lg-8">
        <router-view v-on:send-article="getArticle" v-bind:selectedarticle="currentArticle"/>
      </div>
    </div><br>
  </div>
</template>

<script>
import LeftColumn from '@/components/LeftColumn.vue'

export default {
  name: 'home',
  data() {
    return {
      currentArticle: ''
    }
  },
  components: {
    LeftColumn
  },
  methods: {
    getArticle: function(article){
      this.currentArticle = article
    }
  }
}
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>
