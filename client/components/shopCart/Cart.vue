<template>
  <div class="cart">
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <div class="list-block">
      <ul>
        <li class="item-content item-link" v-for="p in products">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">{{ p.title }}</div>
            <div class="item-after">{{ p.price | currency }} x {{ p.quantity }}</div>
          </div>
        </li>
      </ul>
    </div>
    <p>Total: {{ total | currency }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      checkoutStatus: 'checkoutStatus'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('checkout', products)
    }
  }
}
</script>