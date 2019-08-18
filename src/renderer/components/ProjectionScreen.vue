<template>
  <div class="pjBase">
    <div class="container-flued">
      <b-card
        class="qTextCard"
        :style="{ backgroundColor: qBackgroundColor }"
      >
        <p
          class="card-text"
          :style="{ fontSize: qTextFontSize + 'px', color: qStringColor }"
        >
          {{ qText }}
        </p>
      </b-card>

      <div class="qAnswerArea">
        <b-card>
          <p class="card-text" />
        </b-card>

        <b-card class="qAnotherAnswerCard">
          <p class="card-text">
            {{ qAnotherAnswer }}
          </p>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['qId'],
  data () {
    return {
      qText: '',
      qAnswer: '',
      qAnotherAnswer: '',
      isDisplayAnotherAnswers: false
    }
  }
}
</script>

<style scoped>
  /* 全画面表示するために高さを100%にする */
  html, body, div#app {
    height: 100%;
    margin: 0;
  }

  .pjBase {
    background-color: black;
    height: 100vh;
    margin: 0;
  }

  .container-flued {
    height: 100vh;
    padding: 3vh;
  }

  .qTextCard {
    height: 64%;
  }

  .qAnswerArea {
    height: 35%;
    margin-top: 1%;
  }

  .qAnswerCard-AnotherAnswer {
    height: 50%;
  }
  .qAnswerCard-WoAnotherAnswer {
    height: 100%;
  }

  .qAnotherAnswerCard {
    height: 50%;
  }

  .card-body {
    padding: 10px;
  }
</style>
