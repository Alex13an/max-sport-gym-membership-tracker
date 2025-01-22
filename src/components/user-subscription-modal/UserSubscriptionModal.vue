<script setup lang="ts">
import { NInput, NButton } from "naive-ui";
import { ref } from "vue";
import { useModal } from "./use-modal";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";

const name = ref("");
const comment = ref("");
const { isModalVisible, closeModal } = useModal();
const { addUser } = useSubscriptionTable();

async function addNewUser() {
  if (!name.value) {
    return;
  }

  await addUser(name.value, comment.value);
  closeModal();
}
</script>

<template>
  <div class="subscription-modal">
    <div class="subscription-modal__container" v-if="isModalVisible">
      <button class="subscription-modal__close" @click="closeModal">✕</button>
      <div class="subscription-modal__wrapper">
        <span class="subscription-modal__label"> ФИO </span>
        <NInput type="text" placeholder="Имя клиента" v-model:value="name" />
      </div>
      <div class="subscription-modal__wrapper">
        <span class="subscription-modal__label"> Комментарий </span>
        <NInput
          type="textarea"
          placeholder="Комментарий"
          v-model:value="comment"
        />
      </div>
      <NButton
        class="subscription-modal__button"
        type="primary"
        @click="addNewUser"
      >
        Добавить
      </NButton>
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss" />
