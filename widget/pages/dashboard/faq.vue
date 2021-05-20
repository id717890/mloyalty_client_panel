<template>
  <div>
    <div style="padding: 0 44px" class="pt-3">
      <v-btn icon @click="$router.push('/dashboard')">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </div>
    <div class="px-12 py-4">
      <div class="d-flex align-items-center">
        <h1>Частые вопросы</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>
