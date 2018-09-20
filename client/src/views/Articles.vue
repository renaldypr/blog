<template>
  <div class="articles">
    <div class="row">
      <div class="col-lg-4 pr-0 border-right">
        <LeftColumn v-bind:refresh="refreshArticle"/>
      </div>
      <div class="col-lg-8 pl-5 pr-5">
        <router-view v-bind:nowlogin="islogin" v-on:refresh-article="generateRefreshArticle"/>
      </div>
    </div><br>
  </div>
</template>

<script>
import LeftColumn from '@/components/LeftColumn.vue'

export default {
  name: 'articles',
  props: [ 'islogin' ],
  data() {
    return {
      refreshArticle: false
    }
  },
  components: {
    LeftColumn
  },
  methods: {
    generateRefreshArticle: function() {
      if (this.refreshArticle) {
        this.refreshArticle = false
      } else {
        this.refreshArticle = true
      }
    }
  }
}
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>
