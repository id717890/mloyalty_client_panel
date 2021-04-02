<template>
  <div class="about">
    <div class="form-group">
      <div class="row">
        <div class="col-12">
          <p class="text1">1234</p>
        </div>
        <div class="col-12 d-flex align-center">
          <MlInputCode v-model="v1" class="mr-2" />
          <MlInputCode v-model="v2" class="mr-2" />
          <MlInputCode v-model="v3" class="mr-2" />
          <MlInputCode v-model="v4" class="mr-2" />
        </div>
      </div>
    </div>

    <!-- <h1>This is an order page</h1> -->
  </div>
</template>

<script>
import MlInputCode from '@/components/UI/MlInputCode'
export default {
  components: {
    MlInputCode
  },
  data: () => ({
    v1: null,
    v2: null,
    v3: null,
    v4: null
  })
}
</script>
