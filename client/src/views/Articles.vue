<template>
  <div class="home">
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
  name: 'home',
  components: {
    LeftColumn
  }
}
</script>

<style>

</style>
