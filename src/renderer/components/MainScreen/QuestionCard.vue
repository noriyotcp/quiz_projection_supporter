<template>
  <div>
    <b-card
      :title="title"
      :sub-title="qIdLabel"
      class="qCard"
    >
      <p class="card-text">
        {{ qAnswerLabel }}
      </p>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      qIdLabel: '---',
      qTextLabel: '---',
      qAnswerLabel: '---'
    }
  }
}
</script>

<style scoped>
.qCard {
  height: 200px;
}
</style>
