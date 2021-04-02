<template>
  <div class="ml-modal-remove-certificate">
    <div class="white-block">
      <div class="content">
        <p class="modal-question">
          Вы действительно хотите удалить этот сертификат?
        </p>
        <p class="text2">Это действие нельзя отменить.</p>
      </div>
      <div class="action">
        <a href="#" class="ml-black-btn mr-2" @click.prevent="remove"
          >Удалить</a
        >
        <a href="#" @click.prevent="cancel" class="ml-flat-btn">Отменить</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import basketTypes from '@/store/basket/types'

export default {
  name: 'ModalConfirmRemoveCertificate',
  methods: {
    ...mapMutations('basket', [
      basketTypes.CANCEL_REMOVE_CERTIFICATE,
      basketTypes.REMOVE_CERTIFICATE
    ]),
    remove() {
      this[basketTypes.REMOVE_CERTIFICATE]()
    },
    cancel() {
      this[basketTypes.CANCEL_REMOVE_CERTIFICATE]()
    }
  }
}
</script>
