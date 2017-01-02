<template>
<ul>
  <li v-for='p in products'>
    <div class="card demo-card-header-pic">
      <div valign="bottom" class="card-header color-white no-border no-padding">
        <img class='card-cover' src="/images/hm.png" alt="">
      </div>
      <div class="card-content">
        <div class="card-content-inner">
          <p class="color-gray">还剩{{ p.inventory }} 件</p>
          <p>{{ p.title }}</p>
        </div>
      </div>
      <div class="card-footer">
        <button class="link" :disabled="!p.inventory"
               @click="addToCart(p)">加入购物车</button>
      </div>
    </div>
  </li>
</ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: mapActions([
    'addToCart'
  ]),
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>

<style>
  ul{
    padding:0;
  }
  li{
    list-style: none;
    width: 100%;
  }
</style>