<template>
<div>
  <button @click="dialog = true">打开1</button>
  <button @click="dialog2 = true">打开2</button>
  <mu-dialog :open="dialog" title="Dialog" @close="dialog = false">
    这是一个简单的弹出框1
    <button @click="dialog = false" slot="actions">确定</button>
    <button @click="dialog = false" slot="actions">取消</button>
  </mu-dialog>

  <mu-dialog :open="dialog2" title="Dialog" @close="dialog2 = false" dialogClass="left: 0;">
    这是一个简单的弹出框2
    <button @click="dialog2 = false" slot="actions">确定</button>
    <button @click="dialog2 = false" slot="actions">取消</button>
  </mu-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      dialog2: false
    }
  },
  methods: {
  }
}
</script>