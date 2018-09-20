<template>
  <div class="articles">
    <div class="row">
      <div class="col-lg-4 border-right">
        <LeftColumn v-bind:refresh="refreshArticle"/>
      </div>
      <div class="col-lg-8">
        <router-view v-on:refresh-article="generateRefreshArticle"/>
      </div>
    </div><br>
  </div>
</template>

<script>
import LeftColumn from '@/components/LeftColumn.vue'

export default {
  name: 'articles',
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
