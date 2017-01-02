<template>
  <div id="shopCart">
  	<side-bar></side-bar>
    <product-list></product-list>
    <hr>
    <cart></cart>
  </div>
</template>

<script>
import ProductList from '../components/shopCart/ProductList'
import Cart from '../components/shopCart/Cart'
import SideBar from '../components/SideBar'
export default {
  name: 'ShopCart',
  components: { ProductList, Cart, SideBar }
}
</script>