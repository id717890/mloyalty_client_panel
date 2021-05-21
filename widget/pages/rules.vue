<template>
  <div class="vh100 d-flex flex-column">
    <MlHeaderPage title="Правила" :back-url="backUrl" />
    <div class="px-10 pt-1 ml-rules">
      <pre class="ml-rules_text" style="white-space: pre-line">{{ rules }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'default',
  computed: {
    ...mapState({
      rules: (state) => state?.app?.mainWidgetConfig?.Rules?.Text,
    }),
    backUrl() {
      return this.$route?.params?.backUrl ?? '/'
    },
  },
}
</script>
