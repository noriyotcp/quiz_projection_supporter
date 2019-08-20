<template>
  <div>
    <!-- Navigation Bar -->
    <div class="container-flued">
      <b-navbar
        toggleable="md"
        type="dark"
        variant="secondary"
      >
        <b-navbar-nav>
          <b-nav-item
            href="#"
            @click="onClickProjectionScreenLink"
          >
            投影画面を{{ (pjWindow == null) ? '開く' : '閉じる' }}
          </b-nav-item>
          <b-nav-item-dropdown text="設定">
            <b-dropdown-item
              v-b-modal.importQuizDataDialog
              href="#"
            >
              問題データを読み込む
            </b-dropdown-item>
            <b-dropdown-item
              v-b-modal.projectionSettingDialog
              href="#"
            >
              投影画面設定
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8">
          <question-card
            title="現在表示中"
            :q-data="displayedQuizData"
          />
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="toUpTriangle">
          ▲▲▲
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-3">
          <question-card
            title="ひとつ前"
            q-text-summary="true"
            :q-data="prevQuezData"
          />
        </div>

        <div class="col-6 align-self-center">
          <question-card
            tile="表示候補"
            :q-data="candidateQuizData"
          />
        </div>

        <div class="col-3">
          <question-card
            title="ひとつ次"
            q-text-summary="true"
            :q-data="nextQuizData"
          />
        </div>
      </div>

      <div class="row justify-content-center buttonArea">
        <div class="col-3">
          <!-- TODO: click handler -->
          <b-button
            size="lg"
            variant="outline-secondary"
            block
          >
            ＜＜ 前
          </b-button>
        </div>

        <div class="col-6">
          <p>
            <b-button
              v-b-modal.displayConfirmDialog
              size="lg"
              variant="primary"
              block
              :disabled="(candidateQuizData == null)"
            >
              投影画面へ表示
            </b-button>
          </p>
          <p class="text-center">
            <!-- TODO: click handler -->
            <b-button
              size="lg"
              variant="outline-secondary"
            >
              投影画面の表示を消す
            </b-button>
            <b-button
              v-b-modal.selectQuestionIdDialog
              size="lg"
              variant="outline-secondary"
            >
              問題IDで選択
            </b-button>
          </p>
          <div class="form-inline">
            <b-form-checkbox
              v-model="isDisplayAnotherAnswers"
              size="lg"
            >
              別解を表示
            </b-form-checkbox>
            <b-form-checkbox
              v-model="isDisplayQId"
              size="lg"
            >
              問題IDを表示
            </b-form-checkbox>
            <b-form-checkbox
              v-model="isLoopSelection"
              v-b-tooltip.hover
              size="lg"
              title="最初と最後の問題の間を[<<前][次>>]ボタンで行き来できるようにします"
            >
              問題選択をループする
            </b-form-checkbox>
          </div>
        </div>

        <div class="col-3">
          <!-- TODO: click handler -->
          <b-button
            size="lg"
            variant="outline-secondary"
            block
          >
            次 ＞＞
          </b-button>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- TODO dialogs -->
    </div>
  </div>
</template>

<script>
import QuestionCard from './MainScreen/QuestionCard'
import WindowUtil from '../logic/WindowUtil'

export default {
  name: 'MainScreen',
  components: { QuestionCard },
  data () {
    return {
      pjWindow: null,
      quizData: null,
      currentQuizDataIdx: 0,
      displayedQuizData: null,
      candidateQuizData: null,
      nextQuizData: null,
      prevQuezData: null,
      isDisplayAnotherAnswers: false,
      isDisplayQId: false,
      isLoopSelection: false,
      dialogMsg: null
    }
  },
  methods: {
    onClickProjectionScreenLink () {
      if (this.pjWindow == null) {
        const targetHref = this.$router.resolve('projection').href
        const option = {
          width: 1280,
          height: 720,
          autoHideMenuBar: true
        }
        this.pjWindow = WindowUtil.openWindow(targetHref, option)
        this.pjWindow.on('closed', () => {
          // When close the window, set null to this.pjWindow
          this.pjWindow = null
        })
      } else {
        // If the window is open when clicking a link, close the window
        this.pjWindow.close()
        this.pjWindow = null
      }
    },
    sendMessageToPjWindow (channel, arg) {
      if (this.pjWindow != null) {
        this.pjWindow.webContents.send(channel, arg)
      }
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
  .toUpTriangle {
    font-size: 200%;
  }
  .buttonArea {
    margin-top: 20px;
  }
</style>
