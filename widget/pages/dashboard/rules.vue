<template>
  <div class="vh100 d-flex flex-column">
    <MlHeaderPage class="" title="Правила" />
    <div class="px-10 pt-1 ml-rules">
      <pre class="ml-rules_text" style="white-space: pre-line">{{ rules }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'dashboard',
  computed: {
    ...mapState({
      rules: (state) => state?.app?.mainWidgetConfig?.Rules?.Text,
    }),
  },
}
</script>

<style lang="scss" scoped>
.ml-rules::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.ml-rules::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

/* Handle */
.ml-rules::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

.ml-rules::-webkit-scrollbar-thumb:window-inactive {
  background: rgb(255, 255, 255);
}

.ml-rules {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;

  flex-basis: 20px;
  // border: 1px solid red;
  p {
    font-style: normal;
    font-size: 17px;
    line-height: 22px;
    color: #000000;
    opacity: 0.7;
  }

  .ml-rules_item {
    font-weight: bold;
  }

  .ml-rules_text {
    font-family: Inter !important;
    font-weight: normal !important;
    font-style: normal !important;
    font-size: 17px !important;
    // line-height: 22px !important;
    color: #000000 !important;
    opacity: 0.7 !important;
  }
}
</style>
