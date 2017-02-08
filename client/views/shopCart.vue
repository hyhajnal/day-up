<template>
  <div id="shopCart">
    <product-list></product-list>
    <hr>
    <cart></cart>
  </div>
</template>

<script>
import ProductList from '../components/shopCart/ProductList'
import Cart from '../components/shopCart/Cart'
export default {
  name: 'ShopCart',
  components: { ProductList, Cart}
}
</script>