<template>
  <div>
    <b-modal
      ref="modal"
      hide-header
      ok-only
    >
      <p>{{ message }}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  },
  onOkClicked () {
    this.$emit('onOkClicked')
  }
}
</script>
