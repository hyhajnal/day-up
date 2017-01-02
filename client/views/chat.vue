<style src="../../static/css/chat.css">
	
</style>

<template>
  <div class="chatapp">
    <thread-section></thread-section>
    <message-section></message-section>
  </div>
</template>

<script>
import ThreadSection from '../components/chat/ThreadSection.vue'
import MessageSection from '../components/chat/MessageSection.vue'
//import { getAllMessage } from '../vuex/actions'
export default {
  name: 'Chat',
  components: {
    ThreadSection,
    MessageSection
  }
}

//getAllMessage(store)
</script>