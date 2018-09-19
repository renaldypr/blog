<template>
  <div class="articles">
    <div class="row">
      <div class="col-lg-4 border-right">
        <LeftColumn/>
      </div>
      <div class="col-lg-8">
        <router-view/>
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
      currentArticle: ''
    }
  },
  components: {
    LeftColumn
  },
  methods: {

  }
}
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>
