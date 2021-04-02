<template>
  <div class="pb">
    <dir class="row">
      <div class="col-12">
        <div class="text3">Отправитель сертификата</div>
      </div>
      <div class="col-12 d-flex align-center">
        <img src="@/assets/img/stepper.png" />
        <div class="flex-grow-1 d-flex flex-column pl-6">
          <div class="mb-6 text5">
            Оформляет поздравление и выбирает номинал сертификата
          </div>
          <div class="mb-6 text5">
            Указывает свои контактные данные <br />
            и оплачивает сертификат
          </div>
          <div class="text5">
            Получает ссылку на поздравление <br />
            и пересылает ее получателю
          </div>
        </div>
      </div>
      <div class="col-12 pt-10">
        <div class="text3">Получатель сертификата</div>
      </div>
      <div class="col-12 d-flex align-center">
        <img src="@/assets/img/stepper.png" />
        <div class="flex-grow-1 d-flex flex-column pl-6">
          <div class="mb-6 text5">
            Получает ссылку на поздравление в мессенджере или социальной сети
          </div>
          <div class="mb-6 text5">
            Переходит по ссылке, принимает поздравление и сохраняет сертификат
          </div>
          <div class="text5">
            Выбирает магазин, использует сертификат для оплаты всей или части
            покупки
          </div>
        </div>
      </div>
    </dir>
  </div>
</template>

<script>
export default {
  name: 'HowItsWork'
}
</script>
